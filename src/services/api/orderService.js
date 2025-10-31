import { getApperClient } from "@/services/apperClient";
import userService from "./userService";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const parseJSONField = (value) => {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const transformOrder = (order) => ({
  Id: order.Id,
  userId: order.user_id_c?.Id || order.user_id_c,
  orderNumber: order.order_number_c,
  items: parseJSONField(order.items_c) || [],
  subtotal: parseFloat(order.subtotal_c) || 0,
  shipping: parseFloat(order.shipping_c) || 0,
  tax: parseFloat(order.tax_c) || 0,
  total: parseFloat(order.total_c) || 0,
  shippingAddress: parseJSONField(order.shipping_address_c) || {},
  status: order.status_c,
  createdAt: order.created_at_c
});

const orderService = {
  createOrder: async (orderData) => {
    await delay(400);

    const apperClient = getApperClient();
    if (!apperClient || !window.ApperSDK) {
      throw new Error("ApperSDK not initialized");
    }

    const currentProfile = await userService.getProfile();
    if (!currentProfile) {
      throw new Error("User not authenticated");
    }

    const orderPayload = {
      user_id_c: currentProfile.Id,
      order_number_c: `VO${Date.now().toString().slice(-8)}`,
      items_c: JSON.stringify(orderData.items),
      subtotal_c: orderData.subtotal,
      shipping_c: orderData.shipping,
      tax_c: orderData.tax,
      total_c: orderData.total,
      shipping_address_c: JSON.stringify(orderData.shippingAddress),
      status_c: "Processing",
      created_at_c: new Date().toISOString()
    };

    const response = await apperClient.createRecord("order_c", {
      records: [orderPayload]
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to create order");
    }

    if (response.results) {
      const failed = response.results.filter((r) => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to create order:`, failed);
        throw new Error(failed[0].message || "Failed to create order");
      }

      const successResult = response.results.find((r) => r.success);
      if (successResult && successResult.data) {
        return transformOrder(successResult.data);
      }
    }

    return {
      ...orderData,
      Id: Date.now(),
      userId: currentProfile.Id,
      orderNumber: orderPayload.order_number_c,
      status: "Processing",
      createdAt: orderPayload.created_at_c
    };
  },

  getUserOrders: async () => {
    await delay(300);

    const apperClient = getApperClient();
    if (!apperClient || !window.ApperSDK) {
      throw new Error("ApperSDK not initialized");
    }

    const currentProfile = await userService.getProfile();
    if (!currentProfile) {
      throw new Error("User not authenticated");
    }

    const response = await apperClient.fetchRecords("order_c", {
      fields: [
        { field: { Name: "Id" } },
        { field: { Name: "user_id_c" } },
        { field: { Name: "order_number_c" } },
        { field: { Name: "items_c" } },
        { field: { Name: "subtotal_c" } },
        { field: { Name: "shipping_c" } },
        { field: { Name: "tax_c" } },
        { field: { Name: "total_c" } },
        { field: { Name: "shipping_address_c" } },
        { field: { Name: "status_c" } },
        { field: { Name: "created_at_c" } }
      ],
      where: [
        {
          FieldName: "user_id_c",
          Operator: "EqualTo",
          Values: [currentProfile.Id]
        }
      ],
      orderBy: [
        {
          fieldName: "created_at_c",
          sorttype: "DESC"
        }
      ]
    });

    if (!response.success || !response.data) {
      return [];
    }

    return response.data.map(transformOrder);
  },

  getOrderById: async (orderId) => {
    await delay(200);

    const apperClient = getApperClient();
    if (!apperClient || !window.ApperSDK) {
      throw new Error("ApperSDK not initialized");
    }

    const currentProfile = await userService.getProfile();
    if (!currentProfile) {
      throw new Error("User not authenticated");
    }

    const response = await apperClient.getRecordById("order_c", parseInt(orderId), {
      fields: [
        { field: { Name: "Id" } },
        { field: { Name: "user_id_c" } },
        { field: { Name: "order_number_c" } },
        { field: { Name: "items_c" } },
        { field: { Name: "subtotal_c" } },
        { field: { Name: "shipping_c" } },
        { field: { Name: "tax_c" } },
        { field: { Name: "total_c" } },
        { field: { Name: "shipping_address_c" } },
        { field: { Name: "status_c" } },
        { field: { Name: "created_at_c" } }
      ]
    });

    if (!response.success || !response.data) {
      throw new Error("Order not found");
    }

    const order = transformOrder(response.data);

    if (order.userId !== currentProfile.Id) {
      throw new Error("Order not found");
    }

    return order;
  }
};

export default orderService;
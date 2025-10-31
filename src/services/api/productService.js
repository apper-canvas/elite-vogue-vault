import { getApperClient } from "@/services/apperClient";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const parseArrayField = (value) => {
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
};

const transformProduct = (product) => ({
  Id: product.Id,
  name: product.name_c,
  category: product.category_c,
  subcategory: product.subcategory_c,
  price: parseFloat(product.price_c) || 0,
  images: parseArrayField(product.images_c),
  sizes: parseArrayField(product.sizes_c),
  colors: parseArrayField(product.colors_c),
  description: product.description_c,
  inStock: product.in_stock_c,
  stockCount: parseInt(product.stock_count_c) || 0,
  featured: product.featured_c,
  trending: product.trending_c
});

const productService = {
  getAll: async () => {
    await delay(300);

    const apperClient = getApperClient();
    if (!apperClient) {
      throw new Error("ApperSDK not initialized");
    }

    const response = await apperClient.fetchRecords("product_c", {
      fields: [
        { field: { Name: "Id" } },
        { field: { Name: "name_c" } },
        { field: { Name: "category_c" } },
        { field: { Name: "subcategory_c" } },
        { field: { Name: "price_c" } },
        { field: { Name: "images_c" } },
        { field: { Name: "sizes_c" } },
        { field: { Name: "colors_c" } },
        { field: { Name: "description_c" } },
        { field: { Name: "in_stock_c" } },
        { field: { Name: "stock_count_c" } },
        { field: { Name: "featured_c" } },
        { field: { Name: "trending_c" } }
      ]
    });

    if (!response.success || !response.data) {
      return [];
    }

    return response.data.map(transformProduct);
  },

  getById: async (id) => {
    await delay(200);

    const apperClient = getApperClient();
    if (!apperClient) {
      throw new Error("ApperSDK not initialized");
    }

    const response = await apperClient.getRecordById("product_c", parseInt(id), {
      fields: [
        { field: { Name: "Id" } },
        { field: { Name: "name_c" } },
        { field: { Name: "category_c" } },
        { field: { Name: "subcategory_c" } },
        { field: { Name: "price_c" } },
        { field: { Name: "images_c" } },
        { field: { Name: "sizes_c" } },
        { field: { Name: "colors_c" } },
        { field: { Name: "description_c" } },
        { field: { Name: "in_stock_c" } },
        { field: { Name: "stock_count_c" } },
        { field: { Name: "featured_c" } },
        { field: { Name: "trending_c" } }
      ]
    });

    if (!response.success || !response.data) {
      throw new Error("Product not found");
    }

    return transformProduct(response.data);
  },

  getByCategory: async (category) => {
    await delay(300);

    const apperClient = getApperClient();
    if (!apperClient) {
      throw new Error("ApperSDK not initialized");
    }

    const response = await apperClient.fetchRecords("product_c", {
      fields: [
        { field: { Name: "Id" } },
        { field: { Name: "name_c" } },
        { field: { Name: "category_c" } },
        { field: { Name: "subcategory_c" } },
        { field: { Name: "price_c" } },
        { field: { Name: "images_c" } },
        { field: { Name: "sizes_c" } },
        { field: { Name: "colors_c" } },
        { field: { Name: "description_c" } },
        { field: { Name: "in_stock_c" } },
        { field: { Name: "stock_count_c" } },
        { field: { Name: "featured_c" } },
        { field: { Name: "trending_c" } }
      ],
      where: [
        {
          FieldName: "category_c",
          Operator: "EqualTo",
          Values: [category]
        }
      ]
    });

    if (!response.success || !response.data) {
      return [];
    }

    return response.data.map(transformProduct);
  },

  getFeatured: async () => {
    await delay(300);

    const apperClient = getApperClient();
    if (!apperClient) {
      throw new Error("ApperSDK not initialized");
    }

    const response = await apperClient.fetchRecords("product_c", {
      fields: [
        { field: { Name: "Id" } },
        { field: { Name: "name_c" } },
        { field: { Name: "category_c" } },
        { field: { Name: "subcategory_c" } },
        { field: { Name: "price_c" } },
        { field: { Name: "images_c" } },
        { field: { Name: "sizes_c" } },
        { field: { Name: "colors_c" } },
        { field: { Name: "description_c" } },
        { field: { Name: "in_stock_c" } },
        { field: { Name: "stock_count_c" } },
        { field: { Name: "featured_c" } },
        { field: { Name: "trending_c" } }
      ],
      where: [
        {
          FieldName: "featured_c",
          Operator: "EqualTo",
          Values: [true]
        }
      ]
    });

    if (!response.success || !response.data) {
      return [];
    }

    return response.data.map(transformProduct);
  },

  getTrending: async () => {
    await delay(300);

    const apperClient = getApperClient();
    if (!apperClient) {
      throw new Error("ApperSDK not initialized");
    }

    const response = await apperClient.fetchRecords("product_c", {
      fields: [
        { field: { Name: "Id" } },
        { field: { Name: "name_c" } },
        { field: { Name: "category_c" } },
        { field: { Name: "subcategory_c" } },
        { field: { Name: "price_c" } },
        { field: { Name: "images_c" } },
        { field: { Name: "sizes_c" } },
        { field: { Name: "colors_c" } },
        { field: { Name: "description_c" } },
        { field: { Name: "in_stock_c" } },
        { field: { Name: "stock_count_c" } },
        { field: { Name: "featured_c" } },
        { field: { Name: "trending_c" } }
      ],
      where: [
        {
          FieldName: "trending_c",
          Operator: "EqualTo",
          Values: [true]
        }
      ]
    });

    if (!response.success || !response.data) {
      return [];
    }

    return response.data.map(transformProduct);
  },

  search: async (query) => {
    await delay(300);

    const apperClient = getApperClient();
    if (!apperClient) {
      throw new Error("ApperSDK not initialized");
    }

    const response = await apperClient.fetchRecords("product_c", {
      fields: [
        { field: { Name: "Id" } },
        { field: { Name: "name_c" } },
        { field: { Name: "category_c" } },
        { field: { Name: "subcategory_c" } },
        { field: { Name: "price_c" } },
        { field: { Name: "images_c" } },
        { field: { Name: "sizes_c" } },
        { field: { Name: "colors_c" } },
        { field: { Name: "description_c" } },
        { field: { Name: "in_stock_c" } },
        { field: { Name: "stock_count_c" } },
        { field: { Name: "featured_c" } },
        { field: { Name: "trending_c" } }
      ],
      whereGroups: [
        {
          operator: "OR",
          subGroups: [
            {
              conditions: [
                {
                  fieldName: "name_c",
                  operator: "Contains",
                  values: [query]
                }
              ]
            },
            {
              conditions: [
                {
                  fieldName: "category_c",
                  operator: "Contains",
                  values: [query]
                }
              ]
            },
            {
              conditions: [
                {
                  fieldName: "description_c",
                  operator: "Contains",
                  values: [query]
                }
              ]
            }
          ]
        }
      ]
    });

    if (!response.success || !response.data) {
      return [];
    }

    return response.data.map(transformProduct);
  }
};

export default productService;
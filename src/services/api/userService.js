import { getApperClient } from "@/services/apperClient";
import React from "react";
import Error from "@/components/ui/Error";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const userService = {
  getProfile: async () => {
    await delay(300);

    const apperClient = getApperClient();
    if (!apperClient || !window.ApperSDK) {
      throw new Error("ApperSDK not initialized");
    }

    const { ApperUI } = window.ApperSDK;
    const currentUser = ApperUI.getUser();

    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    const response = await apperClient.fetchRecords("user_c", {
      fields: [
        { field: { Name: "Id" } },
        { field: { Name: "email_c" } },
        { field: { Name: "first_name_c" } },
        { field: { Name: "last_name_c" } },
        { field: { Name: "phone_c" } },
        { field: { Name: "created_at_c" } }
      ],
      where: [
        {
          FieldName: "email_c",
          Operator: "EqualTo",
          Values: [currentUser.emailAddress]
        }
      ]
    });

    if (!response.success || !response.data || response.data.length === 0) {
      throw new Error("User profile not found");
    }

    const userProfile = response.data[0];

    const addressResponse = await apperClient.fetchRecords("address_c", {
      fields: [
        { field: { Name: "Id" } },
        { field: { Name: "first_name_c" } },
        { field: { Name: "last_name_c" } },
        { field: { Name: "address_c" } },
        { field: { Name: "city_c" } },
        { field: { Name: "state_c" } },
        { field: { Name: "zip_code_c" } },
        { field: { Name: "country_c" } },
        { field: { Name: "is_default_c" } }
      ],
      where: [
        {
          FieldName: "user_id_c",
          Operator: "EqualTo",
          Values: [userProfile.Id]
        }
      ]
    });

    const addresses =
      addressResponse.success && addressResponse.data
        ? addressResponse.data.map((addr) => ({
            Id: addr.Id,
            firstName: addr.first_name_c,
            lastName: addr.last_name_c,
            address: addr.address_c,
            city: addr.city_c,
            state: addr.state_c,
            zipCode: addr.zip_code_c,
            country: addr.country_c,
            isDefault: addr.is_default_c
          }))
        : [];

    return {
      Id: userProfile.Id,
      email: userProfile.email_c,
      firstName: userProfile.first_name_c,
      lastName: userProfile.last_name_c,
      phone: userProfile.phone_c || "",
      createdAt: userProfile.created_at_c,
      addresses
    };
  },

  updateProfile: async (profileData) => {
    await delay(400);

    const apperClient = getApperClient();
    if (!apperClient || !window.ApperSDK) {
      throw new Error("ApperSDK not initialized");
    }

    const { ApperUI } = window.ApperSDK;
    const currentUser = ApperUI.getUser();

    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    const currentProfile = await userService.getProfile();

    const updatePayload = {
      Id: currentProfile.Id,
      first_name_c: profileData.firstName,
      last_name_c: profileData.lastName,
      phone_c: profileData.phone || ""
    };

    const response = await apperClient.updateRecord("user_c", {
      records: [updatePayload]
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to update profile");
    }

    if (response.results) {
      const failed = response.results.filter((r) => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to update profile:`, failed);
        throw new Error(
          failed[0].message || "Failed to update profile"
        );
      }
    }

    return await userService.getProfile();
  },

  getAddresses: async () => {
    await delay(200);

    const apperClient = getApperClient();
    if (!apperClient || !window.ApperSDK) {
      throw new Error("ApperSDK not initialized");
    }

    const { ApperUI } = window.ApperSDK;
    const currentUser = ApperUI.getUser();

    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    const currentProfile = await userService.getProfile();

    const response = await apperClient.fetchRecords("address_c", {
      fields: [
        { field: { Name: "Id" } },
        { field: { Name: "first_name_c" } },
        { field: { Name: "last_name_c" } },
        { field: { Name: "address_c" } },
        { field: { Name: "city_c" } },
        { field: { Name: "state_c" } },
        { field: { Name: "zip_code_c" } },
        { field: { Name: "country_c" } },
        { field: { Name: "is_default_c" } }
      ],
      where: [
        {
          FieldName: "user_id_c",
          Operator: "EqualTo",
          Values: [currentProfile.Id]
        }
      ]
    });

    if (!response.success) {
      return [];
    }

    return (
      response.data?.map((addr) => ({
        Id: addr.Id,
        firstName: addr.first_name_c,
        lastName: addr.last_name_c,
        address: addr.address_c,
        city: addr.city_c,
        state: addr.state_c,
zipCode: addr.zip_code_c,
        country: addr.country_c,
        isDefault: addr.is_default_c
      })) || []
    );
  }
};

export default userService;
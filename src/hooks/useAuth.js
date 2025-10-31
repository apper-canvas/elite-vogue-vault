import { useSelector } from "react-redux";
import React from "react";
import { useAuth as useRootAuth } from "@/layouts/Root";

export const useAuth = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { logout, isInitialized } = useRootAuth();

  const getUser = () => {
    if (window.ApperSDK && window.ApperSDK.ApperUI) {
      return window.ApperSDK.ApperUI.getUser();
    }
    return user;
  };

  const login = async (credentials) => {
    if (window.ApperSDK && window.ApperSDK.ApperUI) {
      return window.ApperSDK.ApperUI.login(credentials);
    }
    throw new Error('Authentication SDK not available');
  };

  const register = async (userData) => {
    if (window.ApperSDK && window.ApperSDK.ApperUI) {
      return window.ApperSDK.ApperUI.register(userData);
    }
    throw new Error('Authentication SDK not available');
  };

  return {
    user: user || getUser(),
    isAuthenticated,
    loading: !isInitialized,
    logout,
    login,
    register
  };
};
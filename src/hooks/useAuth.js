import { useSelector } from "react-redux";
import { useRootAuth } from "@/layouts/Root";
import React from "react";

export const useAuth = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { logout, isInitialized, login, register } = useRootAuth();

  const getUser = () => {
    if (window.ApperSDK && window.ApperSDK.ApperUI) {
      return window.ApperSDK.ApperUI.getUser();
    }
    return user;
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
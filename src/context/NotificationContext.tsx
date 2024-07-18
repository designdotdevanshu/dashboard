// NotificationContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Notification = {
  id: string;
  message: string;
  createdAt: string; // Add createdAt for timestamp
};

type NotificationContextType = {
  notifications: Notification[];
  notificationSettings: boolean;
  addNotification: (message: string) => void;
  deleteNotification: (id: string) => void; // Function to delete a notification
  clearNotifications: () => void;
  toggleNotificationSettings: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    if (typeof window !== "undefined") {
      const storedNotifications = localStorage.getItem("notifications");
      return storedNotifications ? JSON.parse(storedNotifications) : [];
    }
    return [];
  });

  const [notificationSettings, setNotificationSettings] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const storedSettings = localStorage.getItem("notificationSettings");
      return storedSettings ? JSON.parse(storedSettings) : true;
    }
    return true;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedNotifications = localStorage.getItem("notifications");
      const storedSettings = localStorage.getItem("notificationSettings");
      setNotifications(storedNotifications ? JSON.parse(storedNotifications) : []);
      setNotificationSettings(storedSettings ? JSON.parse(storedSettings) : true);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  const addNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      createdAt: new Date().toISOString(), // Set createdAt timestamp
    };
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
  };

  const deleteNotification = (id: string) => {
    setNotifications((prevNotifications) => prevNotifications.filter((notif) => notif.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const toggleNotificationSettings = () => {
    setNotificationSettings((prevSettings) => !prevSettings);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        notificationSettings,
        addNotification,
        deleteNotification,
        clearNotifications,
        toggleNotificationSettings,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

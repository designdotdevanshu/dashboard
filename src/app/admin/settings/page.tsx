"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useNotification } from "@/context/NotificationContext";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const { notificationSettings, toggleNotificationSettings } = useNotification();
  const [settings, setSettings] = useState({ notifications: true });
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Settings</h1>
      <div className="rounded p-4 shadow-md dark:shadow-white">
        <div className="mb-4 flex items-center">
          <p className="mb-0 mr-4 block text-xl">Theme:</p>
          <button onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))} className={`rounded-lg bg-gray-800 px-6 py-1 text-base text-white transition-all duration-100 hover:bg-gray-600 focus:outline-none dark:bg-gray-50 dark:text-gray-800 dark:hover:bg-gray-300`}>
            {currentTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
        <div className="mb-4 flex items-center">
          <div className="flex items-center">
            <label htmlFor="notification-toggle" className="mr-2 text-xl">
              Enable Notifications:
            </label>
            <Switch id="notification-toggle" checked={notificationSettings} onCheckedChange={toggleNotificationSettings} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;

// Notifications.tsx
"use client";

import NotificationList from "@/components/notification-list";
import { useNotification } from "@/context/NotificationContext";

const Notifications = () => {
  const { notifications, clearNotifications } = useNotification();

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Notifications</h1>
      <div className="mb-4 flex items-center justify-between">
        <button onClick={clearNotifications} className="rounded bg-red-500 px-4 py-2 text-white">
          Clear Notifications
        </button>
        <span className="text-sm text-gray-500">{notifications.length} notifications</span>
      </div>
      <NotificationList />
    </div>
  );
};

export default Notifications;

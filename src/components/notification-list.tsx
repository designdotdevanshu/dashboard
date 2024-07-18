// NotificationList.tsx
"use client";

import React from "react";
import { useNotification } from "@/context/NotificationContext";
import { MdDelete } from "react-icons/md";

const NotificationList: React.FC = () => {
  const { notifications, deleteNotification } = useNotification();

  const handleDelete = (id: string) => {
    deleteNotification(id);
  };

  return (
    <ul className="space-y-4">
      {notifications.map((notification) => (
        <li key={notification.id} className="rounded p-4 shadow-md dark:shadow-white">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{notification.message}</span>
            <div className="flex items-center gap-x-2">
              <span className="text-sm text-gray-500">{formatDate(notification.createdAt)}</span>
              <button onClick={() => handleDelete(notification.id)} className="text-red-500">
                <MdDelete size={24} />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

// Example function to format date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}

export default NotificationList;

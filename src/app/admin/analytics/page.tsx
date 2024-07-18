"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
  paid: number;
};

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

type Notification = {
  id: number;
  message: string;
  userId: number;
  read: boolean;
};

const Analytics = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("users");
      if (userData) {
        try {
          const users = JSON.parse(userData);
          setUsers(users);
        } catch (e) {
          console.error("Error parsing users data:", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const taskData = localStorage.getItem("tasks");
      if (taskData) {
        try {
          const tasks = JSON.parse(taskData);
          setTasks(tasks);
        } catch (e) {
          console.error("Error parsing tasks data:", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const notificationData = localStorage.getItem("notifications");
      if (notificationData) {
        try {
          const notifications = JSON.parse(notificationData);
          setNotifications(notifications);
        } catch (e) {
          console.error("Error parsing notifications data:", e);
        }
      }
    }
  }, []);

  const activeUsers = users.filter((user) => user.active).length;
  const revenue = users.reduce((total, user) => total + user.paid, 0);

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Analytics</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded p-4 shadow dark:shadow-white">
          <h2 className="text-xl font-bold">User Count</h2>
          <p>{users.length}</p>
        </div>
        <div className="rounded p-4 shadow dark:shadow-white">
          <h2 className="text-xl font-bold">Active Users</h2>
          <p>{activeUsers}</p>
        </div>
        <div className="rounded p-4 shadow dark:shadow-white">
          <h2 className="text-xl font-bold">Revenue</h2>
          <p>${revenue}</p>
        </div>
      </div>
    </>
  );
};

export default Analytics;

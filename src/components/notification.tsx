"use client";

import { useNotification } from "@/context/NotificationContext";
import { useToast } from "./ui/use-toast";

const Notification: React.FC = () => {
  const { addNotification, notificationSettings } = useNotification();
  const { toast } = useToast();

  const handleAddNotification = () => {
    if (notificationSettings) {
      addNotification("New notification added!");
      toast({
        description: "Notification sent!",
      });
    } else {
      toast({
        description: "Notifications are disabled!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="-m-4 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-black text-center text-white">
      <h1 className="mb-6 text-3xl font-semibold">Hola!</h1>
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-ping rounded-full bg-purple-600"></div>
        <div className="absolute inset-0 animate-ping rounded-full bg-purple-800"></div>
        <div className="relative z-10 rounded-full bg-purple-500 p-10">
          <svg className="h-16 w-16 text-purple-200" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6v3.586L3.293 13.293a1 1 0 00-.293.707V15a1 1 0 001 1h12a1 1 0 001-1v-1a1 1 0 00-.293-.707L16 11.586V8a6 6 0 00-6-6zm1 13a1 1 0 11-2 0h2z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold">Lorem Ipsum...</h2>
        <p className="text-gray-400">Lorem ipsum dolor sit amet.</p>
      </div>
      <button onClick={handleAddNotification} className="rounded-lg bg-purple-700 px-4 py-2 font-semibold text-white transition duration-200 hover:bg-purple-800">
        Send Notification
      </button>
    </div>
  );
};

export default Notification;

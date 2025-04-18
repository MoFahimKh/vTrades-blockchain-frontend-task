"use client";

import { useEffect, useState } from "react";

import { useNotificationStore } from "@/store/notification.store";

const NotificationBar = () => {
  const { notifications, removeNotification } = useNotificationStore();
  const [visible, setVisible] = useState(true);
  const currentNotification = notifications[0];

  useEffect(() => {
    setVisible(!!currentNotification);
  }, [currentNotification]);

  if (!visible || !currentNotification) return null;

  const { id, text, type } = currentNotification;

  const backgroundColor = type === "error" ? "bg-red-500" : "bg-[#0810f6]";
  const textColor = "text-white";

  return (
    <div
      className={`w-full z-50 fixed top-0 left-0 ${backgroundColor} py-[2px] px-4 h-[20px]`}
    >
      <div className="flex justify-between items-center">
        <p
          className={`text-sm sm:text-xs font-light ${textColor} align-center`}
        >
          {text}
        </p>
        <button
          onClick={() => {
            removeNotification(id);
            setVisible(false);
          }}
          className="hover:text-white transition text-white font-bold text-[12px]"
          aria-label="Close Notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default NotificationBar;

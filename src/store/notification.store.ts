import { create } from "zustand";

import { NotificationMessage } from "@/types/notification";

const AUTOCLOSE_DURATION = 3000;

interface NotificationStore {
  notifications: NotificationMessage[];
  addNotification: (notification: Omit<NotificationMessage, "id">) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  addNotification: (notification) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification = { ...notification, id };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    set((state) => ({
      notifications: [newNotification]
    }));

    setTimeout(() => {
      get().removeNotification(id);
    }, AUTOCLOSE_DURATION);
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id)
    }));
  },
  clearNotifications: () => {
    set({ notifications: [] });
  }
}));

export type NotificationType = "success" | "error" | "warning";

export type NotificationMessage = {
  id: string;
  text: string;
  type: NotificationType;
};

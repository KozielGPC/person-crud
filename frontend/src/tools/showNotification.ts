import { NotificationInstance } from "antd/es/notification/interface";

export type NotificationType = "success" | "error";

export const openNotificationWithIcon = (
	api: NotificationInstance,
	type: NotificationType,
	message?: string,
	description?: string
) => {
	api[type]({
		message: message,
		description: description,
	});
};

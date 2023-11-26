import { openNotificationWithIcon } from "./showNotification";

export const errorHandler = (error: any, notificationApi: any) => {
	const status = error?.response?.status;

	switch (status) {
		case 401:
			openNotificationWithIcon(
				notificationApi,
				"error",
				"Unauthorized exception",
				"Unauthorized exception"
			);
			break;
		case 400:
			openNotificationWithIcon(
				notificationApi,
				"error",
				"Some of the fields are incorrect",
				error?.response?.data?.message ?? "Check your input and try again"
			);
			break;
		case 404:
			openNotificationWithIcon(
				notificationApi,
				"error",
				"Not found error",
				error?.response?.data?.message ?? "The resource was not found"
			);
			break;
		default:
			openNotificationWithIcon(
				notificationApi,
				"error",
				"Unexpected exception",
				"Unexpected exception"
			);
			break;
	}
};

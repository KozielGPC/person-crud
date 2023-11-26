import { openNotificationWithIcon } from "./showNotification";

export const errorHandler = (error: any, notificationApi: any) => {
	console.log(error);

	if (error.response.status == 401) {
		openNotificationWithIcon(
			notificationApi,
			"error",
			"Unauthorized exception",
			"Unauthorized exception"
		);
	} else {
		openNotificationWithIcon(
			notificationApi,
			"error",
			"Unexpected exception",
			"Unexpected exception"
		);
	}
};

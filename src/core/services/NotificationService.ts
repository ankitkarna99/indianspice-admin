import { notification } from "antd";
import AppConstants from "../../common/constants/AppConstants";

export default abstract class NotificationService {
  static showNotification(
    type: "success" | "error" | "info" | "warning",
    message: string
  ) {
    switch (type) {
      case "success":
        notification.success({
          message: AppConstants.APP_NAME,
          description: message,
        });
        break;
      case "error":
        notification.error({
          message: AppConstants.APP_NAME,
          description: message,
        });
        break;

      case "warning":
        notification.warning({
          message: AppConstants.APP_NAME,
          description: message,
        });
        break;

      case "info":
        notification.info({
          message: AppConstants.APP_NAME,
          description: message,
        });
    }
  }
}

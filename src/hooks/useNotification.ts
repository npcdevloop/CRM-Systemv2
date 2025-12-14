import { notification } from "antd";
import type { NotificationType } from "../types/todo";

const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (
    type: NotificationType,
    error: unknown,
    pauseOnHover: boolean
  ) => {
    api[type]({
      message: "Уведомление!",
      description: `${error}`,
      showProgress: true,
      pauseOnHover,
    });
  };
  return { contextHolder, openNotificationWithIcon };
};

export default useNotification;

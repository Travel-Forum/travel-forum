import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { useNotifications } from "../../hooks/useNotifications";
import { usePostModal } from "../../hooks/usePostModal";

export const useNotificationsPage = () => {
  const { user } = useAuth();
  const { isBlocked } = useProfile();
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } =
    useNotifications();
  const { openPost, modalProps } = usePostModal({ userId: user?.id });

  // Opening a notification marks it as read and shows its post.
  const openNotification = (notification) => {
    if (!notification.is_read) markAsRead(notification.id);
    openPost(notification.post_id);
  };

  return {
    notifications,
    unreadCount,
    loading,
    isBlocked,
    markAllAsRead,
    openNotification,
    modalProps,
  };
};

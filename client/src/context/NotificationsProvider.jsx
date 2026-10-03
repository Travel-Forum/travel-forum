import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  subscribeToNotifications,
} from "../services/notificationsService";
import { showError } from "../utils/toast";
import { NotificationsContext } from "./NotificationsContext";

const NotificationsProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id;

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((previous) => previous + 1);

  useEffect(() => {
    if (!userId) return;

    let ignore = false;

    getNotifications(userId).then(({ data, error }) => {
      if (ignore) return;

      if (error) {
        console.error("Failed to load notifications:", error);
      } else {
        setNotifications(data);
      }

      setLoading(false);
    });

    return () => {
      ignore = true;
    };
  }, [userId, refreshKey]);

  useEffect(() => {
    if (!userId) return;

    return subscribeToNotifications(userId, refresh);
  }, [userId]);

  const visibleNotifications = userId ? notifications : [];
  const unreadCount = visibleNotifications.filter((item) => !item.is_read).length;

  const markAsRead = async (notificationId) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === notificationId ? { ...item, is_read: true } : item,
      ),
    );

    const { error } = await markNotificationAsRead(notificationId);
    if (error) refresh();
  };

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, is_read: true })));

    const { error } = await markAllNotificationsAsRead(userId);
    if (error) {
      showError("Could not mark notifications as read", error);
      refresh();
    }
  };

  const value = {
    notifications: visibleNotifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;
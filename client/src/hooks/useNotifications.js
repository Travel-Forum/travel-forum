import { useContext } from "react";
import { NotificationsContext } from "../context/NotificationsContext";

/**
 * Reads the user's notifications from NotificationsProvider, which receives
 * new ones in real time.
 * @returns {{ notifications: object[], unreadCount: number, loading: boolean, markAsRead: (id: string) => Promise<void>, markAllAsRead: () => Promise<void> }}
 */
export const useNotifications = () => useContext(NotificationsContext);

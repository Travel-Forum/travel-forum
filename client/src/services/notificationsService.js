import { supabase } from "../config/supabaseClient";
import { failWith } from "../utils/errors";
import { AUTHOR_FIELDS } from "./postsService";

const NOTIFICATIONS_LIMIT = 50;

/**
 * Loads the user's latest notifications, newest first, with who triggered
 * each one and the post it is about.
 * @param {string} userId
 * @returns {Promise<{ data?: object[], error?: Error }>}
 */
export const getNotifications = async (userId) => {
  const { data, error } = await supabase
    .from("notifications")
    .select(
      `
      id,
      type,
      post_id,
      comment_id,
      is_read,
      created_at,
      actor:public_profiles!actor_id (${AUTHOR_FIELDS}),
      post:posts (id, title)
    `,
    )
    .eq("recipient_id", userId)
    .order("created_at", { ascending: false })
    .limit(NOTIFICATIONS_LIMIT);

  if (error) {
    return failWith("Get notifications error", error);
  }
  return { data };
};

/**
 * Marks one notification as read.
 * @param {string} notificationId
 * @returns {Promise<{ error?: Error }>}
 */
export const markNotificationAsRead = async (notificationId) => {
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notificationId);

  if (error) {
    return failWith("Mark notification as read error", error);
  }
  return {};
};

/**
 * Marks all of the user's unread notifications as read.
 * @param {string} userId
 * @returns {Promise<{ error?: Error }>}
 */
export const markAllNotificationsAsRead = async (userId) => {
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("recipient_id", userId)
    .eq("is_read", false);

  if (error) {
    return failWith("Mark all notifications as read error", error);
  }
  return {};
};

/**
 * Listens in real time for new notifications sent to the user.
 * @param {string} userId
 * @param {(payload: { new: object }) => void} onNewNotification
 * @returns {() => void} Stops listening; call it in the effect cleanup.
 */
export const subscribeToNotifications = (userId, onNewNotification) => {
  const channel = supabase
    .channel(`notifications:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `recipient_id=eq.${userId}`,
      },
      onNewNotification,
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
};

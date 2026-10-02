import { supabase } from "../config/supabaseClient";
import { toFriendlyError } from "../utils/errors";
import { AUTHOR_FIELDS } from "./postsService";

const NOTIFICATIONS_LIMIT = 50;

export const getNotifications = async (userId) => {
  const { data, error } = await supabase
    .from("notifications")
    .select(`
      id,
      type,
      post_id,
      comment_id,
      is_read,
      created_at,
      actor:profiles!actor_id (${AUTHOR_FIELDS}),
      post:posts (id, title)
    `)
    .eq("recipient_id", userId)
    .order("created_at", { ascending: false })
    .limit(NOTIFICATIONS_LIMIT);

  if (error) {
    console.error("Get notifications error:", error.message);
    return { error: toFriendlyError(error) };
  }
  return { data };
};

export const markNotificationAsRead = async (notificationId) => {
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notificationId);

  if (error) {
    console.error("Mark notification as read error:", error.message);
    return { error: toFriendlyError(error) };
  }
  return {};
};

export const markAllNotificationsAsRead = async (userId) => {
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("recipient_id", userId)
    .eq("is_read", false);

  if (error) {
    console.error("Mark all notifications as read error:", error.message);
    return { error: toFriendlyError(error) };
  }
  return {};
};
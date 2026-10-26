import { supabase } from "../config/supabaseClient";
import { failWith } from "../utils/errors";
import { AUTHOR_FIELDS } from "./postsService";

const NOTIFICATIONS_LIMIT = 50;

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

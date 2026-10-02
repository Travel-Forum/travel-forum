import { z } from 'zod'

export const COMMENT_MAX_LENGTH = 2000

export const commentSchema = z.object({
  content: z.string()
    .trim()
    .min(1, 'Write something before posting')
    .max(COMMENT_MAX_LENGTH, `Keep your comment shorter — up to ${COMMENT_MAX_LENGTH} characters`),
})
import { z } from 'zod'

export const TITLE_MIN_LENGTH = 16
export const TITLE_MAX_LENGTH = 64
export const CONTENT_MIN_LENGTH = 32
export const CONTENT_MAX_LENGTH = 8192

export const createPostSchema = z.object({


    title: z.string()
    .trim()
    .min(1, 'Title is required')
    .min(TITLE_MIN_LENGTH, `Title must be at least ${TITLE_MIN_LENGTH} symbols`)
    .max(TITLE_MAX_LENGTH, `Title must be at most ${TITLE_MAX_LENGTH} symbols`),


    content: z.string()
     .trim()
     .min(1, 'Content is required')
     .min(CONTENT_MIN_LENGTH, `Content must be at least ${CONTENT_MIN_LENGTH} symbols`)
     .max(CONTENT_MAX_LENGTH, `Content must be at most ${CONTENT_MAX_LENGTH} symbols`),
})
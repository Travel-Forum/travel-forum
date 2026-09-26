import { z } from 'zod'

export const TITLE_MIN_LENGTH = 16
export const TITLE_MAX_LENGTH = 64
export const CONTENT_MIN_LENGTH = 32
export const CONTENT_MAX_LENGTH = 8192

export const createPostSchema = z.object({
    visibility: z.enum(['public', 'private'], {
        error: 'Choose who can see this post',
    }),

    title: z.string()
    .trim()
    .min(1, 'Give your post a title')
    .min(TITLE_MIN_LENGTH, `Make the title a bit longer — at least ${TITLE_MIN_LENGTH} characters`)
    .max(TITLE_MAX_LENGTH, `Keep the title short — up to ${TITLE_MAX_LENGTH} characters`),


    content: z.string()
     .trim()
     .min(1, 'Share something in your post')
     .min(CONTENT_MIN_LENGTH, `Tell us a bit more — at least ${CONTENT_MIN_LENGTH} characters`)
     .max(CONTENT_MAX_LENGTH, `Your post is too long — up to ${CONTENT_MAX_LENGTH} characters`),

    media: z.array(z.instanceof(File)),
})

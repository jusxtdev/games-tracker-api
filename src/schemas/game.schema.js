import { z } from 'zod'

export const gameSchema = {
    createGameSchema: z.object({
        title: z.string().min(3),
        genre: z.string().optional(),
        platform: z.string().optional(),
        releaseYear: z.number().int().optional(),
        coverURL: z.string().optional(),
        status: z.string()
                 .transform(val => val.toUpperCase())
                 .pipe(z.enum(["PLAYING", "COMPLETED", "DROPPED", "WANT", "ONHOLD"]))
                 .optional()
    }),

    updateGameSchema: z.object({
        title: z.string().optional(),
        genre: z.string().optional(),
        platform: z.string().optional(),
        releaseYear: z.number().int().optional(),
        coverURL: z.string().optional(),
        status: z.string()
                 .transform(val => val.toUpperCase())
                 .pipe(z.enum(["PLAYING", "COMPLETED", "DROPPED", "WANT", "ONHOLD"]))
                 .optional()
    })
}
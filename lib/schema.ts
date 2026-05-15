import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is too short').max(80),
  email: z.string().email('Invalid email'),
  projectType: z.enum(['web', 'ai', 'bot', 'other', 'keyst']),
  budget: z.enum(['<5k', '5-20k', '20k+', 'tbd']),
  message: z.string().min(10, 'Message is too short').max(4000),
});

export type ContactInput = z.infer<typeof contactSchema>;

import { z } from 'zod';

export const signUpSchema = z.object({
    username: z.string(),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6),
    confirm: z.string().min(6)
}).required().refine((data) => data.password === data.confirm, {
message: "passwords does not match"
});
  
export const signInSchema = z.object({
    email: z.string().email({message: 'Invalid email format'}),
    password: z.string().min(6,{message: "password is not correct"}),
  });
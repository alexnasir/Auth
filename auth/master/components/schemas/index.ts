import * as z from "zod";

export const LoginSchema = z.object ({
    email: z.string().email("email address required"),
    password: z.string().min(1, "Passsword is required")
})
"use server"; 

import {z} from "zod";
import { LoginSchema } from "@/components/schemas";

export const Login = async (values: z.infer<typeof
     LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

     if (!validatedFields.success) {
        return { error: "Invalid inputs! "};
    }
    return { sucess: "Email sent"}
}  
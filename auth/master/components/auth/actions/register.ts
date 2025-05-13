"use server"; 

import {z} from "zod";
import { RegisterSchema} from "@/components/schemas";
import bcrypt from "bcrypt";
import {db} from "@/lib/db";

export const register = async (values: z.infer<typeof
     RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

     if (!validatedFields.success) {
        return { error: "Invalid inputs! "};
    }

    const {email, password} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const exitingUser = await db.user.findUnique({
        where : {
            email,
        }
    });
    if (exitingUser) {
        return {error : "Email already exists!"}
    }
    await db.user.create ({
        data: {
            email,
            name,
            password: hashedPassword,
        }
    })
     
    return { sucess: "User Created sucessfully"}
}  
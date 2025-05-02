"use server"; 


interface LoginValues {
    username: string;
    password: string;
}

export const Login =async (values: LoginValues) => {
    console.log(values);
}
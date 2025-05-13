"use client";

import * as z from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../schemas";
import { useState, useTransition } from "react";

import { CardWrapper } from "./cardwrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Login } from "./actions/login";
import { FormSuccess } from "../ui/form-success";
import { FormError } from "../form-error";
// import { error } from "console";

export const LoginForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSucess] = useState<string | undefined>("");


  const [isPending, startTransition] = useTransition();
  const form: UseFormReturn<z.infer<typeof LoginSchema>> = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {

    setError("");
    setSucess("");
    startTransition(() => {
    Login({ ...values }) // changing the line to consume api
    .then((data: { error?: string; success?: string }) => {
      setError(data.error);
      setSucess(data.success);
    });
  });
  };

  return (
    <div className="flex flex-col gap-2">
      <CardWrapper
        headerlabel="Welcome Back"
        backButttonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} disabled={isPending}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} disabled={isPending}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error || ""}/>
            <FormSuccess  message={success || ""}/>
            <Button type="submit" className="w-full" disabled={isPending}>
              Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

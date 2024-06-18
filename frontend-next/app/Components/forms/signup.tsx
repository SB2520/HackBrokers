"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const FormSchema = z
  .object({
    Name: string().min(1, "Required"),
    username: z
      .string()
      .min(1, {
        message: "email is Required",
      })
      .email("Invalid email"),
    password: z
      .string()
      .min(8, { message: "password must contain atleat 8 character" }),
    Confirmpassword: z.string().min(1, "password Confirmation is Required"),
  })
  .refine((data) => data.password === data.Confirmpassword, {
    path: ["Confirmpassword"],
    message: "password do not match",
  });

export default function SignUpComponent() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Name: "",
      username: "",
      password: "",
      Confirmpassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      await axios.post(
        "api/user",
        {
          Name: values.Name,
          username: values.username,
          password: values.password,
        },
        { headers: { "Content-type": "application-json" } },
      );
      toast({
        title: "Hello From Hackrokers",
        description: "Sign Up Successful",
      });
      router.push("/");
    } catch (err) {
      console.log(err);
      toast({
        title: "Oops! Something Went Wrong",
        description: "Error Signing Up",
      });
      router.push("/");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" p-6">
        <div>
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 mt-5 text-white block text-xs font-2xl">Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Sid" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 mt-5 text-white block text-xs font-2xl">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="mail@example.com"
                    {...field}
                  />
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
                <FormLabel className="mb-2 mt-5 text-white block text-xs font-2xl">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 mt-5 text-white block text-xs font-2xl">Re-Enter Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mt-5 w-full text-white" type="submit">
          Sign Up
        </Button>
      </form>
      <div className=" text-white mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>

      <p className="mt-2 text-center text-sm font-semibold text-white">
        If you have an account, please&nbsp;
        <Link className="text-white" href="/signin">
          <b>Sign In</b>
        </Link>
      </p>
    </Form>
  );
}

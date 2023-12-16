"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import {toast} from "react-hot-toast"
import {signIn,useSession} from "next-auth/react"
import {useRouter} from "next/navigation"
// Components
import { Input } from "@/app/components/inputs/Input";
import { Button } from "@/app/components/Button";
import { AuthSocialButton } from "./AuthSocialButton";
//icons
import { BsGithub, BsGoogle } from "react-icons/bs";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();

  const [variant, setvariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{

if(session?.status==="authenticated"){
router.push('/users');
};

  },[session?.status,router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setvariant("REGISTER");
    } else {
      setvariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> =async (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      // axios register
      axios.post("/api/register", data)
      .then(()=>{signIn('credentials',data)})
      .catch(()=>toast.error("Something went wrong!"))
      .finally(()=>setIsLoading(false))

    }
    if (variant === "LOGIN") {
      //nextAuth Signin
     await signIn('credentials',{
        ...data,
        redirect:false
      })
      .then((callback)=>{
        console.log(callback)
        if(callback?.error){
          toast.error('Invalid credentials')
        }

        if(callback?.ok && !callback?.error){
          toast.success('Logged in!')
          router.push('/users')
        }
      })
      .finally(()=>setIsLoading(false))


    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    //next auth social sign in
    signIn(action, {redirect:false})
    .then((callback)=>{
      if(callback?.error){
        toast.error('Invalid credentials')
      }

      if(callback?.ok && !callback?.error){
        toast.success('Logged in!')
      }
    })
    .finally(()=>{setIsLoading(false)})
  };

  return (
    <div
      className="
   mt-8
   sm:mx-auto
   sm:w-full
   sm:max-w-md
   "
    >
      <div
        className="bg-white
    px-4
    py-8
    shadow
    sm:rounded-lg
    sm:px-10"
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              errors={errors}
              label="Name"
              register={register}
              disable={isLoading}
            />
          )}

          <Input
            id="email"
            errors={errors}
            label="Email address"
            type="email"
            register={register}
            disable={isLoading}
          />

          <Input
            id="password"
            errors={errors}
            label="Password"
            type="password"
            register={register}
            disable={isLoading}
          />
          <div>
            <Button disable={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="absolute
                    inset-0
                    flex
                    item-center
                    "
            >
              <div
                className="w-full
            border-t
            border-gray-300"
              />
            </div>
            <div
              className="relative
            flex justify-center
            text-sm
            "
            >
              <span className="bg-white px-2 -mt-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div
          className="
        flex
        gap-2
        justify-center
        text-sm
        mt-6
        px-2
        text-gray-500"
        >
          {variant === "LOGIN"
            ? "New to Messenger?"
            : "Already have an account?"}
          <div
            onClick={toggleVariant}
            className="
        underline 
        cursor-pointere"
          >
            {variant === "LOGIN" ? "Create an account" : "Login in"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

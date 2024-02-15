"use client";

import React, { FormEvent } from "react";
import {Button, Input, Checkbox, Link, Divider, Chip} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { z } from 'zod';
import { signInSchema } from "@/zodValidation";
import { signIn } from "next-auth/react";


export default function SignInTab() {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
  const [validate, setValidate] = React.useState({ email: '', password: '' })
  const [rememberMe, setRememberMe] = React.useState<boolean>(false)
  const [inValid, setInValid] = React.useState<z.ZodFormattedError<{
    email: string;
    password: string;
}, string>>({_errors: []})
    const handleInputChange = (name:string, value: string) => {
      setValidate((prev) => ({ ...prev, [name]: value }));
      setInValid({_errors: []});
    };
async function onSignIn(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()
        try {
           const isValid = signInSchema.safeParse(validate);
            if (!isValid.success) {
              const inValid = isValid.error.format()
              setInValid(inValid)
              // console.log(inValid)
            } else {
              if (rememberMe) {
                localStorage.setItem('rememberMe', JSON.stringify(isValid.success))
              } else {
                localStorage.removeItem('rememberMe')
              }
              const signInError = await signIn('credentials', {
                email: validate.email,
                password: validate.password,
                redirect: false,
                action: 'signin'
              })
              if (signInError?.ok) {
                setInValid({ _errors: [] });
              } else if (signInError?.error) {
              setInValid({_errors: ["incorrect email or password"]})
              }
            }
        } catch (error) {
console.log(error)
        }
    }
    return (
      <>
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large  px-8 pb-10 pt-6 shadow-small backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
        <form autoSave="yes" autoComplete="on" className="flex flex-col gap-3" onSubmit={(e) => onSignIn(e)}>
            <Input
              autoFocus={false}
               isInvalid={!!inValid.email?._errors.length}
               errorMessage={inValid.email?._errors[0] || ""}
            value={validate.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onClear={() => handleInputChange("email", "")}
            className="text-white"
            autoComplete="email"
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            isClearable
            isRequired
          />
            <Input
            isRequired
            isInvalid={!!inValid.password?._errors.length}
               errorMessage={inValid.password?._errors[0] || ""}
            value={validate.password}
            onChange={(e)=> handleInputChange("password", e.target.value)}
            className="text-white"
            endContent={
            <button type="button" onClick={toggleVisibility}>
              {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-foreground/50"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-foreground/50"
                    icon="solar:eye-bold"
                  />
                )}
            </button>
            }
            label="Password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            />
             {
            inValid._errors ? <Chip variant="light" className="w-full" color="danger">{inValid._errors[0]}</Chip> : null
          }
          <div className="flex items-center justify-between px-1 py-2">
              <Checkbox
                isSelected={rememberMe}
                onChange={(e)=> setRememberMe(e.target.checked)}
              classNames={{
                wrapper: "before:border-foreground/50",
              }}
              name="remember"
              size="sm"
            >
              Remember me
            </Checkbox>
            <Link className="text-foreground/50" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button className="bg-foreground/10 dark:bg-foreground/20" type="submit">
            Log In
          </Button>
        </form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={()=> signIn('google')} className="bg-foreground/10 dark:bg-foreground/20" startContent={<Icon icon="fe:google" width={24} />}>
            Continue with Google
          </Button>
        </div>
      </div>
    </>
  );
}

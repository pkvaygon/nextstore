"use client";

import React, { FormEvent } from "react";
import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { z } from 'zod';
import { useUser } from "@/providers/Context";
import { signInSchema } from "@/zodValidation";

export default function SignInTab() {
    const buttonClasses = "bg-foreground/10 dark:bg-foreground/20";
    const {setUser} = useUser()
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
  const [validate, setValidate] = React.useState({ email: '', password: '' })
  const [inValid, setInValid] = React.useState<z.ZodFormattedError<{
    email: string;
    password: string;
}, string>>({_errors: []})
    const handleInputChange = (name:string, value: string) => {
      setValidate((prev) => ({ ...prev, [name]: value }));
      setInValid({_errors: []});
    };
   
    function onSignIn(e: FormEvent<HTMLFormElement>) {
          e.preventDefault()
        try {
           const isValid = signInSchema.safeParse(validate);
            if (!isValid.success) {
              const inValid = isValid.error.format()
              setInValid(inValid)
              console.log(inValid)
            } else {
              setInValid({_errors: []});
                setUser(true)
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
          <div className="flex items-center justify-between px-1 py-2">
            <Checkbox
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
          <Button className={buttonClasses} type="submit">
            Log In
          </Button>
        </form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button className={buttonClasses} startContent={<Icon icon="fe:google" width={24} />}>
            Continue with Google
          </Button>
        </div>
      </div>
    </>
  );
}

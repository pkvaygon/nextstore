"use client";

import React, { FormEvent } from "react";
import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { z } from 'zod';
import { useUser } from "@/providers/Context";

export default function SignInTab() {
    const buttonClasses = "bg-foreground/10 dark:bg-foreground/20";
    const {setUser} = useUser()
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [validate, setValidate] = React.useState({ email: '', password: '' })
    const handleInputChange = (name:string, value: string) => {
        setValidate((prev) => ({ ...prev, [name]: value }));
    };
    const signInSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      });
    function onSignIn(e: FormEvent<HTMLFormElement>) {
          e.preventDefault()
        try {
            // Валидируем данные с использованием схемы Zod
            signInSchema.parse(validate);
            if (signInSchema) {
                console.log("Sign in successful!");
                setUser(true)
            } else {
            console.log('NOPE')
            }
            // Если данные валидны, выполните здесь логику входа
        } catch (error) {
            // Если данные не соответствуют схеме, обработайте ошибку
            if (error instanceof z.ZodError) {
                console.error("Validation error:", error.errors);
            } else {
                console.error("Unexpected error during validation:", error);
            }
        }
    }
    return (
      <>
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large  px-8 pb-10 pt-6 shadow-small backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
        <form className="flex flex-col gap-3" onSubmit={(e) => onSignIn(e)}>
            <Input
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
          />
            <Input
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

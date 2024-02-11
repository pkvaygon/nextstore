"use client";

import React, { FormEvent } from "react";
import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import { z } from 'zod';
import { useUser } from "@/providers/Context";
export default function SignUpTab() {
  const { setUser } = useUser()
  const buttonClasses = "bg-foreground/10 dark:bg-foreground/20";
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);
  const [validate, setValidate] = React.useState({
    username: '',
    email: '',
    password: '',
    confirm: ''
  })
  const signUpSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirm: z.string().min(6)
  }).required().refine((data) => data.password === data.confirm);
  const handleInputChange = (name:string, value: string) => {
    setValidate((prev) => ({ ...prev, [name]: value }));
}; 
  function onSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("signup form", validate)
    signUpSchema.parse(validate)
    setUser(true)
    if(signUpSchema){
    console.log('SIGNED UP SUCCESS')
    } else {
    console.log('NOOOO', validate)
    }
  }


  return (
    <>
      <div className="flex overflow-auto w-full max-w-sm flex-col gap-2 rounded-large px-6 pb-2 pt-2 shadow-small  dark:bg-default-100/50">
        <form className="flex flex-col gap-2" onSubmit={(e) => onSignUp(e)}>
          <Input
            value={validate.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            onClear={() => handleInputChange("username", "")}
            isRequired
            className="text-white"
            label="Username"
            name="username"
            placeholder="Enter your username"
            type="text"
            variant="bordered"
            autoComplete="username"
            isClearable
          />
          <Input
            value={validate.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onClear={() => handleInputChange("email", "")}
            isRequired
            className="text-white"
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            autoComplete="email"
            isClearable
          />
          <Input
            value={validate.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            isRequired
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
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            autoComplete="new-password"
          />
          <Input
            value={validate.confirm}
            onChange={(e)=> handleInputChange("confirm", e.target.value)}
            isRequired
            autoComplete="new-password"
            className="text-white"
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
                {isConfirmVisible ? (
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
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            type={isConfirmVisible ? "text" : "password"}
            variant="bordered"
          />
          <Checkbox
            isRequired
            classNames={{
              base: "py-4",
              label: "text-foreground/50",
              wrapper: "before:border-foreground/50",
            }}
            size="sm"
          >
            I agree with the&nbsp;
            <Link color="foreground" href="#" size="sm">
              Terms
            </Link>
            &nbsp; and&nbsp;
            <Link color="foreground" href="#" size="sm">
              Privacy Policy
            </Link>
          </Checkbox>
          <Button className={buttonClasses} type="submit">
            Sign Up
          </Button>
        </form>
        <div className="flex items-center gap-2 py-2">
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

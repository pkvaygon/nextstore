"use client";

import React, { FormEvent } from "react";
import {Button, Input, Checkbox, Link, Divider, Chip} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import { ZodFormattedError, z } from "zod";
import { signUpSchema } from "@/zodValidation";
import { signIn } from "next-auth/react";
import { useUser } from "@/providers/Context";
export default function SignUpTab() {
  const buttonClasses = "bg-foreground/10 dark:bg-foreground/20";
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);
  const {setUser} = useUser()
  const [validate, setValidate] = React.useState({
    username: '',
    email: '',
    password: '',
    confirm: ''
  })
  const [inValid, setInValid] = React.useState<z.ZodFormattedError<{
    username: string;
    email: string;
    password: string;
    confirm: string;
}, string>>({_errors: []})
 const [existingUser, setExistingUser] = React.useState<string | null>('')
  const handleInputChange = (name:string, value: string) => {
    setValidate((prev) => ({ ...prev, [name]: value }));
    setInValid({_errors: []});
}; 
async function onSignUp(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  try {
    const isValid = signUpSchema.safeParse(validate);
    if (!isValid.success) {
      const inValid = isValid.error.format()
      setInValid(inValid)
      console.log('inValid',inValid)
    } else {
      setInValid({ _errors: [] });
   const result =  await signIn('credentials', {
        email: validate.email,
        password: validate.password,
        username: validate.username,
       redirect: false,
        action: 'signup'
   })
   if (result?.error) {
    console.log(result.error)
     setExistingUser(result.error)
     setValidate((prev) => ({
      ...prev,
      username: '',
      password: '',
      confirm: ''
    }));
   } else {
   setExistingUser(null)
   }
      
    }
  } catch (error) {
    console.error('catch',error);
  }
}


  return (
    <>
      <div className="flex overflow-auto w-full max-w-sm flex-col gap-2 rounded-large px-6 pb-2 pt-2 shadow-small  dark:bg-default-100/50">
        <form autoSave="yes" autoComplete="on" className="flex flex-col gap-2" onSubmit={(e) => onSignUp(e)}>
          <Input
            autoFocus={false}
             isInvalid={!!inValid.username?._errors.length}
             errorMessage={inValid.username?._errors[0] || ""}
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
            isInvalid={!!inValid.email?._errors.length || !!existingUser}
            errorMessage={(inValid.email?._errors[0] || "") + (existingUser ? ` ${existingUser}` : "")}
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
             isInvalid={!!inValid.password?._errors.length}
             errorMessage={inValid.password?._errors[0] || ""}
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
            placeholder="Enter minimum 6 characters"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            autoComplete="current-password"
          />
          <Input
             isInvalid={!!inValid.confirm?._errors.length}
             errorMessage={inValid.confirm?._errors[0] || ""}
            value={validate.confirm}
            onChange={(e)=> handleInputChange("confirm", e.target.value)}
            isRequired
            autoComplete="current-password"
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
          {
            inValid._errors ? <Chip variant="light" className="w-full" color="danger">{inValid._errors}</Chip> : null
          }
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
          <Button onClick={()=> signIn('google')} className={buttonClasses} startContent={<Icon icon="fe:google" width={24} />}>
            Continue with Google
          </Button>
        </div>
      </div>
      </>
  );
}

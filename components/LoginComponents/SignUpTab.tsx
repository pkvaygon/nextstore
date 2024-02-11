"use client";

import type {InputProps} from "@nextui-org/react";

import React from "react";
import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
import {Icon} from "@iconify/react";

export default function SignUpTab() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  // const inputClasses: InputProps["classNames"] = {
  //   inputWrapper:
  //     "border-transparent bg-default-50/40 dark:bg-default-50/20 group-data-[focus=true]:border-primary data-[hover=true]:border-foreground/20",
  // };

  const buttonClasses = "bg-foreground/10 dark:bg-foreground/20";

  return (
    <>
      <div className="flex w-full max-w-sm flex-col gap-2 rounded-large px-6 pb-2 pt-2 shadow-small  dark:bg-default-100/50">
        <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
          <Input
            isRequired
            className="text-white"
            // classNames={inputClasses}
            label="Username"
            name="username"
            placeholder="Enter your username"
            type="text"
            variant="bordered"
          />
          <Input
            isRequired
            className="text-white"
            // classNames={inputClasses}
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />
          <Input
            isRequired
            className="text-white"
            // classNames={inputClasses}
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
          />
          <Input
            isRequired
            className="text-white"
            // classNames={inputClasses}
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

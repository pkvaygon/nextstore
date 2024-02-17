"use client";

import type {InputProps} from "@nextui-org/react";

import React from "react";
import {Icon} from "@iconify/react";
import {Input} from "@nextui-org/react";

import {cn} from "@/utils";

export type PaymentFormProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: InputProps["variant"];
};

const PaymentForm = React.forwardRef<HTMLDivElement, PaymentFormProps>(
  ({variant = "flat", className, ...props}, ref) => {
    const NumberInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
      <input
        className="w-11 rounded-sm bg-transparent text-small outline-none placeholder:text-default-400"
        min={0}
        minLength={0}
        type="number"
        {...props}
      />
    );

    return (
      <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props}>
        <Input
          label="Email address"
          labelPlacement="outside"
          placeholder="Enter address"
          type="email"
          variant={variant}
        />
        <Input
          endContent={
            <div className="flex max-w-[140px] items-center">
              <NumberInput max={12} maxLength={2} name="card-month" placeholder="MM" />
              <span className="mx-1 text-default-300">/</span>
              <NumberInput max={99} maxLength={2} name="card-year" placeholder="YY" />
              <NumberInput max={999} maxLength={3} name="card-cvc" placeholder="CVC" />
            </div>
          }
          label="Card number"
          labelPlacement="outside"
          minLength={0}
          name="card-number"
          placeholder="Card number"
          startContent={
            <span>
              <Icon className="text-default-400" icon="solar:card-bold" width={20} />
            </span>
          }
          type="number"
          variant={variant}
        />
        <Input
          label="Cardholder name"
          labelPlacement="outside"
          placeholder="Cardholder name"
          variant={variant}
        />
      </div>
    );
  },
);

PaymentForm.displayName = "PaymentForm";

export default PaymentForm;

// Congratulations! Your payment was successful.

// Order Details:
// - Order Number: [Your Order Number]
// - Date: [Current Date and Time]
// - Total Amount: [Total Amount Paid]

// Thank you for choosing our services. Your order is now being processed, and you will receive a confirmation email shortly.

// If you have any questions or need further assistance, feel free to contact our customer support.

// We appreciate your business!


// Payment Failed!

// We're sorry, but it seems that there was an issue processing your payment. Please check the following:

// 1. Verify that the payment details you provided are correct.
// 2. Ensure that your payment method is valid and has sufficient funds.

// If the problem persists, you may want to try another payment method or contact your bank for further assistance.

// If you continue to experience difficulties or have any questions, please reach out to our customer support team. We apologize for any inconvenience this may have caused.

// Thank you for your understanding.

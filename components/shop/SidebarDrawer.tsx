"use client";

import type {ModalProps} from "@nextui-org/react";

import React from "react";
import {Modal, ModalBody, ModalContent} from "@nextui-org/react";

import {cn} from "@/utils";
const SidebarDrawer = React.forwardRef<HTMLDivElement, ModalProps>(
  ({children, className, onOpenChange, isOpen, classNames = {}, ...props}, ref) => (
    <>
      <Modal
        ref={ref}
                {...props}
        classNames={{
          ...classNames,
          wrapper: cn("!items-start !justify-start max-w-full h-full", classNames?.wrapper),
          base: cn("justify-end !m-0 p-0 h-full max-h-full bg-gradient-to-b from-default-100 via-danger-100 to-secondary-100", classNames?.base, className),
          body: cn("p-4 h-auto", classNames?.body),
          closeButton: cn("z-50", classNames?.closeButton),
        }}
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              x: 0,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              x: "-100%",
              transition: {
                duration: 0.2,
                ease: "easeOut",
              },
            },
          },
        }}
        radius="none"
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
      <div
        className={cn(
          "relative hidden h-auto  w-0 max-w-[375px] flex-1 flex-col bg-gradient-to-b from-default-100 via-danger-100 to-secondary-100 p-6 transition-[transform,opacity,margin] duration-250 ease-in-out lg:flex lg:w-72",
        )}
      >
        {children}
      </div>
    </>
  ),
);

SidebarDrawer.displayName = "SidebarDrawer";

export default SidebarDrawer;

"use client";
import React from "react";
import { Tabs, Tab, Input, Link, Button, Modal, ModalContent } from "@nextui-org/react";
import SignInTab from "./SignInTab";
import SignUpTab from "./SignUpTab";
import {Key} from '@react-types/shared';
import { LoginModalProps } from "@/types";


export default function LoginModal({isOpen, onOpenChange, onClose} : LoginModalProps) {
  const [selected, setSelected] = React.useState<Key | null>("login");
  return (
      <div className="flex flex-col w-full">
      <Modal backdrop="blur" placement="center" isOpen={isOpen} onOpenChange={onOpenChange} className="max-w-full  w-auto h-auto">
              <ModalContent className="overflow-hidden">
              {(onClose) => (
            <>
          <Tabs
                fullWidth
                className="bg-foreground/10"
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab className="flex justify-center items-center" key="login" title="Login">
              <SignInTab/>
            </Tab>
            <Tab className="flex  justify-center items-center" key="sign-up" title="Sign up">
              <SignUpTab/>
            </Tab>
          </Tabs>
          </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

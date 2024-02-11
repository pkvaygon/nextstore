"use client";
import React from "react";
import { Tabs, Tab, Input, Link, Button, Modal, ModalContent } from "@nextui-org/react";
import SignInTab from "./SignInTab";
import SignUpTab from "./SignUpTab";

type ThisModalProps = {
    isOpen: boolean,
    onOpen: () => void,
    onOpenChange: ()=> void
}

export default function LoginModal({isOpen, onOpen, onOpenChange} : ThisModalProps) {
  const [selected, setSelected] = React.useState<React.Key>("login");
  return (
      <div className="flex flex-col w-full">
           <Button onPress={onOpen}>Open Modal</Button>
      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange} className="max-w-full max-sm:w-full max-sm:h-screen  w-auto h-auto">
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

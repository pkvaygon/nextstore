"use client";
import {NextUIProvider} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { UserProvider } from "./Context";
export default function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    return (
        <>
            <NextUIProvider navigate={router.push}>
                <UserProvider>
      {children}
                </UserProvider>
    </NextUIProvider>
        </>
        )
}
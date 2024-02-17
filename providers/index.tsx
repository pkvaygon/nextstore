"use client";
import {NextUIProvider} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { UserProvider } from "./Context";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import StoreProvider from "@/storage/StoreProvider";
interface ProvidersProps {
    children: React.ReactNode;
    session: Session | null;
  }
export default function Providers({ children,session }: ProvidersProps) {
    const router = useRouter()
    return (
        <>
            <SessionProvider session={session}>
                <StoreProvider>
                        <NextUIProvider navigate={router.push}>
                            <UserProvider>
                            {children}
                            </UserProvider>
                        </NextUIProvider>
             </StoreProvider>
                
            </SessionProvider>
        </>
        )
}
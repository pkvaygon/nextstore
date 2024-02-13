import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
      user: User;
    }
    interface User{
        id: string;
        provider: string;
        email: string;
        name: string;
        image: string;
        reviews: any[];
        bought: any[];
        nickname: string;
        emailVerified: boolean;
    }
}
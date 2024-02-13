import { authConfig } from '@/authConfig/auth';
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authConfig as NextAuthOptions)

export {handler as GET, handler as POST}
// import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import { authOptions } from "@/app/libs/AuthOptions";
// { AuthOptions }
// import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "@/app/libs/prismadb";

const handler = NextAuth(authOptions);


export {handler as GET, handler as POST}
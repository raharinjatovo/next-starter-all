import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GithubProvider from "next-auth/providers/github";

import {prisma} from "./prisma"
export const {  handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        params: {
          scope: "user:email", // Request the email scope from GitHub
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "github" && account.access_token) {
        // Fetch user's emails from GitHub API
        const emailResponse = await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `token ${account.access_token}`, // Send the access token to authenticate the request
          },
        });

        if (emailResponse.ok) {
          const emails: { email: string; primary: boolean }[] = await emailResponse.json();
          const primaryEmail = emails.find((email) => email.primary)?.email;
          if (primaryEmail) {
            user.email = primaryEmail; // Set the primary email on the user object
          }
        }
      }
      return true; // Continue with sign-in
    },
    async session({ session, token }) {
      if (token?.email) {
        session.user.email = token.email; // Store email in session
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === "github" && profile) {
        token.email = profile.email || token.email; // Store email in JWT token
      }
      return token;
    },
  },
  session: {
    strategy: "jwt", // Use JWT for session management
  },
})
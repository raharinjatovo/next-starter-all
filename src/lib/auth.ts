

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { PrismaClient } from '@prisma/client';
import { DefaultSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook"
import LinkedIn from "next-auth/providers/linkedin"
const prisma = new PrismaClient()

declare module "next-auth" {
  interface Session {
    user: {
     
      username?: string; // Add the username property
    } & DefaultSession["user"]; // Extend the default user properties
  }

  
}
// check if it on localhost


export const {  handlers, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Ensure credentials.email and credentials.password are strings
        const email = typeof credentials.email === 'string' ? credentials.email : '';
        const password = typeof credentials.password === 'string' ? credentials.password : '';

        if (!email || !password) { // Double check after ensuring type
            return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: email }
        });

        if (user && user.password) { // Check if user and user.password exist
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (isValidPassword) {
            return { id: user.id.toString(), email: user.email, name: user.name }; // Return user object that NextAuth expects, ensure id is string
          }
        }
        return null; // Authentication failed
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        params: {
          scope: "user:email", // Request the email scope from GitHub
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Facebook,
    LinkedIn
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        // Check if user exists for any provider
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! }
        });
    
        if (!existingUser) {
          // Create new user if doesn't exist, regardless of provider
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
              // Add provider-specific logic if needed
              ...(account?.provider === 'github' && {
                // Additional GitHub specific fields if needed
              }),
              ...(account?.provider === 'google' && {
                // Additional Google specific fields if needed
              })
            }
          });
        }
    
        // Handle GitHub specific email verification if needed
        if (account?.provider === "github" && account.access_token) {
          const emailResponse = await fetch("https://api.github.com/user/emails", {
            headers: {
              Authorization: `token ${account.access_token}`,
            },
          });
    
          if (emailResponse.ok) {
           console.log(emailResponse.ok)
          }
        }
    
        return true; // Continue with sign-in
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return true; // Still allow sign in even if DB save fails
      }
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === "github" && profile) {
        token.email = profile.email || token.email; // Store email in JWT token
        token.id = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      const username = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${token.id}`, // Send the access token to authenticate the request
        },
      });
      const userNameTxt =await username.json()
     
      
      if (token?.email) {
        session.user.username  = await userNameTxt.login;
        session.user.email = token.email; // Store email in session
        
      }
      return session;
    },
   
  },
  session: {
    strategy: "jwt", // Use JWT for session management
  },
})
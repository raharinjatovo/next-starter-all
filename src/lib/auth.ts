import NextAuth from "next-auth"
import { DefaultSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook"
import LinkedIn from "next-auth/providers/linkedin"

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
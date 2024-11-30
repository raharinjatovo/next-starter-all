'use client';
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app"; // Import the AppProps type from Next.js

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;

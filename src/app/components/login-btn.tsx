import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth"; // Import the Session type

const Component = () => {
  const { data: session } = useSession();
  
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default Component;

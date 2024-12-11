
import { auth } from "@/lib/auth";
import { LoginButton,LogoutButton } from "./AuthButton";
export default async function Home() {
  const session = await auth()
  console.log(session)
  return (
   
      <div>
        <h2>{session?.user
        ? "Auth " +session?.user.email:"not authentificated"}</h2>
        <div>
        {!session?.user
        ? <LoginButton/>: <LogoutButton/>}
        </div>
        <h1>prod separated with env dev and env prod</h1>
      </div>
  );
}

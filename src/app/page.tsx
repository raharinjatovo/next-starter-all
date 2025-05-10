
import { auth } from "@/lib/auth";
import { LoginButton,LogoutButton } from "./AuthButton";



// console.log(await create("helo"))
export default async function Home() {
  const session = await auth()
  // console.log(session)
  return (
    
      <div>
        
        <h2>{session?.user
        ? "Auth " +session?.user.email:"not authentificated"}</h2>
        <div>
        {!session?.user
        ? <LoginButton/>:
        <div>
           <LogoutButton/>
           <h1>your inside</h1>
        </div>
        
        
        }
        </div>
       
      </div>
  );
}

import { LinkButton } from "./buttons/LinkButton"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "./buttons/PrimaryButton";



export const AppBar = () => {
    const router = useRouter();
    return (
      <div className="flex border-b justify-between"> 
        <div className="flex flex-col justify-center text-xl font-extrabold">
            Zapier
        </div>

        <div className="flex">
           <LinkButton onClick={() => {}}>contact sales</LinkButton>
            <div>
                <LinkButton onClick={() => {
                router.push("/login")
                }}>login</LinkButton>
            </div>
            <PrimaryButton onClick={() => {
                router.push("/signup")
            }} >
                Signup
            </PrimaryButton>

        </div>

      </div>
    )
}
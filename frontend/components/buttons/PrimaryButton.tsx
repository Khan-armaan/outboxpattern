import { ReactNode } from "react";


export const PrimaryButton = ({children, onClick, size = "small"}: {children :ReactNode,onClick : () => void , size?: "big" | "small" }) => {
    return (
        <div onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 pt-2" : "px-8 py-10"} cursor-pointer hover:shadow-md bg-amber-700 text-white rounded-full`} >
            {children}
        </div>
    )
}
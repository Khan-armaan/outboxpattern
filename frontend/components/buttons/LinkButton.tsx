import { ReactNode } from "react"

// passing children as the props to the react component and its types 
export const LinkButton = ({children , onClick} : {children : ReactNode, onClick : () => void}) => {
    return (
        <div className="px-2 py-4 cursor-pointer bg-slate-100 text-sm" onClick={onClick}>
            {children}
        </div>
    )
}   
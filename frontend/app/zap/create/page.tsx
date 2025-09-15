import { Appbar } from "@/components/Appbar";
import { LinkButton } from "@/components/buttons/LinkButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ZapCell } from "@/components/ZapCell";
import { useState } from "react";


export default function () {
    const [selectedTrigger, setSelectedTrigger] = useState("");
    const [selectedActions, setSelectedActions] = useState<{
        index : number
        availableActionId : string,
        availableActionName : string
    }[]>([]);
    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);
  
    return (
        <>
        <Appbar />
        <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center" >
            <div className="flex justify-center w-full">
               <ZapCell onClick={() => {
                setSelectedModalIndex(1)
               }} name={selectedTrigger ? selectedTrigger : "Trigger"} index={1}/> 

            </div>
            
            <div className=" w-full pt-2 pb-2">
                {selectedActions.map( (action,index) => {
                    return <ZapCell onClick={() => {
                        setSelectedModalIndex(action.index)
                    }}  name={action ? action.availableActionName : "Action"} index={action.index}/>
                })}
        
            </div>
            <div className="flex justify-center">
                  <div className="">
                  <PrimaryButton onClick={() => {
                setSelectedActions( a => [...a, {
                    index : a.length + 2,
                    availableActionId: "",
                    availableActionName : ""
                }])
            }}>
                <div className="text-2xl">
                    + 
                </div>
            </PrimaryButton>
           
            </div>
            </div>
          
          
            {selectedModalIndex && <Modal index={selectedModalIndex} />}
        </div>

        </>
    )
}
function Modal ({index} : {index: number}){
    return <div>

    </div>
}
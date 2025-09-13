import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"


interface Zaps {
    "id": string,
    "triggerId": string,
    "userId": number,
    "actions": {
        "id": string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "id": string,
            "name": string
            "image": string
        }
    }[],
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": string,
            "name": string,
            "image": string
        }
    }
}

function useZaps (){
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zaps[]>([])

    useEffect (() => {
       const res = axios.get<Zaps[]>(`${BACKEND_URL}/api/v1/zaps`, {
            headers : {
                "Authorization" : localStorage.getItem("token")
            }
        }).then(res => {
            setZaps(res.data)
            setLoading(false)
        })
    })
    return {loading, zaps}
}
 
export default function () {
    return (
        <div>
            
        </div>
    )
}
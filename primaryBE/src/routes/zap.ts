import  { Router } from "express";
import { authMiddleware } from "../middleware"
import  { prisma } from '../db'
import { zapCreateSchema } from "../types";
import { treeifyError, ZodFirstPartyTypeKind } from "zod";

const router = Router();

router.post('/', authMiddleware, async (req, res) => {
    console.log("create a new zap");

    const body = req.body;
    const parsedData = zapCreateSchema.safeParse(body)
    
    if (!parsedData.success) return res.status(411).json({
        message: "Invalid inputs",
        error : parsedData.error
    })
  const result = await prisma.$transaction( async (tx) => {
    const zap = await tx.zap.create({
        data : {
            //@ts-ignore
            userId : req.id,
            triggerId : "",
            actions : {
                create : parsedData.data.actions.map((x, index) => ({
                name : "action",
                    availableActionid : x.availableActionId,
                    sortingOrder : index,
                    // type: {
                    //     connect: {
                    //         id: x.availableActionId
                    //     }
                    // }
                }))
            }
        }
    })
    
    // Create the trigger with the zap's ID
   const trigger = await tx.trigger.create({
        data : {
            AvailabletriggerId : parsedData.data.availableTriggerId,
            zapId : zap.id
        }
    })
    await tx.zap.update({
        where : {
            id : zap.id
        },
        data : {
            triggerId : trigger.id
        }

    })
    
    return zap;
  })
  
  res.json({
    message: "Zap created successfully",
    zapId: result.id
  })


})

router.get('/', authMiddleware, async(req, res) => {
    console.log("zap handlers ")
    //@ts-ignore
    const id = req.id

    const zaps = await prisma.zap.findMany({
        where : {
            userId : id
            

        },
        include : {
             actions : {
                select : {
                    type : true
                }
             },
             trigger : {
                select : {
                    type : true
                }
             }
        }
    
    })
    res.status(201).json({zaps})
})

router.get('/:zapid', authMiddleware, async (req , res) => {
    console.log("creating a new zap"); 

    const zapId  = req.params.zapid;
    const zap = await prisma.zap.findFirst({
        where : {
            id  : zapId,
            //@ts-ignore
            userId : req.id
        },
         include : {
             actions : {
                select : {
                    type : true
                }
             },
             trigger : {
                select : {
                    type : true
                }
             }
        }
    })
    res.status(201).json({zap})

})

export const zapRouter = router;
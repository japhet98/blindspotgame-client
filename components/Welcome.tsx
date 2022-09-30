import Router from "next/router"
import {  MouseEventHandler } from "react"
import { createGame } from "../actions/endpoints"
import { SuccessToast } from "./Toast"

type buttonProps =
{
    name: string,
    action?:MouseEventHandler,
    color?:string,
}
type Welcomeprops=
{
    unCompletedGame:any,
    artistAlbums:any,
}
export const ToggleGameButton =(prop:buttonProps) => {
    const {color} =prop;
    return(
        <button
        onClick={prop.action}
        className={`flex w-6/12 mx-auto gap-y-3.5 w-full items-center justify-center rounded-md border border-transparent bg-${color?color:"indigo"}-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-${color?color:"indigo"}-700`}
      >
     {prop?.name}
      </button>
    )
}
const WelcomComponent = (prop:Welcomeprops)=>{

    
    const redirectToGame = (gameId:string)=>{
        typeof window !== 'undefined'
        ?Router.push(`/game/${gameId}`)
        :""
    }

    const  createNewGame = async()=>{
       
       const game = await createGame(prop?.artistAlbums?.artistId);
        SuccessToast(game?.message)
       return redirectToGame(game.data?._id);
    }
    const continueGame = ()=>{
        return redirectToGame(prop.unCompletedGame?._id);
    }
    return(
        <div>
               <div className="object-center  my-[170px]">
                {prop.unCompletedGame !==null
                ?<ToggleGameButton
                 name="Continue uncompleted game"
                 action={()=>continueGame()}
                 />
                :<ToggleGameButton
                 name="Start a new game"
                 action={()=>createNewGame()}
                 />}
             
              </div>
        </div>
    )
}

export default WelcomComponent;
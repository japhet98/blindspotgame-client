import Router from "next/router"
import {  MouseEventHandler, useEffect, useState } from "react"
import { createGame, preLoadGame } from "../actions/endpoints"
import { SuccessToast } from "./Toast"

type buttonProps =
{
    name: string,
    action?:MouseEventHandler,
    color?:string,
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
const Descriptions = ()=>{
    return (
        <figure className="md:flex md:w-6/12 md:mx-auto mt-3 rounded-xl p-8 md:p-0 dark:bg-slate-800">
  <div className="md:pt-6 pt-2 md:p-8 text-center">
        <b>INSTRUCTIONS</b>
      <ol className="text-lg font-medium  list-decimal">
    <li className="pb-2">  You're supposed to enter the full name of the album that will be shown.</li>
    <li className="pb-2">  You get 5 point on the first attempt.</li>
    <li className="pb-2">  You get 3 point on the second attempt</li>
    <li className="pb-2">  on the third attempt of which you'll get 1 point if you get it right.</li>
    <li className="pb-2"> You get 0 point if you exhaust all attempts without answering the question. </li>
    <li className="pb-2 font-bold"> You can continue unfinished games by clicking on the continue button. </li>
    
      </ol>
  </div>
</figure>
    )
}
const WelcomComponent = ()=>{
    const [state,setState] = useState({
        unCompletedGame:null,
  artistAlbums:null,
  loaded:false
    })

    useEffect(()=>{
        const fetchUncompletedGames = async ()=>{
           return await preLoadGame();
        
        }

        fetchUncompletedGames().then((data:any)=>{
            setState(prevData=>({
                ...prevData,
                unCompletedGame:data.unCompletedGame,
                artistAlbums:data.artistAlbums,
                loaded:true
            }))
        })
    },[])
    
    const redirectToGame = (gameId:string)=>{
        typeof window !== 'undefined'
        ?Router.push(`/game/${gameId}`)
        :""
    }

    const  createNewGame = async()=>{
       
       const game = await createGame({artistId:state?.artistAlbums?.artistId});
        SuccessToast(game?.data?.message)
       return redirectToGame(game?.data.data?._id);
    }
    const continueGame = ()=>{
        return redirectToGame(state.unCompletedGame?._id);
    }
    return(
        <div>
             
               <div className="object-center  md:my-[20px] my-[5px] ">
               
                {state?.loaded?state.unCompletedGame !==null
                ?<ToggleGameButton
                 name="Continue uncompleted game"
                 action={()=>continueGame()}
                 />
                :<ToggleGameButton
                 name="Start a new game"
                 action={()=>createNewGame()}
                 />:null}
             <Descriptions/>
              </div>
        </div>
    )
}

export default WelcomComponent;
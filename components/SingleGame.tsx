import { BoltIcon, ChatBubbleBottomCenterTextIcon, GlobeAltIcon, ScaleIcon } from '@heroicons/react/24/outline'

import {useEffect, useState} from 'react'
import { CreateRound, LoadGameWithQuestions, resetGame } from '../actions/endpoints'
import RegisterModal from './Modal'
import { ErrorToast, SuccessToast, WarningToast } from './Toast'
import { ToggleGameButton } from './Welcome'
import Router from 'next/router'


// type gameProp={
//     game:object
// }

const GameRounds = ({rounds})=>{
return (
    <ul>
    {
    rounds?.map((round:any,index:number)=>(
        <li key={index} className='border border-dashed font-bold pl-3 bg-indigo-500 text-white py-3 outline outline-1 outline-white mx-auto'>
            <div className="">
            <h3>{round?.roundType}</h3>
            <h3>{round.isAnswered?`Was answered in level ${round?.attemptLevel}`:"Wasn't answered"}</h3>
            <h3>Round point is {round.point}</h3>
            </div>
            
            </li>
    ))
}
    </ul>
)
}

const GameQuestionAnswer =({questions,gameId,game})=>{
  const {rounds,attempts}= game;
  const [state,setState] = useState({
    artistName:"",
    questions:[],
    attempt:3,
  });


   const getPoint=(attemptedLevel:number)=>{
    const pointMapper:any ={
        [1]:1,
        [2]:3,
        [3]:5,

    }
    return pointMapper[attemptedLevel];
}

  const handlInput =(e)=>{
    e.preventDefault();
    const {name,value} = e.target;
    setState(prevState=>({
      ...prevState,
      [name]:value
    }))
  }
  const reloadPage =()=>{
    Router.replace(Router.asPath)
  }

const Submit = async(e:any)=>{
  e.preventDefault();
  const data = {
    album:questions?.[0],
    artistName:state.artistName,
    gameId
  }
 setState(prevState=>({
  ...prevState,
  attempt:state.attempt-1
 }))

  try {
    const _response = await CreateRound(data);
   
   

    if(_response?.data?.data !==undefined){
      reloadPage();
      const newQuestions = await LoadGameWithQuestions(gameId)
      setState((prveState)=>({
        ...prveState,
        questions:newQuestions?.artistAlbums,
        attempt:3
      }))
    }
  
    else {
      WarningToast(_response?.data?.message)
    }
  } catch (error) {
    if(error?.response?.data?.message?.includes("validation")){
      WarningToast("Something went wrong. Reloading")
      const newQuestions = await LoadGameWithQuestions(gameId)
      setState((prveState)=>({
        ...prveState,
        questions:newQuestions?.artistAlbums,
        attempt:3
      }))
    }
    else{
      WarningToast(error?.response?.data?.message)
      setState(prevState=>({
        ...prevState,
        attempt:3
       }))
    }
  }

}


    return(
        <>
                <input type="text" placeholder={state.questions?.length>0?state.questions?.[1].collectionName:questions?.[1].collectionName} disabled  className="block text-center md:text-2xl w-full rounded-md border-gray-300 p-7 pl-7 pr-12 outline outline-md outline-indigo-500 " />        
                <h3 className='mt-7 text-center md:text-2xl  decoration-indigo-500'>For <label className='font-bold'>
                {getPoint(state.attempt)}
                 {" "}
                    points</label>, who's the artist of the album name idicated above? <label className='font-bold'>Enter full name</label></h3>
        <div className="grid md:grid-cols-12 md:gap-1">
          <div className="">
          Hint
          <img src={state.questions?.length>0?state.questions?.[1].collectionName:questions?.[1].artworkUrl100}/>
            
          </div>
          <div className="col-span-10">
          <input type="text" placeholder='Enter artist full name here' name="artistName" onChange={handlInput}  className="block mt-5 mb-5 text-center md:text-2xl md:w-8/12 mx-auto rounded-md p-2 border-gray-300 pl-7 pr-12 outline outline-md outline-indigo-500 " />        

          </div>
            
            
        </div>
            
            
            <span className='mt-7'>
            <ToggleGameButton name='Submit' action={Submit}/>
            </span>
        </>
    )
}

export default function SingleGame({gameData,questions}) {
  const redirectToGame = ()=>{
    typeof window !== 'undefined'
    ?Router.push(`/`)
    :""
}

  const ResetGame =async(e)=>{
    e.preventDefault();
    try {
      const _response =await resetGame({gameId:gameData?._id});
      SuccessToast(_response?.data?.message);
      redirectToGame();
      
    } catch (error) {
      ErrorToast(error?.response?.data?.message)
    }
  }
  return (
    <div className="bg-white py-5">
      <RegisterModal _open={gameData?.rounds?.length===5?true:false} gameId={gameData?._id}/>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   
        <div className="">
          <div className="grid md:grid-cols-2">
            <div className="col-start">
            <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
            
            <div  className="relative">
              <dt>
                <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                  <ScaleIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg font-medium leading-6 text-gray-900 ">Game ID</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500 shadow-lg shadow-indigo-500/50 md:w-7/12 w-8/12 font-bold">{gameData.id}</dd>
            </div>
          
        </dl>
            </div>
            <div className="">
            <dl className="space-y-10 md:mt-0 mt-5">
            <ToggleGameButton name='Reset Game' color='red' action={ResetGame}/>

          
        </dl>
            </div>
          </div>
       
          
          <div className="grid md:grid-cols-3 gap-4 mt-[30px] grid-cols-1">
         
            <div className="col-start">
               <GameRounds rounds={gameData?.rounds}/>
            

            </div>
            <div className="col-span-2 ">
                <GameQuestionAnswer questions={questions} gameId={gameData._id}  game={gameData}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

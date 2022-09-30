
import { useState } from 'react';
import {  RegisterAccount } from '../actions/endpoints';
import { ErrorToast, SuccessToast } from './Toast';
import Router from "next/router"
export default function Register({gameId}) {
    const [username,setUsername] = useState("");

const InputHandler = (e)=>{
    e.preventDefault();
    const {value} = e.target;
    setUsername(()=>value);
}

const Submit =async(e)=>{
    e.preventDefault();
    const data ={
        gameId,
        username,
    }
    if(username?.trim() ===""){
        return ErrorToast("Username is required")
    }
    const redirectToScoreBoard = ()=>{
        typeof window !== 'undefined'
        ?Router.push(`/score_board`)
        :""
    }
    try {
        const result = await RegisterAccount(data);
    
        SuccessToast(result?.data?.message);
        return redirectToScoreBoard();
    } catch (error) {
        ErrorToast(error?.response?.data?.message)
    }
}
  return (
    <>
    
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
             Register to save your game
            </h2>
      
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="email"
                  type="text"
                onChange={InputHandler}
                  required
                  className="relative p-6 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="username"
                />
              </div>
             
            </div>

         

            <div>
              <button
                type="button"
                onClick={Submit}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >

                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

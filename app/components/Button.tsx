'use client'
import clsx from "clsx"
import React from 'react'

interface ButtonProps{
    type?:'button'|'submit'|'reset'|undefined;
    fullWidth:boolean;
    children?:React.ReactNode;
    onclick?:()=>void;
    seconday?:boolean;
    danger?:boolean;
    disable?:boolean;
}

export const Button:React.FC<ButtonProps> = ({
    type,
    fullWidth,
    children,
    onclick,
    seconday,
    danger,
    disable,
}) => {
  return (
   <button
   onClick={onclick}
   type={type}
   disabled={disable}
   className={
    clsx(`
    flex
    justify-center
    rounded-md
    px-3
    py-2
    text-sm
    font-semibold
    focus-visible:outline
    focus-visible: outline-2
    focus-visible: outline-offset-2
    `,
    disable && "opacity-50 cursor-default",
    fullWidth && "w-full",
    seconday ? "text-gray-900":"text-white",
    danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
    !seconday && !danger && "bg-sky-500 hover:bg-sky-600 focus-visible:bg-sky-600"
    )
   }
   >
    {children}
   </button>
  )
}

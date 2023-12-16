"use client"

import useConversaton from '@/app/hooks/useConversation'
import MobileItem from './MobileItem'
import useRoutes from '@/app/hooks/useRoutes'
import React from 'react'

export default function MobileFooter() {
    const routes = useRoutes();
    const { isOpen } = useConversaton();
    if(isOpen){
        return null;
    }
  return (
    <div 
    className='fixed
    justify-between
    w-full
    bottom-0
    z-40
    flex
    items-center
    bg-white
    border-t-[1px]
    lg:hidden
    '
    >
      {routes.map((item)=>(
        <MobileItem
        key={item.label}
href={item.href}
label={item.label}
icon={item.icon}
active={item.active}
onClick={item.onClick}
        />
      ))}

    </div>
  )
}

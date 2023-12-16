"use client"
import clsx from "clsx"
import useConversaton from "../hooks/useConversation"
import EmptyState from "../components/EmptyState"


const Home = ()=>{
    const {isOpen} = useConversaton();
    return (
        <div
        className={
        clsx(
            "lg:pl-80 h-full lg:black",
            isOpen?"block":"hidden"
        )}
        >
            <EmptyState/>
        </div>
    )
}

export default Home;
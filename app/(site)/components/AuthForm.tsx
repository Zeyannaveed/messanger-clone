"use client";
import { useState,useCallback } from "react";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {

  
  
  const [variant, setvariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  
 
 const toggleVariant = useCallback(()=>{
if(variant=== 'LOGIN'){
    setvariant('REGISTER')
}else{
    setvariant('LOGIN');
}


  },[variant]);
  

  return <div>AuthForm2</div>;
};

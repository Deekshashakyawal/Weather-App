import {useEffect, useState} from "react";
export const useToggle=(initialVal=true)=>{
    const[state, setState]=useState(initialVal);
    const toggle=()=>{
        setState((prev)=>!prev);
    }
    return [state, toggle];
}
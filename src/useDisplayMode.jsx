
import { useState , useEffect } from "react";

export default function useDisplayMode(display , element){
   
    document.querySelector(`.${element}`).style.display = display;
    
}

import React from 'react'
import { useState } from "react";

export const Game = () => {
    const [ result , setRESULT ] = useState("")
    const [ show , setSHOW ] = useState(false);
    
        
    const rOCK  = () =>{
      const cOMPUTER = Math.random();
    let theCom = Math.floor(cOMPUTER * 5) + 1;
  
        if( theCom === 1 ){
          setRESULT("Tie!!! computer picked ' rock '  ")
          
        } else if(theCom > 1 && theCom <= 4){
          setRESULT("You Lose!!! computer picked ' paper ' ")
        } else{
          setRESULT("You Win!!! computer picked ' scissor ' ")
        }
        
        setSHOW(true)
  
        setTimeout(()=>{
          setSHOW(false)
        }, 2000 );
        
        
      }
    const pAPER  = () =>{
      const cOMPUTER = Math.random();
      let theCom = Math.floor(cOMPUTER * 5) + 1;
        if( theCom > 1 && theCom <= 4){
          setRESULT("You lose!!! computer picked ' scissor '  ")
          
        } else if(theCom === 1){
          setRESULT("Tie!!! computer picked ' paper ' ")
        
        } else{
          setRESULT("You win!!! computer picked ' rock ' ")
        
        }
  
       setSHOW(true)
        
        setTimeout(()=>{
          setSHOW(false)
        }, 2000 );
  
      }
    const sCISSOR  = () =>{
      const cOMPUTER = Math.random();
      let theCom = Math.floor(cOMPUTER * 5) + 1;
        if( theCom > 1 && theCom <= 4 ){
          setRESULT("You lose!!! computer picked ' rock '  ")
          
        }else if(theCom === 1){
          setRESULT("Tie!!! computer picked ' scissor ' ")
        }
        else{
          setRESULT("You win!!! computer picked ' paper ' ")
        
        }
  
       setSHOW(true)
        
        setTimeout(()=>{
          setSHOW(false)
        }, 2000 );
  
      }
    
    
    return (
      <div className="App">
        {/* <All/> */}
        {/* <Transfer/> */}
  
        <button onClick={rOCK} className="bbttnn1"> ROCK </button>
        <button onClick={pAPER} className="bbttnn2"> PAPER </button>
        <button onClick={sCISSOR} className="bbttnn3"> SCISSOR </button>
        { show && <h2 className="theResult">{result}</h2>}
      </div>
    );
}

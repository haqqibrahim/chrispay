import React, { useEffect, useState } from 'react'
import image from "../loginImage.png"
import {useNavigate} from 'react-router-dom';


export const Login = ({user_id,input_password,setinput_password,getuser,setmatricnumber,matricNumber,arr}) => {

    const navigate = useNavigate()
    const [pass , setpass] = useState(false)
    const [confirmpass , setcomfirmpass] = useState(false)
    const [lessthan , setlessthan] = useState(false)
    const [theSpinner , settheSpinner] = useState(false)
    const [theLogin , settheLogin] = useState(true)

    
    
    const p = input_password.length;
    const m = matricNumber.length;
    const anotherhandle = ()=>{    
        
        const matricNumber1 = arr[0]?.user_id
        const password = arr[0]?.password
        console.log(password, "heyyy")
        console.log(matricNumber1, "heyyy")
        console.log(input_password, "yoo")
        console.log(matricNumber, "y00")

        if(password === input_password && matricNumber1 === matricNumber){
            settheSpinner(false)
            setpass(true);
        }else{
            settheSpinner(false)
            settheLogin(true)
            setcomfirmpass(true)
            setTimeout(()=>{
                setcomfirmpass(false);
            },4000)
            
       } 
       setmatricnumber("")
       setinput_password(""); 
      
    }



    const handlesubmit = (e)=>{
        e.preventDefault();
           
        if(p < 1 && m < 1){
            setlessthan(true);
            setTimeout(()=>{
             setlessthan(false)
            },3000)
         }
        else{
            settheLogin(false)
            settheSpinner(true)
            getuser();
            setTimeout(()=>{
                anotherhandle();
            }, 3000)
        }

  
    }
    
    useEffect(()=>{
        if(pass){
               
               navigate("/homepage")
            }
    },[pass])
    

    
  return (
    <div class="cmu-body">
        <div className='image-drex'>
            <h2>C H R I S P A Y</h2>
            <img src={image} alt=""  className='loginimage'/>
        </div>
        {theSpinner && <div class="spinner2">. . . .</div>}
        {theLogin && <div className='loginInput'>
            <input type="text" value={matricNumber} onChange={(e)=>setmatricnumber(e.target.value)} placeholder='Enter Matric Number' className='loginMatric'/>
            <input type="text" value={input_password} onChange={(e)=>setinput_password(e.target.value)} placeholder='Password' className='loginPass'/>
        {confirmpass && <h3 className='incorrect'>matric number or password is not correct</h3>}
        {lessthan && <h3 className='incorrect2'>Input Login deatails</h3>}
            <button onClick={handlesubmit} className='loginbtn'>Login</button>
        </div>}
    </div>
 
 )
}


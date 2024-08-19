import {React, useState,useEffect} from 'react'
import { BrowserRouter as Router, Route, Link , Routes} from 'react-router-dom';

import { Homepage } from './Homepage'
import { AddFunds } from './AddFunds'
import { Transfer } from './Transfer';
import { Cmu } from './Cmu';
import { Airtime } from './Airtime';
import { Login } from './Login';
import { db } from "./firebase";
import {getDoc, doc} from "firebase/firestore";
import { Profile } from './Profile';
import { BankDropdown } from '../Test';
import { Game } from './Game';

export const All = () => {

    const [ matricNumber, setmatricnumber] = useState("")
    const [ input_password, setinput_password] = useState("")
    const [profileDetails , setprofileDetails] = useState({})
    const [thestudent , setthestudent] = useState("");
    const [youuu , setyouu] = useState("");
    const [toconfirm , settoconfirm] = useState(false)

   
    const arr = [];
    const getuser = async () =>{
        const theuser = doc(db, "cmu-users", matricNumber)
        try{
        const data = await getDoc(theuser);
        const {amount,department,level,full_name,firstname,password,user_id} = data.data();
        arr.push({full_name,firstname,user_id,amount,department,level,password});
       
          setprofileDetails({
              department,
              full_name,
              level,
              amount,
              firstname,
              password,
              user_id
          }
          );
        setthestudent(matricNumber)
        settoconfirm(true);
        console.log(arr);
      } catch(err){
        console.error(err)
        
      }
    }



     const reFetch = async ()=>{
      const theuser = doc(db, "cmu-users", thestudent)
        try{
        const data = await getDoc(theuser);
        const {amount,department,level,full_name,firstname,password,user_id} = data.data()
        setprofileDetails({
            full_name,
            department,
            level,
            amount,
            firstname,
            password,
            user_id
        });
        } catch(err){
            console.error(err)
        }
     }


  return (
    <div>
      
    <Router>
      <Routes>
        <Route path="/" element={<Login getuser={getuser} matricNumber={matricNumber} setmatricnumber={setmatricnumber} input_password={input_password} setinput_password={setinput_password} user_id={profileDetails.user_id} password={profileDetails.password} arr={arr}/>} />
        <Route path="/homepage" element={<Homepage toconfirm={toconfirm} reFetch={reFetch}  firstname={profileDetails.firstname} department={profileDetails.department} amount={profileDetails.amount} matric={profileDetails.user_id}/>} />
        <Route path="/airtime" element={<Airtime password4payment={profileDetails.password} thestudent={thestudent}/>} />
        <Route path="/transfer" element={<Transfer password4payment={profileDetails.password} accAmount={profileDetails.amount}/>} />
        <Route path="/addfunds" element={<AddFunds thematric={profileDetails.user_id}/>} />
        <Route path="/cmu" element={<Cmu thestudent={thestudent} password4payment={profileDetails.password}/>} />
        <Route path="/profile" element={<Profile profileDetails={profileDetails} thematric={profileDetails.user_id}/>}/>
        <Route path="/test" element={<Game/>}/>
      </Routes>
    </Router>

    </div>
  )
}



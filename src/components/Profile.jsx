import React, { useState } from 'react'
import {TbCurrencyNaira, TbRuler2} from 'react-icons/tb'
import {FiArrowLeft} from 'react-icons/fi'
import {IoIosNotificationsOutline} from 'react-icons/io'
import { Link } from 'react-router-dom'
import { db } from "./firebase"
import {collection, getDocs, getDoc, doc, updateDoc,increment} from "firebase/firestore"

export const Profile = ({profileDetails,thematric}) => {
    const {full_name,department,level,amount,firstname,user_id} = profileDetails;
    const [changePassword, setChangepassword] = useState("")
    const [confirmnewPassword, setConfirmnewpassword] = useState("")
    const [passError, setPasserror] = useState(false)
    const [successfulPass, setSuccessfulPass] = useState(false)

 
    const formatToNaira = (number) => {
        return new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: 'NGN',
          minimumFractionDigits: 2,
        }).format(number);
      };

      const formattedNaira = formatToNaira(amount);

    const toUpdatepassword = async ()=>{
        if(changePassword != confirmnewPassword){
             setPasserror(true);
             setTimeout(()=>{
                setPasserror(false);
              },4000)
        }else{
        const toupdate = doc(db, "cmu-users", thematric);
        const newPass = changePassword;
        await updateDoc(toupdate, {password: newPass})
        }
        setChangepassword("")
        setConfirmnewpassword("")
        setSuccessfulPass(true)
        setTimeout(()=>{
            setSuccessfulPass(false);
          },4000)
    }

  return (
    <div className='profile_body'>
        <div className='T-nav'>
               <Link to="/homepage"><FiArrowLeft className='T-btn'/></Link>
                <h1>C H R I S P A Y</h1>
                <IoIosNotificationsOutline className='T-btn2'/>
        </div>
        <div className='pic_balance'>
            <h4>Balance:  {formattedNaira}</h4>
        </div>
     <div className='all_same'> 
        <div className='same'>
            <h3>Fullname</h3>
            <h4>{full_name}</h4>
        </div>
        <div className='same'>
            <h3>Department</h3>
            <h4>{department}</h4>
        </div>
        <div className='same'>
            <h3>Level</h3>
            <h4>{level}</h4>
        </div>
        <div className='same'>
            <h3>Matric Number</h3>
            <h4>{user_id}</h4>
        </div>
        <div>
            
        </div>
        <Link to="/"><button className='signout'>Sign Out</button></Link>

        <div classname="changePass">
            <br></br>
            <hr></hr>
            <h2>Change Password</h2>
            <input placeholder="New Password" className='passReset' value={changePassword} onChange={(e)=>setChangepassword(e.target.value)}/>
            <input placeholder="Confirm New Password" className='passReset' value={confirmnewPassword} onChange={(e)=>setConfirmnewpassword(e.target.value)}/>
            <button className='passwordBTN' onClick={toUpdatepassword}>Submit</button>
            {passError && <h3 className='passtext'>Password doesn't match</h3>}
            {successfulPass && <h3 className='successPass'>Password Changed</h3>}
        </div>
        </div>    
    </div>
  )
}

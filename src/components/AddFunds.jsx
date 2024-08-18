import React, { useEffect } from 'react'
import { useState } from "react";
import axios from 'axios';
import {FiArrowLeft} from 'react-icons/fi'
import {IoIosNotificationsOutline} from 'react-icons/io'
import { Link } from 'react-router-dom';
import {HiOutlineXMark} from 'react-icons/hi2'
import {GiCheckMark} from 'react-icons/gi'
import {TbCurrencyNaira} from 'react-icons/tb'
import { db } from "./firebase"
import {collection, getDocs, getDoc, doc, updateDoc,increment} from "firebase/firestore"

export const AddFunds = ({thematric}) => {

  const [errorText , seterrorText] = useState(false);
const [incorrectPass , setincorrectPass] = useState(false);
const [incorrectPass2 , setincorrectPass2] = useState(false);
const [passentered , setpassenterd] = useState("")
const [receipt , setreceipt] = useState(false)
const [Navpass , setNavpass] = useState(false)
const [tohide , settohide] = useState(true)
const [theSpinner , settheSpinner] = useState(false)
const [useramount, setUseramount]= useState("")
const usercollection = collection(db, "cmu-users");

const updating = () =>{

      setNavpass(true);
      settohide(false)
  
  
} 

const toPurchase =()=>{
    setNavpass(false);
    settheSpinner(true)
    setpassenterd("");
    setTimeout(()=>{
        settheSpinner(false);
      },7000)
    setreceipt(true);
  
}


const handleUpdate = (e)=>{
  e.preventDefault();
  updating();
}

const cancelSuccess = async ()=>{
  settohide(true);
  setreceipt(false)
  setNavpass(false)
  setUseramount("")
  const toupdate = doc(db, "cmu-users", thematric);
  const amountIncrement = increment(Number(useramount));
  await updateDoc(toupdate, {amount: amountIncrement})
 }
 const cancelToPay = ()=>{
  setUseramount("")
  settohide(true);
  setNavpass(false)
 }







// const [searchTerm, setSearchTerm] = useState('');
//   const [selectedBank, setSelectedBank] = useState('');
//   const [Bank, setBank] = useState('');
//   const [ info , setINFO ] = useState("")


  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  // const filteredBanks = bankOptions.filter((bank) =>
  //   bank.label.toLowerCase().includes(searchTerm.toLowerCase())
  // );


// const [toTrue , settoTrue] = useState(false);
// const [toRecieve , settoRecieve] = useState("");
   
// // }
// let theNum = info.length
// let theNum2 = selectedBank.length













  return (
    <div>
    { tohide && <div className='T-body'>
            <div className='T-nav'>
                     <Link to="/homepage"><FiArrowLeft className='T-btn'/></Link>
                      <h1>C H R I S P A Y</h1>
                      <IoIosNotificationsOutline className='T-btn2'/>
            </div>

     <div className="Rep-width">
        <div className='Rep-Acc'>
              <h2>Add Money</h2>

            <input placeholder=' Amount' className='T-option'  name='description' onChange={(e)=>setUseramount(e.target.value)} value={useramount}/>
       
            <button className='T-btn3' onClick={handleUpdate}>Add</button>
        </div>

      </div>
    </div>}

{ Navpass && <div className='hpass'><div className='toEnterPass2'>
  <button className='cancel2' onClick={cancelToPay}><HiOutlineXMark/></button>
  <h2>Bank Details</h2>
  <h2>8542539341</h2>
  <h2>Wema Bank</h2>
  <h2>Flutterwave</h2>
  <button onClick={toPurchase} className='purchaseBTN2'>Confirm Payment</button>
</div></div> }

{theSpinner && <div class="spinner-container">
<div class="spinner"></div>
</div>}

{ receipt && <div className='hpass'><div className='notication2'>
  <button className='cancel' onClick={cancelSuccess}><HiOutlineXMark/></button>
  <h2><GiCheckMark className='gi'/></h2>
  <h3 className='moneyTransfered'><TbCurrencyNaira/>{useramount}</h3>
  <h3>Successful</h3>
  <h3 className='del'>Check Balance</h3>
</div></div>}

</div>
  )
}


import React, { useEffect, useState } from 'react'
import {FiArrowLeft} from 'react-icons/fi'
import {IoIosNotificationsOutline} from 'react-icons/io'
import {TbCurrencyNaira} from 'react-icons/tb'
import image1 from "../mtn.jpg"
import image2 from "../Airtel.jpg"
import image3 from "../Glo_Limited.png"
import image4 from "../9mobile-Logo.png"
import { validatePhoneNumberAsync } from "nigeria-phone-number-validator";
import { Link } from 'react-router-dom'
import { db } from './firebase'
import { updateDoc , doc, increment} from 'firebase/firestore'
import {GiCheckMark} from 'react-icons/gi'
import {HiOutlineXMark} from 'react-icons/hi2'

export const Airtime = ({password4payment,thestudent}) => {
   
    const [ thenumber , setThenumber ] = useState("")
    const [ theresult , setTheresult ] = useState('')
    const [airtimeAmount , setairtimeAmount] = useState("");
    const [passentered , setpassenterd] = useState("")
    const [receipt , setreceipt] = useState(false)
const [Navpass , setNavpass] = useState(false)
const [tohide , settohide] = useState(true)
   const [emptyfill , setemptyfill] = useState(false);
   const [incorrectPass , setincorrectPass] = useState(false);

    const thenum = thenumber.length

    const tofetchNumbers = async () =>{
        try {
            const result = await validatePhoneNumberAsync(thenumber);
            setTheresult(result.telco);
            console.log(result);
            // { telco: "MTN", isValid: true }
        } catch (error) {
            setTheresult(error.errors[0]);
        }
    }

    useEffect(()=>{
        if(thenum === 11){
            tofetchNumbers()
        }
    },[thenum])

    const toUpdate = async ()=>{
        const info = doc(db,"cmu-users",thestudent)
        const toincrement = increment(Number(-airtimeAmount))
       await updateDoc(info,{amount: toincrement})
    }

    const next = ()=>{
        const p = thenumber.length;
        const n = airtimeAmount.length
        if(p < 1 && n < 1){
           setemptyfill(true);
           setTimeout(()=>{
            setemptyfill(false)
           },3000)
        }else{
            settohide(false);
            setNavpass(true)
        }
    }

    const cancelToPay = ()=>{
        
        setNavpass(false);
        settohide(true)
    }

    const toPurchase = () =>{
        if(password4payment !== passentered){
            setincorrectPass(true);
            setTimeout(()=>{
                setincorrectPass(false)
            },3000)
        }else{
            toUpdate();
            setNavpass(false);
            setreceipt(true)
        }
    }

    const cancelSuccess=()=>{
        setreceipt(false);
        settohide(true)
        setThenumber("");
        setairtimeAmount("");
        setpassenterd("");
        setTheresult("");
    }

  return (
   <div>
    { tohide && <div className='airtimeBODY'>
        
        <div className='T-nav'>
        <Link to="/homepage"><FiArrowLeft className='T-btn'/></Link>
             <h1>D R E X</h1>
             <IoIosNotificationsOutline className='T-btn2'/>
         </div>
        
        <h2 className='mobileT'>Mobile Top-up</h2>

        <div className='networks'>
            <div className='mtn-con'>
                <img src={image1} alt="" className='mtn' />
            </div>
            <div className='airtel-con'>
                <img src={image2} alt="" className='airtel'/>
            </div>
            <div className='glo-con'>
                <img src={image3} alt="" className='glo'/>
            </div>
            <div className='mobile-con'>
                <img src={image4} alt="" className='mobile'/>
            </div>
        </div>

        <input placeholder=' Mobile Number' className='mobile-number' value={thenumber} onChange={(e)=> setThenumber(e.target.value)}/>

            <h3 className='select-amount2'>Network: <span className='thenet'>{theresult}</span></h3>
            <h3 className='select-amount'>Select amount</h3>
            <div className='amount-btns'>
                <button onClick={()=>setairtimeAmount("100")}><TbCurrencyNaira/> 100.00</button>
                <button onClick={()=>setairtimeAmount("500")}><TbCurrencyNaira/> 500.00</button>
                <button onClick={()=>setairtimeAmount("1000")}><TbCurrencyNaira/> 1000.00</button>
                <button onClick={()=>setairtimeAmount("2000")}><TbCurrencyNaira/> 2000.00</button>
                <button onClick={()=>setairtimeAmount("4000")}><TbCurrencyNaira/> 4000.00</button>
                <button onClick={()=>setairtimeAmount("6000")}><TbCurrencyNaira/> 6000.00</button>
                <button onClick={()=>setairtimeAmount("8000")}><TbCurrencyNaira/> 8000.00</button>
                <button onClick={()=>setairtimeAmount("10000")}><TbCurrencyNaira/> 10000.00</button>
            </div>

            <input placeholder=' Amount' className='amount' value={airtimeAmount} onChange={(e)=>setairtimeAmount(e.target.value)}/>
            {emptyfill && <h3 className='errormessage1'>Fill the inputs</h3>}
            <button className='purchase' onClick={next}>Purchase</button>
      



     </div>}

            { Navpass && <div className='toEnterPass'>
        <button className='cancel2' onClick={cancelToPay}><HiOutlineXMark/></button>
        <h2>Enter Password</h2>
        <input placeholder=' Enter password' className='T-option' value={passentered} onChange={(e)=>setpassenterd(e.target.value)}/>
        <button onClick={toPurchase} className='purchaseBTN'>Purchase</button>
        {incorrectPass && <h3 className='errormessage'>Incorrect Password</h3>}
    </div> }

    { receipt && <div className='notication'>
        <button className='cancel' onClick={cancelSuccess}><HiOutlineXMark/></button>
        <h2><GiCheckMark className='gi'/></h2>
        <h3 className='moneyTransfered'><TbCurrencyNaira/>{airtimeAmount}</h3>
        <h3>Success</h3>
        <h3 className='del'>To: {thenumber}</h3>
        <h3 className='del'>{theresult}</h3>
    </div>}

    </div>  
  )
}

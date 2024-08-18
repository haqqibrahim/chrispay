import React, { useEffect, useState } from 'react'
import {FiArrowLeft} from 'react-icons/fi'
import {GiCheckMark} from 'react-icons/gi'
import {HiOutlineXMark} from 'react-icons/hi2'
import {TbCurrencyNaira} from 'react-icons/tb'
import {IoIosNotificationsOutline} from 'react-icons/io'
import { db } from "./firebase"
import {collection, getDocs, getDoc, doc, updateDoc,increment} from "firebase/firestore"
import { Link } from 'react-router-dom'

export const Cmu = ({thestudent,password4payment}) => {

 const [ useramount , setUseramount ] = useState("")
 const [ userdescription , setuserdescription ] = useState("")
 const [showdata , setshowdata] = useState("")
const usercollection = collection(db, "cmu-users");
const [errorText , seterrorText] = useState(false);
const [incorrectPass , setincorrectPass] = useState(false);
const [passentered , setpassenterd] = useState("")
const [receipt , setreceipt] = useState(false)
const [Navpass , setNavpass] = useState(false)
const [tohide , settohide] = useState(true)
const [theSpinner , settheSpinner] = useState(false)


//To get all users 
 const getusers = async () =>{
    try{
    const data = await getDocs(usercollection);
    const filterdata = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
   
    console.log(filterdata)
    } catch(err){
        console.error(err)
    }
 }

 //To get a single user
 const [thematric , setthematric ] = useState("")
 const matric = thematric.length

 const handleChange = (e)=>{
    e.preventDefault();
    setthematric(e.target.value)
}
 const handleChange1 = (e)=>{
    e.preventDefault();
    setUseramount(e.target.value)
}
 const handleChange2 = (e)=>{
    e.preventDefault();
    setuserdescription(e.target.value)
}

 const getuser = async () =>{
    const theuser = doc(db, "cmu-users", thematric)
    try{
    const data = await getDoc(theuser);
    const {full_name} = data.data()
    setshowdata(full_name)
    } catch(err){
        console.error(err)
    }
 }

 //To update a user
  const debituser = async () =>{
    const toupdate = doc(db, "cmu-users", thestudent);
    const amountIncrement = increment(Number(-useramount));
    await updateDoc(toupdate, {amount: amountIncrement})
  }
 

const updating = () =>{
    const num = useramount
    const the = num.length
    const matric = thematric.length
 
    if(matric < 1){
        seterrorText(true)
        setTimeout(()=>{
            seterrorText(false)
        }, 3000)
    }else if(the < 1){
         seterrorText(true)
        setTimeout(()=>{
            seterrorText(false)
        }, 3000)
    }
    else{
        setNavpass(true);
        settohide(false)
    }
    
}   

 const toPurchase = async ()=>{
    if(password4payment !== passentered){
        setincorrectPass(true);
        setTimeout(()=>{
          setincorrectPass(false)
      }, 3000)
  }
  else{
      setNavpass(false);
      settheSpinner(true);
      const toupdate = doc(db, "cmu-users", thematric);
      const amountIncrement = increment(Number(useramount));
      await updateDoc(toupdate, {amount: amountIncrement})
      setmoney(useramount);
      setStudent_name(showdata);
      setmatri_num(thematric);
      setpassenterd("");
      settheSpinner(false)
      setreceipt(true);
      setUseramount("");
      setthematric("");
      setshowdata("");
      setuserdescription("");
    }
    debituser();
 }


const handleUpdate = (e)=>{
    e.preventDefault();
    updating();
}


useEffect(()=>{
    if(matric === 13){
        getuser()
    }
}, [matric])

   const [money , setmoney] = useState("");
   const [Student_name , setStudent_name] = useState("");
   const [matri_num , setmatri_num] = useState("")

   const cancelSuccess = ()=>{
    settohide(true);
    setreceipt(false)
   }
   const cancelToPay = ()=>{
    settohide(true);
    setNavpass(false)
   }

  return (

    
    <div className='T-body'>
         {tohide &&  <div>
         <div className='T-nav'>
         <Link to="/homepage"><FiArrowLeft className='T-btn'/></Link>
             <h1>C H R I S P A Y</h1>
             <IoIosNotificationsOutline className='T-btn2'/>
         </div>

    <div className="Rep-width">
                <div className='Rep-Acc'>
                   <h2>Recipient Account</h2>
                    <form> 
                       <input name="acc_num"  placeholder=" Matric number " value={thematric} className='T-option'onChange={handleChange} />
     
                    </form>
                  <div>
                                  <h3 className='userName'>{showdata}</h3>
                             </div>

                    <input placeholder=' Enter amount' value={useramount} className='T-option' onChange={handleChange1} />
                    <input placeholder=' Description' value={userdescription} className='T-option4' onChange={handleChange2} />
        
       
                    <button className='T-btn4' onClick={handleUpdate}>Next</button>
                    {errorText && <h3 className='errormessage'>Fill in the details</h3>}
        
                </div>
    </div>
    </div>
    }

    { Navpass && <div className='hpass'><div className='toEnterPass'>
        <button className='cancel2' onClick={cancelToPay}><HiOutlineXMark/></button>
        <h2>Enter Password</h2>
        <input placeholder=' Enter password' className='T-option' value={passentered} onChange={(e)=>setpassenterd(e.target.value)}/>
        <button onClick={toPurchase} className='purchaseBTN'>Pay</button>
        {incorrectPass && <h3 className='errormessage'>Incorrect Password</h3>}
    </div></div> }

    { receipt && <div className='hpass'><div className='notication'>
        <button className='cancel' onClick={cancelSuccess}><HiOutlineXMark/></button>
        <h2><GiCheckMark className='gi'/></h2>
        <h3 className='moneyTransfered'><TbCurrencyNaira/>{money}</h3>
        <h3>Successful</h3>
        <h3 className='del'>To: {Student_name}</h3>
        <h3 className='del'>{matri_num}</h3>
    </div></div>}
    {theSpinner && <div class="spinner-container">
  <div class="spinner"></div>
</div>}
    </div>
  )
}

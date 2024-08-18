import React, { useEffect } from 'react'
import { useState } from "react";
import axios from 'axios';
import {FiArrowLeft} from 'react-icons/fi'
import {IoIosNotificationsOutline} from 'react-icons/io'
import { Link } from 'react-router-dom';
import {HiOutlineXMark} from 'react-icons/hi2'
import {GiCheckMark} from 'react-icons/gi'
import {TbCurrencyNaira} from 'react-icons/tb'

export const Transfer = ({accAmount,password4payment}) => {

  const [errorText , seterrorText] = useState(false);
const [incorrectPass , setincorrectPass] = useState(false);
const [incorrectPass2 , setincorrectPass2] = useState(false);
const [passentered , setpassenterd] = useState("")
const [receipt , setreceipt] = useState(false)
const [Navpass , setNavpass] = useState(false)
const [tohide , settohide] = useState(true)
const [theSpinner , settheSpinner] = useState(false)
const [useramount, setUseramount]= useState("")

const updating = () =>{

      setNavpass(true);
      settohide(false)
  
  
} 

const toPurchase = async ()=>{
  if(password4payment !== passentered){
      setincorrectPass(true);
      setTimeout(()=>{
        setincorrectPass(false)
    }, 3000)
}
else if(accAmount < useramount){
  setincorrectPass2(true);
  setTimeout(()=>{
    setincorrectPass2(false)
}, 3000)
}
else{
    setNavpass(false);
    settheSpinner(true);
    setpassenterd("");
    MakeTransfer(info, Bank, useramount)
    settheSpinner(false)
    setreceipt(true);
  }
}


const handleUpdate = (e)=>{
  e.preventDefault();
  updating();
}

const cancelSuccess = ()=>{
  settohide(true);
  setreceipt(false)
  setNavpass(false)
  setUseramount("")
  setSelectedBank("")
  settoRecieve("")
  setINFO("")
 }
 const cancelToPay = ()=>{
  setUseramount("")
  setSelectedBank("")
  settoRecieve("")
  setINFO("")

  settohide(true);
  setNavpass(false)
 }







const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [Bank, setBank] = useState('');
  const [ info , setINFO ] = useState("")


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBanks = bankOptions.filter((bank) =>
    bank.label.toLowerCase().includes(searchTerm.toLowerCase())
  );


const [toTrue , settoTrue] = useState(false);
const [toRecieve , settoRecieve] = useState("");
// const handleChange1 = (e) =>{
//   const value = e.target.value;
//     const name = e.target.name;
//     setINFO(prev=>{
//      return(
//        ...prev,
//       [name] : value,
//      )
// })
   
// }
let theNum = info.length
let theNum2 = selectedBank.length



async function fetchData(account_number, account_bank) {
  console.log(account_number)
  try {
    const response = await fetch("https://chrispay.onrender.com/verify_bank", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_number,
        account_bank,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.message); // This will log the account_name
    return data.message;
  } catch (error) {
    console.error("There was an error with the fetch operation:", error);
  }
}

async function MakeTransfer(account_number, account_bank, amount) {
  console.log(account_number)
  function generateRandomAlphanumeric(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

// Example usage:
  const reference = generateRandomAlphanumeric(10);
  try {
    const response = await fetch("https://chrispay.onrender.com/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_number,
        bank: account_bank,
        amount,
        reference
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.message); // This will log the account_name
    return data.message;
  } catch (error) {
    console.error("There was an error with the fetch operation:", error);
  }
}


 useEffect(()=>{
    if( theNum = 10 && theNum2 > 1){
      fetchData(info , Bank)
      .then(account_name => {
        settoRecieve(account_name)
        console.log("Account Name:", account_name);
        // You can now use the account_name in your component
      });
    
    }
 })








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
              <h2>Recipient Account</h2>


            <input name="acc_num" onChange={(e)=>setINFO(e.target.value)} value={info} placeholder=" Account Number " className='T-option'/>

            <input onClick={()=>settoTrue(true)} placeholder='Select Bank' name="bank" onChange={(e)=>setSelectedBank(e.target.value)} className='T-option' value={selectedBank}/>
            {toTrue && <div className='dropdown'>
            <button className='cancel3' onClick={()=>settoTrue(false)}><HiOutlineXMark/></button>
            <input
            type="text"
            placeholder="Search for a bank..."
            value={searchTerm}
            onChange={handleSearch}
            className='toselectBank'/>

            {filteredBanks.map((bank) => (
  
              <button className='theBank' onClick={() => {
                setBank(bank.value);
                setSelectedBank(bank.label);
                settoTrue(false);
              }} key={bank.value} value={bank.value}>
                {bank.label}
              </button>
            ))}
            </div>}

            <h3 className='userName'>{toRecieve}</h3>

            <input placeholder=' Amount' className='T-option'  name='description' onChange={(e)=>setUseramount(e.target.value)} value={useramount}/>
       
            <button className='T-btn3' onClick={handleUpdate}>Next</button>
        </div>

      </div>
    </div>}

{ Navpass && <div className='hpass'><div className='toEnterPass'>
  <button className='cancel2' onClick={cancelToPay}><HiOutlineXMark/></button>
  <h2>Enter Password</h2>
  <input placeholder=' Enter password' className='T-option' value={passentered} onChange={(e)=>setpassenterd(e.target.value)}/>
  <button onClick={toPurchase} className='purchaseBTN'>Pay</button>
  {incorrectPass && <h3 className='errormessage'>Incorrect Password</h3>}
  {incorrectPass2 && <h3 className='errormessage'>Insufficient Balance</h3>}
</div></div> }

{ receipt && <div className='hpass'><div className='notication2'>
  <button className='cancel' onClick={cancelSuccess}><HiOutlineXMark/></button>
  <h2><GiCheckMark className='gi'/></h2>
  <h3 className='moneyTransfered'><TbCurrencyNaira/>{useramount}</h3>
  <h3>Successful</h3>
  <h3 className='del'>To: {toRecieve}</h3>
  <h3 className='del'>{selectedBank}</h3>
  <h3 className='del'>{info.acc_num}</h3>
</div></div>}
{theSpinner && <div class="spinner-container">
<div class="spinner"></div>
</div>}
</div>
  )
}


const bankOptions = [
  { value: "120001", label: "9mobile 9Payment Service Bank" },
  { value: "801", label: "Abbey Mortgage Bank" },
  {value:"602", label: "Accion Microfinance Bank" },
  {value:"50036", label: "Ahmadu Bello University Microfinance Bank" },
  {value:"120004", label: "Airtel Smartcash PSB" },
  { value: "51204", label: "Above Only MFB" },
  {value:"51312", label: "Abulesoro MFB" },
  {value:"044", label: "Access Bank" },
  {value:"063", label: "Access Bank (Diamond)" },
  { value: "51336", label: "AKU Microfinance Bank" },
  {value:"035A", label: "ALAT by WEMA" },
  {value:"090629", label: "Amegy Microfinance Bank" },
  {value:"50926", label: "Amju Unique MFB" },
  { value: "51341", label: "AMPERSAND MICROFINANCE BANK" },
  {value:"50083", label: "Aramoko MFB" },
  {value:"401", label: "ASO Savings and Loans" },
  {value:"MFB50094", label: "Astrapolaris MFB LTD" },
  { value: "51229", label: "Bainescredit MFB" },
  {value:"50117", label: "Banc Corp Microfinance Bank" },
  {value:"50931", label: "Bowen Microfinance Bank" },
  {value:"FC40163", label: "Branch International Financial Services Limited" },
  {value:"865", label: "CASHCONNECT MFB"}, {value:"50823",  label: "CEMCS Microfinance Bank"},
  {value:"50171", label: "Chanelle Microfinance Bank Limited"}, {value:"312", label: "Chikum Microfinance bank"},
  {value:"023", label: "Citibank Nigeria"}, {value:"50910", label: "Consumer Microfinance Bank"},
  {value:"50204", label: "Corestep MFB"}, {value:"559", label: "Coronation Merchant Bank"},
  {value:"FC40128", label: "County Finance Limited"}, {value:"51297", label: "Crescent MFB"},
  {value:"50162", label: "Dot Microfinance Bank"}, {value:"050", label: "Ecobank Nigeria"},
  {value:"50263", label: "Ekimogun MFB"}, {value:"098", label: "Ekondo Microfinance Bank"},
  {value:"50126", label: "Eyowo"}, {value:"51318", label: "Fairmoney Microfinance Bank"},
  {value:"070", label: "Fidelity Bank"}, {value:"51314", label: "Firmus MFB"},
  {value:"011", label: "First Bank of Nigeria"}, {value:"214", label: "First City Monument Bank"},
  {value:"413", label: "FirstTrust Mortgage Bank Nigeria"}, {value:"50315", label: "FLOURISH MFB"},
  {value:"501", label: "FSDH Merchant Bank Limited"}, {value:"812", label: "Gateway Mortgage Bank LTD"},
  {value:"00103", label: "Globus Bank"}, {value:"100022", label: "GoMoney"},
  {value:"50739", label: "Goodnews Microfinance Bank"}, {value:"562", label: "Greenwich Merchant Bank"},
  {value:"058", label: "Guaranty Trust Bank"}, {value:"51251", label: "Hackman Microfinance Bank"},
  {value:"50383", label:" Hasal Microfinance Bank"}, {value:"030", label:" Heritage Bank"},
  {value:"120002", label:" HopePSB"},{value:"51244", label:" Ibile Microfinance Bank"},
  {value:"50439", label:" Ikoyi Osun MFB"},{value:"50442", label:" Ilaro Poly Microfinance Bank"},
  {value:"50453", label:" Imowo MFB"},{value:"50457", label:" Infinity MFB"},
  {value:"301", label:" Jaiz Bank"},{value:"50502", label:" Kadpoly MFB"},
  {value:"082", label:" Keystone Bank"},{value:"50200", label:" Kredi Money MFB LTD"},
  {value:"50211", label:" Kuda Bank"},{value:"90052", label:" Lagos Building Investment Company Plc."},
  {value:"50549", label:" Links MFB"},{value:"031", label:" Living Trust Mortgage Bank"},
  {value:"303", label:" Lotus Bank"},{value:"50563", label:" Mayfair MFB"},
  {value:"50304", label:" Mint MFB"},{value:"50515", label:" Moniepoint MFB"},
  {value:"120003", label:" MTN Momo PSB"},{value:"107", label:" Optimus Bank Limited"},
  {value:"100002", label:" Paga"},{value:"999991", label:" PalmPay"},{value:"104", label:"Parallex Bank"},
  {value:"311", label:" Parkway - ReadyCash"},{value:"999992", label:" Paycom"},{value:"50743", label:" Peace Microfinance Bank"},
  {value:"51146", label:" Personal Trust MFB"},{value:"50746", label:" Petra Mircofinance Bank Plc"},{value:"268", label: "Platinum Mortgage Bank"},
  {value:"076", label:" Polaris Bank"},{value:"50864", label:" Polyunwana MFB"},{value:"105", label:" PremiumTrust Bank"},
  {value:"101", label:" Providus Bank"},{value:"51293", label:" QuickFund MFB"},{value:"502", label:" Rand Merchant Bank"},
  {value:"90067", label:" Refuge Mortgage Bank"},{value:"51286", label:" Rigo Microfinance Bank Limited"},
  {value:"50767", label:" ROCKSHIELD MICROFINANCE BANK"},{value:"125", label:" Rubies MFB"},
  {value:"51113", label: " Safe Haven MFB"},{value:"951113", label: " Safe Haven Microfinance Bank Limited"},
  {value:"40165", label: " SAGE GREY FINANCE LIMITED"},{value:"50582", label: " Shield MFB"},
  {value:"51062", label: " Solid Allianze MFB"},{value:"50800", label: " Solid Rock MFB"},
  {value:"51310", label: " Sparkle Microfinance Bank"},{value:"221", label: " Stanbic IBTC Bank"},
  {value:"068", label: " Standard Chartered Bank"},{value:"51253", label: " Stellas MFB"},
  {value:"232", label: " Sterling Bank"},{value:"100", label: " Suntrust Bank"},{value:"50968", label: " Supreme MFB"},
  {value:"302", label: " TAJ Bank"},{value:"090560",label: " Tanadi Microfinance Bank"},{value:"51269", label: " Tangerine Money"},
  {value:"51211", label: " TCF MFB"},{value:"102",label: " Titan Bank"},{value:"100039", label: " Titan Paystack"},
  {value:"50840", label: " U&C Microfinance Bank Ltd (U AND C MFB)"},{value:"MFB51322", label: " Uhuru MFB"},
  {value:"50870", label: " Unaab Microfinance Bank Limited"},{value:"50871", label: " Unical MFB"},
  {value:"51316", label: " Unilag Microfinance Bank"},{value:"032", label: " Union Bank of Nigeria"},
  {value:"033", label: " United Bank For Africa"},{value:"215", label: " Unity Bank"},
  {value:"51355", label: " Waya Microfinance Bank"},
  {value:"035", label: " Wema Bank"},{value:"057", label: " Zenith Bank"},

  // ... other bank options
];
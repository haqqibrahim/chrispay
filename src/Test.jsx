import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const BankDropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [Bank, setBank] = useState('');
  const [ info , setINFO ] = useState({
    acc_num: "",
    description: ""
  })


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBanks = bankOptions.filter((bank) =>
    bank.label.toLowerCase().includes(searchTerm.toLowerCase())
  );


const [toTrue , settoTrue] = useState(false);
const [toRecieve , settoRecieve] = useState("");
const handleChange1 = (e) =>{
  const value = e.target.value;
    const name = e.target.name;
    setINFO(prev=>{
     return{
       ...prev,
      [name] : value,
  }
})
   
}
let theNum = info.acc_num.length
let theNum2 = selectedBank.length

  const fetchData = () =>{
    axios.get('https://nubapi.com/api/verify', {
     headers: {
         'Authorization': 'Bearer orP6MI89lTzBw7N1wVPnYFBbM2ZyEehOXRHddEVP' // Replace with your actual Bearer token
     },
     params: {
         account_number: info.acc_num,
         bank_code: Bank
     }
   })
     .then((response) => {
         const { account_name, first_name, last_name, other_name, account_number, bank_code, Bank_name } = response.data;
         console.log(account_name);
         console.log(first_name);
         console.log(last_name);
         console.log(other_name);
         console.log(account_number);
         console.log(bank_code);
         console.log(Bank_name);
         settoRecieve(account_name);
     })
     .catch((error) => {
         console.error('An error occurred:', error);
     });
   
   
 }  


 useEffect(()=>{
    if( theNum = 10 && theNum2 > 1){
        fetchData();
    }
 },[theNum,theNum2])


  return (
    <div>
        <input name="acc_num" onChange={handleChange1} value={info.acc_num} placeholder=" Account Number " className='T-option'/>

        <input onClick={()=>settoTrue(true)} placeholder='Select Bank' name="bank" onChange={(e)=>setSelectedBank(e.target.value)} className='T-option2' value={selectedBank}/>
       {toTrue && <div>
      <input
        type="text"
        placeholder="Search for a bank..."
        value={searchTerm}
        onChange={handleSearch}
      />
        
        {filteredBanks.map((bank) => (
          <button onClick={() => {
            setBank(bank.value);
            setSelectedBank(bank.label);
          }} key={bank.value} value={bank.value}>
            {bank.label}
          </button>
        ))}
       </div>}
  
    <h1>{toRecieve}</h1>
    </div>
  );
};

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
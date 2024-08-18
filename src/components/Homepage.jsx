import React, { useEffect } from 'react'
import { BiMoneyWithdraw } from "react-icons/bi";
import {BiTransfer} from 'react-icons/bi'
import {BiUser} from 'react-icons/bi'
import {TbCurrencyNaira} from 'react-icons/tb'
import {GiTakeMyMoney} from 'react-icons/gi'
import {BsPhoneVibrate} from 'react-icons/bs'
import {IoMdSchool} from 'react-icons/io'
import {GrVisa} from 'react-icons/gr'
import {BsBank} from 'react-icons/bs'
import {BiHomeSmile} from 'react-icons/bi'
import {BiHistory} from 'react-icons/bi'
import { Link } from 'react-router-dom'





export const Homepage = ({toconfirm,reFetch,firstname,matric,department, amount}) => {

    const formatToNaira = (number) => {
        return new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: 'NGN',
          minimumFractionDigits: 2,
        }).format(number);
      };

      const formattedNaira = formatToNaira(amount);
    
useEffect(()=>{
    if(toconfirm){
        reFetch()
    }
})
  return (
    
    <div className='myHome'>
    {/* nav_bar */}
    <div className="nav">
        <Link to="/profile"><BiUser className='dp'/></Link>
        <div className="greetings">
             <h3>Welcome </h3><span className='myName'>{firstname}</span>
             <h4>Good Day</h4>
        </div>
        <Link to="/addfunds"><button className='bar'><BiMoneyWithdraw /></button></Link>
    </div>

    {/* My_Account */}
    <div className='acc_body'>

    
    <div className='acc_balance'>
       <GiTakeMyMoney className='money_icon'/>
       <div className='valid'>
           <h2>VALID TUE</h2><h3>8/26</h3>
       </div>
       <div className='money'>
           <h3>Balance</h3>
           <h4>{formattedNaira}</h4>
       </div>
       <h2 className='v'><GrVisa className='v2'/>isa</h2>
    </div>

    {/* Transactions */}

    {/* <div className='air_shc'>
       <div  className='air'>
       <Link to="/airtime"><button className='airtime'><BsPhoneVibrate/></button></Link>
           <h4 className='air_h'>Airtime</h4>
       </div>
       <div  className='sch'>
       <Link to="/test"><button className='sch_bills'><IoMdSchool/></button></Link>
           <h4 className='sch_h'>School Bills</h4>
        </div> 
    </div> */}
    <div className='display_details'>
        <h2>Department: {department}</h2>
        <h2>Matric Number: {matric}</h2>
    </div>

    <div className='recent'>
        <div className='drop'></div>
        <h3>Funds Transfer</h3>
        <div className='cmu_transfer'>
        <div  className='cmu-t'>
        <Link to="/cmu"><button className='trans'><BiTransfer/></button></Link>
           <h4>CMU Transfer</h4>
       </div> 
       <div  className='other-t'>
       <Link to="/transfer"><button className='others'><BsBank/></button></Link>
           <h4>Other Banks</h4>
        </div> 
        </div>
    </div>

    </div>

    {/* Footer */}
    <div className='footer'>
    {/* <button className='home'><BiHomeSmile/></button> */}
    <h2>C H R I S P A Y</h2>
    {/* <button className='his'><BiHistory/></button> */}
    </div>
</div>
  )
}

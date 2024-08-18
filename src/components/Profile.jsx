import React, { useState } from 'react'
import {TbCurrencyNaira} from 'react-icons/tb'
import {FiArrowLeft} from 'react-icons/fi'
import {IoIosNotificationsOutline} from 'react-icons/io'
import { Link } from 'react-router-dom'

export const Profile = ({profileDetails}) => {
    const {full_name,department,level,amount,firstname,user_id} = profileDetails;

 
    const formatToNaira = (number) => {
        return new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: 'NGN',
          minimumFractionDigits: 2,
        }).format(number);
      };

      const formattedNaira = formatToNaira(amount);

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
        </div>    
    </div>
  )
}

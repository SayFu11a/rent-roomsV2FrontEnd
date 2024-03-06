import React from 'react';
import { useLocation } from 'react-router-dom';

function GuestInfo() {
   const location = useLocation();
   const { checkInDate, checkOutDate, contactInfo, guests } = location.state;

   return (
      <div>
         <h2>Guest Information</h2>
         <p>Check-in Date: {checkInDate}</p>
         <p>Check-out Date: {checkOutDate}</p>
         <p>Contact Information:</p>
         <ul>
            <li>Full Name: {contactInfo.fullName}</li>
            <li>Email: {contactInfo.email}</li>
            <li>Phone Number: {contactInfo.phoneNumber}</li>
         </ul>
         <p>Guests Information:</p>
         <ul>
            {guests.map((guest) => (
               <li key={guest.id}>
                  Guest {guest.id} Full Name: {guest.fullName}
               </li>
            ))}
         </ul>
      </div>
   );
}

export default GuestInfo;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function BookingPage() {
   const location = useLocation();
   const { title, tags } = location.state || {};
   const navigate = useNavigate();
   const [step, setStep] = useState(1);
   const [checkInDate, setCheckInDate] = useState('');
   const [checkOutDate, setCheckOutDate] = useState('');
   const [contactInfo, setContactInfo] = useState({ fullName: '', email: '', phoneNumber: '' });
   const [guests, setGuests] = useState([{ id: 1, fullName: '' }]);

   const handleContinue = () => {
      if (step === 1) {
         setStep(2);
      } else if (step === 2) {
         // If you want to navigate to '/guest-info' here, uncomment the next line
         navigate('/guest-info', {
            state: { checkInDate, checkOutDate, contactInfo, guests, title, tags },
         });

         handleBookingConfirmation();

         console.log(title, tags);
      }
   };

   const handleAddGuest = () => {
      setGuests([...guests, { id: guests.length + 1, fullName: '' }]);
   };

   const handleGuestNameChange = (id, fullName) => {
      const updatedGuests = guests.map((guest) =>
         guest.id === id ? { ...guest, fullName } : guest,
      );
      setGuests(updatedGuests);
   };

   const handleBookingConfirmation = () => {
      console.log('Данные о бронировании:', {
         checkInDate,
         checkOutDate,
         contactInfo,
         guests,
         title,
         tags,
      });

      axios
         .post('http://localhost:4444/booking', {
            checkInDate,
            checkOutDate,
            contactInfo,
            guests,
            title,
            tags,
         })
         .then((response) => {
            console.log('Ответ от сервера:', response.data);
         })
         .catch((error) => {
            console.error('Ошибка при отправке данных:', error);
         });
   };

   return (
      <div>
         <h2>Бронирование номера</h2>
         <label>
            Дата заезда:
            <input
               type="date"
               value={checkInDate}
               onChange={(e) => setCheckInDate(e.target.value)}
            />
         </label>
         <br />
         <label>
            Дата выезда:
            <input
               type="date"
               value={checkOutDate}
               onChange={(e) => setCheckOutDate(e.target.value)}
            />
         </label>
         <br />
         <label>
            ФИО:
            <input
               type="text"
               value={contactInfo.fullName}
               onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
            />
         </label>
         <br />
         <label>
            Email:
            <input
               type="email"
               value={contactInfo.email}
               onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
            />
         </label>
         <br />
         <label>
            Номер телефона:
            <input
               type="tel"
               value={contactInfo.phoneNumber}
               onChange={(e) => setContactInfo({ ...contactInfo, phoneNumber: e.target.value })}
            />
         </label>
         <br />

         {step === 2 && (
            <div>
               <h2>Информация о гостях</h2>
               {guests.map((guest) => (
                  <div key={guest.id}>
                     <label>
                        ФИО гостя {guest.id}:
                        <input
                           type="text"
                           value={guest.fullName}
                           onChange={(e) => handleGuestNameChange(guest.id, e.target.value)}
                        />
                     </label>
                  </div>
               ))}
               <button onClick={handleAddGuest}>Добавить гостя</button>
            </div>
         )}

         <button onClick={handleContinue}>
            {step === 1 ? 'Продолжить' : 'Завершить бронирование'}
         </button>
      </div>
   );
}

export default BookingPage;

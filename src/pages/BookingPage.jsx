import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BookingPage() {
   const navigate = useNavigate();
   const [step, setStep] = useState(1); // Шаг 1: Ввод информации о бронировании, Шаг 2: Ввод информации о гостях

   const [checkInDate, setCheckInDate] = useState('');
   const [checkOutDate, setCheckOutDate] = useState('');
   const [contactInfo, setContactInfo] = useState({ fullName: '', email: '', phoneNumber: '' });

   const [guests, setGuests] = useState([{ id: 1, fullName: '' }]);

   const handleContinue = () => {
      if (step === 1) {
         // Переход к следующему шагу
         setStep(2);
      } else if (step === 2) {
         // Проверки и обработка данных о гостях, если необходимо
         // Переход к следующей странице или выполнение других действий
         // history.push('/confirmation'); // Замените '/confirmation' на путь к следующей странице
         navigate('/guest-info');
         handleBookingConfirmation();
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
      // Обработка данных о бронировании и гостях
      console.log('Данные о бронировании:', {
         checkInDate,
         checkOutDate,
         contactInfo,
         guests,
      });
   };

   // Отправка данных на сервер с использованием Axios
   axios
      .post('http://localhost:4444/booking', {
         checkInDate,
         checkOutDate,
         contactInfo,
         guests,
      })
      .then((response) => {
         // Обработка успешного ответа от сервера
         console.log('Ответ от сервера:', response.data);
      })
      .catch((error) => {
         // Обработка ошибок при отправке запроса
         console.error('Ошибка при отправке данных:', error);
      });

   useEffect(() => {
      if (step === 2) {
         handleBookingConfirmation();
      }
   }, [step, checkInDate, checkOutDate, contactInfo, guests]);

   return (
      <div>
         {step === 1 && (
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
                     onChange={(e) =>
                        setContactInfo({ ...contactInfo, phoneNumber: e.target.value })
                     }
                  />
               </label>
               <br />
            </div>
         )}

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
            {step === 1 ? 'Продолжить к информации о гостях' : 'Завершить бронирование'}
         </button>
      </div>
   );
}

export default BookingPage;

import React from 'react';
import Card from '../components/Card';
import './Home.css';

function Home({
   items,
   searchValue,
   onChangeSearchInput,
   setSearchValue,
   onAddToCart,
   onAddToFavorite,
   isLoading,
}) {
   const renderItm = () => {
      const filtredItm = items.filter((item) =>
         item.title.toLowerCase().includes(searchValue.toLowerCase()),
      );
      return (isLoading ? [...Array(8)] : filtredItm).map((item, index) => (
         <Card
            key={index}
            onFavorite={(obj) => onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
            {...item}
         />
      ));
   };

   return (
      <div className="content card-content">
         <div className="contaner-s d-flex align-center justify-between mb-40">
            <h1>
               {searchValue == '' ? 'Все номера' : 'Поиск по запросу: ' + "'" + searchValue + "'"}
            </h1>
            <div className="serch-block d-flex">
               <img
                  src="https://sayfu11a.github.io/react_sneakers-deploy/img/serch.svg"
                  alt="Serch"
               />
               <input
                  onChange={onChangeSearchInput}
                  value={searchValue}
                  type="text"
                  placeholder="Поиск..."
               />
               {searchValue && (
                  <img
                     className="clear"
                     onClick={() => setSearchValue('')}
                     src="https://sayfu11a.github.io/react_sneakers-deploy/img/btn-remove.svg"
                     alt="Clear"
                  />
               )}
            </div>
         </div>

         <div className="flex-wrap">{renderItm()}</div>
      </div>
   );
}

export default Home;

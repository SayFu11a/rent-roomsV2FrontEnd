import React from 'react';
import styles from './Card.module.scss';

import AppContext from '../../context';

import ContentLoader from 'react-content-loader';

function Card({
   loading = false,
   id,
   imgUrl,
   title,
   price,
   onPlus,
   onFavorite = false,
   favorited = false,
}) {
   const { isAddedToCart } = React.useContext(AppContext);
   const [isOnFavorite, setIsOnFavorite] = React.useState(favorited);
   const dataProps = { id, parentId: id, imgUrl, title, price };

   const onClickPlus = () => {
      onPlus(dataProps);
   };

   const onClickFavorite = () => {
      onFavorite(dataProps);
      setIsOnFavorite(!isOnFavorite);
   };

   // React.useEffect(() => { }, [isOnPlus])
   React.useEffect(() => {}, [isOnFavorite]);

   return (
      <div className={styles.card}>
         {loading ? (
            <ContentLoader
               speed={2}
               width={1000}
               height={295}
               viewBox="0 0 1000 295"
               backgroundColor="#f3f3f3"
               foregroundColor="#ecebeb">
               <rect x="900" y="153" rx="3" ry="3" width="88" height="30" />
               <rect x="576" y="165" rx="3" ry="3" width="307" height="15" />
               <rect x="-2" y="5" rx="0" ry="0" width="560" height="295" />
               <rect x="330" y="254" rx="0" ry="0" width="0" height="2" />
            </ContentLoader>
         ) : (
            <>
               {onFavorite && (
                  <div className={styles.favorite}>
                     <img
                        className={styles.favoriteIcon}
                        onClick={onClickFavorite}
                        src={
                           isOnFavorite
                              ? 'https://sayfu11a.github.io/react_sneakers-deploy/img/liked.svg'
                              : 'https://sayfu11a.github.io/react_sneakers-deploy/img/unliked.png'
                        }
                        alt="Unliked"
                     />
                  </div>
               )}
               <img className={styles.imgRoom} src={imgUrl} alt="Sneakers" />
               <h5 className={styles.title}>{title}</h5>
               <div className="d-flex flex-row justify-content-start">
                  <div className={styles.price}>
                     <span>Цена:</span>
                     <b>{price}р.</b>
                  </div>
                  {onPlus && (
                     <img
                        className={styles.plus}
                        onClick={onClickPlus}
                        src={
                           isAddedToCart(id)
                              ? 'https://sayfu11a.github.io/react_sneakers-deploy/img/btn-cheked.svg'
                              : 'https://sayfu11a.github.io/react_sneakers-deploy/img/btn-plus.svg'
                        }
                        alt="Plus"
                     />
                  )}
               </div>
            </>
         )}
      </div>
   );
}

export default Card;

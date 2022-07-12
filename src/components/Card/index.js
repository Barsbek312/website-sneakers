import React from 'react';
import ContentLoader from "react-content-loader"
import cardStyles from "./Card.module.scss";

function Card({id, onFavorite, title, price, imageURL, onPlus, favorited = false, added = false, loading = false }) {
    const [isAdded, setIsAdded] = React.useState(added);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
      onPlus({ id, title, price, imageURL});
      setIsAdded(!isAdded);
    }

    const onClickFavorite = () => {
      onFavorite({ id, title, price, imageURL});
      setIsFavorite(!isFavorite);
    }
     return(
        <div className={cardStyles.card}>
          {
            loading ? 
            <ContentLoader 
              speed={2}
              width={150}
              height={187}
              viewBox="0 0 150 187"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
              <rect x="0" y="100" rx="5" ry="5" width="150" height="15" /> 
              <rect x="0" y="123" rx="5" ry="5" width="93" height="15" /> 
              <rect x="0" y="150" rx="5" ry="5" width="80" height="24" /> 
              <rect x="117" y="142" rx="5" ry="5" width="32" height="32" />
            </ContentLoader> 
          :
            <>
              <div className={cardStyles.favorite} onClick={onClickFavorite}>
                <img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="heart-unliked"/>
              </div>
              <img width={133} height={112} src={imageURL} alt="sneakers"/>
              <h5>{title}</h5>
              <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                  <span>Цена: </span>
                  <b>{price + ' руб.'}</b>
                </div>
                <img 
                  className={cardStyles.plus} 
                  onClick={onClickPlus} 
                  src={isAdded  ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} 
                  alt="plus" 
                />
              </div>
            </>
          }
        </div>
    );
}

export default Card;
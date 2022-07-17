import Card from '../components/Card'; 
import { AppContext } from "../App";
import React from "react";

function Favorite({searchValue, setSearchValue, onChangeSearchInput, onAddToCart}) {
  const {favorites, onAddToFavorite} = React.useContext(AppContext);

    return ( 
        <div className="content p-40">
          <div className="d-flex align-center justify-between mb-40">
            <h1>{searchValue ? `По запросу : "${searchValue}"` : "Все кроссовки"}</h1>
            <div className="search__block d-flex">
              {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p " src="/img/btn-remove.svg" alt="Remove"/>}
              <img alt="search" src="/img/search.svg"/>
              <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск ..."/> 
            </div>
          </div>
          <div className="d-flex flex-wrap">
            {
              favorites.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
                <Card 
                  key= {index}
                  title= {item.title}
                  price= {item.price} 
                  imageURL= {item.imageURL}
                  id= {item.id}
                  onPlus = {onAddToCart}
                  onFavorite = {onAddToFavorite}
                  favorited= {true}
                />
              ))}   
          </div>
      </div>
    );
}

export default Favorite; 
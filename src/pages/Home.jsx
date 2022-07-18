import React from 'react';
import Card from '../components/Card'; 

function Home({searchValue, setSearchValue, onChangeSearchInput, items, onAddToCart, onAddToFavorite, cartItems, isLoading }) {
    const renderItems = () => {
      const filtredItems = items.filter((item) => 
        item.title.toLowerCase().includes(searchValue.toLowerCase()))
      
      return(isLoading ? [...Array(12)].map(() => (
          <Card 
            loading = {isLoading}
          />
        )) 
      : 
        filtredItems.map((item, index) => (
          <Card 
            key={index}
            onFavorite = {(obj) => onAddToFavorite(obj)}
            onPlus = {(obj) => onAddToCart(obj)}
            loading = {isLoading}
            {...item}
        />
      )))
    };
    return ( 
        <div className="content p-40">
          <div className="d-flex align-center justify-between mb-40">
            <h1>{searchValue ? `По запросу : "${searchValue}"` : "Все кроссовки"}</h1>
            <div className="search__block d-flex">
              {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p " src="img/btn-remove.svg" alt="Remove"/>}
              <img alt="search" src="img/search.svg"/>
              <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск ..."/> 
            </div>
          </div>
          <div className="d-flex flex-wrap justify-between">
            {renderItems()}   
          </div>
      </div>
    );
}

export default Home; 
import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Favorite from './pages/Favorite';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get('https://62c4396d7d83a75e39f3ffdd.mockapi.io/cart');
      const favoritesResponse = await axios.get('https://62c4396d7d83a75e39f3ffdd.mockapi.io/favorites'); 
      const itemsResponse = await axios.get('https://62c4396d7d83a75e39f3ffdd.mockapi.io/items');

      setIsLoading(false)
      
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData()
  },[])

  const onAddToCart = (obj) => { 
      if(cartItems.find((cartObj) => Number(cartObj.id) === Number(obj.id))){
        axios.delete(`https://62c4396d7d83a75e39f3ffdd.mockapi.io/cart/${obj.id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      }
      else{
        axios.post('https://62c4396d7d83a75e39f3ffdd.mockapi.io/cart', obj)
        setCartItems((prev) => [...prev, obj]);
      }
  }

  const onAddToFavorite = async (obj) => { 
    try{
      if(favorites.find(favObj => favObj.id ===  obj.id)){
        axios.delete(`https://62c4396d7d83a75e39f3ffdd.mockapi.io/favorites/${obj.id}`);
      }else{
        const {data} = await axios.post('https://62c4396d7d83a75e39f3ffdd.mockapi.io/favorites', obj)
        setFavorites((prev) => [...prev, data]); 
      }
    }
    catch (error) {
      alert('Не удалось добавить в "fav orites" ')
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://62c4396d7d83a75e39f3ffdd.mockapi.io/cart/${id}`);  
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }
  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClickClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
      <Header 
        onClickCart = {() => setCartOpened(true)}/>

      <Route path="/" exact>
          <Home 
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            cartItems={cartItems}
            onChangeSearchInput={onChangeSearchInput}
            items={items}
            onAddToCart={onAddToCart}
            onAddToFavorite={onAddToFavorite}
            isLoading={isLoading}
          />
      </Route>
      <Route path="/favorites" exact>
        <Favorite
          favorites={favorites}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          items={items}
          onAddToCart={onAddToCart}
          onAddToFavorite={onAddToFavorite}
        />
      </Route>
    </div>
  );

  
}

export default App;

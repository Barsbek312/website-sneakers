import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Favorite from './pages/Favorite';
import Orders from './pages/Orders';

 export const AppContext = React.createContext({});

 console.log(AppContext)

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
 
  

  React.useEffect(() => {
    async function fetchData() {
      try{
        const [  cartResponse, favoritesResponse, itemsResponse ] = await Promise.all([axios.get('https://62c4396d7d83a75e39f3ffdd.mockapi.io/cart'), axios.get('https://62c4396d7d83a75e39f3ffdd.mockapi.io/favorites'), axios.get('https://62c4396d7d83a75e39f3ffdd.mockapi.io/items')]);

        setIsLoading(false)
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      }
      catch(error){
        alert('Ошибка при запросе данных:(');
      }
    }

    fetchData()
  },[])
  const onAddToCart =  async (obj) => { 
    try{
      const findItem = cartItems.find((cartObj) => Number(cartObj.parentId) === Number(obj.id))
      if(findItem){
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://62c4396d7d83a75e39f3ffdd.mockapi.io/cart/${findItem.id}`); 
      }
      else{
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://62c4396d7d83a75e39f3ffdd.mockapi.io/cart', obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return{
              ...item,
              id: data.id
            };
          }
          return item;
        }));
      }
    }catch(error){
      alert('Ошибка при добавлении в корзину')
    }
  }

  const onAddToFavorite = async (obj) => { 
    try{
      if(favorites.find(favObj => Number(favObj.id) ===  Number(obj.id))){
         axios.delete(`https://62c4396d7d83a75e39f3ffdd.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      }else{
        const {data} = await axios.post('https://62c4396d7d83a75e39f3ffdd.mockapi.io/favorites', obj)
        setFavorites((prev) => [...prev, data]); 
      }
    }
    catch (error) {
      alert('Не удалось добавить в "favorites" ')
    }
  }

  const onRemoveItem = async (id) => {
    try{
      axios.delete(`https://62c4396d7d83a75e39f3ffdd.mockapi.io/cart/${id}`);  
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    }catch(error){
      alert('Не удалось удалить товар:(');
      console.error(error);
    }
  }

  const onChangeSearchInput = async (event) => {
    setSearchValue(event.target.value);
  }
  const isItemAdded = (item) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(item))
    
  };
  return (
    <AppContext.Provider  value={{cartItems, favorites, items, isItemAdded, onAddToFavorite, setCartOpened, setCartItems, onAddToCart}}>
      <div className="wrapper clear">
        <Drawer items={cartItems} onClickClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
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
              isLoading={isLoading}
              onAddToFavorite={onAddToFavorite }
            />
        </Route>
        <Route path="/favorites" exact>
          <Favorite
            favorites={favorites}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToCart={onAddToCart}
          />
        </Route>
        <Route path="/orders" exact>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );

  
}

export default App;

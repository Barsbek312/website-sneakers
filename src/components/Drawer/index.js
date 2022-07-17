import Info from "../Info";
import React from 'react';
import drawerStyles from './Drawer.module.scss';
import axios from 'axios';
import {useCart} from '../../hooks/useCart';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms ))

function Drawer({onClickClose, onRemove, items = [], opened}) {
    const { cartItems, setCartItems, totalPrice} = useCart();
    const [orderId, setOrderId] = React.useState(null)
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)


    const tax = 5
    const totalAmount = totalPrice * (tax/100);

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post('https://62c4396d7d83a75e39f3ffdd.mockapi.io/orders', {
                items: cartItems, 
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://62c4396d7d83a75e39f3ffdd.mockapi.io/cart/' + item.id)
                await delay(1000);
            }
        }
        catch(error) {
            alert('Не удалось провести заказ :(')
        }
        setIsLoading(false)
    }
    return(
        <div className={`${drawerStyles.overlay} ${opened ? drawerStyles.overlay__visible : ''}`}>
            <div className={`${drawerStyles.drawer} d-flex flex-column`}>
                <h2 className="mb-20">Корзина <img onClick={onClickClose} className="remove__btn cu-p" src="/img/btn-remove.svg" alt="Remove"/></h2>

                {
                    items.length > 0 ? 
                        <div className="d-flex flex-column flex">
                            <div className="items flex">
                                {
                                    items.map((obj) => (
                                        <div key={obj.id} className="cart__item d-flex align-center mb-20">
                                        <div style={{backgroundImage: `url(${obj.imageURL})`}} className="cart__item_img"></div>
                                        <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price}</b>
                                        </div>
                                            <img onClick={() => onRemove(obj.id)} className="remove__btn cu-p " src="/img/btn-remove.svg" alt="Remove"/>
                                        </div>
                                    ) )
                                }
                            </div>
                            <div className="cart__total_block">
                                <ul>
                                    <li className="d-flex">
                                        <span>Итого</span>
                                        <div></div>
                                        <b>{totalPrice} руб.</b>
                                    </li>
                                    <li className="d-flex"> 
                                        <span>Налог { tax }%: </span>
                                        <div></div>
                                        <b>{ Math.round(totalAmount)} руб.</b>
                                    </li>
                                </ul> 
                                <button disabled={isLoading} onClick={onClickOrder} className="green__btn">Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/></button>
                            </div>
                        </div>
                        :
                        <Info 
                            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                            image={isOrderComplete ? "/img/order-complete.jpg" : "/img/empty-cart.jpg"}
                            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                        />
                }
            </div>
        </div>
    );
}

export default Drawer;
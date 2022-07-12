function Drawer({onClickClose, onRemove, items = []}) {
    return(
        <div className="overlay">
            <div className="drawer d-flex flex-column">
                <h2 className="mb-20">Корзина <img onClick={onClickClose} className="remove__btn cu-p" src="/img/btn-remove.svg" alt="Remove"/></h2>

                {
                    items.length > 0 ? 
                        <div style={{height: "100%"}}>
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
                                        <b>21 498 руб.</b>
                                    </li>
                                    <li className="d-flex"> 
                                        <span>Налог 5%: </span>
                                        <div></div>
                                        <b>1074 руб.</b>
                                    </li>
                                </ul> 
                                <button className="green__btn">Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/></button>
                            </div>
                        </div>
                        :
                        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                            <img className="mb-20" width={120} height={120} src="/img/empty-cart.jpg" alt="empty-cart"/>
                            <h2>Корзина пустая</h2>
                            <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ</p>
                            <button onClick={onClickClose} className="green__btn"><img src="/img/arrow.svg" alt="Arrow"/>Вернуться назад</button>
                        </div>  
                }
            </div>
        </div>
    );
}

export default Drawer;
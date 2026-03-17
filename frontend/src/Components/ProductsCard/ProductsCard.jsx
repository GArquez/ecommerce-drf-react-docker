import {Counter} from '../Counter/Counter';
import { useContext } from 'react';
import { CartContext } from '../../Context/Context';
import './ProductsCard.css'

export function ProductsCard ({ id, name, brand, price, stock, description, img}) {

    const { addProduct } = useContext(CartContext);

    const handleAdd = (quantity) => {
        const productToAdd = {
            id, name, price, quantity
        }

        addProduct(productToAdd, quantity)
    }

    return (
        <div className='itemsContainer'>
            <div className="card">
                <div className="card__container-img">
                <img src={`/${img}`} className="card-img-top" alt={name} referrerPolicy="no-referrer"/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <strong>{brand}</strong>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">${price}</li>
            </ul>
            <div className="card-body">
                <p>{description}</p>
                <Counter stock={stock} onAdd={handleAdd} />    
            </div>
        </div>
        </div>
    )
}
import { useState } from "react";
import './Counter.css'

export function Counter ({stock, onAdd, initial=1 }) {

    const [quantity, setQuantity] = useState(initial)

    const add = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1)
        }
    }

    const deduct = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <div className='Counter'>          
            <div className='Controls'>
                <button className="Button" onClick={deduct} disabled={quantity <= 1}>-</button>
                <h4 className='Number'>{quantity}</h4>
                <button className="Button" onClick={add} disabled={quantity >= stock}>+</button>
            </div>
            <div>
                <button className="Button" onClick={() => onAdd(quantity) }>Add To Cart</button>
            </div>
        </div>
    )
}
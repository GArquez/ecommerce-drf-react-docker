import { useContext } from "react";
import { CartContext } from "../../Context/Context";

function ItemCart({ id, name, quantity, price }) {
    const { removeItem } = useContext(CartContext);

    return (
        <div className="d-flex align-items-center justify-content-between py-3 border-bottom overflow-hidden" style={{ minHeight: "80px" }}>
            <div className="d-flex flex-column flex-grow-1">
                <h6 className="mb-0 fw-bold text-dark text-truncate" style={{ maxWidth: "200px" }}>
                    {name}
                </h6>
                <div className="d-flex align-items-center gap-2 mt-1">
                    <span className="badge bg-light text-dark  fw-normal">
                        x {quantity}
                    </span>
                    <span className="text-muted small">
                        ${price} each
                    </span>
                </div>
            </div>
            <div className="d-flex align-items-center gap-4">
                <div className="text-end">
                    <p className="mb-0 small text-muted text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                        Subtotal
                    </p>
                    <span className="fw-bold text-dark">
                        ${price * quantity}
                    </span>
                </div>

                <button 
                    className="btn btn-outline-danger btn-sm border-0 opacity-75 hover-opacity-100" 
                    onClick={() => removeItem(id)}
                    title="Remove item"
                    style={{ padding: '5px 10px' }}
                >
                    <i className="bi bi-trash"></i>
                    <span className="small">Remove</span>
                </button>
            </div>
        </div>
    );
}

export default ItemCart;
import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/Context";
import ItemCart from "../ItemCart/ItemCart";
import { Link } from "react-router-dom";

export function CartModal() {
  const { show, handleClose, cart, total, clearCart, totalQuantity } = useContext(CartContext);
  
  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [show]);

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show" onClick={handleClose} style={{ backdropFilter: 'blur(4px)' }}></div>
      
      <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
            <div className="modal-header border-0 pb-0">
              <div className="d-flex align-items-center gap-2">
                <img src='/assets/Cart.svg' alt='Cart' width="24" opacity="0.7" />
                <h5 className="modal-title fw-bold text-secondary">Your Cart</h5>
              </div>
              <button type="button" className="btn-close shadow-none" onClick={handleClose}></button>
            </div>

            <div className="modal-body py-4">
              {totalQuantity === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted mb-0">Empty Cart</p>
                </div>
              ) : (
                <>
                  <div className="cart-items-container">
                    {cart.map(prod => <ItemCart {...prod} key={prod.id} />)}
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                    <span className="text-muted small uppercase fw-semibold">Total</span>
                    <span className="h5 mb-0 fw-bold text-dark">${total}</span>
                  </div>
                </>
              )}
            </div>
            {totalQuantity > 0 && (
              <div className="modal-footer border-0 pt-0 pb-4 px-4 justify-content-between">
                <button 
                  className="btn btn-link text-muted text-decoration-none small p-0" 
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <Link 
                  to='/checkout' 
                  className="btn btn-dark px-4 py-2" 
                  style={{ borderRadius: '8px', fontSize: '0.9rem' }}
                  onClick={handleClose}
                >
                    Finish Purchase
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
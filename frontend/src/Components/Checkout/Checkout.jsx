import { CartContext } from "../../Context/Context";
import { useContext, useState } from "react";
import { createOrder } from "../API/API";
import { Link } from "react-router-dom";

export function Checkout() {
    const { cart, total, clearCart } = useContext(CartContext);
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [buyer, setBuyer] = useState({ name: "", email: "" });

    const handleInputChange = (e) => {
        setBuyer({ ...buyer, [e.target.name]: e.target.value });
    };

    const sendOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderData = {
            name: buyer.name,
            email: buyer.email,
            items: cart.map(item => ({
                product: item.id,
                quantity: item.quantity,
                price: item.price
            }))
        };

        try {
            const res = await createOrder(orderData);
            setOrderId(res.data.id);
            clearCart();
        } catch (err) {
            console.error("Error ordering:", err);
            alert("There was an error processing your order. Please check your data.");
        } finally {
            setLoading(false);
        }
    };

    // --- VIEW: SUCCESS / ORDER CONFIRMED ---
    if (orderId) {
        return (
            <div className="container mt-5 py-5 text-center">
                <div className="row justify-content-center">
                    <div className="col-md-6 bg-white p-5 rounded-4 shadow-sm border">
                        <div className="mb-4">
                            <span className="display-1">🎉</span>
                        </div>
                        <h2 className="fw-bold text-dark">Order Confirmed!</h2>
                        <p className="text-muted fs-5 mt-3">Thanks for trusting <strong>Tech's Store</strong>.</p>
                        
                        <div className="bg-light p-4 rounded-3 my-4 border-dashed">
                            <p className="small text-uppercase text-muted mb-1 fw-semibold">Your tracking ID</p>
                            <span className="h4 text-primary fw-bold font-monospace">{orderId}</span>
                        </div>

                        <Link to="/" className="btn btn-dark btn-lg px-5 py-3 rounded-pill shadow-sm">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // --- VIEW: FORM ---
    return (
        <div className='container mt-5 mb-5'>
            <div className="row g-5 justify-content-center">
                {/* Main Form */}
                <div className="col-lg-5">
                    <h2 className="fw-bold mb-4">Checkout Details</h2>
                    <form onSubmit={sendOrder} className="bg-white p-4 rounded-4 shadow-sm border">
                        <div className="mb-3">
                            <label className="form-label small fw-bold text-muted">FULL NAME</label>
                            <input 
                                type="text" 
                                name="name"
                                className="form-control form-control-lg bg-light border-0 shadow-none" 
                                placeholder="Lionel Messi"
                                value={buyer.name}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-bold text-muted">EMAIL ADDRESS</label>
                            <input 
                                type="email" 
                                name="email"
                                className="form-control form-control-lg bg-light border-0 shadow-none" 
                                placeholder="leo@goated.com"
                                value={buyer.email}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>

                        <div className="pt-3 border-top">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <span className="text-muted fw-semibold">Total to pay:</span>
                                <span className="h3 mb-0 fw-bold text-dark">${total}</span>
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-dark btn-lg w-100 py-3 rounded-3 fw-bold shadow-sm"
                                disabled={cart.length === 0 || loading}
                            >
                                {loading ? (
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                ) : cart.length === 0 ? "Empty Cart" : "Complete Purchase"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
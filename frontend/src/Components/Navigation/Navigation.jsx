import { CartWidget } from '../CartWidget/CartWidget';
import { Link } from 'react-router-dom';
import { productsCategory } from '../API/API';
import { useState, useEffect } from "react";
import './Navigation.css'; // Importa el CSS que creamos

export function Navigation() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await productsCategory();
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg sticky-top custom-navbar">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to={'/'}>
          <span className="text-primary">Tech's</span> Store
        </Link>
        
        <div className="d-flex align-items-center gap-2 order-lg-last">
          <CartWidget />
          <button 
            className="navbar-toggler border-0 shadow-none" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link px-3" to={'/'}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to={'/products'}>Products</Link>
            </li>
            
            {/* Categorías integradas en el flujo del nav */}
            <li className="dropdown dropdown-item">
              <a className="nav-link px-3" href="#" role="button" data-bs-toggle="dropdown">
                Categories
              </a>
              <ul className="dropdown-menu">
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link className="dropdown-item py-2" to={`/category/${cat.name}`}>
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>   
      </div>
    </nav>
  );
}
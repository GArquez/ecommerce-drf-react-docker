import { ProductsCard } from '../ProductsCard/ProductsCard';
import { useEffect, useState } from "react";
import { getProducts, productsCategory } from '../API/API';
import { useParams } from 'react-router-dom';
import { SkeletonCard } from '../SkeletonCard/SkeletonCard';
import './ProductsContainer.css'


export function ProductsContainer () {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);

    const { category } = useParams()

   useEffect(() => {
    async function loadProducts() {
        setLoading(true);
        try {
            const res = await getProducts();
            const allProducts = res.data;

            if (category) {
                const productsFilter = allProducts.filter(el => 
                    el.category_name === category
                );
                setProducts(productsFilter);
            } else {
                setProducts(allProducts);
            }
        } catch (err) {
            console.error("Error loading products:", err);
        } finally {
            setLoading(false);
        }
    }
    loadProducts();
}, [category]);
    
    
    return (
        <div className="container mt-4">
            <h2 className="text-center">{category ? `Category - ${category}` : "All Products"}</h2>
        <div className="products-grid">
            {loading 
                    ? [1, 2, 3, 4, 5, 6].map(n => <SkeletonCard key={n} />) 
                    : products.map(p => <ProductsCard key={p.id} {...p} />)
                }
            </div>
            {products.length === 0 && !loading && (
                <p className="text-center mt-5">No products found in this category.</p>
            )}
        </div>
    )
}

import React from "react";
import Product from "./Product";
import "./ProductList.css";

const ProductList = ({ products, className }) => {
  if (!products || products.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <ul className={`product-list-container ${className}`}>
      {products.map((product) => (
        <li key={product.id} className="product-item">
          <Product
            key={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageName={product.imageName}
            imageDescription={product.imageDescription}
            discountValue={product.discountValue}
            discountType={product.discountType}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;

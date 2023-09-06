import DiscountBadge from "./DiscountBadge";
import "./Product.css";

const Product = ({
  name,
  description,
  price,
  imageName,
  imageDescription,
  discountType,
  discountValue,
}) => {
  return (
    <div className="product">
      <div className="card">
        <div>
          {imageName ? (
            <img
              src={`./img/${imageName}`}
              alt={imageDescription}
              className="product-image"
            />
          ) : (
            <img
              src="./img/cat-photo-default.jpg"
              alt="Default product cat"
              className="product-image"
            />
          )}
          {(discountValue !== null || discountType) && (
            <DiscountBadge
              className="badge"
              discountValue={discountValue}
              discountType={discountType}
            />
          )}
        </div>
        <h2 className="product-name">{name}</h2>
        <p className="product-price">Price {price}</p>
        <p data-testid="product-description">{description}</p>
        <button className="button">Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;

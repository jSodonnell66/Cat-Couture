import "./DiscountBadge.css";

const DiscountBadge = ({ discountType, discountValue, className }) => {
  if (!discountType) {
    return null;
  }

  return (
    <div className={`${className || ""} discountBadge`} data-testid="badge">
      {discountType === "percentage off" && (
        <span className="discountPercentage">{discountValue} % off</span>
      )}
      {discountType === "fixed amount off" && (
        <span className="discountFixedAmount">$ {discountValue} off</span>
      )}
    </div>
  );
};

export default DiscountBadge;

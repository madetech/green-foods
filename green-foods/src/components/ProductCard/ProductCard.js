import H1 from '../typography/H1/H1';
import P from '../typography/P/P';

const ProductCard = ({ carbonTotal, imgSrc, productName }) => {
  return (
    <>
      <img src={imgSrc} alt={productName} />
      <H1 title={productName} />
      <P text={`${Math.round(carbonTotal * 100)}g CO² per 100g of product`} />
    </>
  );
};

export default ProductCard;

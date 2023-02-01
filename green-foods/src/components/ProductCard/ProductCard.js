import H1 from '../typography/H1/H1';
import P from '../typography/P/P';
import './ProductCard.css';

const ProductCard = ({ carbonTotal, imgSrc, productName }) => {
  return (
    <div className='card'>
      <img src={imgSrc} alt={productName} />
      <H1 title={productName} />
      <P text={`${Math.round(carbonTotal * 100)}g CO² per 100g of product`} />
    </div>
  );
};

export default ProductCard;

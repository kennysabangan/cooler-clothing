import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card';
import { CategoryPreviewContainer, Preview, Title } from './category-preview.styles.jsx';

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Link to={`${title}`}><Title>{title.toUpperCase()}</Title></Link>
      </h2>
      <Preview>
        {
          products
            .filter((_, idx) => idx < 4)
            .map((product) =>
              <ProductCard key={product.id} product={product} />)
        }
      </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview;
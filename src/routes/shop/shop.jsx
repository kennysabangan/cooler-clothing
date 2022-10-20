import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview';
import Category from '../category/category';

const Shop = () => {
  return (
    <div>
      <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=":category" element={<Category />} />
      </Routes>
    </div>
  )
}

export default Shop;
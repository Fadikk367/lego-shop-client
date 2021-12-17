import React from 'react';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import { Product } from '../api/Product';
import ProductCard from './ProductCard';

interface RecommendedProductsProps {
  title: string;
  products: Product[];
  itemWidth?: number;
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ title, products, itemWidth }) => {
  return (
    <Stack direction="column" spacing={2} width="100%" marginY={2}>
      <Divider />
      <Typography variant="h5" component="h5">{title}</Typography>
      <Stack direction="row" spacing={2} height="460px">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} width={itemWidth} />
        ))}
      </Stack>
      <Divider />
    </Stack>
  )
}

export default RecommendedProducts;

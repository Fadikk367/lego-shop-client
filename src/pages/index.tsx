import * as React from 'react';
import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../components/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import ProductCard from '../components/ProductCard';
import ProductCategories from '../components/ProductCategories';
import RecommendedProducts from '../components/RecommendedProducts';
import { useQuery } from 'react-query';

import productApi from '../api/Product';

const Home: NextPage = () => {
  const {isLoading, data: products} = useQuery('products', productApi.getAll, { cacheTime: 5 });
  const {isLoading: isLoadingRated, data: productsRated} = useQuery('products-rated', productApi.mostRated, { cacheTime: 5 });

  const productItems = products ? products.map(product => (
    <Grid item xs={4} key={product.id}>
      <ProductCard {...product} />
    </Grid>
  )) : null;

  const skeleton = [
    <Grid item xs={4} key="skeleton-01">
      <ProductCard.Skeleton />
    </Grid>,
    <Grid item xs={4} key="skeleton-02">
      <ProductCard.Skeleton />
    </Grid>,
    <Grid item xs={4} key="skeleton-03">
      <ProductCard.Skeleton />,
    </Grid>,
  ];

  return (
    <Box
      sx={{
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to our store
      </Typography>
      <RecommendedProducts title="Products with highest ratings:" products={productsRated || []} itemWidth={270}/>
      <Stack direction="row" spacing={3}>
        <ProductCategories />
        <Box flex={1}>
          <Grid container spacing={3}>
            {isLoading ? (
              skeleton
            ) : (
              productItems
            )}
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;

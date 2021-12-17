import React, { useState } from 'react';
import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../components/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';

import ProductCard from '../components/ProductCard';
import ProductCategories from '../components/ProductCategories';

import AddCategoryDialog from '../components/AddCategoryDialog';
import AddProductDialog from '../components/AddProductDialog';
import { useQuery } from 'react-query';

import productApi from '../api/Product';

const Admin: NextPage = () => {
  const {isLoading, data: products} = useQuery('products', productApi.getAll, { cacheTime: 5 });
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  const openCategoryModal = (): void => setIsCategoryDialogOpen(true);
  const closeCategoryModal = (): void => setIsCategoryDialogOpen(false);

  const openProductModal = (): void => setIsProductDialogOpen(true);
  const closeProductModal = (): void => setIsProductDialogOpen(false);

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
        Welcome to admin panel of your LEGO shop
      </Typography>
      <Stack direction="row" spacing={3}>
        <Stack sx={{ width: '100%', maxWidth: 300 }}>
          <ProductCategories />
          <Button 
            variant="contained" 
            endIcon={<AddIcon />} 
            onClick={openCategoryModal}
          >
            Add category
          </Button>
        </Stack>
        <Stack padding={3} rowGap={3}>
          <Button 
            variant="contained" 
            endIcon={<AddIcon />} 
            sx={{width: '300px'}} 
            onClick={openProductModal}
          >
            Add product
          </Button>
          <Grid container spacing={3}>
            {products && products.map(product => (
              <Grid item xs={4} key={product.id}>
                <ProductCard {...product} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
      <AddCategoryDialog isOpen={isCategoryDialogOpen} handleClose={closeCategoryModal} />
      <AddProductDialog isOpen={isProductDialogOpen} handleClose={closeProductModal} />
    </Box>
  );
};

export default Admin;
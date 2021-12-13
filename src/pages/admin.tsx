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

const Admin: NextPage = () => {
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  const openCategoryModal = (): void => setIsCategoryDialogOpen(true);
  const closeCategoryModal = (): void => setIsCategoryDialogOpen(false);

  const openProductModal = (): void => setIsProductDialogOpen(true);
  const closeProductModal = (): void => setIsProductDialogOpen(false);

  const products = [
    {
      id: 1,
      name: 'Corner Garage',
      category: 'Creator Expert',
      imageUrl: 'https://www.lego.com/cdn/cs/set/assets/blt1b902998b4c4b12d/10264.jpg?fit=bounds&format=webply&quality=80&width=320&height=320&dpr=1.5',
      price: 199.99,
      minifigures: 6,
      elements: 2565,
    },
    {
      id: 2,
      name: 'Boutique Hotel',
      category: 'Creator Expert',
      imageUrl: 'https://www.lego.com/cdn/cs/set/assets/blt62f99776b13a8e94/10297.png?fit=bounds&format=webply&quality=80&width=320&height=320&dpr=1.5',
      price: 199.99,
      minifigures: 7,
      elements: 3066,
    },
    {
      id: 3,
      name: 'Assembly Square',
      category: 'Creator Expert',
      imageUrl: 'https://www.lego.com/cdn/cs/set/assets/blt2a117fd004a11d91/10255.jpg?fit=bounds&format=webply&quality=80&width=320&height=320&dpr=1.5',
      price: 279.99,
      minifigures: 10,
      elements: 4002,
    },
    {
      id: 4,
      name: 'Police Station',
      category: 'Creator Expert',
      imageUrl: 'https://www.lego.com/cdn/cs/set/assets/blt3f0fc22667e87e02/10278.jpg?fit=bounds&format=webply&quality=80&width=320&height=320&dpr=1.5',
      price: 199.99,
      minifigures: 5,
      elements: 2923,
    },
    {
      id: 5,
      name: 'Bookshop',
      category: 'Creator Expert',
      imageUrl: 'https://www.lego.com/cdn/cs/set/assets/blt6e02eacd8f3ffb9c/10270.jpg?fit=bounds&format=webply&quality=80&width=320&height=320&dpr=1.5',
      price: 179.99,
      minifigures: 5,
      elements: 2504,
    },
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
            {products.map(product => (
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
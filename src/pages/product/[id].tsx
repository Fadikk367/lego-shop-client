import React from 'react';
import { useRouter } from 'next/router';

import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../../components/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ProductCard from '../../components/ProductCard';
import PersonIcon from '@mui/icons-material/Person';
import ExtensionIcon from '@mui/icons-material/Extension';
import ClassIcon from '@mui/icons-material/Class';
import useOrder from '../../hooks/useOrder';

const Product: React.FC = () => {
  const router = useRouter();
  const {addToCart} = useOrder();

  console.log(router.query);

  const product = {
    id: 1,
    name: 'Corner Garage',
    category: 'Creator Expert',
    imageUrl: 'https://www.lego.com/cdn/cs/set/assets/blt1b902998b4c4b12d/10264.jpg?fit=bounds&format=webply&quality=80&width=320&height=320&dpr=1.5',
    price: 199.99,
    minifigures: 6,
    elements: 2565,
  };

  return (
    <Stack direction="column" spacing={5}>
      <Stack direction="row">
        <Box flex={1}>
          <img src={product.imageUrl} alt=""/>
        </Box>
        <Stack direction="column" flex={1} spacing={3}>
          <Typography variant="h4" component="h5">{product.name}</Typography>
          <Typography variant="h4" component="h5">{product.price} $</Typography>
          <Button variant="contained" onClick={() => addToCart(product)}>
            Add to cart
          </Button>
          <Stack direction="row" width="100%" spacing={3}>
            <Stack direction="column" alignItems="center" spacing={2}>
              <ExtensionIcon sx={{fontSize: '36px'}} />
              <Typography variant="h5">{product.elements}</Typography>
              <Typography variant="body1">elements</Typography>
            </Stack>
            <Divider orientation='vertical' />
            <Stack direction="column" alignItems="center" spacing={2}>
              <PersonIcon sx={{fontSize: '36px'}} />
              <Typography variant="h5">{product.minifigures}</Typography>
              <Typography variant="body1">minifigures</Typography>
            </Stack>
            <Divider orientation='vertical' />
            <Stack direction="column" alignItems="center" spacing={2}>
              <ClassIcon sx={{fontSize: '36px'}} />
              <Typography variant="h5">{product.category}</Typography>
              <Typography variant="body1">category</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Typography variant="h5" component="h5">Recommended for you:</Typography>
      <Stack direction="row" spacing={2}>
        <ProductCard {...product} />
        <ProductCard {...product} />
        <ProductCard {...product} />
        <ProductCard {...product} />
        <ProductCard {...product} />
      </Stack>
    </Stack>
  )
}

export default Product;

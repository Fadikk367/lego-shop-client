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

import productApi from '../../api/Product';
import { useQuery } from 'react-query';
import ClientsAlsoBought from '../../components/ClientsAlsoBought';

const Product: React.FC = () => {
  const router = useRouter();
  const id = parseInt(router.query.id as string);
  const {isLoading, data: product} = useQuery(`product-${id}`, () => productApi.getOne(id), { cacheTime: 5 });

  const {addToCart} = useOrder();

  return (
    <Stack direction="column" spacing={5}>
      {!isLoading && product ? (
        <Stack direction="row">
          <Box flex={3}>
            <img src={product.imageUrl} alt=""/>
          </Box>
          <Stack direction="column" flex={2} spacing={3}>
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
      ) : null}
      <ClientsAlsoBought productId={id} />
    </Stack>
  )
}

export default Product;

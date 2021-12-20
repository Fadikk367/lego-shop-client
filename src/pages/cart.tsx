import * as React from 'react';
import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import ProductItem from '../components/ProductItem';
import Button from '@mui/material/Button';
import useOrder from '../hooks/useOrder';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';

const Cart: NextPage = () => {
  const auth = useAuth();
  const {items, placeOrder} = useOrder();
  const router = useRouter();

  const totalPrice = items.reduce((total, item) => total + item.price, 0.0);

  const handlePlaceOrder = async () => {
    try {
      await placeOrder();
      router.push('/profile');
    } catch (_) {}
  }

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
        Your order:
      </Typography>
      <Stack direction="row" width="100%" spacing={3} marginTop={4}>
        <Stack direction="column" spacing={1} flex={1} rowGap={2}>
          {items.map(item => (
            <ProductItem key={item.id} {...item} />
          ))}
        </Stack>
        <Stack direction="column" width="500px">
          <Card sx={{ padding: 2}} elevation={3}>
            <Typography variant="h5" component="h5" width="100%">
              Summary:
            </Typography>
            <Typography sx={{paddingTop: '20px'}} variant="body1" component="p" width="100%">
              Items: {items.length}
            </Typography>
            <Typography sx={{paddingTop: '20px'}} variant="body1" component="p" width="100%">
              Total: {totalPrice}
            </Typography>
            <Button 
              variant="contained" 
              onClick={handlePlaceOrder} 
              sx={{marginTop: '40px'}} 
              fullWidth 
              disabled={!auth.user || items.length === 0}
            >
              Place order
            </Button>
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Cart;

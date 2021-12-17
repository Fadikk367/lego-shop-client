import * as React from 'react';
import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import ProductItem from '../components/ProductItem';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import orderApi from '../api/Order';
import productApi from '../api/Product';
import useAuth from '../hooks/useAuth';
import OrderPreview from '../components/OrderPreview';

const Profile: NextPage = () => {
  const auth = useAuth();
  const router = useRouter();
  const {isLoading, data: orders, refetch} = useQuery('orders', () => orderApi.getHistory(auth?.user?.id as number), { cacheTime: 5 })


  const handleRateProduct = async (productId: number, rate:number) => {
    try {
      await productApi.rate(productId, auth?.user?.id as number, rate);
      refetch();

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
        Your profile:
      </Typography>
      <Stack direction="row" width="100%" spacing={3} marginTop={4}>
        <Stack direction="column" spacing={1} flex={1} rowGap={2}>
          {orders && orders.map(order => (
            <OrderPreview key={order.id} order={order} onProductRate={handleRateProduct} />
          ))}
        </Stack>
        <Stack direction="column" width="500px">
          {/* <Card sx={{ padding: 2}} elevation={3}>
            <Typography variant="h5" component="h5" width="100%">
              Summary:
            </Typography>
            <Typography sx={{paddingTop: '20px'}} variant="body1" component="p" width="100%">
              Items: {items.length}
            </Typography>
            <Typography sx={{paddingTop: '20px'}} variant="body1" component="p" width="100%">
              Total: {totalPrice}
            </Typography>
            <Button variant="contained" onClick={handlePlaceOrder} sx={{marginTop: '40px'}} fullWidth>Place order</Button>
          </Card> */}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Profile;

import * as React from 'react';
import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import orderApi from '../api/Order';
import productApi from '../api/Product';
import useAuth from '../hooks/useAuth';
import OrderPreview from '../components/OrderPreview';
import RecommendedForMe from '../components/RecommendedForMe';

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
        Profile
      </Typography>
      <Stack>
        <RecommendedForMe userId={auth.user?.id as number} />
      </Stack>
      <Typography variant="h5" component="h5" gutterBottom>
        Order history
      </Typography>
      <Stack direction="row" width="100%" spacing={3} marginTop={4}>
        <Stack direction="column" spacing={1} flex={1} rowGap={2}>
          {orders && orders.map(order => (
            <OrderPreview key={order.id} order={order} onProductRate={handleRateProduct} />
          ))}
        </Stack>
        <Stack direction="column" width="500px">
          <Card sx={{ padding: 2}} elevation={3}>
            <Typography variant="h5" component="h5" width="100%">
              Your account
            </Typography>
            <Typography sx={{paddingTop: '20px'}} variant="body1" component="p" width="100%">
              {auth.user?.name}
            </Typography>
            <Typography sx={{paddingTop: '20px'}} variant="body1" component="p" width="100%">
              {auth.user?.email}
            </Typography>
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Profile;

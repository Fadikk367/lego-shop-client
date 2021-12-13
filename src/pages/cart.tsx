import * as React from 'react';
import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../components/Link';
import Stack from '@mui/material/Stack';

import ProductItem from '../components/ProductItem';
import Button from '@mui/material/Button';
import useOrder from '../hooks/useOrder';

const Cart: NextPage = () => {
  const {items, placeOrder} = useOrder();

  const totalPrice = items.reduce((total, item) => total + item.price, 0.0);

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
        Your products:
      </Typography>
      <Link href="/" color="secondary">
        Continue shopping
      </Link>
      <Stack direction="column" spacing={1} width="100%">
        {items.map(item => (
          <ProductItem key={item.id} {...item} />
        ))}
      </Stack>
      <Typography sx={{paddingTop: '20px'}} variant="body1" component="p" width="100%">
        Total: {totalPrice}
      </Typography>
      <Button variant="contained" onClick={placeOrder}>Submit</Button>
    </Box>
  );
};

export default Cart;

import React from 'react'

import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from './Link';

import { Order } from '../api/Order';

interface OrderPreviewProps {
  order: Order;
  onProductRate(productId: number, rate: number): Promise<void>;
}

const OrderPreview: React.FC<OrderPreviewProps> = ({ order, onProductRate }) => {
  return (
    <Card elevation={3}>
      <Stack direction="row" padding={2} justifyContent="space-between" bgcolor="#556cd6">
        <Typography color="white">
          {new Date(order.time).toLocaleString()}
        </Typography>
        <Typography  color="white">
        Amount: {order.products.reduce((total, item) => total + item.price, 0.0)} $
        </Typography>
      </Stack>
      <Stack rowGap={1}>
        {order.products.map(product => (
          <React.Fragment key={product.id}>
            <Stack direction="row" padding={1} justifyContent="space-between">
              <Stack direction="row">
                <img src={product.imageUrl} height="100%" width="120px" alt="" />
                <Stack padding={1} rowGap={1}>
                  <Link 
                    href={`/product/${product.id}`} 
                    sx={{ textDecoration: 'none', color: 'black', ':hover': {textDecoration: 'underline'} }}
                  >
                    <Typography fontSize={18} variant="h5" component="h3">
                      {product.name} ({product.id})
                    </Typography>
                  </Link>
                  <Typography fontSize={16} variant="h5" component="h3">
                    {product.price} $
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="column" rowGap={1} width={220} padding={1}>
                <Typography>
                  {product.rate ? 'Your rate:' : 'Please rate this product:'}
                </Typography>
                <Rating size="large" value={product.rate || 0} precision={0.5} onChange={(e, value) => onProductRate(product.id, value as number)}/>
              </Stack>
            </Stack>
            <Divider />
          </React.Fragment>
        ))}
      </Stack>
    </Card>
  );
}

export default OrderPreview;

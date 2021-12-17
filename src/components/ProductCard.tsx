import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Skeleton from '@mui/material/Skeleton';

import Link from './Link';
import useOrder from '../hooks/useOrder';
import React from 'react';

interface ProductCardProps {
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  id: number;
  minifigures: number;
  elements: number;
  width?: number;
}

const ProductCard: React.FC<ProductCardProps> & { Skeleton: React.FC } = ({width, ...product}) => {
  const {id, name, price, imageUrl} = product;
  const {addToCart, items} = useOrder();

  const isAlreadyInCart = items.some(item => item.id === id);

  return (
    <Card sx={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', width: width || 'auto' }} elevation={3}>
      <CardMedia
        component="img"
        width="auto"
        
        image={imageUrl}
        alt="green iguana"
      />
      <CardContent sx={{ padding: 0, marginTop: 'auto' }}>
        <Link 
          href={`/product/${id}`} 
          sx={{ textDecoration: 'none', color: 'black', ':hover': {textDecoration: 'underline'} }}
        >
          <Typography fontSize={18} variant="h5" component="h3">
            {name}
          </Typography>
        </Link>
        <Typography fontSize={20} fontWeight="bold">
          {price} $
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: 0 }}>
        <Button 
          variant="contained" 
          endIcon={<AddShoppingCartIcon />} 
          fullWidth 
          onClick={() => addToCart(product)}
          disabled={isAlreadyInCart}
        >
          {isAlreadyInCart ? 'Already in cart' : 'Add to cart'}
        </Button>
      </CardActions>
    </Card>
  )
};


const ProductCardSkeleton: React.FC = () => (
  <Card sx={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }} elevation={3}>
    <Skeleton variant="rectangular" height={300} />
    <CardContent sx={{ padding: 0, marginTop: 'auto' }}>
      <Skeleton variant="rectangular" width={140} height={28} sx={{marginBottom: '10px'}}/>
      <Skeleton variant="rectangular" width={90} height={24} />
    </CardContent>
    <CardActions sx={{ padding: 0 }}>
      <Skeleton variant="rectangular" width={320} height={40} />
    </CardActions>
  </Card>
);

ProductCard.Skeleton = ProductCardSkeleton;

export default ProductCard;

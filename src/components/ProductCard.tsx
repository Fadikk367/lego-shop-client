import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import Link from './Link';
import useOrder from '../hooks/useOrder';

interface ProductItemProps {
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  id: number;
  minifigures: number;
  elements: number;
}

const ProductItem: React.FC<ProductItemProps> = (product) => {
  const {id, name, price, imageUrl} = product;
  const {addToCart} = useOrder();

  return (
    <Card sx={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }} elevation={3}>
      <CardMedia
        component="img"
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
        <Button variant="contained" endIcon={<AddShoppingCartIcon />} fullWidth onClick={() => addToCart(product)}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  )
};

export default ProductItem;

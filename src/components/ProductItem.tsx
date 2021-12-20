import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import Link from './Link';
import useOrder from '../hooks/useOrder';
import { IconButton } from '@mui/material';

interface ProductItemProps {
  name: string;
  price: number;
  imageUrl: string;
  id: number;
}

const ProductItem: React.FC<ProductItemProps> = ({id, name, price, imageUrl}) => {
  const {removeFromCart} = useOrder();

  return (
    <Card sx={{ padding: '10px', display: 'flex', flexDirection: 'row', gap: '20px' }} elevation={3}>
      <CardMedia
        component="img"
        height="auto"
        sx={{ width: '100px'}}
        width="100px"
        image={imageUrl}
        alt="green iguana"
      />
      <CardContent sx={{ paddingTop: '16px', flex: 1,  }}>
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
        <IconButton onClick={() => removeFromCart(id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
};

export default ProductItem;

import React from 'react';
import { useForm, Controller } from 'react-hook-form'
import { useQuery } from 'react-query';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/system';

import axios from '../api';
import categoryApi from '../api/Category';
import productApi from '../api/Product';
interface AddCategoryDialogProps {
  isOpen: boolean;
  handleClose(): void;
}

interface AddProduct {
  name: string;
  categoryId: string;
  price: string;
  minifigures: string;
  elements: string;
  imageUrl: string;
}

const AddProductDialog: React.FC<AddCategoryDialogProps> = ({ isOpen, handleClose }) => {
  const {refetch} = useQuery('products', productApi.getAll, { cacheTime: 5 });
  const {handleSubmit, control, watch} = useForm<AddProduct>();
  const { data: categories } = useQuery('categories', categoryApi.getAll);

  const photoUrl = watch('imageUrl');

  const onValidData = async (values: AddProduct) => {
    if (!Object.values(values).some(value => !value)) {
      await axios.post('/products', {
        ...values,
        price: parseFloat(values.price),
        minifigures: parseInt(values.minifigures),
        elements: parseInt(values.elements),
      });
      refetch();
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xl">
      <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
        Add new product
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{width: 1000, height: 600}}>
        <Stack direction="row" height="100%">
          <Box sx={{ flex: 3, height: '100%', backgroundColor: photoUrl ? 'white' : 'gray' }}>
            {photoUrl && <img src={photoUrl} width="100%" height="auto" alt="photo" />}
          </Box>
          <Stack direction="column" spacing={2} padding={2} flex={2}>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="category-labe">Category</InputLabel>
                  <Select {...field} labelId="category-label" label="Category">
                    {categories && categories.map(category => (
                      <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="name"
              control={control}
              render={({ field }) => <TextField {...field} label="Product Name" />}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => <TextField {...field} label="Price" type="number" />}
            />
            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => <TextField {...field} label="Photo url" />}
            />
            <Controller
              name="elements"
              control={control}
              render={({ field }) => <TextField {...field} label="Elements" type="number" />}
            />
            <Controller
              name="minifigures"
              control={control}
              render={({ field }) => <TextField {...field} label="Minifigures" type="number" />}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{padding: 2}}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onValidData)}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProductDialog;

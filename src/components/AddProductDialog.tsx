import React, { useState } from 'react';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/system';

import { useForm, Controller } from 'react-hook-form'

interface AddCategoryDialogProps {
  isOpen: boolean;
  handleClose(): void;
}

interface AddProduct {
  name: string;
  category: string;
  price: number;
  minifigures: number;
  elements: number;
  imageUrl: string;
}

const AddProductDialog: React.FC<AddCategoryDialogProps> = ({ isOpen, handleClose }) => {
  const {handleSubmit, control, watch} = useForm<AddProduct>();

  const photoUrl = watch('imageUrl');

  const onValidData = (values: AddProduct) => {
    if (!Object.values(values).some(value => !value)) {
      console.log('VALID DATA', values);
    } else {
      console.log('INVALID DATA');
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
              name="category"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="category-labe">Category</InputLabel>
                  <Select {...field} labelId="category-label" label="Category">
                    <MenuItem value={'1'}>Creator Expert</MenuItem>
                    <MenuItem value={'2'}>City</MenuItem>
                    <MenuItem value={'3'}>Technic</MenuItem>
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

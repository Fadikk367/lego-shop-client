import React, { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import categoryApi from '../api/Category';
import { useQuery } from 'react-query';

interface AddCategoryDialogProps {
  isOpen: boolean;
  handleClose(): void;
}

const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({ isOpen, handleClose }) => {
  const {refetch} = useQuery('categories', categoryApi.getAll, { cacheTime: 5 });
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = async () => {
    if (categoryName) {
       await categoryApi.add(categoryName);
      refetch();
      handleClose();
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} >
      <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
        Add new category
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Stack direction="column" width={600} height={160} rowGap={3} padding={3} justifyContent="space-between">
        <TextField value={categoryName} onChange={(e) => setCategoryName(e.target.value)} label="category name"/>
        <Button variant="contained" onClick={handleAddCategory} sx={{ width: 200, alignSelf: 'flex-end' }}>
          Submit
        </Button>
      </Stack>
    </Dialog>
  );
}

export default AddCategoryDialog;

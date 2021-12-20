import { NextPage } from 'next'
import React from 'react';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { Credentials, UserData } from '../api/Auth';

const Login: NextPage = () => {
  const {handleSubmit, control} = useForm<Credentials>();
  const auth = useAuth();
  const router = useRouter();

  const onValidData = async (values: UserData): Promise<void> => {
    if (!Object.values(values).some(value => !value)) {
      await auth.login(values.email, values.password);
      router.push('/');
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card elevation={3}>
        <Stack spacing={3} padding={3}>
          <Typography variant="h5" component="h5" gutterBottom textAlign="center">Login to your account</Typography>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <TextField {...field} label="email" />}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => <TextField {...field} label="password" type="password" />}
          />
          <Stack direction="row" columnGap={3} justifyContent="space-between">
            <Button onClick={() => router.push('/register')}>
              Don&apos;t have account yet?
            </Button>
            <Button variant="contained" onClick={handleSubmit(onValidData)}>
              Login
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Box>
  )
}

export default Login;

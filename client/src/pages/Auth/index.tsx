import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { signin, signup } from '../../actions/auth';

import useStyles from './styles';

const validationSchema = Yup.object().shape({
  // firstName: Yup.string().required('First name is required'),
  // lastName: Yup.string()
  //   .required('Last name is required'),

  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 30 characters'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Confirm Password does not match'
  ),
});
const SignUp: FC = () => {
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const onSubmit = (data: any) => {
    console.log('🚀 ~ file: index.tsx ~ line 69 ~ onSubmit ~ data', data);
    if (isSignup) {
      dispatch(signup(data, navigate));
    } else {
      dispatch(signin(data, navigate));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? 'Sign up' : 'Sign in'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
                    fullWidth
                    label="First Name"
                    autoFocus
                    margin="dense"
                    {...register('firstName')}
                    error={errors.firstName ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.firstName?.message}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
                    fullWidth
                    label="Last Name"
                    autoFocus
                    margin="dense"
                    {...register('lastName')}
                    error={errors.firstName ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.lastName?.message}
                  </Typography>
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={12}>
              <TextField
                variant="standard"
                fullWidth
                label="Email Address"
                type="email"
                margin="dense"
                {...register('email')}
                error={errors.email ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="standard"
                fullWidth
                label="Password"
                type="password"
                margin="dense"
                {...register('password')}
                error={errors.password ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
            </Grid>
            {isSignup && (
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="standard"
                  fullWidth
                  hiddenLabel
                  label="Repeat Password"
                  margin="dense"
                  {...register('confirmPassword')}
                  error={errors.confirmPassword ? true : false}
                  type="password"
                />

                <Typography variant="inherit" color="textSecondary">
                  {errors.confirmPassword?.message}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;

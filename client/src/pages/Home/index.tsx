import { Grid } from '@material-ui/core';
import React from 'react'

const Home = () => {
    let storage:any = localStorage.getItem('profile')
  const user = JSON.parse(storage);
    return <Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="center"
>WelCome {user?.result.name}</Grid>
    
}

export default Home

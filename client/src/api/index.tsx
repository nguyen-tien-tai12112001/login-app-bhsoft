import axios from 'axios';

const API = axios.create({ baseURL: 'https://server-a36643.herokuapp.com/' });

API.interceptors.request.use((req:any) => {
    let profile:any = localStorage.getItem('profile')
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(profile).token
    }`;
  }
  return req;
});

export const signIn = (formData:any) => API.post('/user/signin', formData);
export const signUp = (formData:any) => API.post('/user/signup', formData);

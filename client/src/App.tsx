
import Auth from './pages/Auth';
import Home from './pages/Home';
import { Container } from '@material-ui/core';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar';

const App = () => {
  let storage: any = localStorage.getItem('profile');
  const user = JSON.parse(storage);

  return (
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

        <Route
          path="/auth"
          element={!user ? <Auth /> : <Navigate to="/home" />}
        />
      </Routes>
    </Container>
  );
};

export default App;

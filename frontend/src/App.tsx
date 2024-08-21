import React from 'react';
import './App.css';
import { Login } from './pages/auth/login';
import { Route, Routes, useRoutes } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import { Register } from './pages/auth/register';
import router from './router';
import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const content = useRoutes(router);
  return (
    <div className="App">
      <ThemeProvider>
        <CssBaseline />
        {content}
        <ToastContainer />
      </ThemeProvider>
    </div>
    // <div className="App">
    //   {content}
    //   {/* <Routes>
    //     <Route
    //       path="/"
    //       element={
    //         <PrivateRoute>
    //           <></>
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //   </Routes> */}
    // </div>
  );
}

export default App;

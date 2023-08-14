import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import store from './store';
import LoadingPage from './services/UI/LoadingPage';
import CustomerPage from './pages/CustomerPage';
import LoginPage from './pages/AuthPage/LoginPage';
import AuthLayout from './layout/AuthLayout';
import { PATH } from './utils/paths';
import ScoreboardPage from './pages/ScoreboardPage';

function AppUI() {
  // const { loading, shield } = useRefreshToken();
  // if (loading) return null;

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/private' element={shield(AppLayout)}> */}
        <Route path='/private' element={<AppLayout/>}>
          <Route path='dashboards' element={<DashboardPage />} />
          <Route path='customers' element={<CustomerPage />} />
          <Route path={PATH._PRIVATE._STUDENT._SCOREBOARD} element={<ScoreboardPage />} />
        </Route>
        <Route path='/auth' element={<AuthLayout/>}>
          <Route path='login' element={<LoginPage/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppUI />
      <LoadingPage />
    </Provider>
  );
}

export default App;

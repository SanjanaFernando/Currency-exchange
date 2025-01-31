import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExchangeRateTable from './CoinsValueConverter';
import TransactionPage from './TransactionPage';
import ExchangeRatesCalculator from './ExchangeRatesCalculator';
import Home from './Home';
import LoginPage from './LoginPage';
import SignInPage from './SignInPage';
import UserInfoPage from './UserInfoPage';
import ProtectedRoute from './ProtectedRoute';
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/exchange" element={
              <ProtectedRoute>
                <ExchangeRateTable />
              </ProtectedRoute>
            } />
            <Route path="/transaction" element={
              <ProtectedRoute>
                <TransactionPage />
              </ProtectedRoute>
            } />
            <Route path="/exchange-rates" element={
              <ProtectedRoute>
                <ExchangeRatesCalculator />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignInPage />} />
            <Route path="/userinfo/:userId" element={
              <ProtectedRoute>
                <UserInfoPage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

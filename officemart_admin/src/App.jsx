
import { Routes, Route, Navigate } from 'react-router-dom';

import ProductList from './pages/ProductList.jsx';
import ProductFormPage from './pages/ProductFormPage.jsx';

import './App.css';

export default function App() {
  return (
    <>
      <header className="header">
        OfficeMart Admin
      </header>

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/products" replace />}
        />

        <Route
          path="/products"
          element={<ProductList />}
        />

        <Route
          path="/products/new"
          element={<ProductFormPage />}
        />

        <Route
          path="/products/:id/edit"
          element={<ProductFormPage />}
        />
      </Routes>
    </>
  );
}

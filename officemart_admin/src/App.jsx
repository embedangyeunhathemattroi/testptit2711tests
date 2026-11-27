import { Routes, Route, Navigate } from 'react-router-dom';
import ProductTable from './components/ProductTable.jsx';
import sampleProducts from './data/sample.js';

function ProductList() {
  return (
    <main className="container">
      <div className="page-heading">
        <h1>Sản phẩm</h1>

        <button
          className="add-btn"
          data-testid="add-button"
        >
          Thêm sản phẩm
        </button>
      </div>

      <ProductTable products={sampleProducts} />
    </main>
  );
}

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
      </Routes>
    </>
  );
}

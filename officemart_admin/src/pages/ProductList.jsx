
import { useState, useEffect } from 'react';
import {
  useNavigate,
  useSearchParams
} from 'react-router-dom';

import api from '../api/axiosClient.js';
import ProductTable from '../components/ProductTable.jsx';
import ProductFilters from '../components/ProductFilters.jsx';
import Pagination from '../components/Pagination.jsx';
import useProductSearch from '../hooks/useProductSearch.js';

export default function ProductList() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const status = searchParams.get('status') || '';

  const rawPage = Number(searchParams.get('page') || 1);

  const page =
    Number.isInteger(rawPage) && rawPage > 0
      ? rawPage
      : 1;

  const [keyword, setKeyword] = useState(q);
  const [categories, setCategories] = useState([]);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState('');

  const {
    products,
    total,
    loading,
    error,
    retry
  } = useProductSearch({
    q,
    category,
    status,
    page
  });

  // Lay danh muc
  useEffect(() => {
    api.get('/categories')
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Dong bo tu khoa tu URL
  useEffect(() => {
    setKeyword(q);
  }, [q]);

  // Tim kiem sau 400ms
  useEffect(() => {
    if (keyword.trim() === q) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (keyword.trim()) {
        params.set('q', keyword.trim());
      } else {
        params.delete('q');
      }

      params.set('page', '1');
      setSearchParams(params);
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword, q, searchParams, setSearchParams]);

  // Tu dong an thong bao
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  function changeFilter(name, value) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    params.set('page', '1');
    setSearchParams(params);
  }

  function changePage(newPage) {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(newPage));
    setSearchParams(params);
  }

  function handleEdit(id) {
    navigate(`/products/${id}/edit`);
  }

  async function handleDelete() {
    setDeleting(true);

    try {
      await api.delete(`/products/${deleteId}`);

      setDeleteId(null);
      setToast('Đã xoá sản phẩm');

      if (products.length === 1 && page > 1) {
        changePage(page - 1);
      } else {
        retry();
      }
    } catch (err) {
      setToast('Không xoá được sản phẩm');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <main className="container">
      <div className="page-heading">
        <h1>Sản phẩm</h1>

        <button
          className="add-btn"
          data-testid="add-button"
          onClick={() => navigate('/products/new')}
        >
          Thêm sản phẩm
        </button>
      </div>

      <ProductFilters
        keyword={keyword}
        category={category}
        status={status}
        categories={categories}
        onSearch={setKeyword}
        onFilter={changeFilter}
      />

      {loading ? (
        <p data-testid="loading">
          Đang tải...
        </p>
      ) : error ? (
        <div className="error-box">
          <p data-testid="error-message">
            {error}
          </p>

          <button
            data-testid="retry-button"
            onClick={retry}
          >
            Thử lại
          </button>
        </div>
      ) : products.length === 0 ? (
        <p data-testid="empty-state">
          Không có sản phẩm
        </p>
      ) : (
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={setDeleteId}
        />
      )}

      {!loading && !error && (
        <Pagination
          page={page}
          total={total}
          onChange={changePage}
        />
      )}

      {deleteId !== null && (
        <div className="modal-overlay">
          <div
            className="confirm-dialog"
            data-testid="confirm-dialog"
          >
            <h3>Xác nhận xoá</h3>

            <p>Bạn có muốn xoá sản phẩm này không?</p>

            <div className="dialog-actions">
              <button
                data-testid="confirm-no"
                disabled={deleting}
                onClick={() => setDeleteId(null)}
              >
                Huỷ
              </button>

              <button
                className="delete-btn"
                data-testid="confirm-yes"
                disabled={deleting}
                onClick={handleDelete}
              >
                {deleting ? 'Đang xoá...' : 'Xoá'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast" data-testid="toast">
          {toast}
        </div>
      )}
    </main>
  );
}

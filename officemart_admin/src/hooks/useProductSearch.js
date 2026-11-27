
import { useState, useEffect } from 'react';
import api from '../api/axiosClient.js';

export default function useProductSearch({
  q = '',
  category = '',
  status = '',
  page = 1
}) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      setLoading(true);
      setError('');

      try {
        const res = await api.get('/products', {
          params: {
            q,
            category,
            status,
            page,
            limit: 10
          },
          signal: controller.signal
        });

        if (!controller.signal.aborted) {
          setProducts(res.data.data);
          setTotal(res.data.total);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError('Không tải được sản phẩm');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, [q, category, status, page, reload]);

  function retry() {
    setReload(old => old + 1);
  }

  return {
    products,
    total,
    loading,
    error,
    retry
  };
}

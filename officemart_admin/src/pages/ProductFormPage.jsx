
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <main className="container">
      <h1>
        {id ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
      </h1>

      <p>Form sản phẩm đang được hoàn thiện.</p>

      <button
        className="add-btn"
        onClick={() => navigate('/products')}
      >
        Quay lại danh sách
      </button>
    </main>
  );
}

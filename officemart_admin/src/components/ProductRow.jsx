
import { categoryNames } from '../data/sample.js';

export default function ProductRow({
  product,
  onEdit,
  onDelete
}) {
  const price = new Intl.NumberFormat('vi-VN')
    .format(product.price);

  const isActive = product.status === 'active';

  return (
    <tr data-testid="product-row">
      <td data-label="Tên">
        {product.name}
      </td>

      <td data-label="SKU">
        {product.sku}
      </td>

      <td data-label="Danh mục">
        {categoryNames[product.category] || product.category}
      </td>

      <td data-label="Giá">
        {price} ₫
      </td>

      <td data-label="Tồn kho">
        {product.stock === 0 ? (
          <span className="out-of-stock">
            Hết hàng
          </span>
        ) : (
          product.stock
        )}
      </td>

      <td data-label="Trạng thái">
        <span
          data-testid="product-status"
          className={isActive ? 'status active' : 'status inactive'}
        >
          {isActive ? 'Đang bán' : 'Ngừng bán'}
        </span>
      </td>

      <td data-label="Thao tác">
        <div className="actions">
          <button
            className="edit-btn"
            data-testid="edit-button"
            onClick={() => onEdit?.(product.id)}
          >
            Sửa
          </button>

          <button
            className="delete-btn"
            data-testid="delete-button"
            onClick={() => onDelete?.(product.id)}
          >
            Xoá
          </button>
        </div>
      </td>
    </tr>
  );
}

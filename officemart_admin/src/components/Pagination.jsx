
export default function Pagination({
  page,
  total,
  onChange
}) {
  const totalPages = Math.max(
    1,
    Math.ceil(total / 10)
  );

  return (
    <div
      className="pagination"
      data-testid="pagination"
    >
      <span>Tổng: {total} sản phẩm</span>

      <button
        data-testid="page-prev"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        Trước
      </button>

      <span data-testid="page-current">
        Trang {page}/{totalPages}
      </span>

      <button
        data-testid="page-next"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Sau
      </button>
    </div>
  );
}

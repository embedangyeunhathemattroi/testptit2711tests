
export default function ProductFilters({
  keyword,
  category,
  status,
  categories,
  onSearch,
  onFilter
}) {
  return (
    <div className="filters">
      <input
        type="text"
        data-testid="search-input"
        placeholder="Tìm theo tên hoặc SKU..."
        value={keyword}
        onChange={e => onSearch(e.target.value)}
      />

      <select
        data-testid="category-filter"
        value={category}
        onChange={e =>
          onFilter('category', e.target.value)
        }
      >
        <option value="">Tất cả danh mục</option>

        {categories.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <select
        data-testid="status-filter"
        value={status}
        onChange={e =>
          onFilter('status', e.target.value)
        }
      >
        <option value="">Tất cả trạng thái</option>
        <option value="active">Đang bán</option>
        <option value="inactive">Ngừng bán</option>
      </select>
    </div>
  );
}

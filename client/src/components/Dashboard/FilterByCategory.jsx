const FilterByCategory = ({ categoryFilter, setCategoryFilter, categories }) => (
  <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
    className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Categories</option>
    {categories.map((cat, i) => (
      <option key={i} value={cat}>
        {cat.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
      </option>
    ))}
  </select>
);

export default FilterByCategory;
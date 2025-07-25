import React from 'react';

const FilterByDate = ({ dateFilter, setDateFilter }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDateFilter(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium">Date From:</label>
      <input
        type="date"
        name="from"
        value={dateFilter.from || ''}
        onChange={handleChange}
        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <label className="text-sm font-medium">Date To:</label>
      <input
        type="date"
        name="to"
        value={dateFilter.to || ''}
        onChange={handleChange}
        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default FilterByDate;
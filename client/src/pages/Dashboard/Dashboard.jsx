import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, Filter, TrendingUp, DollarSign, CreditCard, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import TransactionTable from '../../components/Dashboard/TransactionTable';
import PieChart from '../../components/Dashboard/PieChart';
import BarChart from '../../components/Dashboard/BarChart';
import FilterByDate from '../../components/Dashboard/FilterByDate';
import FilterByCategory from '../../components/Dashboard/FilterByCategory';
import './Dashboard.css'; // Import the stylesheet
// import { use } from '../../../../server/config/nodemailer';
import ChatBot from '../ChatBot/ChatBot';


const Dashboard = () => {
  const [transactions, setTransactions] = useState([]); //Take all transactions
  const [filteredTransactions, setFilteredTransactions] = useState([]); //Filtered list
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: ''});

  useEffect(() => {
    axios.get('/api/transactions')
      .then(res => {
        const txns = res.data.transactions;
        setTransactions(txns); //save full list
        setFilteredTransactions(txns)

        const categories = Array.from(new Set(txns.map(txn => txn.category))).sort();
        setCategoryOptions(categories) //show all list at first
      })
      .catch(err => console.error('Error fetching transactions:', err));
  }, []);

  useEffect(() => {
    let result = [...transactions];

    // Filter by category
    if (categoryFilter) {
      result = result.filter(txn => txn.category === categoryFilter);
    }

    // Filter by date range
    if (dateFilter.from && dateFilter.to) {
      result = result.filter(txn => {
        const txnDate = new Date(txn.date);
        return txnDate >= new Date(dateFilter.from) && txnDate <= new Date(dateFilter.to);
      });
    }

    setFilteredTransactions(result); //update table
  }, [categoryFilter, dateFilter, transactions]);

  const totalIncome = useMemo(() => filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0), [filteredTransactions]);
  const totalExpenses = useMemo(() => filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0), [filteredTransactions]);
  const netAmount = totalIncome - totalExpenses;

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Transaction Dashboard</h1>
          <p className="dashboard-subtitle">Visualize your spendings and stay on top of your finances</p>
        </div>

        {/* Filters */}
        <div className="filters-grid-horizontal">
          <FilterByDate 
            dateFilter={dateFilter}
            setDateFilter={setDateFilter} 
          />
          <FilterByCategory
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter} 
            categories={categoryOptions}
          />
            <button
              onClick={() => {
                setDateFilter({ from: '', to: '' });
                setCategoryFilter('');
              }}
              className="clear-filters-btn"
            >
              Clear Filters
            </button>
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <PieChart data={filteredTransactions} />
          <BarChart data={filteredTransactions} />
        </div>

        {/* Transaction Table */}
        <TransactionTable transactions={filteredTransactions} />
        <ChatBot />
      </div>
    </div>
  );
};

export default Dashboard;
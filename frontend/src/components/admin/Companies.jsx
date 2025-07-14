import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
  useGetAllCompanies(); // fetch companies on mount
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // dispatch search input on change
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-5">
          <Input
            type="text"
            placeholder="Filter companies by name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full sm:max-w-sm"
          />

          <Button onClick={() => navigate('/admin/companies/create')}>
            + New Company
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-md p-4 border border-gray-100">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;

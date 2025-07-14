import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';


const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchJobByText(input));
    }, 300); // 300ms delay

    return () => clearTimeout(handler);
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 my-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <Input
            className="w-full md:w-[300px]"
            placeholder="Search by job title or company..."
            onChange={(e) => setInput(e.target.value)}
            aria-label="Search Jobs"
          />
          <Button onClick={() => navigate('/admin/jobs/create')}>
            + Post New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;

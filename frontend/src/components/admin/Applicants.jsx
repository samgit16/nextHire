import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${id}/applicants`, {
          withCredentials: true,
        });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to fetch applicants.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAllApplicants();
  }, [id, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold">
            Applicants{' '}
            <span className="text-gray-500 font-medium">
              ({applicants?.applications?.length || 0})
            </span>
          </h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Loading applicants...</span>
          </div>
        ) : (
          <ApplicantsTable />
        )}
      </div>
    </div>
  );
};

export default Applicants;

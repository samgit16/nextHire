import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';


const Browse = () => {
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(true);

  // Custom hook to fetch all jobs
  useGetAllJobs();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // optional: simulate loading delay

    return () => {
      dispatch(setSearchedQuery(''));
      clearTimeout(timeout);
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({allJobs.length})
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : allJobs.length === 0 ? (
          <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex flex-col items-center justify-center h-[70vh] text-center text-gray-600'
              >
                <img
                  src='https://cdn-icons-png.flaticon.com/512/7486/7486049.png'
                  alt='No jobs found'
                  className='w-40 h-40 mb-4 opacity-60'
                />
                <p className='text-xl font-semibold mb-2'>No jobs found</p>
              </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;

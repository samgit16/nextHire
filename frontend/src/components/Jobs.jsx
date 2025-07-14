import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

  // Filter salary range
  const isSalaryInRange = (salary, range) => {
    switch (range) {
      case '0-40k':
        return salary <= 0.4;
      case '42-1lakh':
        return salary > 0.42 && salary <= 1;
      case '1lakh to 6lakh':
        return salary > 1 && salary <= 6;
      case 'Above 6Lakh':
        return salary > 6;
      default:
        return true;
    }
  };

  useEffect(() => {
    let filtered = allJobs;

    if (searchedQuery) {
      const query = searchedQuery.toLowerCase();

      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(query) ||
        job.jobType.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.company.name.toLowerCase().includes(query) ||
        isSalaryInRange(job.salary, searchedQuery)
      );
    }

    setFilterJobs(filtered);
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 mt-6'>
        <div className='flex flex-col md:flex-row gap-5'>
          {/* Sidebar Filters */}
          <div className='w-full md:w-1/4'>
            <FilterCard />
          </div>

          {/* Job Listings */}
          <div className='w-full md:flex-1'>
            {filterJobs.length === 0 ? (
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
                <p className='text-sm'>Try adjusting filters or search keywords.</p>
              </motion.div>
            ) : (
              <div className='h-[85vh] overflow-y-auto pr-2'>
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-5'>
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;

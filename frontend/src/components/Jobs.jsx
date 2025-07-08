import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  function isSalaryInRange(salary, selectedRange) {
    switch (selectedRange) {
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
  }

  useEffect(() => {
    let filtered = allJobs;

    if (searchedQuery) {
      const query = searchedQuery.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.jobType.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
        // isSalaryInRange(job.salary, searchedQuery)
      );
    }

    setFilterJobs(filtered);
  }, [allJobs, searchedQuery]);
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-20%'>
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
              <div className='grid grid-cols-3 gap-4'>
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}>
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;

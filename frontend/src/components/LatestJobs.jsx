import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const topJobs = allJobs?.slice(0, 6);

  return (
    <div className='max-w-7xl mx-auto my-20 px-4'>
      <h1 className='text-4xl font-bold text-center md:text-left'>
        <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
      </h1>

      {topJobs.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8'>
          {topJobs.map((job) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <LatestJobCards job={job} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className='flex justify-center items-center h-40'>
          <p className='text-gray-500 font-medium text-lg border rounded-md px-4 py-2 shadow-sm bg-white'>
            🚫 No job openings found at the moment. Please check back later!
          </p>
        </div>
      )}
    </div>
  );
};

export default LatestJobs;

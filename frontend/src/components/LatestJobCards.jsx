import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200 }}
      onClick={() => navigate(`/description/${job._id}`)}
      className='p-5 rounded-xl shadow-md bg-white border hover:border-gray-300 cursor-pointer duration-200'
    >
      {/* Company Info */}
      <div>
        <h1 className='font-semibold text-lg text-gray-800'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>

      {/* Job Title & Description */}
      <div className='mt-3'>
        <h2 className='font-bold text-xl text-[#333]'>{job?.title}</h2>
        <p className='text-sm text-gray-600 mt-1 line-clamp-3'>{job?.description}</p>
      </div>

      {/* Badges */}
      <div className='flex flex-wrap items-center gap-2 mt-4'>
        <Badge className='text-blue-700 font-semibold' variant='ghost'>
          {job?.position} Positions
        </Badge>
        <Badge className='text-[#F83002] font-semibold' variant='ghost'>
          {job?.jobType}
        </Badge>
        <Badge className='text-[#7209b7] font-semibold' variant='ghost'>
          {job?.salary} LPA
        </Badge>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;

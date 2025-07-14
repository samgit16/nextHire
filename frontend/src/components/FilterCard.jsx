import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Button } from './ui/button';

const filterData = [
  {
    filterType: 'Location',
    array: [
      'Delhi NCR',
      'Bangalore',
      'Hyderabad',
      'Pune',
      'Mumbai',
      'Noida',
      'Gurugram',
    ],
  },
  {
    filterType: 'Industry',
    array: [
      'Frontend Developer',
      'Backend Developer',
      'FullStack Developer',
      'Mobile App Development',
      'AI',
      'Data Analyst',
    ],
  },
  {
    filterType: 'Salary',
    array: ['0-40k', '42-1lakh', '1lakh to 6lakh', 'Above 6Lakh'],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  const clearFilters = () => {
    setSelectedValue('');
  };

  return (
    <div className='w-full bg-white p-6 rounded-lg shadow-sm border'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='font-semibold text-xl text-gray-800'>Filter Jobs</h2>
        {selectedValue && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear
          </Button>
        )}
      </div>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((filter, fIndex) => (
          <div key={fIndex} className='mb-5'>
            <h3 className='text-gray-700 font-medium text-base mb-2'>
              {filter.filterType}
            </h3>
            <div className='grid grid-cols-1 gap-2 pl-2'>
              {filter.array.map((option, oIndex) => {
                const id = `${filter.filterType}-${option}`.replace(/\s+/g, '-').toLowerCase();
                return (
                  <div key={id} className='flex items-center space-x-2'>
                    <RadioGroupItem value={option} id={id} />
                    <Label htmlFor={id} className='text-gray-600 text-sm'>
                      {option}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;

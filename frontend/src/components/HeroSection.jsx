import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim() !== "") {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    }
  };

  return (
    <div className="text-center py-12 px-4 sm:px-6 md:px-10 bg-gradient-to-br from-white to-[#f9f9ff]">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <span className="mx-auto px-4 py-1.5 rounded-full bg-gray-100 text-[#F83002] text-sm font-semibold shadow">
          🚀 No. 1 Job Hunt Website
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A38C2] to-[#F83002]">Dream Jobs</span>
        </h1>

        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-2">
          No more endless searches. Just smart matches for your career goals.
        </p>

        <div className="flex flex-col sm:flex-row items-center w-full max-w-lg mx-auto border border-gray-300 rounded-full shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-[#6A38C2] transition-all">
          <input
            type="text"
            placeholder="Find your dream jobs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow w-full px-5 py-3 text-sm sm:text-base focus:outline-none bg-white"
          />
          {/* <Button
            onClick={searchJobHandler}
            className="w-full sm:w-auto rounded-none sm:rounded-r-full bg-[#6A38C2] hover:bg-[#582cad] px-5 py-3"
          >
            <Search className="h-5 w-5 text-white" />
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

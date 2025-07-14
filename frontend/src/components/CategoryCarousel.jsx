import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Briefcase } from 'lucide-react';

const categories = [
  'Frontend Developer',
  'Backend Developer',
  'FullStack Developer',
  'Data Science',
  'Graphic Designer',
  'Mobile Developer',
  'AI Engineer',
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="my-20 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        Explore by <span className="text-[#6A38C2]">Categories</span>
      </h2>
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent>
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 flex justify-center"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full px-4 py-2 hover:bg-[#6A38C2]/10 transition text-sm font-medium w-full"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;

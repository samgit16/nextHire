import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (createdAt) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diff = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "Today" : diff === 1 ? "1 day ago" : `${diff} days ago`;
  };

  return (
    <div className="p-5 rounded-xl shadow-sm bg-white border border-gray-100 hover:shadow-lg transition duration-300">
      {/* Date & Bookmark */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-gray-500">
          {daysAgoFunction(job?.createdAt)}
        </p>
        {/* <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark className="w-4 h-4" />
        </Button> */}
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-3">
        <Avatar>
          <AvatarImage
            src={job?.company?.logo || "https://via.placeholder.com/40"}
            alt={job?.company?.name}
          />
        </Avatar>
        <div>
          <h3 className="text-base font-semibold">{job?.company?.name}</h3>
          <p className="text-xs text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="my-2">
        <h2 className="text-lg font-bold text-gray-800">{job?.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <Badge variant="outline" className="text-blue-700 font-medium">
          {job?.position} Positions
        </Badge>
        <Badge variant="outline" className="text-[#F83002] font-medium">
          {job?.jobType}
        </Badge>
        <Badge variant="outline" className="text-[#7209b7] font-medium">
          ₹ {job?.salary} LPA
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto text-white hover:text-gray-50 bg-[#7209b7] hover:bg-[#5c0ca4]"
        >
          Details
        </Button>
        {/* <Button className="w-full sm:w-auto bg-[#7209b7] hover:bg-[#5c0ca4] transition">
          Save For Later
        </Button> */}
      </div>
    </div>
  );
};

export default Job;

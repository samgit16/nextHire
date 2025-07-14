import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";

const JobDetailRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row gap-2 my-2">
    <span className="font-medium text-gray-700 w-40">{label}:</span>
    <span className="text-gray-900 break-words">{value || "N/A"}</span>
  </div>
);

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [isApplied, setIsApplied] = useState(false);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedJob = {
          ...singleJob,
          applications: [
            ...(singleJob.applications || []),
            { applicant: user?._id },
          ],
        };
        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          const alreadyApplied = res.data.job.applications?.some(
            (a) => a.applicant === user?._id
          );
          setIsApplied(alreadyApplied);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchJob();
  }, [jobId, dispatch, user?._id]);

  console.log(singleJob);
  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto  mt-10 px-5 py-10 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {singleJob?.title || "Job Title"}
            </h1>
            {/* <p className="text-sm text-gray-500 mt-1">
            {singleJob?.company?.name || 'Company Name'}
          </p> */}

            <div className="flex flex-wrap gap-2 mt-3">
              <Badge className="bg-blue-100 text-blue-700 font-medium">
                {singleJob?.position || "N/A"} Position(s)
              </Badge>
              <Badge className="bg-red-100 text-red-600 font-medium">
                {singleJob?.jobType || "N/A"}
              </Badge>
              <Badge className="bg-purple-100 text-purple-700 font-medium">
                {singleJob?.salary || "N/A"} LPA
              </Badge>
            </div>
          </div>

          <Button
            onClick={!isApplied ? applyJobHandler : undefined}
            disabled={isApplied}
            className={`mt-4 sm:mt-0 px-6 py-2 rounded-md text-white font-medium transition ${
              isApplied
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-700 hover:bg-purple-800"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        <hr className="mb-6 border-gray-300" />

        {/* Job Details */}
        <div className="text-base leading-relaxed space-y-1">
          <JobDetailRow label="Role" value={singleJob?.title} />
          <JobDetailRow label="Location" value={singleJob?.location} />
          <JobDetailRow label="Description" value={singleJob?.description} />
          <JobDetailRow
            label="Experience"
            value={`${singleJob?.experienceLevel || "N/A"} yrs`}
          />
          <JobDetailRow
            label="Salary"
            value={`${singleJob?.salary || "N/A"} LPA`}
          />
          <JobDetailRow
            label="Total Applicants"
            value={singleJob?.position || 0}
          />
          <JobDetailRow
            label="Posted Date"
            value={singleJob?.createdAt?.split("T")[0] || "N/A"}
          />
        </div>
      </div>
    </>
  );
};

export default JobDescription;

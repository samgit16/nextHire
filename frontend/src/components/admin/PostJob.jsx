import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: '',
    companyId: '',
  });

  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((store) => store.company);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany?._id || '' });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.companyId) {
      return toast.error('Please select a company before submitting.');
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/jobs');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Job post failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 px-4">
        <form
          onSubmit={submitHandler}
          className="p-8 bg-white border border-gray-200 shadow-md rounded-md"
        >
          <h2 className="text-xl font-bold mb-6">Post a New Job</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="e.g. Frontend Developer"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Short job description"
                required
              />
            </div>
            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Input
                id="requirements"
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="Skills or qualifications"
                required
              />
            </div>
            <div>
              <Label htmlFor="salary">Salary (in LPA)</Label>
              <Input
                id="salary"
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="e.g. 6.5"
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="e.g. Bengaluru, India"
                required
              />
            </div>
            <div>
              <Label htmlFor="jobType">Job Type</Label>
              <Input
                id="jobType"
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="e.g. Full-time / Internship"
                required
              />
            </div>
            <div>
              <Label htmlFor="experience">Experience Level</Label>
              <Input
                id="experience"
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="e.g. 2"
                required
              />
            </div>
            <div>
              <Label htmlFor="position">Number of Positions</Label>
              <Input
                id="position"
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="e.g. 3"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <Label>Select a Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-red-500 mt-2 font-medium">
                  * Please register a company first before posting a job.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                'Post Job'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;

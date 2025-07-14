import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const { singleCompany } = useSelector((store) => store.company);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInput({
      name: singleCompany?.name || '',
      description: singleCompany?.description || '',
      website: singleCompany?.website || '',
      location: singleCompany?.location || '',
      file: null, // don't prefill file input
    });
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput((prev) => ({ ...prev, file }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/companies');
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => navigate('/admin/companies')}
            variant="outline"
            className="flex items-center gap-2 text-gray-600"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Company Setup</h1>
        </div>

        <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="e.g. Microsoft"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Short company bio"
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="https://yourcompany.com"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="City, Country"
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <Label htmlFor="file">Upload Logo</Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6A38C2] hover:bg-[#5931a5]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Company'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;

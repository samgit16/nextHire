import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import { Loader2 } from 'lucide-react';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);

  const registerNewCompany = async () => {
    const trimmedName = companyName.trim();

    if (!trimmedName) {
      toast.warning('Company name cannot be empty.');
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName: trimmedName },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res?.data?.company?._id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Failed to register company.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold mb-2">Create Your Company</h1>
          <p className="text-gray-600 mb-6 text-sm">
            Give your company a name. You can edit it later.
          </p>

          <div className="mb-6">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              type="text"
              autoFocus
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. JobHunt, Microsoft"
              className="mt-2"
              disabled={loading}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/companies')}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              onClick={registerNewCompany}
              disabled={loading || !companyName.trim()}
              className="bg-[#6A38C2] hover:bg-[#5a2db5] text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CompanyCreate;

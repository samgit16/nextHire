import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    bio: '',
    skills: '',
    file: null,
  });

  useEffect(() => {
    if (user) {
      setInput({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.join(', ') || '',
        file: null,
      });
    }
  }, [user]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput((prev) => ({ ...prev, file }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('bio', input.bio);
    formData.append('skills', input.skills); // comma-separated string
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false); // close only on success
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className='grid gap-4 py-4'>
            {[
              { label: 'Name', id: 'fullname' },
              { label: 'Email', id: 'email', type: 'email' },
              { label: 'Phone Number', id: 'phoneNumber' },
              { label: 'Bio', id: 'bio' },
              { label: 'Skills', id: 'skills' },
            ].map(({ label, id, type = 'text' }) => (
              <div key={id} className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor={id} className='text-right'>
                  {label}
                </Label>
                <Input
                  id={id}
                  name={id}
                  type={type}
                  value={input[id]}
                  onChange={changeEventHandler}
                  className='col-span-3'
                />
              </div>
            ))}

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='file' className='text-right'>
                Resume (PDF)
              </Label>
              <Input
                id='file'
                name='file'
                type='file'
                accept='application/pdf'
                onChange={fileChangeHandler}
                className='col-span-3'
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type='submit'
              className='w-full my-4'
              disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please wait...
                </>
              ) : (
                'Update Profile'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;

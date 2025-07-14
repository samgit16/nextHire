import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const skills = user?.profile?.skills || [];
  const hasResume = !!user?.profile?.resume;

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-6 p-6 shadow-sm'>
        {/* Top Section */}
        <div className='flex flex-col md:flex-row justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-24 w-24 ring-2 ring-[#6A38C2]'>
              <AvatarImage
                src={user?.profile?.profilePhoto || '/placeholder.png'}
                alt='profile'
              />
            </Avatar>
            <div>
              <h1 className='font-semibold text-2xl text-gray-800'>{user?.fullname}</h1>
              <p className='text-gray-600'>{user?.profile?.bio || 'No bio provided'}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant='outline'>
            <Pen className='w-4 mr-2' />
            Edit Profile
          </Button>
        </div>

        {/* Contact Info */}
        <div className='my-6 space-y-2'>
          <div className='flex items-center gap-3 text-gray-700'>
            <Mail className='w-5' />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 text-gray-700'>
            <Contact className='w-5' />
            <span>{user?.phoneNumber || 'Not Provided'}</span>
          </div>
        </div>

        {/* Skills */}
        <div className='my-6'>
          <Label className='text-md font-bold'>Skills</Label>
          <div className='flex flex-wrap gap-2 mt-2'>
            {skills.length > 0 ? (
              skills.map((skill, index) => <Badge key={index}>{skill}</Badge>)
            ) : (
              <span className='text-gray-500'>No skills added yet.</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className='my-6'>
          <Label className='text-md font-bold'>Resume</Label>
          <div className='mt-2'>
            {hasResume ? (
              <a
                href={user?.profile?.resume}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 hover:underline break-all'>
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className='text-gray-500'>Resume not uploaded.</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs Table */}
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-sm my-8'>
        <h1 className='text-lg font-bold mb-4'>Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* Profile Edit Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

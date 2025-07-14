import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { Badge } from '../ui/badge';
import { Loader2 } from 'lucide-react';

const statusOptions = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const [updatingId, setUpdatingId] = useState(null);

  const statusHandler = async (status, applicationId) => {
    setUpdatingId(applicationId);
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${applicationId}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // Optionally refresh application list here.
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update status.');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>Recent applicants to your posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber || 'N/A'}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {item?.applicant?.profile?.resumeOriginalName || 'View Resume'}
                    </a>
                  ) : (
                    'NA'
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      item?.status === 'Accepted'
                        ? 'bg-green-200 text-green-800'
                        : item?.status === 'Rejected'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {item?.status || 'Pending'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt?.split('T')[0] || 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {statusOptions.map((status) => (
                        <div
                          key={status}
                          onClick={() => statusHandler(status, item._id)}
                          className={`flex items-center justify-between cursor-pointer hover:bg-gray-100 px-2 py-1 rounded ${
                            updatingId === item._id ? 'pointer-events-none opacity-50' : ''
                          }`}
                        >
                          <span>{status}</span>
                          {updatingId === item._id && (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          )}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500">
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;

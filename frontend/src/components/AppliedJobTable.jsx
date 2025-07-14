import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import { Briefcase } from 'lucide-react';

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'rejected':
        return 'bg-red-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-black';
      case 'accepted':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  return (
    <div className="mt-6">
      <Table>
        <TableCaption>
          {allAppliedJobs?.length > 0
            ? 'A list of your applied jobs'
            : ''}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs?.length > 0 ? (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>
                  {appliedJob?.createdAt?.split('T')[0] || 'N/A'}
                </TableCell>
                <TableCell>{appliedJob.job?.title || 'N/A'}</TableCell>
                <TableCell>{appliedJob.job?.company?.name || 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <Badge className={getStatusColor(appliedJob?.status)}>
                    {appliedJob?.status?.toUpperCase() || 'UNKNOWN'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                <div className="flex flex-col items-center justify-center gap-2 py-8 text-gray-500">
                  <Briefcase className="h-8 w-8" />
                  <span className="text-sm font-medium">
                    You haven't applied for any jobs yet.
                  </span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;

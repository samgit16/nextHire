import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = allAdminJobs?.filter((job) => {
      if (!searchJobByText) return true;
      const lowerSearch = searchJobByText.toLowerCase();
      return (
        job?.title?.toLowerCase().includes(lowerSearch) ||
        job?.company?.name?.toLowerCase().includes(lowerSearch)
      );
    });
    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="mt-6">
      <Table>
        <TableCaption>A list of your recently posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.length > 0 ? (
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name || 'NA'}</TableCell>
                <TableCell>{job?.title || 'NA'}</TableCell>
                <TableCell>
                  {job?.createdAt ? job.createdAt.split('T')[0] : 'NA'}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded-md"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                No jobs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;

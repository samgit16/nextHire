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
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies?.filter((company) =>
      searchCompanyByText
        ? company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        : true
    );
    setFilteredCompanies(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto rounded-md border border-gray-200">
      <Table>
        <TableCaption className="text-sm text-gray-500">
          A list of your recently registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies?.length > 0 ? (
            filteredCompanies.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar className="w-9 h-9">
                    <AvatarImage
                      src={company?.logo || 'https://via.placeholder.com/40'}
                      alt={company?.name}
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.createdAt.split('T')[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 rounded hover:bg-gray-100">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 cursor-pointer hover:text-primary"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                No companies found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;

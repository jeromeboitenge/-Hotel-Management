import React, { useState, useMemo } from 'react';
import { 
  Check, X, MoreVertical, ChevronLeft, ChevronRight, 
  ChevronUp, ChevronDown, Search, Filter, Download,
  Trash, Mail, Printer
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const RecentBookings = () => {
  // Previous states...
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Handle select all
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedBookings(currentBookings.map(booking => booking.id));
    } else {
      setSelectedBookings([]);
    }
  };

  // Handle individual select
  const handleSelect = (bookingId) => {
    setSelectedBookings(prev => {
      if (prev.includes(bookingId)) {
        return prev.filter(id => id !== bookingId);
      } else {
        return [...prev, bookingId];
      }
    });
  };

  // Export functions
  const exportToExcel = () => {
    const bookingsToExport = selectedBookings.length > 0 
      ? filteredBookings.filter(booking => selectedBookings.includes(booking.id))
      : filteredBookings;

    const ws = XLSX.utils.json_to_sheet(bookingsToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bookings");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'bookings.xlsx');
  };

  const exportToPDF = () => {
    // Implement PDF export logic
    console.log('Export to PDF');
  };

  const exportToCSV = () => {
    const bookingsToExport = selectedBookings.length > 0 
      ? filteredBookings.filter(booking => selectedBookings.includes(booking.id))
      : filteredBookings;

    const csvContent = "data:text/csv;charset=utf-8," 
      + Object.keys(bookingsToExport[0]).join(",") + "\n"
      + bookingsToExport.map(row => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bookings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Bulk actions
  const handleBulkDelete = () => {
    // Implement bulk delete logic
    console.log('Bulk delete:', selectedBookings);
  };

  const handleBulkEmail = () => {
    // Implement bulk email logic
    console.log('Bulk email:', selectedBookings);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header with bulk actions and export options */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col space-y-4">
          {/* Previous search and filters... */}

          {/* Bulk Actions and Export */}
          {selectedBookings.length > 0 && (
            <div className="flex items-center space-x-4 p-2 bg-gray-50 rounded-md">
              <span className="text-sm text-gray-600">
                {selectedBookings.length} selected
              </span>
              <button 
                onClick={handleBulkDelete}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <Trash className="h-4 w-4" />
                <span>Delete</span>
              </button>
              <button 
                onClick={handleBulkEmail}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </button>
            </div>
          )}

          {/* Export Options */}
          <div className="flex items-center space-x-4">
            <div className="dropdown relative">
              <button className="flex items-center space-x-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <div className="dropdown-content absolute hidden bg-white border rounded-md shadow-lg mt-2 py-2">
                <button 
                  onClick={exportToExcel}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                >
                  Export to Excel
                </button>
                <button 
                  onClick={exportToCSV}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                >
                  Export to CSV
                </button>
                <button 
                  onClick={exportToPDF}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                >
                  Export to PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
              </th>
              {/* Previous header columns... */}
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedBookings.includes(booking.id)}
                    onChange={() => handleSelect(booking.id)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </td>
                {/* Previous booking data columns... */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Previous pagination... */}
    </div>
  );
};

export default RecentBookings;
import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, Edit, Trash2, 
  Mail, Phone, Calendar, MapPin,
  XIcon, CheckCircle, Filter
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

const CustomerManagement = () => {
  // Sample customer data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234-567-8900',
      address: '123 Main St, City',
      lastStay: '2024-02-13',
      totalStays: 5,
      totalSpent: 1200,
      status: 'active',
      vipStatus: true,
      preferences: ['High Floor', 'Non-Smoking']
    },
    // Add more sample customers as needed
  ]);

  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    vipOnly: false
  });

  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Filter customers
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        customer.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        customer.phone.includes(filters.search);
      const matchesStatus = filters.status === 'all' || customer.status === filters.status;
      const matchesVip = !filters.vipOnly || customer.vipStatus;

      return matchesSearch && matchesStatus && matchesVip;
    });
  }, [customers, filters]);

  // Customer Card Component
  const CustomerCard = ({ customer }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={selectedCustomers.includes(customer.id)}
            onChange={() => handleCustomerSelection(customer.id)}
            className="mt-1 rounded border-gray-300"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">{customer.name}</h3>
              {customer.vipStatus && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  VIP
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{customer.email}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedCustomer(customer)}
            className="text-blue-600 hover:bg-blue-50 p-1 rounded"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button 
            className="text-red-600 hover:bg-red-50 p-1 rounded"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center space-x-2">
          <Phone className="h-4 w-4 text-gray-400" />
          <span>{customer.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>Last Stay: {new Date(customer.lastStay).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>{customer.address}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between text-sm">
          <span>Total Stays: {customer.totalStays}</span>
          <span className="font-medium">Total Spent: ${customer.totalSpent}</span>
        </div>
        {customer.preferences.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {customer.preferences.map((pref, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {pref}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const handleCustomerSelection = (customerId) => {
    setSelectedCustomers(prev => {
      if (prev.includes(customerId)) {
        return prev.filter(id => id !== customerId);
      }
      return [...prev, customerId];
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Customers</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Filters Section */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search customers..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({...prev, search: e.target.value}))}
                className="pl-10 w-full border rounded-md p-2"
              />
            </div>

            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({...prev, status: e.target.value}))}
              className="border rounded-md p-2"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="vipOnly"
                checked={filters.vipOnly}
                onChange={(e) => setFilters(prev => ({...prev, vipOnly: e.target.checked}))}
                className="rounded border-gray-300"
              />
              <label htmlFor="vipOnly" className="text-sm">VIP Customers Only</label>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedCustomers.length > 0 && (
            <div className="mt-4 flex items-center space-x-4 p-2 bg-gray-50 rounded-md">
              <span className="text-sm text-gray-600">
                {selectedCustomers.length} selected
              </span>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <Mail className="h-4 w-4" />
                <span>Email Selected</span>
              </button>
              <button className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
                <span>Delete Selected</span>
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map(customer => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </div>
  );
};

export default CustomerManagement;
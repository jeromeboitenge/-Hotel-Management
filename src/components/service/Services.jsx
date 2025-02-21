import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle, XCircle } from 'lucide-react';
import ServiceForm from './ServiceForm';

const Services = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Room Service',
      type: 'Food & Beverage',
      price: 20,
      status: 'Active',
      assignedStaff: 'BOI',
    },
    {
      id: 2,
      name: 'Spa Package',
      type: 'Spa',
      price: 100,
      status: 'Active',
      assignedStaff: 'Jane Smith',
    },
    {
      id: 3,
      name: 'Massage Service',
      type: 'Laundry',
      price: 15,
      status: 'Inactive',
      assignedStaff: 'Mike Johnson',
    },
    {
      id: 4,
      name: 'Swimming Service',
      type: 'Body',
      price: 15,
      status: 'Inactive',
      assignedStaff: 'Claire',
    },
    {
      id: 5,
      name: 'Kids Service',
      type: 'Care',
      price: 15,
      status: 'Active',
      assignedStaff: 'Johnson',
    },
  ]);

  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    type: 'Food & Beverage',
    price: '',
    status: 'Active',
    assignedStaff: '',
  });

  const [serviceRequests, setServiceRequests] = useState([
    {
      id: 1,
      guest: 'Alice Brown',
      service: 'Room Service',
      time: '2024-02-16 10:00 AM',
    },
    {
      id: 2,
      guest: 'Bob Green',
      service: 'Spa Package',
      time: '2024-02-16 11:00 AM',
    },
  ]);

  const handleAddService = (e) => {
    e.preventDefault();

    // Basic validation
    if (!newService.name.trim()) {
      alert("Please enter a service name.");
      return;
    }
    if (!newService.assignedStaff.trim()) {
      alert("Please assign a staff member.");
      return;
    }
    if (newService.price <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    // Add the new service
    setServices([...services, { ...newService, id: services.length + 1 }]);
    setIsAddServiceModalOpen(false);
    setNewService({
      name: '',
      type: 'Food & Beverage',
      price: '',
      status: 'Active',
      assignedStaff: '',
    });
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleToggleStatus = (id) => {
    setServices(services.map(service =>
      service.id === id
        ? { ...service, status: service.status === 'Active' ? 'Inactive' : 'Active' }
        : service
    ));
  };

  const handleApproveRequest = (id) => {
    setServiceRequests(serviceRequests.filter(request => request.id !== id));
  };

  const handleRejectRequest = (id) => {
    setServiceRequests(serviceRequests.filter(request => request.id !== id));
  };

  // Debugging: Log when the component renders
  console.log("Services component rendered. isAddServiceModalOpen:", isAddServiceModalOpen);

  return (
    <div className="p-6 space-y-6">
      {/* Service Analytics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Service Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold">Total Bookings</h3>
            <p className="text-2xl font-bold text-primary">120</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold">Revenue</h3>
            <p className="text-2xl font-bold text-primary">$5,000</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold">Most Popular</h3>
            <p className="text-2xl font-bold text-primary">Spa Package</p>
          </div>
        </div>
      </div>

      {/* Service List */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Services</h2>
          <button
            onClick={() => {
              console.log("Opening modal"); // Debugging
              setIsAddServiceModalOpen(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-black rounded hover:bg-primary/90"
          >
        
            <span >Add Service</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(service => (
            <div key={service.id} className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-sm text-gray-500">{service.type}</p>
              <p className="text-sm font-medium text-primary mt-1">${service.price}</p>
              <div className="flex items-center text-sm mt-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    service.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {service.status}
                </span>
                <span className="ml-2 text-gray-600">Assigned: {service.assignedStaff}</span>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleToggleStatus(service.id)}
                  className="text-yellow-600 hover:bg-yellow-50 px-2 py-1 rounded"
                >
                  Toggle Status
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="text-red-600 hover:bg-red-50 px-2 py-1 rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Requests */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Service Requests</h2>
        <div className="space-y-4">
          {serviceRequests.map(request => (
            <div key={request.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{request.service}</h3>
                  <p className="text-sm text-gray-500">Guest: {request.guest}</p>
                  <p className="text-sm text-gray-500">Time: {request.time}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApproveRequest(request.id)}
                    className="text-green-600 hover:bg-green-50 px-2 py-1 rounded"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleRejectRequest(request.id)}
                    className="text-red-600 hover:bg-red-50 px-2 py-1 rounded"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Service Modal */}
      <ServiceForm  
        newService={newService}
        setNewService={setNewService}
        handleAddService={handleAddService}
        isAddServiceModalOpen={isAddServiceModalOpen}
        setIsAddServiceModalOpen={setIsAddServiceModalOpen}
      />
    </div>
  );
};

export default Services;
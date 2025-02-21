import React from 'react';
import { XCircle } from 'lucide-react';

const ServiceForm = ({
  newService,
  setNewService,
  handleAddService,
  isAddServiceModalOpen,
  setIsAddServiceModalOpen,
}) => {
  // Debugging: Log when the modal is rendered
  console.log("ServiceForm rendered. isAddServiceModalOpen:", isAddServiceModalOpen);

  if (!isAddServiceModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">Add New Service</h3>
          <button onClick={() => setIsAddServiceModalOpen(false)}>
            <XCircle className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleAddService} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={newService.type}
              onChange={(e) => setNewService({ ...newService, type: e.target.value })}
              className="mt-1 block w-full border rounded-md p-2"
            >
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Spa">Spa</option>
              <option value="Laundry">Laundry</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={newService.status}
              onChange={(e) => setNewService({ ...newService, status: e.target.value })}
              className="mt-1 block w-full border rounded-md p-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Assigned Staff</label>
            <input
              type="text"
              value={newService.assignedStaff}
              onChange={(e) => setNewService({ ...newService, assignedStaff: e.target.value })}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-black rounded hover:bg-primary/90 "
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
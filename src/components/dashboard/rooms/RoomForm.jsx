import React, { useState } from 'react';

const RoomForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    type: 'Single',
    status: 'available',
    price: '',
    cleaningStatus: 'clean',
    amenities: ['WiFi'],
    floor: '1st'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Room Number</label>
        <input
          type="number"
          name="id"
          value={formData.id}
          onChange={handleChange}
          className="mt-1 block w-full border rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Room Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="mt-1 block w-full border rounded-md p-2"
        >
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price per Night</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full border rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full border rounded-md p-2"
        >
          <option value="available">Available</option>
          <option value="maintenance">Maintenance</option>
          <option value="occupied">Occupied</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-white bg-[#056333] rounded cursor-pointer hover:bg-green-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white  bg-[#056333] rounded  cursor-pointer hover:bg-green-700"
        >
          Save Room
        </button>
      </div>
    </form>
  );
};

export default RoomForm;
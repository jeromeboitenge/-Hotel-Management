import React, { useState, useMemo } from 'react';
import RoomForm from './RoomForm';
import { 
  Users, CheckCircle, AlertCircle, 
  Edit, Trash2, Search, Plus, X as XIcon,
  TrendingUp, Calendar
} from 'lucide-react';

const RoomStatus = () => {
  // State management
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    search: '',
    priceRange: { min: 0, max: 1000 },
    floor: 'all',
    cleaningStatus: 'all'
  });
  
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);

  // Sample room data
  const [rooms, setRooms] = useState([
    {
      id: 101,
      type: 'Single',
      status: 'occupied',
      guest: 'John Doe',
      checkIn: '2024-02-13',
      checkOut: '2024-02-15',
      cleaningStatus: 'clean',
      price: 100,
      amenities: ['WiFi', 'TV', 'AC'],
      floor: '1st',
      occupancyRate: 75,
      lastCleaned: '2024-02-13',
      maintenanceHistory: [
        { date: '2024-01-15', type: 'Regular', notes: 'AC filter changed' }
      ],
      notes: 'Guest prefers extra pillows',
      assignedStaff: 'Mary Johnson'
    },
    {
      id: 102,
      type: 'Double',
      status: 'maintenace',
      price: 100,
      amenities: ['WiFi', 'TV', 'AC'],
      floor: '1st',
      occupancyRate: 75,
      lastCleaned: '2024-02-13',
      maintenanceHistory: [
        { date: '2024-01-15', type: 'Regular', notes: 'AC filter changed' }
      ],
      notes: 'Guest prefers extra pillows',
      assignedStaff: 'Mary Johnson'
    },
    {
      id: 103,
      type: 'Double',
      status: 'occupied',
      guest: 'Boitenge',
      checkIn: '2024-02-13',
      checkOut: '2024-02-15',
      cleaningStatus: 'clean',
      price: 150,
      amenities: ['WiFi', 'TV', 'AC'],
      floor: '1st',
      occupancyRate: 75,
      lastCleaned: '2024-02-13',
      maintenanceHistory: [
        { date: '2024-01-15', type: 'Regular', notes: 'AC filter changed' }
      ],
      notes: 'Guest prefers extra pillows',
      assignedStaff: 'Mary Johnson'
    },
    {
      id: 101,
      type: 'Single',
      status: 'available',
      price: 100,
      amenities: ['WiFi', 'TV', 'AC'],
      floor: '1st',
      occupancyRate: 75,
      lastCleaned: '2024-02-13',
      maintenanceHistory: [
        { date: '2024-01-15', type: 'Regular', notes: 'AC filter changed' }
      ],
      notes: 'Guest prefers extra pillows',
      assignedStaff: 'Mary Johnson'
    },
    // Add more sample rooms as needed
  ]);

  // Filter rooms
  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const matchesStatus = filters.status === 'all' || room.status === filters.status;
      const matchesType = filters.type === 'all' || room.type === filters.type;
      const matchesSearch = 
        room.id.toString().includes(filters.search.toLowerCase()) ||
        (room.guest?.toLowerCase() || '').includes(filters.search.toLowerCase()) ||
        room.type.toLowerCase().includes(filters.search.toLowerCase());
      const matchesPrice = 
        room.price >= filters.priceRange.min && 
        room.price <= filters.priceRange.max;

      return matchesStatus && matchesType && matchesSearch && matchesPrice;
    });
  }, [filters, rooms]);

  // Status styling
  const getStatusColor = (status) => {
    const colors = {
      available: 'bg-green-100 text-green-800',
      occupied: 'bg-blue-100 text-blue-800',
      reserved: 'bg-yellow-100 text-yellow-800',
      maintenance: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Bulk actions handler
  const handleBulkAction = async (action) => {
    setIsLoading(true);
    try {
      switch (action) {
        case 'clean':
          // Implement clean action
          console.log('Marking rooms as clean:', selectedRooms);
          break;
        case 'maintenance':
          // Implement maintenance action
          console.log('Setting rooms for maintenance:', selectedRooms);
          break;
        case 'delete':
          // Implement delete action
          console.log('Deleting rooms:', selectedRooms);
          break;
      }
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Room Card Component
  const RoomCard = ({ room }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">Room {room.id}</h3>
          <p className="text-sm text-gray-500">{room.type}</p>
          <p className="text-sm font-medium text-primary mt-1">${room.price}/night</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(room.status)}`}>
          {room.status}
        </span>
      </div>

      <div className="space-y-2">
        {room.guest && (
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            <span>{room.guest}</span>
          </div>
        )}
        {room.checkIn && (
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>{new Date(room.checkIn).toLocaleDateString()}</span>
          </div>
        )}
        <div className="flex items-center text-sm">
          <AlertCircle className={`h-4 w-4 mr-2 ${room.cleaningStatus === 'clean' ? 'text-green-500' : 'text-red-500'}`} />
          <span>{room.cleaningStatus === 'clean' ? 'Clean' : 'Needs cleaning'}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t flex justify-between items-center">
        <input
          type="checkbox"
          checked={selectedRooms.includes(room.id)}
          onChange={() => handleRoomSelection(room.id)}
          className="rounded border-gray-300"
        />
        <div className="flex space-x-2">
          <button 
            onClick={() => {
              setSelectedRoom(room);
              setIsDetailsModalOpen(true);
            }}
            className="text-primary hover:bg-primary/10 px-2 py-1 rounded"
          >
            View
          </button>
          <button 
            className="text-yellow-600 hover:bg-yellow-50 p-1 rounded"
          >
            <Edit className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Handle room selection
  const handleRoomSelection = (roomId) => {
    setSelectedRooms(prev => {
      if (prev.includes(roomId)) {
        return prev.filter(id => id !== roomId);
      }
      return [...prev, roomId];
    });
  };

  // Handle adding a new room
  const handleAddRoom = (newRoom) => {
    setRooms([...rooms, { ...newRoom, id: parseInt(newRoom.id) }]);
    setIsAddRoomModalOpen(false);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Room Status</h2>
          <div className="flex space-x-2">
            <button 
              className="flex items-center space-x-2 px-4 py-2 text-primary hover:bg-primary/10 rounded"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Analytics</span>
            </button>
            <button
              onClick={() => setIsAddRoomModalOpen(true)} 
              className="flex items-center space-x-2 px-4 py-2 bg-[#056333] rounded hover:bg-primary/90 cursor-pointer hover:bg-green-700"
            >
          
              <span className='text-white'>Add Room</span>
              
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search rooms..."
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
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <select
            value={filters.type}
            onChange={(e) => setFilters(prev => ({...prev, type: e.target.value}))}
            className="border rounded-md p-2"
          >
            <option value="all">All Types</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
          </select>

          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min price"
              value={filters.priceRange.min}
              onChange={(e) => setFilters(prev => ({
                ...prev, 
                priceRange: {...prev.priceRange, min: e.target.value}
              }))}
              className="w-1/2 border rounded-md p-2"
            />
            <input
              type="number"
              placeholder="Max price"
              value={filters.priceRange.max}
              onChange={(e) => setFilters(prev => ({
                ...prev, 
                priceRange: {...prev.priceRange, max: e.target.value}
              }))}
              className="w-1/2 border rounded-md p-2"
            />
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedRooms.length > 0 && (
          <div className="flex items-center space-x-4 p-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-600">
              {selectedRooms.length} selected
            </span>
            <button 
              onClick={() => handleBulkAction('clean')}
              disabled={isLoading}
              className="flex items-center space-x-2 text-green-600 hover:text-green-700"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Mark Clean</span>
            </button>
            <button 
              onClick={() => handleBulkAction('maintenance')}
              disabled={isLoading}
              className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
            >
              <AlertCircle className="h-4 w-4" />
              <span>Maintenance</span>
            </button>
            <button 
              onClick={() => handleBulkAction('delete')}
              disabled={isLoading}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredRooms.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

      {/* Details Modal */}
      {isDetailsModalOpen && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">Room Details</h3>
              <button onClick={() => setIsDetailsModalOpen(false)}>
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Room Number</p>
                  <p className="font-medium">{selectedRoom.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">{selectedRoom.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedRoom.status)}`}>
                    {selectedRoom.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">${selectedRoom.price}/night</p>
                </div>
              </div>
              {selectedRoom.guest && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Current Guest</h4>
                  <p>{selectedRoom.guest}</p>
                  <p className="text-sm">Check in: {selectedRoom.checkIn}</p>
                  <p className="text-sm">Check out: {selectedRoom.checkOut}</p>
                </div>
              )}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRoom.amenities.map((amenity, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Room Modal */}
      {isAddRoomModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">Add Room</h3>
              <button onClick={() => setIsAddRoomModalOpen(false)}>
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <RoomForm
              onSave={handleAddRoom}
              onCancel={() => setIsAddRoomModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomStatus;
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, User, Hotel } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Hotel className="h-8 w-8 text-primary"/>
            <span className="ml-2 text-xl font-bold">HotelManager</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard" className="hover:text-primary">Dashboard</Link>
            <Link to="/rooms" className="hover:text-primary">Rooms</Link>
            <Link to="/bookings" className="hover:text-primary">Bookings</Link>
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 cursor-pointer hover:text-primary"/>
              <User className="h-5 w-5 cursor-pointer hover:text-primary"/>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              <Menu className="h-6 w-6"/>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/dashboard" className="block px-3 py-2 hover:bg-primary/10">Dashboard</Link>
              <Link to="/rooms" className="block px-3 py-2 hover:bg-primary/10">Rooms</Link>
              <Link to="/bookings" className="block px-3 py-2 hover:bg-primary/10">Bookings</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
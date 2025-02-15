import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BedDouble, 
  ShoppingCart, 
  Users, 
  Calendar,
  Settings,
  ChevronDown
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { title: 'Rooms', icon: BedDouble, path: '/rooms' },
    { title: 'Bookings', icon: Calendar, path: '/bookings' },
    { title: 'Services', icon: ShoppingCart, path: '/services' },
    { title: 'Customers', icon: Users, path: '/customers' },
    { title: 'Settings', icon: Settings, path: '/settings' }
  ];

  return (
    <div className="w-64 h-screen bg-white border-r">
      <div className="p-4">
        <div className="space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/10"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
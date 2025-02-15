// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/NavBar';
import Sidebar from './components/layouts/SideBar';
import RoomStatus from './components/dashboard/RoomStatus';
import Home from './components/pages/Home';
import Dashboard from './components/dashboard/Dashboard';
import BookingForm from './components/BookingForm';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/rooms" element={<RoomStatus />} />
              <Route path='/bookings' element={<BookingForm/>}/>
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
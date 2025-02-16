// src/components/dashboard/Dashboard.jsx
import React, { useState } from 'react';
import { 
  Users, BedDouble, Calendar, DollarSign, 
  TrendingUp, TrendingDown 
} from 'lucide-react';
import RoomStatus from './rooms/RoomStatus';

const Dashboard = () => {
  // Sample data for stats
  const stats = [
    {
      title: "Total Bookings",
      value: "128",
      icon: Calendar,
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Available Rooms",
      value: "45",
      icon: BedDouble,
      trend: "85%",
      trendUp: true
    },
    {
      title: "Total Customers",
      value: "320",
      icon: Users,
      trend: "+18%",
      trendUp: true
    },
    {
      title: "Revenue",
      value: "$12,426",
      icon: DollarSign,
      trend: "+24%",
      trendUp: true
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              {stat.trendUp ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={`ml-1 text-sm ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend}
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Room Status Section */}
      <div className="mt-8">
        <RoomStatus />
      </div>
    </div>
  );
};

export default Dashboard;
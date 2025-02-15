// src/components/dashboard/DashboardLayout.jsx
import React from 'react';
import DashboardStats from './DashboardStats';
import RoomStatus from './RoomStatus';
import RecentBookings from './RecentBookings';
import RevenueChart from './RevenueChart';

const DashboardLayout = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <RoomStatus />
      </div>
      <RecentBookings />
    </div>
  );
};

export default DashboardLayout;
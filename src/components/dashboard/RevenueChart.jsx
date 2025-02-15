// src/components/dashboard/RevenueChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueChart = () => {
  const data = [
    { month: 'Jan', revenue: 12400, bookings: 90 },
    { month: 'Feb', revenue: 15600, bookings: 120 },
    { month: 'Mar', revenue: 18900, bookings: 150 },
    { month: 'Apr', revenue: 17500, bookings: 130 },
    { month: 'May', revenue: 21000, bookings: 170 },
    { month: 'Jun', revenue: 19800, bookings: 160 }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="revenue" 
              stroke="#2563eb" 
              name="Revenue ($)"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="bookings" 
              stroke="#16a34a" 
              name="Bookings"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
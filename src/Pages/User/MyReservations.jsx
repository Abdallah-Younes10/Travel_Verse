import React, { useState } from 'react';
import axios from '../Auth/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const modelToTypeMap = {
  'App\\Models\\Trip': 'trip',
  'App\\Models\\Hotel': 'hotel',
  'App\\Models\\Restaurant': 'restaurant',
  'App\\Models\\Activity': 'activity',
  'App\\Models\\Cruise': 'cruise',
  'App\\Models\\Car': 'car',
  'App\\Models\\Flight': 'flight',
};

const getTypeFromReservation = (r) => {
  const model = r.reservable_type || r.favoritable_type;
  return modelToTypeMap[model] || 'trip';
};

const fetchReservations = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Unauthorized');

  const res = await axios.get('http://localhost:8000/api/reservations', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.map((r) => {
    const source = r.reservable || r.favoritable || {};
    const typeName = getTypeFromReservation(r);
    const itemId = r.reservable?.id ?? r.favoritable_id ?? r.reservable_id;

    const image =
      Array.isArray(source.images) && source.images.length > 0
        ? source.images[0]
        : source.image || '/fallback.jpg';

    const title = source.name || source.title || source.name_en || 'Item';

    return {
      ...r,
      typeName,
      title,
      image,
      itemId,
    };
  });
};

const MyReserv = () => {
  const [filter, setFilter] = useState('All');
  const queryClient = useQueryClient();

  const { data: reservations = [], isLoading } = useQuery({
    queryKey: ['reservations'],
    queryFn: fetchReservations,
  });

  const payMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8000/api/reservations/${id}/pay`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      toast.success('✅ Payment successful');
      queryClient.invalidateQueries(['reservations']);
    },
    onError: () => toast.error('❌ Payment failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success('✅ Reservation cancelled');
      queryClient.invalidateQueries(['reservations']);
    },
    onError: () => toast.error('❌ Failed to cancel reservation'),
  });

  // فلترة حسب النوع
  const filtered =
    filter === 'All'
      ? reservations
      : reservations.filter((r) => r.typeName === filter);

  const uniqueTypes = ['All', ...new Set(reservations.map((r) => r.typeName))];

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">📋 My Reservations</h2>

      {/* فلتر النوع */}
      <div className="mb-4">
        <label htmlFor="filter">Filter by Type:</label>
        <select
          id="filter"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="ml-2 p-1 border rounded"
        >
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="text-center py-4">Loading reservations...</div>
      ) : filtered.length === 0 ? (
        <p className="text-center py-4">No reservations found.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Status</th>
              <th>Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((res) => (
              <tr key={res.id} className="hover:bg-gray-50">
                <td className="capitalize">{res.typeName}</td>
                <td className="flex items-center gap-2">
                  {res.title}
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      res.status === 'accepted'
                        ? 'bg-green-500'
                        : res.status === 'pending'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {res.status}
                  </span>
                </td>
                <td>{res.is_paid ? '✅' : '❌'}</td>
                <td>
                  {!res.is_paid && res.status === 'accepted' && (
                    <button
                      onClick={() => payMutation.mutate(res.id)}
                      className="mr-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Pay Now
                    </button>
                  )}
                  <button
                    onClick={() => deleteMutation.mutate(res.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyReserv;

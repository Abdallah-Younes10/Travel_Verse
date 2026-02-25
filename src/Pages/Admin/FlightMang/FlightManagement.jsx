import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import FlightTable from './FlightTable';
import FlightModal from './FlightModal';
import styles from '../UserMang/UserManagement.module.css';
import { toast } from 'react-toastify';

function FlightManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFlight, setCurrentFlight] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [filterClass, setFilterClass] = useState('');
  const [filterStops, setFilterStops] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const queryClient = useQueryClient();

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const { data, isLoading } = useQuery({
    queryKey: ['flights', page],
    queryFn: () => axios.get(`http://localhost:8000/api/flights?page=${page}`, config).then(res => res.data)
  });

  const addFlight = useMutation({
    mutationFn: flightData => axios.post('http://localhost:8000/api/flights', flightData, config).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['flights']);
      toast.success('Flight added');
      closeModal();
    },
    onError: () => toast.error('Error adding flight')
  });

  const updateFlight = useMutation({
    mutationFn: flightData => axios.put(`http://localhost:8000/api/flights/${flightData.id}`, flightData, config).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['flights']);
      toast.success('Flight updated');
      closeModal();
    },
    onError: () => toast.error('Error updating flight')
  });

  const deleteFlight = useMutation({
    mutationFn: id => axios.delete(`http://localhost:8000/api/flights/${id}`, config),
    onSuccess: () => {
      queryClient.invalidateQueries(['flights']);
      toast.success('Flight deleted');
    },
    onError: () => toast.error('Error deleting flight')
  });

  const flights = data?.data || [];
// console.log(flights[0].style);
console.log("flights", flights);

 const filteredFlights = (flights || []).filter(flight => {
  if (!flight || typeof flight !== 'object') return false; // ✅ حماية من undefined/null

  const from = flight.from || '';
  const to = flight.to || '';
  const classType = flight.style || '';
  const flightDate = flight.date || '';
  const price = flight.price_per_person || '0';

  const matchSearch = from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      to.toLowerCase().includes(searchTerm.toLowerCase());
  const matchClass = filterClass ? classType.toLowerCase() === filterClass.toLowerCase() : true;
  const matchStops = filterStops ? (filterStops === 'direct' ? !flight.has_stops : flight.has_stops) : true;
  const matchDate = filterDate ? flightDate === filterDate : true;
  const matchPrice = filterPrice ? parseFloat(price) <= parseFloat(filterPrice) : true;

  return matchSearch && matchClass && matchStops && matchDate && matchPrice;
});


  const openAddModal = () => {
    setCurrentFlight(null);
    setIsModalOpen(true);
  };

  const openEditModal = (flight) => {
    setCurrentFlight(flight);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFlight(null);
  };

  const renderPagination = () => {
    const totalPages = data?.last_page || 1;
    if (totalPages <= 1) return null;

    return (
      <div className="d-flex justify-content-center mt-4 gap-2">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? 'btn btn-primary' : 'btn btn-outline-primary'}
          >
            {i + 1}
          </button>
        ))}
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    );
  };

  return (
    <div className={`${styles.content} `}>
      <div className={styles.card}>
        {/* <h2>Flights</h2> */}

        {/* <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search by origin or destination"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />

          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className={styles.searchInput}
          >
            <option value="">All Classes</option>
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
            <option value="premium">Premium</option>
          </select>

          <select
            value={filterStops}
            onChange={(e) => setFilterStops(e.target.value)}
            className={styles.searchInput}
          >
            <option value="">All Stops</option>
            <option value="direct">Direct</option>
            <option value="with_stops">With Stops</option>
          </select>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className={styles.searchInput}
          />

          <input
            type="number"
            placeholder="Max Price"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className={styles.searchInput}
          />


        </div> */}
        <button className={`${styles.btn} w-80! hover:bg-blue-700!`} onClick={openAddModal}>Add Flight</button>
        {isLoading ? <p>Loading...</p> : (
          <>
            <FlightTable
              flights={filteredFlights}
              onEdit={openEditModal}
              onDelete={(id) => {
                if (window.confirm("Delete this flight?")) deleteFlight.mutate(id);
              }}
            />
            {renderPagination()}
          </>
        )}
      </div>

      <FlightModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={currentFlight ? updateFlight.mutate : addFlight.mutate}
        initialData={currentFlight}
      />
    </div>
  );
}

export default FlightManagement;

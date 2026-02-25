import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import UserTable from './UserTable';
import UserModal from './UserModal';
import styles from './UserManagement.module.css';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function UserManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const queryClient = useQueryClient();

  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['users', page],
    queryFn: () => axios.get(`http://localhost:8000/api/users?page=${page}`, config).then(res => res.data)
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/all', config)
      .then(res => setAllUsers(res.data))
      .catch(() => toast.error('Failed to load all users'));
  }, [queryClient]);

  const addUser = useMutation({
    mutationFn: userData => axios.post('http://localhost:8000/api/users', userData, config).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User added');
      closeModal();
    },
    onError: () => toast.error('Error adding user')
  });

  const updateUser = useMutation({
    mutationFn: userData => axios.put(`http://localhost:8000/api/users/${userData.id}`, userData, config).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User updated');
      closeModal();
    },
    onError: () => toast.error('Error updating user')
  });

  const deleteUser = useMutation({
    mutationFn: id => axios.delete(`http://localhost:8000/api/users/${id}`, config),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User deleted');
    },
    onError: () => toast.error('Error deleting user')
  });

  const filteredUsers = search.trim()
    ? allUsers.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
    : data?.data || [];

  const openAddModal = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
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
   const { t } = useTranslation();
  return (
    <div className={styles.content}>
      <div className={styles.card}>
        {/* <h2 className='dark:text-white!'>{t("users")}</h2> */}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-150! p-2 mb-4 border border-gray-300 rounded bg-gray-100! dark:bg-gray-800! dark:text-white! mr-5!"
        />
        <button className={styles.btn} onClick={openAddModal}>Add User</button>

        {isLoading ? <p>Loading...</p> : (
          <>
            <UserTable users={filteredUsers} onEdit={openEditModal} onDelete={(id) => {
              if (window.confirm(`Delete user ${id}?`)) deleteUser.mutate(id);
            }} />
            {renderPagination()}
          </>
        )}
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={currentUser ? updateUser.mutate : addUser.mutate}
        initialData={currentUser}
      />
    </div>
  );
}

export default UserManagement;

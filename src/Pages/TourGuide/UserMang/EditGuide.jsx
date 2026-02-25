import React, { useState } from 'react';
import UserTable from './UserTable';
import UserModal from './UserModal';
import styles from './UserManagement.module.css'; // استخدام CSS Module خاص بهذا المكون

function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // للمستخدم الذي يتم تعديله

  const handleAddUser = (userData) => {
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    setUsers([...users, { id: newId, ...userData }]);
    setIsModalOpen(false);
  };

  const handleEditUser = (userData) => {
    setUsers(users.map(user => (user.id === userData.id ? userData : user)));
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure to delete this user ?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const openAddModal = () => {
    setCurrentUser(null); // للتأكد من أن المودال في وضع الإضافة
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setCurrentUser(user); // لتمرير بيانات المستخدم الحالي للمودال
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  return (
    <div className={styles.content}>
      <div className={styles.card}>
        <h2>Users</h2>
        <button className={styles.btn} onClick={openAddModal}>
          Add User
        </button>
        <UserTable users={users} onEdit={openEditModal} onDelete={handleDeleteUser} />
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={currentUser ? handleEditUser : handleAddUser}
        initialData={currentUser}
      />
    </div>
  );
}

export default UserManagement;
import React from 'react';
import styles from './UserManagement.module.css'; // استخدام CSS Module

function UserTable({ users, onEdit, onDelete }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email </th>
          <th>Rule</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button className={styles.actionButton} onClick={() => onEdit(user)}>Update</button>
              <button className={styles.actionButton} onClick={() => onDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
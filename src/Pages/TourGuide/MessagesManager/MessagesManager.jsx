import React, { useState } from 'react';
import styles from '../UserMang/UserManagement.module.css';
import ReplyModal from './ReplyModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MessagesManager() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'Ahmed Ali',
      email: 'ahmed@example.com',
      message: 'هل يمكن تعديل توقيت الرحلة؟',
      date: '2025-06-21',
    },
    {
      id: 2,
      name: 'Sara Samir',
      email: 'sara@example.com',
      message: 'ما هي مدة الجولة بالضبط؟',
      date: '2025-06-20',
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("هل تريد حذف هذه الرسالة؟")) {
      setMessages(messages.filter(msg => msg.id !== id));
      toast.info("تم حذف الرسالة بنجاح");
    }
  };

  const openReplyModal = (msg) => {
    setSelectedMessage(msg);
    setShowReplyModal(true);
  };

  const handleReplySend = (reply) => {
    toast.success(`✅ تم إرسال الرد إلى ${selectedMessage.name}`);
    setShowReplyModal(false);
    setSelectedMessage(null);
  };

  return (
    <div className={styles.content}>
      <div className={styles.card}>
        <h2>رسائل العملاء</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الإيميل</th>
              <th>الرسالة</th>
              <th>التاريخ</th>
              <th>إجراء</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(msg => (
              <tr key={msg.id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>{msg.date}</td>
                <td>
                  <button className={styles.actionButton} onClick={() => openReplyModal(msg)}>Reply</button>
                  <button className={styles.actionButton} onClick={() => handleDelete(msg.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showReplyModal && (
          <ReplyModal
            message={selectedMessage}
            onClose={() => setShowReplyModal(false)}
            onSend={handleReplySend}
          />
        )}
        {/* ✅ مكون التوست */}
        <ToastContainer position="top-right" autoClose={2500} />
      </div>
    </div>
  );
}

export default MessagesManager;

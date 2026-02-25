import React, { useState } from 'react';
import styles from './UserMang/UserManagement.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function ProfileSettings() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: 'Ahmed Younes',
    bio: 'مرشد سياحي بخبرة أكثر من 10 سنوات في المعالم المصرية.',
    languages: ['العربية', 'الإنجليزية'],
    image: '',
  });

  const [newLanguage, setNewLanguage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, image: reader.result });
      toast.success('✅ تم رفع الصورة');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    toast.success('✅ تم حفظ التعديلات');
    // هنا يمكن إرسال البيانات إلى الـ backend
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim() !== '' && !profile.languages.includes(newLanguage.trim())) {
      setProfile({ ...profile, languages: [...profile.languages, newLanguage.trim()] });
      setNewLanguage('');
    }
  };

  const handleDeleteLanguage = (lang) => {
    setProfile({ ...profile, languages: profile.languages.filter(l => l !== lang) });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف الحساب؟ لا يمكن التراجع عن هذه العملية.')) {
      toast.success('✅ تم حذف الحساب نهائيًا');
      setProfile({ name: '', bio: '', languages: [], image: '' });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.card}>
        <h2>الإعدادات الشخصية</h2>

        <label>الاسم</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />

        <label>نبذة عنك</label>
        <textarea
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        />

        <label>صورتك</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {profile.image && (
          <img
            src={profile.image}
            alt="profile"
            style={{ width: '120px', height: '120px', borderRadius: '50%', marginTop: '10px' }}
          />
        )}

        <label>اللغات التي تتحدثها</label>
        <ul style={{ paddingLeft: '20px' }}>
          {profile.languages.map((lang, index) => (
            <li key={index}>
              {lang}{' '}
              <button
                className={styles.actionButton}
                onClick={() => handleDeleteLanguage(lang)}
              >
                حذف
              </button>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            placeholder="أضف لغة جديدة"
          />
          <button className={styles.btn} onClick={handleAddLanguage}>
            إضافة
          </button>
        </div>

        <button className={styles.btn} onClick={handleSave} style={{ marginTop: '20px' }}>
          حفظ التعديلات
        </button>
      </div>

      <div className={styles.card} style={{ marginTop: '20px', borderColor: '#ff4d4f' }}>
        <h2 style={{ color: '#d80000' }}>حذف الحساب</h2>
        <p style={{ color: '#444' }}>⚠️ عند حذف حسابك، سيتم إزالة جميع بياناتك ولا يمكن التراجع.</p>
        <button
          className={styles.btn}
          onClick={handleDeleteAccount}
          style={{ backgroundColor: '#ff4d4f', borderColor: '#d9363e' }}
        >
          حذف الحساب نهائيًا
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default ProfileSettings;

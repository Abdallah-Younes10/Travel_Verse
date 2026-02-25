import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const ProfileSettings = () => {
  const { t } = useTranslation();

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    avatar: null,
    preview: null,
    serverImage: null,
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/user', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProfile(prev => ({
          ...prev,
          name: res.data.name,
          email: res.data.email,
          serverImage: res.data.image?.url || null,
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'avatar' && files.length > 0) {
      setProfile(prev => ({ ...prev, avatar: files[0], preview: URL.createObjectURL(files[0]) }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    if (profile.avatar instanceof File) formData.append('avatar', profile.avatar);

    try {
      const res = await axios.post('http://localhost:8000/api/update-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success(t('profile.profileUpdated'));
      setProfile(prev => ({ ...prev, preview: null, avatar: null, serverImage: res.data.user?.image?.url || prev.serverImage }));
    } catch (err) {
      if (err.response?.status === 422 && err.response.data?.errors) {
        const messages = Object.values(err.response.data.errors).flat().join('\n');
        toast.error(messages);
      } else {
        toast.error(err.response?.data?.message || 'Failed to update profile');
      }
    }
  };

  const handlePasswordChange = e => setPasswords(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handlePasswordSubmit = async e => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) return toast.error(t('profile.passwordMismatch'));

    try {
      await axios.post(
        'http://localhost:8000/api/change-password',
        { current: passwords.current, new: passwords.new, new_confirmation: passwords.confirm },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      toast.success(t('profile.passwordChanged'));
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm(t('profile.deleteConfirm'))) return;
    try {
      await axios.delete('http://localhost:8000/api/delete-account', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      toast.success(t('profile.deleteAccount'));
      localStorage.clear();
      window.location.href = '/login';
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete account');
    }
  };

  const removeAvatar = () => setProfile(prev => ({ ...prev, avatar: null, preview: null }));

  return (
    <div className=" mx-auto h-full relative p-3 bg-white dark:bg-gray-800! rounded-xl shadow-md space-y-8">
      {/* Avatar */}
      {(profile.preview || profile.serverImage) && (
        <div className="flex justify-center">
          <img
            className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-lg object-cover"
            src={profile.preview || profile.serverImage}
            alt="Avatar"
          />
        </div>
      )}

      <div className=' flex flex-col'>
        <div className="flex flex-col flex-1 space-y-6">
        <h2 className="text-2xl font-bold text-center">{t('profile.title')}</h2>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">{t('profile.name')}</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">{t('profile.email')}</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">{t('profile.avatar')}</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          {profile.preview && (
            <div className="text-center mt-2">
              <button
                type="button"
                onClick={removeAvatar}
                className="text-red-500 font-bold hover:underline"
              >
                {t('profile.removeAvatar')}
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          {t('profile.saveChanges')}
        </button>
      </form>

        </div>
      {/* Password Form */}
      <div className="flex flex-col flex-1 space-y-6">
        <h2 className="text-xl font-bold">{t('profile.changePassword')}</h2>
      <form onSubmit={handlePasswordSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">{t('profile.currentPassword')}</label>
          <input
            type="password"
            name="current"
            value={passwords.current}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">{t('profile.newPassword')}</label>
          <input
            type="password"
            name="new"
            value={passwords.new}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">{t('profile.confirmNewPassword')}</label>
          <input
            type="password"
            name="confirm"
            value={passwords.confirm}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded mt-3 font-semibold hover:bg-green-700 transition"
        >
          {t('profile.saveChanges')}
        </button>
      </form>
      </div>

      </div>
      {/* Delete Account */}
      {/* <button
        onClick={handleDeleteAccount}
        className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
      >
        {t('profile.deleteAccount')}
      </button> */}
    </div>
  );
};

export default ProfileSettings;

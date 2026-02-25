import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useToggleWatchlist } from '../../Hooks/useWatchlist';
import toast from 'react-hot-toast';

const WatchlistButton = ({ type, id, className }) => {
  const { isFavorited, toggle } = useToggleWatchlist(type, id);
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e && e.stopPropagation && e.stopPropagation();
    e && e.preventDefault && e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in');
      return;
    }
    try {
      setLoading(true);
      await toggle();
    } catch (err) {
      console.error(err);
      toast.error('Action failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton
      onClick={handle}
      className={className}
      size="small"
      color={isFavorited ? 'error' : 'default'}
      disabled={loading}
      aria-label={isFavorited ? 'remove from watchlist' : 'add to watchlist'}
    >
      {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default WatchlistButton;

import React from 'react';
import { Menu, MenuItem, IconButton, ListItemText, ListItemAvatar, Avatar, Typography, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useWatchlist as useWL, useRemoveFavorite } from '../../Hooks/useWatchlist';
import WatchlistButton from '../../Utility/Buttons/WatchlistButton';
const modelToTypeMap = {
  'App\\Models\\Trip': 'trip',
  'App\\Models\\Hotel': 'hotel',
  'App\\Models\\Restaurant': 'restaurant',
  'App\\Models\\Activity': 'activity',
  'App\\Models\\Cruise': 'cruise',
  'App\\Models\\Car': 'car',
  'App\\Models\\Flight': 'flight',
};

const getTypeFromFavorite = (f) => {
  const model = f.favoritable_type || f.reservable_type;
  return modelToTypeMap[model] || 'trip';
};

const WatchlistDropdown = ({ anchorEl, open, onClose }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const { data: favorites = [], isLoading } = useWL();
  const remove = useRemoveFavorite();
    // console.log(favorites);

  return (
   <Menu
  anchorEl={anchorEl}
  open={open}
  onClose={onClose}
  PaperProps={{
    sx: {
      width: 400,
      maxHeight: 420,
      borderRadius: 2,
      overflow: 'hidden',
    },
  }}
>

  {/* ───── Header (Sticky) ───── */}
  <Box
    sx={{
      position: 'sticky',
      top: 0,
      zIndex: 1,
      bgcolor: 'background.paper',
      borderBottom: '1px solid',
      borderColor: 'divider',
      px: 2,
      py: 1.5,
      display: 'flex',
      alignItems: 'center',
      gap: 1,
    }}
  >
    <FavoriteIcon color="error" fontSize="small" />
    <Typography fontWeight="bold">My Watchlist</Typography>
  </Box>

  {/* ───── States ───── */}
  {isLoading && (
    <MenuItem disabled>
      <Typography variant="body2">Loading your watchlist…</Typography>
    </MenuItem>
  )}

  {!isLoading && !token && (
    <MenuItem component={Link} to="/login" onClick={onClose}>
      <ListItemText primary="Log in to see your watchlist" />
    </MenuItem>
  )}

  {!isLoading && token && favorites.length === 0 && (
    <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
      <FavoriteIcon sx={{ fontSize: 36, opacity: 0.3 }} />
      <Typography variant="body2" mt={1}>
        No items in your watchlist yet
      </Typography>
    </Box>
  )}

  {/* ───── List ───── */}
  <Box sx={{ overflowY: 'auto' }}>
    {!isLoading &&
      favorites.map((f) => {
        const source = f.favoritable || f.reservable || {};
        const typeName = getTypeFromFavorite(f);
        const itemId = f.reservable?.id ?? f.favoritable_id ?? f.reservable_id;

        const image =
          Array.isArray(source.images)
            ? source.images[0]
            : source.image || '/fallback.jpg';

        const title =
          source.name || source.title || source.name_en || 'Item';

        return (
          <MenuItem
            key={f.id}
            component={Link}
            to={`/itemdetail/${itemId}?type=${typeName}`}
            onClick={onClose}
            sx={{
              alignItems: 'center',
              gap: 1.5,
              py: 1.2,
              '&:hover .remove-btn': {
                opacity: 1,
              },
            }}
          >
            <Avatar
              src={image}
              variant="rounded"
              sx={{ width: 48, height: 48 }}
            />

            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                fontWeight={500}
                noWrap
              >
                {title}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: 'capitalize' }}
              >
                {typeName}
              </Typography>
            </Box>

            {/* Remove Button */}
            <IconButton
              className="remove-btn"
              size="small"
              sx={{
                opacity: 0,
                transition: 'opacity 0.2s',
              }}
              onClick={async (e) => {
                e.stopPropagation();
                await remove.mutateAsync(f.id);
              }}
            >
              <FavoriteIcon color="error" fontSize="small" />
            </IconButton>
          </MenuItem>
        );
      })}
  </Box>
</Menu>

  );
};

export default WatchlistDropdown;

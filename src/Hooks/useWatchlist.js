import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../Pages/Auth/axios';

const modelMap = {
  trip: 'App\\Models\\Trip',
  hotel: 'App\\Models\\Hotel',
  restaurant: 'App\\Models\\Restaurant',
  activity: 'App\\Models\\Activity',
  cruise: 'App\\Models\\Cruise',
  car: 'App\\Models\\Car',
  flight: 'App\\Models\\Flight',
};

export const toFavoritableType = (type) => modelMap[type?.toLowerCase()] || type;

const fetchFavorites = async () => {
  const res = await axios.get('http://localhost:8000/api/reservations');
  return res.data;
};

export function useWatchlist() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
    enabled: !!token,
    staleTime: 1000 * 60 * 2,
    retry: false,
  });
}

export function useAddFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axios.post('/favorites', payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['favorites'] }),
  });
}

export function useRemoveFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (favoriteId) => axios.delete(`/favorites/${favoriteId}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['favorites'] }),
  });
}

export function useToggleWatchlist(type, id) {
  const { data: favorites = [] } = useWatchlist();
  const add = useAddFavorite();
  const remove = useRemoveFavorite();

  const favoritable_type = toFavoritableType(type);

  const existing = favorites.find(
    (f) => f.favoritable_type === favoritable_type && Number(f.favoritable_id) === Number(id)
  );

  const isFavorited = !!existing;

  const toggle = async () => {
    if (isFavorited) {
      return remove.mutateAsync(existing.id);
    }
    return add.mutateAsync({ favoritable_id: id, favoritable_type });
  };

  return { isFavorited, favoriteId: existing?.id, toggle, add, remove };
}

export default useWatchlist;

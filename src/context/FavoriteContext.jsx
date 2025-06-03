import { createContext, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllFavorites,
  getAllCars,
  updateFavoriteStatus,
} from "../store/thunks/allCars";

export const FavoriteContext = createContext({});

export const FavoriteProvider = ({ children }) => {
  const { cars } = useSelector((state) => state.allCars);
  const dispatch = useDispatch();
  const [animatedHearts, setAnimatedHearts] = useState({});
  const [favorites, setFavorites] = useState([]);

  const handleChangeFavorite = useCallback(
    (favoriteID, isFavorite) => {
      setAnimatedHearts((prev) => ({ ...prev, [favoriteID]: true }));

      return dispatch(
        updateFavoriteStatus({
          currentFavorite: !isFavorite,
          carID: favoriteID,
        })
      )
        .unwrap?.()
        .catch((err) => {
          console.error("Ошибка при обновлении избранного:", err);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    const timers = Object.entries(animatedHearts).map(([id, isActive]) => {
      if (isActive) {
        return setTimeout(() => {
          setAnimatedHearts((prev) => ({ ...prev, [id]: false }));
        }, 600);
      }
      return null;
    });

    return () => timers.forEach((t) => t && clearTimeout(t));
  }, [animatedHearts]);

  const handleClearAllList = useCallback(() => {
    dispatch(clearAllFavorites());
  }, [dispatch]);

  useEffect(() => {
    setFavorites(cars?.filter((item) => item.isFavorite));
  }, [cars]);

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  return (
    <FavoriteContext.Provider
      value={{
        animatedHearts,
        onChangeFavorite: handleChangeFavorite,
        onClearAllFavorites: handleClearAllList,
        counter: favorites?.length,
        favorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

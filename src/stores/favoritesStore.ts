import { defineStore } from "pinia";
import { ref } from "vue";
import { Item } from "@/types.ts";

export const useFavoritesStore = defineStore("favoritesStore", () => {
  const favorites = ref<Item[]>([]);

  const toggleFavorite = (item: Item) => {
    const findItemIndex = favorites.value.findIndex((el) => el.id === item.id);
    if (findItemIndex !== -1) {
      favorites.value.splice(findItemIndex, 1);
    } else {
      favorites.value.push(item);
    }
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  };

  const initializeFavorites = () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      favorites.value = JSON.parse(storedFavorites);
    }
  };

  return {
    favorites,
    toggleFavorite,
    initializeFavorites,
  };
});

import { defineStore } from "pinia";
import { ref } from "vue";
import type { Item } from "@/types.ts";

export const useCartStore = defineStore("cartStore", () => {
  const cart = ref<Item[]>([]);

  const toggleCart = (item: Item) => {
    const findItemIndex = cart.value.findIndex((el) => el.id === item.id);
    if (findItemIndex !== -1) {
      cart.value.splice(findItemIndex, 1);
    } else {
      cart.value.push(item);
    }
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  const initializeCart = () => {
    cart.value = JSON.parse(localStorage.getItem("cart") || "[]");
  };

  return {
    cart,
    toggleCart,
    initializeCart,
  };
});

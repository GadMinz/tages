import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import type { Item, Material } from "@/types";

export const useProductsStore = defineStore("productsStore", () => {
  const items = ref<Item[]>([]);
  const materials = ref<Material[]>([]);
  const sortOrder = ref<"none" | "asc" | "desc">("none");
  const selectedMaterial = ref<string>("all");
  const loading = ref(false);

  // Запрос для загрузки товаров
  const loadItems = async (): Promise<void> => {
    try {
      loading.value = true;
      const response = await axios.get<Item[]>("/items.json");
      items.value = response.data;
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
    } finally {
      loading.value = false;
    }
  };

  // Запрос для загрузки материалов
  const loadMaterials = async (): Promise<void> => {
    try {
      const response = await axios.get<Material[]>("/materials.json");
      materials.value = response.data;
    } catch (error) {
      console.error("Ошибка загрузки материалов:", error);
    }
  };

  // Сортировка
  const setSortOrder = (order: "none" | "asc" | "desc"): void => {
    sortOrder.value = order;
  };

  // Фильтрация по материалам
  const setSelectedMaterial = (material: string): void => {
    selectedMaterial.value = material;
  };

  // Отфильтрованные и отсортированные товары
  const filteredItems = computed<Item[]>(() => {
    let filtered = [...items.value];

    // Фильтрация по материалу
    if (selectedMaterial.value !== "all") {
      const materialId = parseInt(selectedMaterial.value);
      filtered = filtered.filter((item) => item.material === materialId);
    }

    // Сортировка по цене
    if (sortOrder.value === "asc") {
      filtered.sort((a, b) => a.price.current_price - b.price.current_price);
    } else if (sortOrder.value === "desc") {
      filtered.sort((a, b) => b.price.current_price - a.price.current_price);
    }

    return filtered;
  });

  return {
    items,
    materials,
    sortOrder,
    selectedMaterial,
    loading,
    setSortOrder,
    setSelectedMaterial,
    filteredItems,
    loadItems,
    loadMaterials,
  };
});

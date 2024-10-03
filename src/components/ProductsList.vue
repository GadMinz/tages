<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useProductsStore } from "@/stores/productsStore";
import { useCartStore } from "@/stores/cartStore";
import { useFavoritesStore } from "@/stores/favoritesStore";
import CustomSelect from "@/components/CustomSelect.vue";
import { storeToRefs } from "pinia";
import type { Item, Material } from "@/types";
import ProductItem from "@/components/ProductItem.vue";

const productsStore = useProductsStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

// Извлечение значений из стора
const { loading, sortOrder, selectedMaterial, filteredItems } =
  storeToRefs(productsStore);
// Инициализация
onMounted((): void => {
  productsStore.loadItems();
  productsStore.loadMaterials();
  cartStore.initializeCart();
  favoritesStore.initializeFavorites();
});

// Опции для сортировки
const sortOptions = ref([
  { label: "По умолчанию", value: "none" },
  { label: "По возрастанию цены", value: "asc" },
  { label: "По убыванию цены", value: "desc" },
]);

// Опции для материалов
const materialOptions = computed(() => [
  { label: "Все", value: "all" },
  ...productsStore.materials.map((material: Material) => ({
    label: material.name,
    value: material.id.toString(),
  })),
]);

// Методы для сортировки и фильтрации
const setSortOrder = (order: string): void => {
  if (["none", "asc", "desc"].includes(order)) {
    productsStore.setSortOrder(order as "none" | "asc" | "desc");
  }
};

const setSelectedMaterial = (material: string): void => {
  productsStore.setSelectedMaterial(material);
};

// Методы для работы с корзиной и избранным
const toggleCart = (item: Item): void => {
  cartStore.toggleCart(item);
};

const isInCart = (id: string): boolean => {
  return cartStore.cart.some((item) => item.id === id);
};

const toggleFavorite = (item: Item): void => {
  favoritesStore.toggleFavorite(item);
};

const isFavorite = (id: string): boolean => {
  return favoritesStore.favorites.some((item) => item.id === id);
};
</script>

<template>
  <div class="products-container">
    <div v-if="loading">Загрузка...</div>

    <div v-else class="filters">
      <div class="filters-item">
        <div class="filters-item-title">Сортировать по:</div>
        <CustomSelect
          v-model="sortOrder"
          :options="sortOptions"
          @update:modelValue="setSortOrder"
        />
      </div>
      <div class="filters-item">
        <div class="filters-item-title">Материал</div>
        <CustomSelect
          v-model="selectedMaterial"
          :options="materialOptions"
          @update:modelValue="setSelectedMaterial"
        />
      </div>
    </div>

    <ul class="product-list">
      <ProductItem
        v-for="item in filteredItems"
        :key="item.id"
        :item="item"
        :isInCart="isInCart(item.id)"
        :isFavorite="isFavorite(item.id)"
        :toggleCart="toggleCart"
        :toggleFavorite="toggleFavorite"
      />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.filters {
  display: flex;
  margin-bottom: 30px;
  font-family: "SFProDisplay", sans-serif;
  flex-wrap: wrap;

  &-item {
    margin-right: 24px;
    width: 100%;
    max-width: 288px;
    margin-bottom: 10px;

    &:last-child {
      margin-right: 0;
    }
    &-title {
      padding-left: 16px;
      font-size: 12px;
      line-height: 1.5;
      color: #4f4f4f;
      margin-bottom: 6px;
    }
  }
}
.product-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 48px;
  row-gap: 40px;
  @media (max-width: 1366px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    &-item {
      max-width: 100%;
    }
  }
}
</style>

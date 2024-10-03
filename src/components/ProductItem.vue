<script setup lang="ts">
import { defineProps } from "vue";
import type { Item } from "@/types.ts";

const props = defineProps<{
  item: Item;
  isInCart: boolean;
  isFavorite: boolean;
  toggleCart: (item: Item) => void;
  toggleFavorite: (item: Item) => void;
}>();

const { name, code, image, price } = props.item;
</script>

<template>
  <li class="product-item">
    <div class="product-item-wrapper">
      <span class="product-item-label" v-if="price.old_price">Скидка</span>
      <div class="product-item-img">
        <img :src="image.url" :alt="name" />
      </div>
      <div class="product-item-content">
        <div class="product-item-code">{{ code ? code : "&nbsp" }}</div>
        <div class="product-item-name">{{ name }}</div>
        <p class="product-item-price">
          <span class="product-item-price-old" v-if="price.old_price"
            >{{ Math.ceil(price.old_price) }}₽</span
          >
          <span class="product-item-price-current"
            >{{ Math.ceil(price.current_price) }}₽</span
          >
        </p>
        <div class="product-item-controls">
          <button
            class="product-item-controls-btn cart"
            :class="{ active: isInCart }"
            @click="toggleCart(item)"
            :title="isInCart ? 'Удалить из корзины' : 'Добавить в корзину'"
          >
            <svg>
              <use
                :href="isInCart ? '/icons.svg#cart-success' : '/icons.svg#cart'"
              ></use>
            </svg>
          </button>
          <button
            class="product-item-controls-btn favorite"
            :class="{ active: isFavorite }"
            @click="toggleFavorite(item)"
            :title="
              isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'
            "
          >
            <svg>
              <use
                :href="
                  isFavorite ? '/icons.svg#heart-fill' : '/icons.svg#heart'
                "
              ></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.product-item {
  padding: 0 24px;
  margin-bottom: 40px;
  width: 25%;
  &-wrapper {
    padding: 9px 12px;
    border: 1px solid #eeeeee;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  &-label {
    position: absolute;
    top: 8px;
    left: 0;
    background-color: #eb5757;
    padding: 3px 16px;
    font-family: "SFProDisplay", sans-serif;
    font-size: 14px;
    line-height: 1.3;
    color: #ffffff;
  }
  &-img {
    margin-bottom: 23px;
    img {
      display: block;
      margin: 0 auto;
    }
  }
  &-content {
    margin-top: auto;
  }
  &-code {
    font-size: 10px;
    margin-bottom: 5px;
    color: #888888;
  }
  &-name {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  &-price {
    font-size: 16px;
    &-old {
      color: #888888;
      margin-right: 9px;
      text-decoration: line-through;
    }
  }
  &-controls {
    position: absolute;
    bottom: 4px;
    right: 14px;
    &-btn {
      width: 36px;
      height: 36px;
      padding: 7px;
      transition: 200ms;
      svg {
        width: 22px;
        height: 22px;
      }
      &.favorite {
        &:hover {
          opacity: 0.9;
          color: #eb5757;
        }
        &.active {
          color: #eb5757;
        }
      }
      &.cart {
        &:hover {
          opacity: 0.9;
          color: #27ae60;
        }
        &.active {
          color: #27ae60;
        }
      }
    }
  }
  @media (max-width: 1366px) {
    width: 33.33%;
  }
  @media (max-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 640px) {
    width: 100%;
  }
}
</style>

<script lang="ts" setup>
import ProductsList from "@/components/ProductsList.vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
</script>

<template>
  <div class="wrapper">
    <!--Заглушка breadcrumbs-->
    <BreadCrumbs />
    <h1>Комплекты стеллажных систем</h1>
    <ProductsList />
  </div>
</template>

<style lang="scss">
h1 {
  font-family: "SFProDisplay", sans-serif;
  font-size: 36px;
  line-height: 1.33;
  margin-bottom: 32px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 28px;
  }
}
</style>

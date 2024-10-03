<script setup lang="ts">
import type { BreadCrumb } from "@/types.ts";
import { onMounted, ref } from "vue";

const breadcrumbs = ref<BreadCrumb[]>([]);

onMounted(() => {
  breadcrumbs.value = [
    { text: "Главная", link: "javascript:void(0)" },
    { text: "Системы хранения", link: "javascript:void(0)" },
    { text: "Комплекты стеллажных систем", link: "javascript:void(0)" },
  ];
});
</script>

<template>
  <nav aria-label="breadcrumbs">
    <ul class="breadcrumbs">
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="breadcrumbs-item"
      >
        <a :href="crumb.link" v-if="index < breadcrumbs.length - 1">{{
          crumb.text
        }}</a>
        <span v-else>{{ crumb.text }}</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 32px;
  &-item {
    position: relative;
    font-size: 16px;
    display: flex;
    &:not(:last-child):after {
      content: "/";
      padding: 0 16px;
      color: #828282;
    }
    &:last-child:after {
      content: "";
      display: none;
    }
    a {
      color: #828282;
    }
  }
}
</style>

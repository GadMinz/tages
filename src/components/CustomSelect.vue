<script lang="ts" setup>
import {
  ref,
  defineProps,
  defineEmits,
  watch,
  onMounted,
  onBeforeUnmount,
} from "vue";

interface Option {
  label: string;
  value: string;
}

const props = defineProps<{
  modelValue: string;
  options: Option[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const isOpen = ref(false);
const selectRef = ref<HTMLElement | null>(null); // Реф для отслеживания кликов вне селекта

// Открытие и закрытие селекта
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Выбор опции
const selectOption = (option: Option) => {
  emit("update:modelValue", option.value);
  isOpen.value = false; // Закрываем селект после выбора
};

// Закрытие селекта при клике вне его области
const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

// Обработчик кликов по документу
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

// Убираем обработчик кликов при уничтожении компонента
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Следим за выбранной опцией и обновляем label
const selectedLabel = ref("");
const updateLabel = () => {
  const selected = props.options.find((opt) => opt.value === props.modelValue);
  selectedLabel.value = selected ? selected.label : "";
};

// Обновление label при изменении modelValue или options
watch(
  () => props.modelValue,
  () => {
    updateLabel();
  },
);

watch(
  () => props.options,
  () => {
    updateLabel();
  },
);

// Инициализация
onMounted(() => {
  updateLabel();
});
</script>

<template>
  <div class="custom-select" ref="selectRef" @click="toggleDropdown">
    <div class="selected" :class="{ open: isOpen }">
      {{ selectedLabel }}
      <svg class="arrow" :class="{ open: isOpen }">
        <use xlink:href="/icons.svg#select-arrow"></use>
      </svg>
    </div>
    <ul v-if="isOpen" class="options">
      <li
        v-for="option in options"
        :key="option.value"
        @click.stop="selectOption(option)"
        :class="{ selected: option.value === modelValue }"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  width: 100%;
  user-select: none;

  .selected {
    padding: 8px 16px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f2f2f2;
    font-size: 14px;
    line-height: 1.5;

    &.open {
      border-color: #007bff;
    }

    .arrow {
      width: 24px;
      height: 24px;
      transition: transform 0.2s;
      &.open {
        transform: rotate(180deg);
      }
    }
  }

  .options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    border: 1px solid #ccc;
    background-color: #fff;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    font-size: 14px;

    li {
      padding: 8px 16px;
      cursor: pointer;

      &:hover,
      &.selected {
        background-color: #f0f0f0;
      }
    }
  }
  @media (max-width: 768px) {
    max-width: 100%;
  }
}
</style>

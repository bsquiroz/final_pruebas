<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropsSelectCustom {
  label: string;
  placeholder: string;
  value?: string;
  options: {
    text: string;
    value: string;
  }[];
}

defineProps<PropsSelectCustom>();
const emits = defineEmits<{
  "update:model-value": [value: string];
}>();
</script>

<template>
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <Select
      :modelValue="value"
      @update:model-value="(value) => emits('update:model-value', value)"
    >
      <SelectTrigger>
        <SelectValue :placeholder="placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{{ label }}</SelectLabel>

          <SelectItem v-for="option in options" :value="option.value">{{
            option.text
          }}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>

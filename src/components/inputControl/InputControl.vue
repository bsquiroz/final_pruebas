<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  label: string;
  id: string;
  placeholder: string;
  modelValue: string | number | undefined;
  type: string;
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();
</script>

<template>
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <Label :for="id">{{ label }}</Label>
    <Input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :modelValue="props.modelValue"
      maxlength="30"
      @update:modelValue="(value) => emits('update:modelValue', value)"
    />
  </div>
</template>

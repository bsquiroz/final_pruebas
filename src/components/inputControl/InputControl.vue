<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SpecialCharactersValidation from "@/utils/validateRegex";

interface Props {
  label: string;
  id: string;
  placeholder: string;
  modelValue: string | number | undefined;
  type: string;
  regexPattern?: RegExp;
  maxLength?: number;
}

interface KeyBoardEvent {
  charCode?: number;
  which: number;
  target: any;
  code: string;
  key: string;
  preventDefault: () => void;
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const regexValidation = (e: KeyBoardEvent) => {
  SpecialCharactersValidation(props.regexPattern, e);
};
</script>

<template>
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <Label :for="id">{{ label }}</Label>
    <Input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :modelValue="props.modelValue"
      :maxlength="maxLength"
      @update:modelValue="(value) => emits('update:modelValue', value)"
      @keypress="regexValidation"
    />
  </div>
</template>

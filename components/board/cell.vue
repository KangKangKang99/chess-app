<template>
    <div class="cursor-pointer" :class="bgColor + ' ' + size">
    </div>
</template>
<script setup lang="ts">
interface IProps {
    type: 'Primary' | 'Secondary';
    size: string
}

const {type, size} = defineProps<IProps>();

const bgColor = computed(() => {
    if (type === 'Primary') {
        return 'bg-blue-500';
    }
    return 'bg-gray-500';
});
</script>
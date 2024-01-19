<script setup lang="ts">
import AnimatedSector from '@/components/AnimatedSector.vue';
type Moods = {
    nature: number;
    relax: number;
    history: number;
    culture: number;
    party: number;
};

const colors = ['#8bc53e', '#40b0ed', '#fabf3a', '#f48d38', '#8565f9'];
const keys = [
    'nature',
    'relax',
    'history',
    'culture',
    'party',
] as const;

const props = defineProps({
    moods: Object as () => Moods,
})
</script>

<template>
    <div class="w-full flex flex-row justify-center my-8">
        <div class="flex gap-6">
            <div v-for="(mood, i) in keys" :key="mood" class="flex flex-col lg:flex-row gap-2">
                <AnimatedSector v-if="props.moods?.[mood] || props.moods?.[mood] === 0" :percentage="props.moods?.[mood]" :color="colors[i]" />
                <div class="flex flex-col text-center lg:text-left justify-center">
                    <span class="capitalize">{{mood}}</span>
                    <span class="font-extrabold" :style="{ color: colors[i] }">{{ props.moods?.[mood] }}%</span>
                </div>
            </div>
        </div>
    </div>
</template>
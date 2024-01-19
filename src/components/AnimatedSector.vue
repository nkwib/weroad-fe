<template>
    <div class="bg-slate-400 pie">
    </div>
    <div class="bg-white inner-pie z-10">
    </div>
    <div class="sector" :class="`sector-${percentage}`" :style="sectorStyle">
        <div class=""></div>
    </div>
</template>
  
<script lang="ts">
export default {
    props: {
        percentage: {
            type: Number,
            required: true,
        },
        color: String,
    },
    computed: {
        sectorStyle() {
            function getClipPath(percentage: number) {
                if (percentage < 0) {
                    return 'polygon(50% 50%, 0% 0%, 0% 0%)';
                } else if (percentage > 100) {
                    return 'polygon()';
                }
                if (percentage < 25) {
                    return `polygon(50% 50%, 0% 0%, ${percentage * 4}% 0%)`;
                } else if (percentage < 50) {
                    return `polygon(50% 50%, 0% 0%, 100% 0%, 100% ${(percentage - 25) * 4}%)`;
                } else if (percentage < 75) {
                    return `polygon(50% 50%, 0% 0%, 100% 0%, 100% 100%, ${100 - (percentage - 50) * 4}% 100%)`;
                } else {
                    return `polygon(50% 50%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% ${100 - (percentage - 75) * 4}%)`;
                }
            }
            return {
                'clip-path': getClipPath(this.percentage),
                'background-color': this.color,
            };
        },

    },
};
</script>
  
<style>
.pie {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #dfdfdf;
    position: absolute;
}
.inner-pie {
    width: 72px;
    height: 72px;
    margin: 14px;
    border-radius: 50%;
    position: absolute;
}

.sector {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    transform: rotate(45deg);
    animation: sector 4s linear both infinite;
}
</style>
  
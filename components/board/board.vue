<template>
    <div class="grid grid-cols-10 items-center justify-center gap-0 w-fit">
        <div :key="i" v-for="(item, i) in boardSize">
            <div v-if="item[0]" class="bg-red-50 flex items-center justify-center font-bold" :class="cellSize">
                {{ borderContent(item[1], item[2]) }}
            </div>
            <board-cell v-else :type="(item[1] + item[2]) % 2  ? `Primary` : `Secondary`" :size="cellSize"/>
        </div>
    </div>
</template>

<script setup>
import BoardCell from "~/components/board/cell.vue";

const boardSize = Array.from({length: 10}, (v, i) => {
    return Array.from({length: 10}, (u, j) => {
        const isBorder = i === 0 || i === 9 || j === 0 || j === 9;
        return [isBorder, i, j];
    });
}).flat();

const borderContent = (i, j) => {
    switch (true) {
        case i === 0 && j === 0:
        case i === 0 && j === 9:
        case i === 9 && j === 0:
        case i === 9 && j === 9:
            return '';
        case j === 0 || j === 9:
            return String.fromCharCode(64 + i);
        case i === 0 || i === 9:
            return 9 - j;
    }
};

const cellSize = ' w-20 h-20 ';
</script>
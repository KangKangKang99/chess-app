<template>
    <div class="hidden">
        <pawn ref="piecePawn"/>
    </div>
    <div ref="wrapper"></div>
    <div class="mt-20">
        <label for="chessType">Chess Type</label>
        <select v-model="chessType" @change="drawChessBoard">
            <option selected :value="1">Black-White</option>
            <option :value="2">Green-Pink</option>
        </select>
    </div>
    <button class="bg-green-400" @click="drawChessMan">Play</button>
</template>

<script setup>
import * as PIXI from 'pixi.js';
import Pawn from "~/components/icons/pawn.vue";
import {PIECE_VALUES} from "~/utils/constants/primitives";

const squareSize = 50;
const boardMargin = 60;

const wrapper = ref(null);
const app = ref(null);
const container = ref(null);
const chessType = ref(1);
const piecePawn = ref(null);
const chessMan = reactive([...PIECE_VALUES()]);

onMounted(() => {
    initCreateApp();
    drawChessBoard();
});

const initCreateApp = () => {
    app.value = new PIXI.Application({
        width: 8 * squareSize + boardMargin * 2,
        height: 8 * squareSize + boardMargin * 2,
        backgroundColor: 0x1099bb,
        resolution: window.devicePixelRatio || 1,
    });
    wrapper.value.appendChild(app.value.view);
    container.value = new PIXI.Container();
    container.value.zIndex = 1;
    container.value.x = boardMargin
    container.value.y = boardMargin;
    container.value.backgroundColor = 'red'
    app.value.stage.addChild(container.value);
}

const drawChessBoard = () => {
    const priColor = chessType.value === 1 ? 0x000000 : 0x00FF00;
    const secColor = chessType.value === 1 ? 0xFFFFFF : 0xFF00FF;
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            // Create a new graphics object for each square
            const graphics = new PIXI.Graphics();
            graphics.zIndex = 0;
            // Determine the fill color based on the row and column
            const isEvenRow = row % 2 === 0;
            const isEvenCol = col % 2 === 0;
            const isEvenSquare = (isEvenRow && isEvenCol) || (!isEvenRow && !isEvenCol);
            const fillColor = !isEvenSquare ? priColor : secColor;

            // Draw the square and set its position
            graphics.beginFill(fillColor);
            graphics.drawRect(0, 0, squareSize, squareSize);
            graphics.endFill();
            graphics.x = col * squareSize;
            graphics.y = row * squareSize;
            container.value.addChild(graphics);
        }
    }
}

const drawChessMan = () => {
    for (let i = 0; i < chessMan.length; i++) {
        switch (chessMan[i].type) {
            case 'pawn':
                drawPiece(chessMan[i]);
                break;
        }
    }
}

const drawPiece = (chess) => {
    chess.test = '123123'
    console.log(chess.test)
    const svgElement = getPieceSvgByType(chess.type);
    const position = getPiecePosition(chess.currentPos[0], chess.currentPos[1]);
    console.log(position)
    const canvasElement = document.createElement("canvas");
    canvasElement.width = 420;
    canvasElement.height = 420;
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const ctx = canvasElement.getContext("2d");
    const img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0, 50, 50);
        ctx.fillStyle = "#FF0000";
        const texture = PIXI.Texture.from(canvasElement);
        chess.value = new PIXI.Graphics();
        chess.value.zIndex = 2;
        chess.value.beginTextureFill({texture});
        chess.value.drawRect(0, 0, canvasElement.width, canvasElement.height);
        chess.value.endFill();
        chess.value.interactive = true; // Enable drag-and-drop
        chess.value.buttonMode = true; // Set the cursor to a pointer
        chess.value.draggable = true; // Enable drag-and-drop
        chess.value
            .on('pointerdown', e => onDragStart(chess.value, e))
            .on('pointerup', e => onDragEnd(chess.value, e))
            .on('pointerupoutside', e => onDragEnd(chess.value, e))
            .on('pointermove', e => onDragMove(chess.value, e));
        container.value.addChild(chess.value);
    }
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
}

const onDragStart = (square, e) => {
    // square.x = e.data.global.x;
    // square.y = e.data.global.y;
    square.dragging = true;

}

const onDragEnd = (square, e) => {
    console.log(e)
    square.x = e.data.global.x;
    square.y = e.data.global.y;
    square.dragging = false;
}

const onDragMove = (square, e) => {
    if (square.dragging) {
        square.x = e.data.global.x;
        square.y = e.data.global.y;
        square.zIndex = 4;
    }
}

const getPiecePosition = (posX, posY) => {
    const x = posX * squareSize
    const y = posY * squareSize
    return {x, y};
}

const getPieceSvgByType = (type) => {
    switch (type) {
        case 'pawn':
            return piecePawn.value.$el;
    }
}

</script>
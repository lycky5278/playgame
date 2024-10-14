const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
    x: 50,
    y: canvas.height - 150,
    width: 50,
    height: 50,
    dx: 5,
    dy: 0,
    gravity: 0.5,
    jumpHeight: -10,
    isJumping: false,
    color: '#ff0000'
};

let score = 0;
let gameOver = false;
let keys = {};

// 處理按鍵事件
window.addEventListener('keydown', function(e) {
    keys[e.code] = true;
});
window.addEventListener('keyup', function(e) {
    keys[e.code] = false;
});

// 更新玩家狀態
function update() {
    if (gameOver) return;

    // 水平移動
    if (keys['ArrowRight']) player.x += player.dx;
    if (keys['ArrowLeft']) player.x -= player.dx;

    // 跳躍機制
    if (keys['Space'] && !player.isJumping) {
        player.dy = player.jumpHeight;
        player.isJumping = true;
    }

    // 應用重力
    player.dy += player.gravity;
    player.y += player.dy;

    // 防止掉落到地面以下
    if (player.y + player.height >= canvas.height - 100) {
        player.y = canvas.height - 100 - player.height;
        player.isJumping = false;
    }

    // 增加分數
    score += 1;

    // 如果玩家超出屏幕，遊戲結束
    if (player.x > canvas.width || player.y > canvas.height) {
        gameOver = true;
    }
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawScore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("Score: " + score, 10, 30);
}

function drawGameOver() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "#ff0000";
    ctx.fillText("Game Over", canvas.width / 2 - 150, canvas.height / 2);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布

    update();
    drawPlayer();
    drawScore();

    if (gameOver) {
        drawGameOver();
    } else {
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();

function getVW(percent) {
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}

function getVH(percent) {
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}

(function gameLaunch() {
    const gameWidth = getVW(95);
    const gameHeight = gameWidth / 2;
    const gameEngine = new GameEngine(gameWidth, gameHeight);
    gameEngine.launch();
})();
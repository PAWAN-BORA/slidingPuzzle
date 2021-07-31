let game = new Game.Engine(1366, 768);

window.onload = ()=>{
    document.getElementById("loading_screen").style.display = "none";
    game.start("canvas");
    game.resize();
}

window.onresize = ()=>{
    game.resize();
}
let game = new Game.Engine(1366, 768);
const totalImages = 2;
let loadImages = 0;
let puzzleDim = 3;
function callBack(val:number) {
    console.log(val);
    if(val==totalImages){
        // game.start()
        document.getElementById("loading_screen").style.display = "none";
        game.start("canvas");
        game.resize();
    }
}
window.onload = ()=>{
    // document.getElementById("loading_screen").style.display = "none";
    // game.start("canvas");
    // game.resize();
}

window.onresize = ()=>{
    game.resize();
}
interface Window {
    Android: {
      getNumber: () => {}
    }|undefined
  }
let game = new Game.Engine(1366, 768);
const totalImages = 2;
let loadImages = 0;
let puzzleDim = 3;

function callBack(val:number) {
    if(val==totalImages){
        if(window.Android!=undefined){
            let numStr = window.Android.getNumber();
            puzzleDim = Number(numStr);
        }
        document.getElementById("loading_screen").style.display = "none";
        game.start("canvas");
        game.resize();
    }
}
window.onload = ()=>{
    // document.getElementById("loading_screen").style.display = "none";
    // game.start("canvas");
    // game.resize();
    // let number =  window.Andoird.getNumber();
    // console.log(number);
}

window.onresize = ()=>{
    game.resize();
}
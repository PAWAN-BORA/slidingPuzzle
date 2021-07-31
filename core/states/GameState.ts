namespace Game {
    export class GameState implements IState{

        private uIManager:UIManager;
        private board:Board;
        private buttonManager:ButtonManager;
        private checkBtn:UIButton;
        private resetBtn:UIButton;
        private solveBtn:UIButton;
        public constructor(world:World) {
            this.uIManager = new UIManager();
            this.board = new Board(3);
            this.buttonManager = new ButtonManager();
            this.uIManager.addManagers(this.board);
            this.uIManager.addManagers(this.buttonManager);
            this.setButtons();
        }
         public setup():void {
            MouseManager.setUIManager(this.uIManager);
			TouchManager.setUIManager(this.uIManager);
            // this.score = this.world.gameState.score;
        }
       
        public resetGame() {

        }
        private setButtons() {
            let checkBtn = new UIButton(1000, 224.6, {type:"rectangle", width:143, height:47});
            checkBtn.text = "Check";
            checkBtn.textStyle.align = "center";
            checkBtn.textStyle.baseline = "middle";
            checkBtn.textStyle.size = "25px";
            checkBtn.textStyle.color = "white";
            checkBtn.background = AssetManager.pictures["btn_format"].image;
            checkBtn.onClick = ()=>{
                console.log("dsds");
                let answer = this.board.checkAnswer();
                if(answer===true) {
                    console.log("good");
                } else {
                    console.log("try again");
                }
            }
            let resetBtn = new UIButton(1000, 496.3, {type:"rectangle", width:143, height:47});
            resetBtn.text = "reset";
            resetBtn.textStyle.align = "center";
            resetBtn.textStyle.baseline = "middle";
            resetBtn.textStyle.size = "25px";
            resetBtn.textStyle.color = "white";
            resetBtn.background = AssetManager.pictures["btn_format"].image;
            resetBtn.onClick = ()=>{
                this.board.resetNumbers();
            }
            let solveBtn = new UIButton(1000, 300, {type:"rectangle", width:143, height:47});
            solveBtn.text = "solve";
            solveBtn.textStyle.align = "center";
            solveBtn.textStyle.baseline = "middle";
            solveBtn.textStyle.size = "25px";
            solveBtn.textStyle.color = "white";
            solveBtn.background = AssetManager.pictures["btn_format"].image;
            let solution;
            solveBtn.onClick = ()=>{
               solution = new BoardSoultion(this.board.getBoxes, 3);
               solution.solution();
            }
            let showSolution = new UIButton(1000, 400, {type:"rectangle", width:143, height:47});
            showSolution.text = "show sol";
            showSolution.textStyle.align = "center";
            showSolution.textStyle.baseline = "middle";
            showSolution.textStyle.size = "25px";
            showSolution.textStyle.color = "white";
            showSolution.background = AssetManager.pictures["btn_format"].image;
            showSolution.onClick = ()=>{
               
               if(solution.solutionNodes.length!==0){
                 this.viewSolution(solution.solutionNodes);
               } else {
                   console.log("not solved yet");
               };
            }
            this.buttonManager.addButton(checkBtn);
            this.buttonManager.addButton(resetBtn);
            this.buttonManager.addButton(solveBtn);

            this.buttonManager.addButton(showSolution);

        }
        private viewSolution(solutionNodes:Node[]) {
            let num =0;
            let interval = setInterval(()=>{

                num++;
                this.board.setBoxNum(solutionNodes[num].boxes);

                console.log(num, solutionNodes.length);
                if(num===solutionNodes.length-1) {
                    clearInterval(interval);
                    
                }

            }, 500)
        }
        private checkAnswer() {
           
        }

        public update():void {
            // this.uIManager.update();
            this.board.update();
            this.buttonManager.update();
           
        }
        public render():void {
            // ctx.drawImage(AssetManager.pictures["bg"].image, 0, 0);
            ctx.clearRect(0, 0, cvs.width, cvs.height);
            ctx.save();
            ctx.fillStyle = "#a1e4b9";
            ctx.fillRect(0, 0, cvs.width, cvs.height);
            ctx.restore();
            this.uIManager.render();
            this.board.render();
            this.buttonManager.render();
            // ctx.save();
            // ctx.textAlign = 'center';
            // ctx.textBaseline = 'middle';
            // ctx.font = 'bold 35px arial';
            // if(Timer.sec<10) {
            //     ctx.fillText(`0${Timer.min}:0${Timer.sec}`, 1300, 35);
            // } else {
            //     ctx.fillText(`0${Timer.min}:${Timer.sec}`, 1300, 35);
            // }
            // ctx.fillText(`${score}`, 180, 35);
            // ctx.restore();
        }

    }
}
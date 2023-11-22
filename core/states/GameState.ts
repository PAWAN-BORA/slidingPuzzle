namespace Game {
  export class GameState implements IState {

    private uIManager: UIManager;
    private board: Board;
    private buttonManager: ButtonManager;
    private boardDim: number = puzzleDim;
    private boardSolution: BoardSoultion;
    private backgroundGradient:CanvasGradient

    public constructor(world: World) {
      this.uIManager = new UIManager();
      this.board = new Board(this.boardDim);
      this.buttonManager = new ButtonManager();
      this.uIManager.addManagers(this.board);
      this.uIManager.addManagers(this.buttonManager);
      this.setButtons();
      this.backgroundGradient = ctx.createLinearGradient(cvs.width/2, 0, cvs.width/2, cvs.height);
      this.backgroundGradient.addColorStop(0, "#bd854d")
      this.backgroundGradient.addColorStop(0.5, "#eac5a4")
      this.backgroundGradient.addColorStop(1, "#bd854d")
    }
    public setup(): void {
      MouseManager.setUIManager(this.uIManager);
      TouchManager.setUIManager(this.uIManager);
    }

    public resetGame() {

    }
    private setButtons() {
      // let checkBtn = new UIButton(1000, 224.6, { type: "rectangle", width: 143, height: 47 });
      // checkBtn.text = "Check";
      // checkBtn.textStyle.align = "center";
      // checkBtn.textStyle.baseline = "middle";
      // checkBtn.textStyle.size = "25px";
      // checkBtn.textStyle.color = "white";
      // checkBtn.background = AssetManager.pictures["btn_format"].image;
      // checkBtn.onClick = () => {
      //   this.boardSolution = new BoardSoultion(this.board.getBoxes, this.boardDim);
      //   this.boardSolution.idaSolution();
      // }
      let resetBtn = new UIButton(1000, 496.3, { type: "rectangle", width: 143, height: 47 });
      resetBtn.text = "reset";
      resetBtn.textStyle.align = "center";
      resetBtn.textStyle.baseline = "middle";
      resetBtn.textStyle.size = "25px";
      resetBtn.textStyle.color = "white";
      resetBtn.background = AssetManager.pictures["btn_format"].image;
      resetBtn.onClick = () => {
        this.board.resetNumbers();
      }
      // let solveBtn = new UIButton(1000, 300, { type: "rectangle", width: 143, height: 47 });
      // solveBtn.text = "solve";
      // solveBtn.textStyle.align = "center";
      // solveBtn.textStyle.baseline = "middle";
      // solveBtn.textStyle.size = "25px";
      // solveBtn.textStyle.color = "white";
      // solveBtn.background = AssetManager.pictures["btn_format"].image;
      // solveBtn.onClick = () => {
      //   this.boardSolution = new BoardSoultion(this.board.getBoxes, this.boardDim);
      //   this.boardSolution.solution();
      // }
      let showSolution = new UIButton(1000, 400, { type: "rectangle", width: 162, height: 47 });
      showSolution.text = "view solution";
      showSolution.textStyle.align = "center";
      showSolution.textStyle.baseline = "middle";
      showSolution.textStyle.size = "25px";
      showSolution.textStyle.color = "white";
      showSolution.background = AssetManager.pictures["btn_format"].image;
      showSolution.onClick = () => {

          //  if(this.boardSolution.solutionNodes.length!==0){
          //    this.viewSolution(this.boardSolution.solutionNodes);
          //  } else {
          //      console.log("not solved yet");
          //  };
        // let startPoint = 0;
        // for (let j = 1; j < this.board.solutionNodes.length; j++) {
        //   let areSame = true;
        //   let node = this.board.solutionNodes[j];

        //   for (let i = 0; i < node.boxes.length; i++) {
        //     console.log(this.board.getBoxes[i].num !== node.boxes[i].num, this.board.getBoxes[i].num, node.boxes[i].num)
        //     if (this.board.getBoxes[i].num !== node.boxes[i].num) {
        //       areSame = false;
        //     }
        //   }

        //   console.log(areSame, 'are')
        //   if(areSame){
        //     startPoint = j;
        //   }
        // }
        // for(let i=0; i<this.board.solutionBoxes.length; i++){

        // }
        // console.log(startPoint, 'start');
        // this.viewSolution(this.board.solutionNodes.slice(startPoint));
        this.board.resetNumbers();
        this.viewSolution(this.board.solutionBoxes);

      }

      // const showSol = new UIButton(1000, 600, { type: "rectangle", width: 143, height: 47 }); 
      // showSol.text = "show sol 2";
      // showSol.textStyle.align = "center";
      // showSol.textStyle.baseline = "middle";
      // showSol.textStyle.size = "25px";
      // showSol.textStyle.color = "white";
      // showSol.background = AssetManager.pictures["btn_format"].image;
      // showSol.onClick = () => {
      //   if(this.boardSolution.solutionNodes.length!==0){
      //     // this.viewSolution(this.boardSolution.solutionNodes);
      //   } else {
      //       console.log("not solved yet");
      //   };
      // }
      // this.buttonManager.addButton(checkBtn);
      this.buttonManager.addButton(resetBtn);
      // this.buttonManager.addButton(solveBtn);

      this.buttonManager.addButton(showSolution);
      // this.buttonManager.addButton(showSol);

    }
    private async viewSolution(solutionBoxes: MovedBox[]) {
      let num = 0;
      while(num<solutionBoxes.length){
        let box = solutionBoxes[num].box;
        let nextBox = this.board.getBoxes.find(ele=>ele.num==undefined);
        console.log(box, nextBox)
        const dir = solutionBoxes[num].dir
        const initialPoint = new Point(box.x, box.y);
        const res = await this.board.animateResult(box, dir, nextBox, initialPoint, 16)
        console.log(res)
        num++;
      }
    }
    private checkAnswer() {

    }

    public update(): void {
      // this.uIManager.update();
      this.board.update();
      this.buttonManager.update();

    }
    public render(): void {
      // ctx.drawImage(AssetManager.pictures["bg"].image, 0, 0);
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      ctx.save();
      ctx.fillStyle = this.backgroundGradient;
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.restore();
      this.uIManager.render();
      // this.board.render();
      // this.buttonManager.render();
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
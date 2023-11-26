namespace Game {
  export class GameState implements IState {

    private uIManager: UIManager;
    private board: Board;
    private buttonManager: ButtonManager;
    private boardDim: number = puzzleDim;
    private autoSolved: boolean = false;
    private backgroundGradient:CanvasGradient;
    private popup:Popup;
    private donePopup:Popup;

    public constructor(world: World) {
      this.uIManager = new UIManager();
      this.board = new Board(this.boardDim);
      this.board.callback = ()=>{
        this.checkAnswer()
      };
      this.buttonManager = new ButtonManager();
      this.uIManager.addManagers(this.board);
      this.uIManager.addManagers(this.buttonManager);
      this.setButtons();
      this.backgroundGradient = ctx.createLinearGradient(cvs.width/2, 0, cvs.width/2, cvs.height);
      this.backgroundGradient.addColorStop(0, "#bd854d")
      this.backgroundGradient.addColorStop(0.5, "#eac5a4")
      this.backgroundGradient.addColorStop(1, "#bd854d")
      
    
      this.popup = new Popup(world);
     
      this.donePopup = new Popup(world);
      

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
      let resetBtn = new UIButton(cvs.width-290, cvs.height/2+50, { type: "rectangle", width: 143, height: 47 });
      resetBtn.text = "reset";
      resetBtn.textStyle.align = "center";
      resetBtn.textStyle.baseline = "middle";
      resetBtn.textStyle.size = "25px";
      resetBtn.textStyle.color = "white";
      resetBtn.background = AssetManager.pictures["btn_format"].image;
      resetBtn.onClick = () => {
        this.autoSolved = false;
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
      let showSolution = new UIButton(cvs.width-300, cvs.height/2-50, { type: "rectangle", width: 162, height: 47 });
      showSolution.text = "view solution";
      showSolution.textStyle.align = "center";
      showSolution.textStyle.baseline = "middle";
      showSolution.textStyle.size = "25px";
      showSolution.textStyle.color = "white";
      showSolution.background = AssetManager.pictures["btn_format"].image;
      showSolution.onClick = () => {

        this.setPopupData();

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
    private setPopupData(){
      const width = cvs.width/2;
      const x = cvs.width/2;
      const y = cvs.height/2;
      const height = cvs.height/3;
      const cancleBtn = new UIButton(x-width/2+20, y+height/2-70, {type:"rectangle", width:143, height:47});
      cancleBtn.text = "No";
      cancleBtn.textStyle.align = "center";
      cancleBtn.textStyle.baseline = "middle";
      cancleBtn.textStyle.size = "25px";
      cancleBtn.textStyle.color = "white";
      cancleBtn.background = AssetManager.pictures["btn_format"].image;
      cancleBtn.onClick = () => {
          this.popup.resetPupop();
          this.setup()
      }
      const okBtn = new UIButton(x+width/2-143-20, y+height/2-70, {type:"rectangle", width:143, height:47});
      okBtn.text = "Yes";
      okBtn.textStyle.align = "center";
      okBtn.textStyle.baseline = "middle";
      okBtn.textStyle.size = "25px";
      okBtn.textStyle.color = "white";
      okBtn.background = AssetManager.pictures["btn_format"].image;
      okBtn.onClick = () => {
          this.popup.resetPupop()
          setTimeout(()=>{
            this.board.resetNumbers();
            setTimeout(()=>{
              this.viewSolution(this.board.solutionBoxes);
            }, 500)
          }, 300);
      
      }
      const buttonManager = new ButtonManager();
      buttonManager.addButton(cancleBtn);
      buttonManager.addButton(okBtn);
      // let btnArray1 = [cancleBtn, okBtn]
      this.popup.renderInner = ()=>{
          ctx.fillStyle = "#ffffff";
          ctx.font = `bold 24px arial`
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("Sure To View Solution?", x, y-height/2+50); 
      }

      this.popup.showPopup(x, y, width, height, buttonManager)
    }
    private setDonePopupData(){
      const width = cvs.width/2;
      const x = cvs.width/2;
      const y = cvs.height/2;
      const height = cvs.height/3;
      const cancleBtn = new UIButton(x-70, y+height/2-80, {type:"rectangle", width:160, height:47});
      cancleBtn.text = "New Puzzle";
      cancleBtn.textStyle.align = "center";
      cancleBtn.textStyle.baseline = "middle";
      cancleBtn.textStyle.size = "25px";
      cancleBtn.textStyle.color = "white";
      cancleBtn.background = AssetManager.pictures["btn_format"].image;
      cancleBtn.onClick = () => {
          this.donePopup.resetPupop();
          this.board.getNewPuzzle();
          this.setup()
      }
      const buttonManager = new ButtonManager();
      buttonManager.addButton(cancleBtn);
      // let btnArray1 = [cancleBtn, okBtn]
      this.donePopup.renderInner = ()=>{
          ctx.fillStyle = "#ffffff";
          ctx.font = `bold 44px arial`
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("Well Done!", x, y-height/2+50); 
      }
      this.donePopup.showPopup(x, y, width, height, buttonManager)
      
    }
    private async viewSolution(solutionBoxes: MovedBox[]) {
      this.autoSolved = true;
      let num = 0;
      while(num<solutionBoxes.length){
        let box = solutionBoxes[num].box;
        let nextBox = this.board.getBoxes.find(ele=>ele.num==undefined);
        // console.log(box, nextBox)
        const dir = solutionBoxes[num].dir
        const initialPoint = new Point(box.x, box.y);
        const res = await this.board.animateResult(box, dir, nextBox, initialPoint, 16)
        // console.log(res)
        num++;
      }
      this.setup();
    }
    private checkAnswer() {
      if(this.autoSolved) return;
      if(this.board.checkAnswer()){
        this.setDonePopupData();
      }
    }

    public update(): void {
      // this.uIManager.update();
      this.board.update();
      this.buttonManager.update();
      this.popup.update();
      this.donePopup.update();

    }
    public render(): void {
      // ctx.drawImage(AssetManager.pictures["bg"].image, 0, 0);
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      ctx.save();
      ctx.fillStyle = this.backgroundGradient;
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.restore();
      this.uIManager.render();
      this.popup.render()
      this.donePopup.render();
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
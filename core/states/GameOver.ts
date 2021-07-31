namespace Game {

    export class GameOver implements IState{
        public playAgain:UIButton;
        public uIManager:UIManager;
        private world:World;
        private startTime:number =0;
        private totalTime:number = 0;
        private posX= 252;
        private posY = -680;
        private isAnimating = true;
        public constructor(world:World) {
            this.world = world;
            this.playAgain = new UIButton(600, 440, {type:"rectangle", width:120, height:120});
            // this.playAgain.background = AssetManager.pictures["replay"].image
            // this.playAgain.text = "Replay";
            // this.playAgain.textStyle.font = "arial";
            // this.playAgain.textStyle.color = "blue";
            // this.playAgain.textStyle.size = "30px";
            // this.playAgain.textStyle.align = "center";
            // this.playAgain.textStyle.baseline = "middle";
            this.playAgain.onClick = ()=>{
                this.posY = -680;
                this.isAnimating = true;
                this.resetGame();
            }
            this.uIManager = new UIManager();
            
            this.uIManager.addManagers(this.playAgain);
        } 
        private resetGame():void {
            this.world.gameState.resetGame();
            currentState = this.world.gameState;
            currentState.setup();
            score = 0;
            Timer.min = 5;
            Timer.sec = 0;
            Timer.start();
            
        }     
        public setup():void {
            MouseManager.setUIManager(this.uIManager);
            TouchManager.setUIManager(this.uIManager);
        }
        public update(): void {
            
           this.uIManager.update();
           let endTime = performance.now();
           let delta = endTime - this.startTime;
           this.totalTime += delta;
           if(this.totalTime>1000) {
                this.totalTime =0;
           } 
           if(this.isAnimating) {
               this.posY += 8;
               
               if(this.posY>=44) {
                   this.isAnimating = false;
                   this.posY = 44;
               }
           }
           this.startTime = endTime;
           
        }
        public render(): void {
            this.world.gameState.render();
            
            ctx.save();
            if(!this.isAnimating) {
                ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
                ctx.fillRect(0, 0, game.width, game.height);
            }
            ctx.drawImage(AssetManager.pictures["over"].image, this.posX, this.posY);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "bold 80px arial";
            ctx.fillStyle = "white";
            // ctx.fillText(`Game Over`, 683, 200);
            ctx.fillText(`${score}`, this.posX+480, this.posY+280);
            ctx.restore();
            if(!this.isAnimating) {
                this.uIManager.render();
            }
        }        
    }
}
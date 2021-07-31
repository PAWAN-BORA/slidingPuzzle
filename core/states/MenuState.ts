namespace Game {

    export class MenuState implements IState {

        private playButton:UIButton;
        private uIManager:UIManager = new UIManager();
        public constructor(world:World) {
            this.playButton = new UIButton(600, 400, {type:"rectangle", height:100, width:100});
            this.playButton.text = "Play";
            this.playButton.textStyle.size = "25px";
            this.playButton.textStyle.align = "center";
            this.playButton.onClick = ()=> {
                console.log('worskdfjklsdjf ')
            }
            this.uIManager.addManagers(this.playButton)
          
        }
         public setup():void {
           
            
            MouseManager.setUIManager(this.uIManager);
            TouchManager.setUIManager(this.uIManager);
            // this.score = this.world.gameState.score;
           
        }
        public update():void {

        }
        public render():void {
            ctx.drawImage(AssetManager.pictures["front"].image, 0, 0, game.width, game.height);
            this.uIManager.render();
        }
    }
}
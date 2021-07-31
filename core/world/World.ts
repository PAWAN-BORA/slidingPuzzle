namespace Game {
    export let currentState:IState;
    export let score:number = 0;
    export class World {
        private engine:Engine;
        public gameState:GameState;
        public menuState:MenuState;
        public gameOver:GameOver;
        // private view:View = new View();
        constructor(engine:Engine) {
            this.engine = engine;
            // this.uIManager = new UIManager();
            // this.view.setup(this.uIManager);
            // MouseManager.setUIManager(this.uIManager);
            this.gameState = new GameState(this);
            this.menuState = new MenuState(this);
            this.gameOver = new GameOver(this);

            currentState = this.gameState;
            currentState.setup();

        }
        
        public disableMouse():void {
            MouseManager.setUIManager(undefined);
            TouchManager.setUIManager(undefined);
        }

        public enableMouse():void { 
            currentState.setup();
        }

        public update():void {
            currentState.update();
        }
        public render():void {
           currentState.render();
        }
    }
}
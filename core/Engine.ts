namespace Game {

    export class Engine {
        private _width: number;
        private _world:World;
        public get width(): number {
            return this._width;
        }
      
         private _height: number;
        public get height(): number {
            return this._height;
        }
        
         constructor(width:number, height:number){
            this._width = width;
            this._height = height;
            this.preload();
         }
         private preload():void {
            // new Picture("front", "assets/texture/background.jpg");
            // new Picture("bg", "assets/texture/background.jpg");
            new Picture("btn_format", "assets/texture/btn_format.png");

         }
         private init():void {
            MouseManager.initialize(cvs);
            TouchManager.initialize(cvs);
            this._world = new World(this);
         }
         private loop():void {
            requestAnimationFrame(this.loop.bind(this));
            this.render();
            this.update();
         }
         public start(canvas?:string):void {
            Canvas.Initialize(canvas);
            cvs.width = this._width;
            cvs.height = this._height;
            this.init();
            this.loop();
         }
         public resize():void {
            let height = window.innerHeight;
            let width = window.innerWidth;
			
			 if(currentState instanceof MenuState) {
               cvs.style.width = `${window.innerWidth}px`;
               cvs.style.height = `${window.innerHeight}px`;
               return;
            }
            let ratio = width/height;
            document.getElementById('canvasArea').style.height = `${height}px`;
            document.getElementById('canvasArea').style.width = `${width}px`;
          
    
            if(ratio>(16/9)) {
                cvs.style.height = `${window.innerHeight}px`;
                cvs.style.width = `${(683/384)*window.innerHeight}px`;
            } else {
                cvs.style.width = `${window.innerWidth}px`;
                cvs.style.height = `${(384/683)*window.innerWidth}px`;
            }
         }
         private update():void {
            this._world.update();
         }
         private render():void {
           this._world.render();
            
         }  

    }
}
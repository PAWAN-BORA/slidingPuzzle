namespace Game {

    export class Popup {
        public width:number;
        public height:number;
        public x:number = 683;
        public y:number = 384;
        public speed:number = 45;
        private dimX:number = 0;
        private dimY:number = 0;
        private isShow:boolean =false;
        private startTime:number;
        private totalTime:number = 0;
        private isUpdating:boolean = false;
        private _world:World;
        private UIManager:UIManager;
        public renderInner:Function=()=>{};
        public textStyle:textFormat = {
            color:"#000000",
            font:"arial",
            weight:"normal",
            size:"16px",
            align:"center",
            baseline:"alphabetic",

        };
        constructor(world:World) {
            this._world = world;
        }
        public resetPupop() {
            this.isShow = false;
            this.dimX = 0;
            this.dimY = 0;
        }
      
        public showPopup(x:number, y:number, width:number, height:number, buttonManager:ButtonManager):void {
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.isShow = true;
            this.isUpdating = true;
            this.startTime = performance.now();
          
           
            this.UIManager = new UIManager();
            this.UIManager.addManagers(buttonManager);
            MouseManager.setUIManager(this.UIManager);
            TouchManager.setUIManager(this.UIManager);
        }

        public update():void {
            if(!this.isUpdating) {
                return;
            }
            let endTime = performance.now();
            let delta =  endTime - this.startTime;
            this.totalTime += delta;
            const speedX = this.speed;
            const speedY = (this.height*speedX)/this.width;
            if(this.totalTime>30) {
                this.dimX += speedX;
                this.dimY += speedY;
                this.totalTime = 0;
                if(this.dimX >=this.width) {
                    this.isUpdating = false;
                // setTimeout(()=>{
                //     this.dimX = 0;
                //     this.dimY = 0;
                //     this.isShow = false;
                //     this._world.enableMouse();
                // }, 500)
            }
            }
            this.startTime = endTime;

        }
        public render():void  {
            if(this.isShow) {
                ctx.save();
                ctx.fillStyle = "#bd854d"
                // ctx.fillRect(this.x-this.dimX/2, this.y-this.dimY/2, this.dimX, this.dimY);
                ctx.beginPath();
                ctx.roundRect(this.x-this.dimX/2, this.y-this.dimY/2, this.dimX, this.dimY, [8])
                ctx.fill()
                ctx.restore();
                // ctx.save();

                if(this.isUpdating)return;
                this.renderInner();
                this.UIManager.render();
            }
        }

    }
}
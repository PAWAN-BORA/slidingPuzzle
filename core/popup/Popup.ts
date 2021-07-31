namespace Game {

    export class Popup {
        public image:HTMLImageElement;
        public width:number;
        public height:number;
        public x:number = 683;
        public y:number = 384;
        public speed:number = 5;
        private dimX:number = 0;
        private dimY:number = 0;
        private isShow:boolean =false;
        private startTime:number;
        private totalTime:number = 0;
        private isUpdating:boolean = false;
        private _world:World;
        constructor(world:World) {
            this._world = world;
        }
        public showPopup(image:HTMLImageElement):void {
            this.image = image;
            this.width = image.width;
            this.height = image.height;
            this.isShow = true;
            this.isUpdating = true;
            this.startTime = performance.now();
            this._world.disableMouse();
            // let time = setInterval(()=>{
            //     this.dimX += this.speed;
            //     this.dimY += this.speed;
            //     if(this.dimX>= this.width) {
            //         clearInterval(time);
            //         setTimeout(()=>{
            //             this.dimX = 0;
            //             this.dimY = 0;
            //             this.isShow = false;
        
            //         }, 500)
            //     }
            // }, 20)
        }

        public update():void {
            if(!this.isUpdating) {
                return;
            }
            let endTime = performance.now();
            let delta =  endTime - this.startTime;
            this.totalTime += delta;
            
            if(this.totalTime>30) {
                this.dimX += this.speed;
                this.dimY += this.speed;
                this.totalTime = 0;
                if(this.dimX >=this.width) {
                    this.isUpdating = false;
                setTimeout(()=>{
                    this.dimX = 0;
                    this.dimY = 0;
                    this.isShow = false;
                    this._world.enableMouse();
                }, 500)
            }
            }
            this.startTime = endTime;
        }
        public render():void  {
            if(this.isShow) {
                ctx.save();
                // ctx.fillStyle = "rgba(219, 230, 213, 1)"
                // ctx.fillRect(this.x-400/2, this.y-400/2, 400, 400)
                ctx.drawImage(this.image, this.x-this.dimX/2, this.y-this.dimY/2, this.dimX, this.dimY);
                ctx.restore();
            }
        }

    }
}
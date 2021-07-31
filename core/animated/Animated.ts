namespace Game {

    export class Animated {
        private images:HTMLImageElement[] = [];
        private x:number;
        private y:number;
        private startTime:number = 0;
        private totalTime:number = 0;
        private frameTime:number = 150;
        private currentImage:HTMLImageElement;
        private imageNum = 0;
        private width:number = 634;
        private height:number = 382;
        private radius:number = 30;
        constructor(x:number, y:number) {
            this.x = x;
            this.y = y;

        }
        public addImage(image:HTMLImageElement) {
            this.images.push(image);
            this.currentImage = image;
        }

        public update():void {
            let endTime = performance.now();
            let delta = endTime - this.startTime;
            this.totalTime += delta; 
            if(this.totalTime>this.frameTime) {

                this.totalTime = 0;
                this.currentImage = this.images[this.imageNum];
                this.imageNum++;
                if(this.imageNum==this.images.length) {
                    this.imageNum = 0;
                }

            }
            this.startTime  = endTime;
        }
        public render():void {
            
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.x + this.radius, this.y);
            ctx.lineTo(this.x + this.width - this.radius, this.y);
            ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + this.radius);
            ctx.lineTo(this.x + this.width, this.y + this.height - this.radius);
            ctx.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - this.radius, this.y + this.height);
            ctx.lineTo(this.x + this.radius, this.y + this.height);
            ctx.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - this.radius);
            ctx.lineTo(this.x, this.y + this.radius);
            ctx.quadraticCurveTo(this.x, this.y, this.x + this.radius, this.y);
            ctx.closePath();
            ctx.fill();
            ctx.clip();
            ctx.drawImage(this.currentImage, this.x , this.y, this.width, this.height);
            // ctx.drawImage(AssetManager.pictures["bg"].image, this.x, this.y, this.width, this.height);
            ctx.restore();
            // ctx.strokeRect(this.x, this.y, 634, 382);
        }

    }
}
namespace Game {

    export class Rectangle {
        public x:number;
        public y:number;
        public width:number;
        public height:number;

        constructor(x:number, y:number, width:number, height:number) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        public contains(x:number, y:number):boolean {
            let centerX = this.x + this.width/2;
            let centerY = this.y+ this.height/2;
            if(Math.abs(centerX-x)<this.width/2 && Math.abs(centerY-y)<this.height/2) {
                return true;
            } else {
                return false;
            }
        }
        public update():void  {

        }
        public render():void {
            ctx.save();
            ctx.fillStyle = "black";
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.restore();
        }
    }
}
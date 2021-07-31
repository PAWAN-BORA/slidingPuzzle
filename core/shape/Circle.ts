namespace Game {

    export class Circle {
        public x:number;
        public y:number;
        public radius:number;

        constructor(x:number, y:number, radius:number) {
            this.x = x;
            this.y = y;
            this.radius = radius;
        }
        public contains(x:number, y:number):boolean {
           let point = new Point(this.x, this.y);
            if(point.dist(x, y)<this.radius) {
                return true;
            } else {
                return false;
            }
        }
        public update():void  {

        }
        public render():void {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }
}
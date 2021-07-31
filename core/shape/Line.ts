
namespace Game {

    export class Line {
        public point1:Point
        public point2:Point
        public offset:Point;
        public isHor:boolean = false;
        public get len():number {
            return this.point1.dist(this.point2.x, this.point2.y);
        }
        constructor(x1:number, y1:number, x2:number, y2:number) {
            this.point1 = new Point(x1, y1);
            this.point2 = new Point(x2, y2);
            this.offset = new Point(x2-x1, y2-y1-10);
        }
        public contain(x:number, y:number):boolean {
            let AC = {x:x-this.point1.x, y:y-this.point1.y};
            let AB = {x:this.point2.x-this.point1.x, y:this.point2.y-this.point1.y};
            let Kac = AB.x*AC.x + AB.y*AC.y;
            let Kab = AB.x*AB.x + AB.y*AB.y;
            if(0<=Kac && Kac<=Kab){
                // console.log(Kab)
                return true;
            }
            return false;
        }

        public update():void {
          
        }
       
        public render():void {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.point1.x, this.point1.y);
            ctx.lineTo(this.point2.x, this.point2.y);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        }
    }
}
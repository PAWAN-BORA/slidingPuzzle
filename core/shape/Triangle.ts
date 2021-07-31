namespace Game {

    export class Triangle {
        public pointA:Point;
        public pointB:Point;
        public pointC:Point;
        public area:number;
        public color:string = "orange";
        constructor(x1:number, y1:number, x2:number, y2:number, x3:number, y3:number) {
            this.pointA = new Point(x1, y1);
            this.pointB = new Point(x2, y2);
            this.pointC = new Point(x3, y3);
            this.area = this.getArea(this.pointA, this.pointB, this.pointC);
        }
      
        public contains(x:number, y:number):boolean {
            let Area1 = (x-this.pointB.x)*(this.pointA.y-this.pointB.y)-(this.pointA.x-this.pointB.x)*(y-this.pointB.y); // PAB
            let Area3 = (x-this.pointC.x)*(this.pointB.y-this.pointC.y)-(this.pointB.x-this.pointC.x)*(y-this.pointC.y); // PBC;
            let Area2 = (x-this.pointA.x)*(this.pointC.y-this.pointA.y)-(this.pointC.x-this.pointA.x)*(y-this.pointA.y); // PCA
            let has_pos = (Area1>0 || Area2>0 || Area3>0);
            let has_neg = (Area1<0 || Area2<0 || Area3<0);
            if(has_neg && has_pos ) {
                return false;
            } else {
                return true;
            }
        }
        private getArea(pt1:Point, pt2:Point, pt3:Point){
            let area = (pt1.x-pt3.x)*(pt2.y-pt3.y)-(pt2.x-pt3.x)*(pt1.y-pt3.y);
            return Math.abs(area/2);
        }
        public update():void {

        }
        public render():void {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(this.pointA.x, this.pointA.y);
            ctx.lineTo(this.pointB.x, this.pointB.y);
            ctx.lineTo(this.pointC.x, this.pointC.y);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }
}
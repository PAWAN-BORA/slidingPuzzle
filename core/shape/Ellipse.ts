namespace Game {

    export class Ellipse {
       public x:number;
       public y:number;
       public rX:number;
       public rY:number;
       public rotate:number = 0;
       
       constructor(x:number, y:number, rX:number, rY:number) {
           this.x = x;
           this.y = y;
           this.rX = rX;
           this.rY = rY
       }
       public contains(x:number, y:number):boolean {
            let leftEquation = (x-this.x)*Math.cos(this.rotate)+(y-this.y)*Math.sin(this.rotate);
            let rightEuqation = (x-this.x)*Math.sin(this.rotate)-(y-this.y)*Math.cos(this.rotate);
            let leftValue = Math.pow(leftEquation, 2)/Math.pow(this.rX, 2);
            let rightValue = Math.pow(rightEuqation, 2)/Math.pow(this.rY, 2);
            return leftValue+rightValue<=1;
       }

       public render():void {
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, this.rX, this.rY, this.rotate, 0, Math.PI*2, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
       }
    }
}
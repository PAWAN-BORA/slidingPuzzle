/// <reference path="../shape/Circle.ts"/>

namespace Game {

    export class DrawableCircle extends Circle {
        public color:string = "black";
        


        public update():void {

        }
        public render():void {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    }

}
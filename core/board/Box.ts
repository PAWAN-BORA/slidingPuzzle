/// <reference path='../shape/Rectangle.ts'/>

namespace Game {

    export class Box extends Rectangle{

        public num:number;
        public goalNum:number;
        public left:Box = undefined;
        public right:Box = undefined;
        public top:Box = undefined;
        public bottom:Box = undefined;
        public position:Point;
        public isMoving:boolean = false;
        constructor(x:number, y:number, width:number, height:number, num:number, goalNum:number) {
            super(x, y, width, height)
            this.num = num;
            this.goalNum = goalNum;
            // if(num===undefined) {
            //     this.isBlank = true;
            //     this.num = undefined;
            // } else {
            //     this.isBlank = false;
            //     this.num = num;

            // }
        }
        // private moveBox() {
        //     if(this.movingDir==="left") {

        //     } else if(mo)
        // }
        // private movingNext() {

        // }
        public update() {
           if(this.isMoving) {

           }
        }
        public render() {
            if(this.num!==undefined) {
                ctx.save();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "black";
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = "white";
                ctx.font = "50px bold arial"
                ctx.fillText(this.num.toString(), this.x+this.width/2, this.y+this.height/2);
                ctx.restore();
            } 
            else {
                // ctx.save();
              
                // ctx.fillStyle = "white";
                // ctx.fillRect(this.x, this.y, this.width, this.height);
               
                // ctx.restore();
            }
        }
    }
}
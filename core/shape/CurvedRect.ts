namespace Game {

    export class CurvedRect {
        public borderRadius:number = 22;
        public x:number;
        public y:number;
        public width:number;
        public height:number;
        public color:string = "#000000";
        
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
                if(dist(x, y, this.x+this.borderRadius, this.y+this.borderRadius)<this.borderRadius){
                    return true;
                } else if((dist(x, y, this.x+this.width-this.borderRadius, this.y+this.borderRadius)<this.borderRadius)){
                    return true;
                } else if((dist(x, y, this.x+this.width-this.borderRadius, this.y+this.height-this.borderRadius)<this.borderRadius)) {
                    return true;
                } else if((dist(x, y, this.x+this.borderRadius, this.y+this.height-this.borderRadius)<this.borderRadius)) {
                    return true;
                } else {
                    console.log("retrun")
                    return false;

                }
            } else {
                return false;
            }
        }
        public update():void {

        }
        public render():void {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(this.x,  this.y+this.borderRadius);
            ctx.quadraticCurveTo(this.x, this.y, this.x+this.borderRadius, this.y);
            ctx.lineTo(this.x+this.width-this.borderRadius, this.y);
            ctx.quadraticCurveTo(this.x+this.width, this.y, this.x+this.width, this.y+this.borderRadius);
            ctx.lineTo(this.x+this.width, this.y+this.height-this.borderRadius);
            ctx.quadraticCurveTo(this.x+this.width, this.y+this.height, this.x+this.width-this.borderRadius, this.y+this.height);
            ctx.lineTo(this.x+this.borderRadius, this.y+this.height);
            ctx.quadraticCurveTo(this.x, this.y+this.height, this.x, this.y+this.height-this.borderRadius);
            ctx.lineTo(this.x, this.y-this.borderRadius)
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }
}
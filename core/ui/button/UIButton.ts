///<reference path='../UIObject.ts'/>
namespace Game {


    export class UIButton extends UIObject{
        public translate= new Point(4, 4);
        public cursor = "pointer";
        public onClick = ()=>{};
        private _iniX:number;
        private _iniY:number;
        private _pressed:boolean = false;
        public background:HTMLImageElement = undefined;
        public constructor(x:number, y:number, {type, width, height, radius}:{type:"rectangle"|"circle", width?:number, height?:number, radius?:number}) {
            super(x, y, {type, width, height, radius});
            // this._clicker = clicker;
            this._iniX = x;
            this._iniY = y;
        }
      
        public onMouseDown(point: Point): void {
            if(this._shape.contains(point.x, point.y)) {
               this._x += this.translate.x;
               this._y += this.translate.y; 
               this._pressed = true;
              
            }
        }
        public onMouseUp(point: Point): void {
            if(this._shape.contains(point.x, point.y)) {
                if(this._pressed) {
                    this.onClick();
                }
            }
            this._pressed = false;
            this._x = this._iniX;
            this._y = this._iniY; 
        }
        public onMouseMove(point: Point): void {
            if(this._shape.contains(point.x, point.y)) {
                this._hover = true;
            } else {
                this._hover = false;
            }
        }
        public update():void {
            if(this._hover) {
                cvs.style.cursor = this.cursor;
            } else {
                cvs.style.cursor = "auto"; // doubt full
            }
        }
        public render():void {
            ctx.save();
            // ctx.fillStyle = "red";
            // ctx.fillRect(this._x, this._y, this._width, this._height);
            // this._shape.render();
            if(this.background!==undefined) {
                ctx.drawImage(this.background, this._x, this._y, this._width, this._height);
            }
            if(this.text!==undefined) {
                ctx.fillStyle = this.textStyle.color;
                ctx.font = `${this.textStyle.weight} ${this.textStyle.size} ${this.textStyle.font}`
                ctx.textAlign = this.textStyle.align;
                ctx.textBaseline = this.textStyle.baseline;

                ctx.fillText(this.text, this._x+this._width/2, this._y+this._height/2); 
            }
            ctx.restore();

        }


    }
}
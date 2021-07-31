///<reference path="../UIObject.ts"/>
namespace Game {


    export class UIDraggableObject extends UIObject{
        public cursor = "auto";
        public onDrop:Function = undefined;
        protected _dargable = false; 
        public background:HTMLImageElement = undefined;
        public get dargable() {
            return this._dargable;
        }
       
        public get x():number {
            return this._x;
        }
        public set x(val:number) {
            this._x = val;
        }
        public get y():number {
            return this._y;
        }
        public set y(val:number) {
            this._y = val;
        }
        public get width():number {
            return this._width;
        }
        public get height():number {
            return this._height;
        }
        private _iniX:number;
        private _iniY:number;

        public constructor(x:number, y:number, {type, width, height, radius}:{type:"rectangle"|"circle", width?:number, height?:number, radius?:number}) {
            super(x, y, {type, width, height, radius});
            // this._clicker = clicker;
            this._iniX = x;
            this._iniY = y;
        }
        public moveBack():void {
           this._x = this._iniX;
           this._y = this._iniY;
           this._shape.x = this._x+this._shpaeOffset.x;
           this._shape.y = this._y+this._shpaeOffset.y;
        } 

     
        public onMouseDown(point: Point): void {
            if(this._shape.contains(point.x, point.y)) {
                this._dargable = true;
            }
        }
        public onMouseMove(point: Point): void {
            if(this._dargable) {
                this._x = point.x-this._width/2;
                this._y = point.y - this._height/2;
                this._shape.x = this._x+this._shpaeOffset.x;
                this._shape.y = this._y+this._shpaeOffset.y;
            }
            if(this._shape.contains(point.x, point.y)) {
                this._hover = true;
                
            } else {
                this._hover = false;
                
            }
        }
        public onMouseUp(point: Point): void {
            if(this._shape.contains(point.x, point.y)) {
            }
            if(this._dargable) {
                if(this.onDrop!==undefined) {
                    this.onDrop(point);

                }
                this._dargable = false;
            }
        }
        
        public update():void {
            if(this._hover) {
                cvs.style.cursor = this.cursor;
            }
            
        }
        public render():void {
            ctx.save();
            // ctx.fillStyle = "red";
            // ctx.fillRect(this._x, this._y, this._width, this._height);
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
            // this._rectangle.render();
        }


    }
}
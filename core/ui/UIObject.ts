namespace Game {
    export interface textFormat {
        color:string;
        font:string;
        size:string;
        weight:string;
        align:CanvasTextAlign;
        baseline:CanvasTextBaseline;
    }
    export abstract class UIObject {
        protected _x:number;
        protected _y:number;
        protected _width:number;
        protected _height:number;
        protected _hover: boolean;
        protected _cvs:HTMLCanvasElement;
        protected _shape:Rectangle | Circle;
        protected _shpaeOffset:Point;
        public text:string;
        public textStyle:textFormat = {
            color:"black",
            font:"arial",
            size:"14px",
            weight:"normal",
            align:"start",
            baseline:"alphabetic"
        }
        public get hover(): boolean {
            return this._hover;
        }

        constructor(x:number, y:number, {type, width, height, radius}:{type:"rectangle"|"circle", width?:number, height?:number, radius?:number}) {
            this._x = x;
            this._y = y;
            if(type==="rectangle") {
                if(width==undefined || height==undefined) {
                    throw new Error('width and height must be defined for rectangular object');
                }
                this._width = width;
                this._height = height;
                this._shape = new Rectangle(x, y, width, height);
                this._shpaeOffset = new Point(0, 0);
            } else if(type==="circle"){
                if(radius==undefined) {
                    throw new Error('radius must be defined for circular object');
                }
                this._width = radius*2;
                this._height = radius*2;
                this._shape = new Circle(x+radius, y+radius, radius);
                this._shpaeOffset = new Point(radius, radius);
            }
           
        }
       
        public abstract onMouseDown(point:Point):void;
        public abstract onMouseUp(point:Point):void;
        public abstract onMouseMove(point:Point):void; 
        public abstract update():void;
        public abstract render():void;
    }

}
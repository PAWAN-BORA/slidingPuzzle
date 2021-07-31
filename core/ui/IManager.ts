namespace Game {

    export interface IManager {
       
        onMouseDown(point:Point):void ;
        onMouseUp(point:Point):void;
        onMouseMove(point:Point):void;
        update():void;
        render():void;
    }
}
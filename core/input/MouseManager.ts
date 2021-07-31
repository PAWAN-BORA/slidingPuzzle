namespace Game {

    export abstract class MouseManager {
        
        private static _uIManager:UIManager;
        private static _cvs:HTMLCanvasElement;
       
        public static initialize(canvas:HTMLCanvasElement) {

            canvas.addEventListener("mousedown", MouseManager.mousedown);
            canvas.addEventListener("mouseup", MouseManager.mouseup);
            canvas.addEventListener("mousemove", MouseManager.mousemove);
            MouseManager._cvs = canvas;
        }
        public static setUIManager(uIManager:UIManager) {
            MouseManager._uIManager = uIManager;
        }
        public static mousedown(event:MouseEvent):void {
            event.preventDefault();
            event.stopPropagation();
            let cvsSize = MouseManager._cvs.getBoundingClientRect();
            let ratioX = MouseManager._cvs.width/cvsSize.width;
            let ratioY = MouseManager._cvs.height/cvsSize.height;
            let x = (event.clientX-cvsSize.left)*ratioX;
            let y = (event.clientY-cvsSize.top)*ratioY;
            let point = new Point(x, y); 
            if(MouseManager._uIManager!==undefined && MouseManager._uIManager!==null) {
                MouseManager._uIManager.onMouseDown(point);
            }
        }
        public static mouseup(event:MouseEvent):void {
            event.preventDefault();
            event.stopPropagation();
            let cvsSize = MouseManager._cvs.getBoundingClientRect();
            let ratioX = MouseManager._cvs.width/cvsSize.width;
            let ratioY = MouseManager._cvs.height/cvsSize.height;
            let x = (event.clientX-cvsSize.left)*ratioX;
            let y = (event.clientY-cvsSize.top)*ratioY;
            let point = new Point(x, y); 
            if(MouseManager._uIManager!==undefined && MouseManager._uIManager!==null) {
                MouseManager._uIManager.onMouseUp(point);
            }
        }
        public static mousemove(event:MouseEvent):void {
            event.preventDefault();
            event.stopPropagation();
            let cvsSize = MouseManager._cvs.getBoundingClientRect();
            let ratioX = MouseManager._cvs.width/cvsSize.width;
            let ratioY = MouseManager._cvs.height/cvsSize.height;
            let x = (event.clientX-cvsSize.left)*ratioX;
            let y = (event.clientY-cvsSize.top)*ratioY;
            let point = new Point(x, y); 
            if(MouseManager._uIManager!==undefined && MouseManager._uIManager!==null) {
                MouseManager._uIManager.onMouseMove(point);
            }
        }
        
    }
}
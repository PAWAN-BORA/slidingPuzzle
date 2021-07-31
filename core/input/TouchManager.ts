namespace Game {

    export abstract class TouchManager {
        
        private static _uIManager:UIManager;
        private static _cvs:HTMLCanvasElement;
        public static initialize(canvas:HTMLCanvasElement) {

            canvas.addEventListener("touchstart", TouchManager.touchstart);
            canvas.addEventListener("touchend", TouchManager.touchend);
            
            canvas.addEventListener("touchmove", TouchManager.touchmove);
            TouchManager._cvs = canvas;
            
        }
        public static setUIManager(uIManager:UIManager) {
            TouchManager._uIManager = uIManager;
        }
        public static touchstart(event:TouchEvent):void {
            event.preventDefault();
            event.stopPropagation();
            
            let cvsSize = TouchManager._cvs.getBoundingClientRect();
            let ratioX = TouchManager._cvs.width/cvsSize.width;
            let ratioY = TouchManager._cvs.height/cvsSize.height;
            let x = (event.touches[0].clientX-cvsSize.left)*ratioX;
            let y = (event.touches[0].clientY-cvsSize.top)*ratioY;
          
            let point = new Point(x, y); 
            if(TouchManager._uIManager!==undefined && TouchManager._uIManager!==null) {
                TouchManager._uIManager.onMouseDown(point);
            }
        }
        public static touchend(event:TouchEvent):void {
            event.preventDefault();
            event.stopPropagation();
            let cvsSize = TouchManager._cvs.getBoundingClientRect();
            let ratioX = TouchManager._cvs.width/cvsSize.width;
            let ratioY = TouchManager._cvs.height/cvsSize.height;
            let x = (event.changedTouches[0].clientX-cvsSize.left)*ratioX;
            let y = (event.changedTouches[0].clientY-cvsSize.top)*ratioY;
            
            let point = new Point(x, y); 
            if(TouchManager._uIManager!==undefined && TouchManager._uIManager!==null) {
                TouchManager._uIManager.onMouseUp(point);
            }
        }
        public static touchmove(event:TouchEvent):void {
            event.preventDefault();
            event.stopPropagation();
            let cvsSize = TouchManager._cvs.getBoundingClientRect();
            let ratioX = TouchManager._cvs.width/cvsSize.width;
            let ratioY = TouchManager._cvs.height/cvsSize.height;
            let x = (event.touches[0].clientX-cvsSize.left)*ratioX;
            let y = (event.touches[0].clientY-cvsSize.top)*ratioY;
           
            let point = new Point(x, y); 
            if(TouchManager._uIManager!==undefined && TouchManager._uIManager!==null) {
                TouchManager._uIManager.onMouseMove(point);
            }
        }
      
    }
}
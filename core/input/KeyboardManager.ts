namespace Game {

    export abstract class KeyboardManager {
        private static keys:Array<boolean> = [];
        public static initialize():void {
            for(let i=0; i<255; i++) {
                KeyboardManager.keys[i] = false;
            }
            document.addEventListener("keydown", KeyboardManager.keydown);
            document.addEventListener("keyup", KeyboardManager.keyup);
        }
        public static keydown(event:KeyboardEvent) {
            KeyboardManager.keys[event.keyCode] = true;
        }
        public static keyup(event:KeyboardEvent) {
            KeyboardManager.keys[event.keyCode] = false;
        }
    }
}
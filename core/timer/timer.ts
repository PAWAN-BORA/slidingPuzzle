namespace Game {
    
    export abstract class Timer {
        public static min:number = 5;
        public static sec:number = 0;
        public static running:boolean = false;
        private static timer:number;
        
        public static start():void {
            Timer.running = true;
            Timer.timer = setInterval(()=>{
                if(Timer.sec==0) {
                Timer.min--;
                Timer.sec=59
                } else {
                Timer.sec--;
                }
                if(Timer.sec === 0 && Timer.min === 0) {
                   Timer.stop();
                }
            }, 1000)
        }
        public static stop():void {
            Timer.running = false;
            clearInterval(Timer.timer);
        }
        public static pause():void {
            clearInterval(Timer.timer);
        }
    }
}
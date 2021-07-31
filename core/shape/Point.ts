namespace Game {

    export class Point {
        public x: number;
        public y: number;
      

        constructor(x:number, y:number) {
            this.x = x;
            this.y = y;
        }
        public dist(x:number, y:number):number {
            return Math.sqrt(Math.pow((this.x-x), 2)+Math.pow((this.y-y), 2)); 
        }
        public update():void  {

        }
        public render():void {
        }
    }
}
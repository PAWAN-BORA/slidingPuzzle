namespace Game {
    export let ctx:CanvasRenderingContext2D; 
    export let cvs:HTMLCanvasElement;
    export class Canvas {

        public static Initialize(canvasID?:string):void {
            if(canvasID===undefined) {
                cvs = document.createElement("canvas");
                document.getElementsByTagName('body')[0].appendChild(cvs);
                if(cvs===undefined || cvs===null) {
                    throw new Error(`canvas is not been created`);
                }
                ctx = cvs.getContext("2d");
            } else {
                cvs = document.getElementById(canvasID) as HTMLCanvasElement;
                if(cvs===undefined || cvs===null) {
                    throw new Error(`${canvasID} is undefined`);
                }
                ctx = cvs.getContext("2d");
            }
           
        }
    }
}
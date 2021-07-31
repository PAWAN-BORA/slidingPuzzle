namespace Game {

    export class ButtonManager implements IManager {
        protected _buttons:Array<UIButton> = [];
        public constructor() {

        }
        public addButton(button:UIButton) {
            this._buttons.push(button);
        }
      
        public onMouseDown(point:Point) {
            for(let u of this._buttons) {
                u.onMouseDown(point);
            }
        };
        public onMouseUp(point:Point) {
            for(let u of this._buttons) {
                u.onMouseUp(point);
            }
        };
        public onMouseMove(point:Point) {
            for(let u of this._buttons) {
                u.onMouseMove(point);
            }
        }
        public update():void {
            for(let b of this._buttons){
                b.update();
                if(b.hover) {
                    break;
                }
            }
        }
        public render():void {
            for(let b of this._buttons) {
                b.render();
            }
        }
        
    }
}
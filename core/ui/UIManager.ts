namespace Game{

    export class UIManager {
        private _managers:Array<IManager> = [];
        constructor(){

        }
       
        public addManagers(manager:IManager):void {
            this._managers.push(manager);
        }

        public removeManager(manager:IManager):void {
            let index = this._managers.indexOf(manager);
            if(index!==-1){
                this._managers.splice(index, 1);
            }
        }
        
        public onMouseDown(point:Point) {
            for(let m of this._managers) {
                m.onMouseDown(point);
            }
        };
        public onMouseUp(point:Point) {
            for(let m of this._managers) {
                m.onMouseUp(point);
            }
        };
        public onMouseMove(point:Point) {
            for(let m of this._managers) {
                m.onMouseMove(point);
            }
        }
        public update() {
            for(let m of this._managers) {
                m.update();
            }
        }
        public render() {
            for(let m of this._managers) {
                m.render();
            }
        }
    }
}
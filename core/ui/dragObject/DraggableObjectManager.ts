namespace Game {

    export class DraggableObjectManager implements IManager {
        private _draggableObjects: Array<UIDraggableObject> = [];
        public get draggableObjects(): Array<UIDraggableObject> {
            return this._draggableObjects;
        }
        public set draggableObjects(value: Array<UIDraggableObject>) {
            this._draggableObjects = value;
        }

        public constructor() {}

        public addDraggableObject(draggableObject:UIDraggableObject) {
            this._draggableObjects.push(draggableObject);
        }
        public removeDraggableObject(draggableObject:UIDraggableObject) {
            
           let index =  this._draggableObjects.indexOf(draggableObject);
           if(index!==-1) {
               this._draggableObjects.splice(index, 1);
           } else {
               console.warn(`${draggableObject} is not found`);
           }
        }
        public onMouseDown(point:Point) {
            for(let u of this._draggableObjects) {
                u.onMouseDown(point);
                if(u.dargable) {
                    break;
                }
            }
        };
        public onMouseUp(point:Point) {
            for(let u of this._draggableObjects) {
                u.onMouseUp(point);
            }
        };
        public onMouseMove(point:Point) {
            for(let u of this._draggableObjects) {
                u.onMouseMove(point);
            }
        }
        public update():void {
            for(let b of this._draggableObjects){
                b.update();
                if(b.hover) {
                    break;
                }
            }
        }
        public render():void {
            for(let b of this._draggableObjects) {
                if(!b.dargable) {
                    b.render();
                } 
            }
            for(let b of this._draggableObjects) {
                if(b.dargable) {
                    b.render();
                }
            }
        }

    }
}
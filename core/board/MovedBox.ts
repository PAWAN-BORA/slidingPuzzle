namespace Game{
    export type Direction = "left"|"right"|"up"|"down"|""
    export class MovedBox {

        public box:Box
        public dir:Direction
        constructor(box:Box, dir:Direction){
            this.box = box;
            this.dir = dir;
        }
    }

}
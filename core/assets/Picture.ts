namespace Game {
    
    export class Picture {
        public image:HTMLImageElement;
        public constructor(name:string, path:string) {
            this.loadImage(name, path);
        }   

        public loadImage(name:string, path:string) {
            this.image = new Image();
            this.image.onload = ()=>{
                AssetManager.addImage(name, this);
            }
			 this.image.onerror = ()=>{
                throw new Error(`Error in loading ${name}`);
            }
            this.image.src = path;
        }
    }
}
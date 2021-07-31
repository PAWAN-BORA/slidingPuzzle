namespace Game {

    export class Sound {
        public sound:HTMLAudioElement;
        constructor(name:string, path:string) {
           
            this.loadAudio(name, path);
        }
        public loadAudio(name:string, path:string):void {
            this.sound = new Audio();
            this.sound.onloadeddata = ()=>{
                AssetManager.addSound(name, this);
            }
            this.sound.src = path;
        }
        public play():void {
            this.stop();
            this.sound.play();
        }
        public pause():void {
            this.sound.pause();
        }
        public stop():void {
            this.pause();
            this.sound.currentTime = 0;
        }
    }
}
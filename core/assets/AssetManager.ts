namespace Game {

    export class AssetManager {
        public static pictures:{[name:string]:Picture} = {};
        public static sounds:{[name:string]:Sound} = {};
        public static addImage(name:string, image:Picture) {
            AssetManager.pictures[name] = image;
        }
        public static addSound(name:string, sound:Sound) {
            AssetManager.sounds[name] = sound;
        }
    }
}
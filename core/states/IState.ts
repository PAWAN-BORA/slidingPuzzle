namespace Game {

    export interface IState {
        
        update():void;
        render():void;
        setup():void;
    }
}
namespace Game {

    export class Collision {

        public static collsionOfCircles(c1:Circle, c2:Circle):boolean {
            let point = new Point(c1.x, c1.y);
            if(point.dist(c2.x, c2.y)<c1.radius+c2.radius) {
                return true;
            }
            return false;
        }
    }
}
namespace Game {

    export class Node {

        public boxes:Box[];
        public dim:number;
        public previousNode:Node = undefined;
        public previousMove:Point = undefined;
        public ManhattanDistance:number;
        public cost:number = 0;
        constructor(boxes:Box[], dim:number, cost:number) {
            this.boxes = boxes;
            this.dim = dim;
            this.cost = cost;
            this.ManhattanDistance = this.getManhattanDistance();
        }

        public isSolution():boolean {
            let moving = 0;
            for(let b of this.boxes) {
                // let currentNum = 3*(b.rowNum-1)+b.columnNum;
                if(b.goalNum==b.num) {
                    moving++;
                    // console.log(b.goalNum);
                } 
                
            }
            // console.log(moving);
            if(this.dim===3 && moving===9) {
                return true;
            } else if(this.dim===4 && moving===16) {
                return true;
            }
            return false;
        }
        public getNeigbourNode():Node[] {
            let emptyBox = this.getEmptyBox();
            let neighbourNode:Node[] = [];
            let cost = this.cost++;
            if(emptyBox.left!==undefined) {
                let newBoxes = this.switchNum(this.boxes, emptyBox.position, emptyBox.left.position)
                let newNode = new Node(newBoxes, this.dim, cost);
                newNode.previousNode = this;
                neighbourNode.push(newNode);
            } 
            if(emptyBox.right!==undefined) {
                let newBoxes = this.switchNum(this.boxes, emptyBox.position, emptyBox.right.position);
                let newNode = new Node(newBoxes, this.dim, cost);
                newNode.previousNode = this;
                neighbourNode.push(newNode);
            }
            if(emptyBox.top!==undefined){
                let newBoxes = this.switchNum(this.boxes, emptyBox.position, emptyBox.top.position);
                let newNode = new Node(newBoxes, this.dim, cost);
                newNode.previousNode = this;
                neighbourNode.push(newNode);
            }
            if(emptyBox.bottom!==undefined) {
                let newBoxes = this.switchNum(this.boxes, emptyBox.position, emptyBox.bottom.position);
                let newNode = new Node(newBoxes, this.dim, cost);
                newNode.previousNode = this;
                neighbourNode.push(newNode);
            }
            return neighbourNode;
        }
        private switchNum(boxes:Box[], EmptyPos:Point, newPos:Point):Box[] {
            let Emptybox:Box, newBox:Box
            let newBoxes = [];
            for(let b of boxes) {
                newBoxes.push({...b});
            }
            for(let b of newBoxes) {
                if(b.position.x === EmptyPos.x && b.position.y===EmptyPos.y) {
                    Emptybox = b;
                }
                if(b.position.x === newPos.x && b.position.y===newPos.y) {
                    newBox = b;
                }
            }
            Emptybox.num = newBox.num;
            newBox.num = undefined;
            return newBoxes;
        }
        private getEmptyBox():Box {
            for(let b of this.boxes) {
                if(b.num===undefined) {
                    return b;
                }
            }
        }
        public isEqual(node:Node):boolean {
            for(let i=0; i<node.boxes.length; i++) {
                if(node.boxes[i].num!==this.boxes[i].num) {
                    return false;
                }
            }
            return true;
        }
        private getManhattanDistance():number {
            let dis = 0;
            for(let b of this.boxes) {
                if(b.num!==b.goalNum) {
                    let goalPos = this.getGoalPostion(b.num); 
                    let currentPos = b.position;
                    let travelDis = Math.abs(goalPos.x-currentPos.x) + Math.abs(goalPos.y-currentPos.y);
                    dis += travelDis;
                }
            }
            return dis;
        }
        private getGoalPostion(num:number):Point {
            for(let b of this.boxes) {
                if(num===b.goalNum) {
                    return b.position;
                }
            }
           
            console.error(`${num} dose not exist`);
        }

    }
}
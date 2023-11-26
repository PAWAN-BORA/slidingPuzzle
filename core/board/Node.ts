namespace Game {

    export class Node {

        public boxes:Box[];
        public dim:number;
        public previousNode:Node = undefined;
        public previousMove:Point = undefined;
        public siblingNodes:Node[] = [];
        public ManhattanDistance:number;
        public cost:number = 0;
        public neighbours:Node[];
        public initialPoint:number =0;
        constructor(boxes:Box[], dim:number, cost:number) {
            this.boxes = boxes;
            this.dim = dim;
            this.cost = cost;
            // this.ManhattanDistance = this.getManhattanDistance();
            // this.neighbours = this.getNeigbourNode();
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
            } else if(this.dim===2 && moving===4){
                return true;
            }
            return false;
        }
        public getNeigbourNode():Node[] {
            let emptyBox = this.getEmptyBox();
            let neighbourNode:Node[] = [];
            let cost = this.cost+1;
            // console.log("1")
           
            if(emptyBox.left!==undefined) {
                let newBoxes = this.switchNum(this.boxes, emptyBox.position, emptyBox.left.position)
                if(this.previousNode!=undefined){
                    if(!this.isPreviousNeighbour(newBoxes)){
                        let newNode = new Node(newBoxes, this.dim, cost);
                        newNode.previousNode = this;
                        neighbourNode.push(newNode);
                    }
                    // console.log("exist!");
                } else {
                    // console.log("not exist!");
                    let newNode = new Node(newBoxes, this.dim, cost);
                    newNode.previousNode = this;
                    neighbourNode.push(newNode);
                }
                // let newNode = new Node(newBoxes, this.dim, cost);
                // newNode.previousNode = this;
                // neighbourNode.push(newNode);
            } 
            if(emptyBox.right!==undefined) {
                let newBoxes = this.switchNum(this.boxes, emptyBox.position, emptyBox.right.position);
                if(this.previousNode!=undefined){
                    if(!this.isPreviousNeighbour(newBoxes)){
                        let newNode = new Node(newBoxes, this.dim, cost);
                        newNode.previousNode = this;
                        neighbourNode.push(newNode);
                    }
                } else {
                    let newNode = new Node(newBoxes, this.dim, cost);
                    newNode.previousNode = this;
                    neighbourNode.push(newNode);
                }
                // let newNode = new Node(newBoxes, this.dim, cost);
                // newNode.previousNode = this;
                // neighbourNode.push(newNode)
            }
            if(emptyBox.top!==undefined){
                let newBoxes = this.switchNum(this.boxes, emptyBox.position, emptyBox.top.position);
                if(this.previousNode!=undefined){
                    if(!this.isPreviousNeighbour(newBoxes)){
                        let newNode = new Node(newBoxes, this.dim, cost);
                        newNode.previousNode = this;
                        neighbourNode.push(newNode);
                    }
                } else {
                    let newNode = new Node(newBoxes, this.dim, cost);
                    newNode.previousNode = this;
                    neighbourNode.push(newNode);
                }
                // let newNode = new Node(newBoxes, this.dim, cost);
                // newNode.previousNode = this;
                // neighbourNode.push(newNode);
            }
            if(emptyBox.bottom!==undefined) {
                let newBoxes = this.switchNum(this.boxes, emptyBox.position, emptyBox.bottom.position);
                if(this.previousNode!=undefined){
                    if(!this.isPreviousNeighbour(newBoxes)){
                        let newNode = new Node(newBoxes, this.dim, cost);
                        newNode.previousNode = this;
                        neighbourNode.push(newNode);
                    }
                } else {
                    let newNode = new Node(newBoxes, this.dim, cost);
                    newNode.previousNode = this;
                    neighbourNode.push(newNode);
                }
                // let newNode = new Node(newBoxes, this.dim, cost);
                // newNode.previousNode = this;
                // neighbourNode.push(newNode);
            }
            // for(let n of neighbourNode){
            //     for(let p of neighbourNode){
            //         if(n!=p){
            //             n.siblingNodes.push(p)
            //         }
            //     }
            // }
            
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
        private shouldAddOnNeigbour(boxes:Box[]):boolean{
            // for(let sib of this.siblingNodes){
            //     isExist = true;
            //     for(let i=0; i<boxes.length; i++){
            //         if(boxes[i].num!==sib.boxes[i].num){
            //             isExist = false;
            //             break;
            //         }
            //     }
            //     if(isExist){
            //         return false;
            //     }
            // }
            let isExist = this.isSiblingExist(this, boxes);
            if(isExist){
                return false;
            }

            let previousBoxes = this.previousNode.boxes;
            isExist = true;
            for(let i=0; i<boxes.length; i++) {
                if(boxes[i].num!==previousBoxes[i].num) {
                    isExist = false;
                }
            }
            if(isExist){
                return false;
            }
            isExist = this.isSiblingExist(this.previousNode, boxes);
            if(isExist){
                return false;
            } else {
                return true;
            }

            // if(!isExist){
            //     let previousBoxes = this.previousNode.boxes;
            //     for(let i=0; i<boxes.length; i++) {
            //         if(boxes[i].num!==previousBoxes[i].num) {
            //             return true;
            //         }
            //     }
            //     return false; 
            // } else {
            //     return false;
            // }

            // return true;
        }
        private isSiblingExist(node:Node, boxes:Box[]){
            let isExist = false;
            for(let sib of node.siblingNodes){
                isExist = true;
                for(let i=0; i<boxes.length; i++){
                    if(boxes[i].num!==sib.boxes[i].num){
                        isExist = false;
                        break;
                    }
                }
                if(isExist){
                    return true;
                }
            }
            return false;

        }
        private isPreviousNeighbour(boxes:Box[]):boolean{
            let previousBoxes = this.previousNode.boxes;
            for(let i=0; i<boxes.length; i++) {
                if(boxes[i].num!==previousBoxes[i].num) {
                    return false;
                }
            }
            return true;
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
            console.log('this is boxes', this.boxes);
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
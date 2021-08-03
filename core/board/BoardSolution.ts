namespace Game {

    export class BoardSoultion {
        private boxes:Box[] = [];
        private root:Box;
        private moves:Point[]; 
        private dim:number;
        private dicoveredNodes:Node[] = [];
        public solutionNodes:Node[] =[];
        constructor(boxes:Box[], dim:number) {
            this.boxes = boxes;
            // this.getRoot(boxes);
            this.dim = dim;
        }

        public setBoxes(boxes:Box[]){
            this.boxes = boxes;
        }
        private getEmpty(boxes:Box[]) {
            for(let b of boxes) {
                if(b.num===undefined) {
                    b;
                }
            }
        }
        getCost() {

        }
       
        public async solution() {
            let queue:Node[] = [];
            let rootNode = new Node(this.boxes, this.dim, 0);
            queue.push(rootNode);
            // console.log(this.dicoveredNodes);
            let num = 0;
            let move = 0;
            console.time('test');
            while(queue.length!==0) {
                const [currentNode, index] = this.getCurrentNode(queue);
                // let currentNode = queue.pop();
                queue.splice(index, 1);
                // console.log(currentNode);
                if(currentNode.isSolution()) {
                    console.log("is a solution");
                    this.getSolutionNode(currentNode);
                    console.log(this.solutionNodes);
                    break;
                    // return;
                }
                this.dicoveredNodes.push(currentNode);
                // return;
                let neighbourNode = currentNode.getNeigbourNode();
                // console.log(neighbourNode)
                // console.log(1);
                for(let n of neighbourNode) {
                    // console.log(this.isDiscoverd(n));
                    move++;
                    if(!this.isDiscoverd(n)) {
                        queue.push(n);
                        // console.log(n.boxes);
                        num++;
                        
                        if(num>=20000) {
                            console.log(this.dicoveredNodes);
                            this.getSolutionNode(currentNode);
                            console.log("returned");
                            queue.length = 0;
                            break;
                            // return;
                        }
                    } 
                    // else {
                    //     console.log("matched");
                    //     // console.log(this.dicoveredNodes);
                    //     // return;
                    // }
                }
                // if(num>=10000){
                //     console.log(queue.length);
                // }

            }
            console.log(num);
            console.log(move);
            console.log(this.dicoveredNodes.length)
            for(let i=0; i<this.dicoveredNodes.length; i++){
                let boxes = this.dicoveredNodes[i].boxes;
                // console.log(this.dicoveredNodes[i].siblingNodes);
                // console.log(boxes[0].num, boxes[1].num, boxes[2].num, boxes[3].num);
                // console.log(boxes[0].num, boxes[1].num, boxes[2].num, boxes[3].num, boxes[4].num, boxes[5].num, boxes[6].num, boxes[7].num, boxes[8].num);
            }
            console.timeEnd('test');
            // console.log(this.dicoveredNodes);

        }
        private getSolutionNode(node:Node) {
            this.solutionNodes.unshift(node);
            if(node.previousNode!==undefined) {
                this.getSolutionNode(node.previousNode);
            }
        }
        private getCurrentNode(nodes:Node[]):[Node, number]{
            let selectedNode:Node = undefined;
            let selectedIndex:number = undefined;
            let currentCost = 10000;
            for(let i=0; i<nodes.length; i++) {
                let nodeCost = nodes[i].cost + nodes[i].ManhattanDistance;
                if(nodeCost<currentCost) {
                    currentCost = nodeCost;
                    selectedNode = nodes[i];
                    selectedIndex = i;
                }
            }
            return [selectedNode, selectedIndex];
        }

        private isDiscoverd(node:Node):boolean {
            for(let d of this.dicoveredNodes) {
                if(d.isEqual(node)) {
                    return true;
                }
                // if(d==node) {
                //     return true;
                // }
            }
            return false;
        }
        private viewSolution() {
            let num=1;
            setInterval(()=>{

            }, 500)
        }
        
       
    }
}
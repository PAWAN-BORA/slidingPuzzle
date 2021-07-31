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
            let rootNode = new Node(this.boxes, 3, 0); // 3 would be changed
            queue.push(rootNode);
            let num = 0;
            while(queue.length!==0) {
                const [currentNode, index] = this.getCurrentNode(queue);
                // let currentNode = queue.pop();
                queue.splice(index, 1);
                // console.log(currentNode);
                this.dicoveredNodes.push(currentNode);
                if(currentNode.isSolution()) {
                    console.log("is a solution");
                    this.getSolutionNode(currentNode);
                    console.log(this.solutionNodes);
                    return;
                }
                let neighbourNode = currentNode.getNeigbourNode();
                // console.log(neighbourNode)
                console.log(1);
                for(let n of neighbourNode) {
                    // console.log(this.isDiscoverd(n));

                    if(!this.isDiscoverd(n)) {
                        queue.push(n);
                        num++;
                        ;
                        if(num===10000) {
                            console.log(this.dicoveredNodes);
                            console.log("returned");
                            return;
                        }
                    } 
                    // else {
                    //     console.log("matched");
                    //     // console.log(this.dicoveredNodes);
                    //     // return;
                    // }
                }

            }

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
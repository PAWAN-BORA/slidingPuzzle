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
        
        public async idaSolution(){
            console.time('idatest');
            let rootNode = new Node(this.boxes, this.dim, 0);
            let maxDepth = 1;
            let num = 0;
            let path = [rootNode];
            let bound = rootNode.ManhattanDistance;
            // console.log(bound)
            for(let i=0; i<20; i++){
                console.log(bound);
                // console.log(path.length);
                let data = this.DLS(path, i, bound);
                // console.log(i);
                // console.log(data);
                if(data.found){
                    // this.solutionNodes =  data.node;
                    // console.log(path);
                    // this.getSolutionNode(path[path.length-1]);
                    this.solutionNodes = path;
                    console.log(this.solutionNodes);
                    break;
                } 
                bound = data.bound;
            }
            console.timeEnd('idatest');
            // console.log("end");

        }

        private DLS(path:Node[], depth:number, bound:number):{found:boolean, bound:number}{
            let node = path[path.length-1];
            let g = node.cost;
            let f = g + node.ManhattanDistance;

            if(f>bound){
                // console.log(f, bound);
                return {found:false, bound:f}
            }

            if(node.isSolution()){
                return {found:true, bound:bound};
            }
            // console.log(path.length)
            let neighbourNodes = node.getNeigbourNode();
            let min = 10000;
            for(const n of neighbourNodes){
               
                if(!path.includes(n)){
                    path.push(n);
                    let data = this.DLS(path, 1, bound);
                    if(data.found){
                        return data;
                    }
                    if(data.bound<min){
                        min = data.bound;
                    };
                    path.pop();
                }   
              
            }
            return {found:false, bound:min};

        }

        public async solution() {
            console.time('Atest');
            let queue:Node[] = [];
            let rootNode = new Node(this.boxes, this.dim, 0);
            // let level = 0;
            // console.log(rootNode);
            queue.push(rootNode);
            // console.log(this.dicoveredNodes);
            let num = 0;
            // let move = 0;
            // this.dicoveredNodes = new Array(3628800);
           
            // for(let i=0; i<3628800; i++){
            //     // this.dicoveredNodes.push(new Node(this.boxes, this.dim, 1));
            //     this.dicoveredNodes[i] = new Node(this.boxes, this.dim, 1);
            // }
            while(queue.length!==0) {
                const [currentNode, index] = this.getCurrentNode(queue);
                // console.log(currentNode);
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
                currentNode.initialPoint = this.dicoveredNodes.length;
                this.dicoveredNodes.push(currentNode);
                // return;
                let neighbourNode = currentNode.getNeigbourNode();
                
                // console.log("start");
                // console.log(currentNode.boxes[0].num, currentNode.boxes[1].num, currentNode.boxes[2].num, currentNode.boxes[3].num);
                // console.log(neighbourNode.length);
                // level++;
                for(let n of neighbourNode) {
                    // console.log(n.boxes[0].num, n.boxes[1].num, n.boxes[2].num, n.boxes[3].num);
                    // console.log(this.isDiscoverd(n));
                    // move++;
                    if(!this.isDiscoverd(n, n.previousNode.initialPoint)) {
                        queue.push(n);
                        // console.log(n.boxes);
                        num++;
                        
                        if(num>=500000) {
                            // console.log(this.dicoveredNodes);
                            // this.getSolutionNode(currentNode);
                            console.log("returned");
                            queue.length = 0;
                            break;
                            // return;
                        } 
                        // else {
                            
                        // }
                    }  
                    // else {
                        // console.log("same");
                        // console.log(this.dicoveredNodes);
                        // return;
                    // }
                }
                // if(num>=10000){
                //     console.log(queue.length);
                // }

            }
            // console.log(num);
            // console.log(move);
            // console.log(this.dicoveredNodes.length)
            // for(let i=0; i<this.dicoveredNodes.length; i++){
                // let boxes = this.dicoveredNodes[i].boxes;
                // console.log(this.dicoveredNodes[i].siblingNodes);
                // console.log(boxes[0].num, boxes[1].num, boxes[2].num, boxes[3].num);
                // console.log(boxes[0].num, boxes[1].num, boxes[2].num, boxes[3].num, boxes[4].num, boxes[5].num, boxes[6].num, boxes[7].num, boxes[8].num);
            // }
            console.timeEnd('Atest');
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

        private isDiscoverd(node:Node, level:number):boolean {
            // console.log(level);
            for(let i=level; i<this.dicoveredNodes.length; i++){
                let d = this.dicoveredNodes[i];
                if(d.isEqual(node)) {
                    return true;
                }
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
namespace Game {
    export class Board implements IManager{
        // private rows:number;
        // private columns:number;
        private dim:number;
        private size:number = 150;
        private boxes:Box[] = [];
        
        public get getBoxes() : Box[] {
            return this.boxes;
        }
        // public set setboxes(boxes:Box[]) {
        //     this.boxes = boxes;
        // }
        private initialTouch = undefined;
        private selectedBox = undefined;
        private dir:string = undefined;
        private nextBox:Box = undefined; 
        private initialPos:Point = undefined;
        private startingPointHor:number = 180;
        private startingPointVer:number = 100;
        private numbers:number[] = [];
        private blankPos:number;
        constructor(dim:number) {
            // this.dim = rows;
            // this.dim = columns;
            this.dim = dim;
            this.setup();

        }
        
        onMouseDown(point: Point): void {
            for(let r of this.boxes) {
                if(r.contains(point.x, point.y)){
                    if(r.num!==undefined) {
                        // console.log(r.left, r.right, r.top, r.bottom);
                        this.initialTouch = point;
                        this.selectedBox = r;
                        this.initialPos = new Point(r.x, r.y);
                    }
                    // console.log(r);
                    // console.log("done", r.x, r.y);
                };
            }
        }
        onMouseMove(point: Point): void {
            // for(let r of this.boxes) {
                // if(this.initialTouch!=undefined) {
                //     let difX = this.initialTouch.x - point.x;
                //     let difY = this.initialTouch.y - point.y;
                //     console.log(difX, difY);
                // }
            // }
            if(this.initialTouch!=undefined) {
                let difX =  point.x - this.initialTouch.x;
                let difY =  point.y - this.initialTouch.y;
                if(this.dir==undefined) {
                    // console.log(this.dir);
                    if(difX>10) {
                        // this.moveBox(this.selectedBox, "right");
                        
                        // let nextColumnNum = this.selectedBox.columnNum+1;
                        // if(nextColumnNum>this.dim) {
                        //     return;
                        // }
                        // let nextRowNum = this.selectedBox.rowNum;
                        // this.nextBox =  this.findBox(nextRowNum, nextColumnNum);
                        this.nextBox = this.selectedBox.right;
                        if(this.nextBox===undefined) {
                            return;
                        }
                        if(this.nextBox.num===undefined) {
                            this.dir = "right";
                        }

                    } else if(difX<-10) {
                        
                        // let nextColumnNum = this.selectedBox.columnNum-1;
                        // if(nextColumnNum<1) {
                        //     return;
                        // }
                        // let nextRowNum = this.selectedBox.rowNum;
                        // this.nextBox =  this.findBox(nextRowNum, nextColumnNum);
                        this.nextBox = this.selectedBox.left;
                        if(this.nextBox===undefined) {
                            return;
                        }
                        if(this.nextBox.num===undefined) {
                            this.dir = "left";
                        }
                        // this.moveBox(this.selectedBox, "left");
                    }  else if(difY>10) {
                        
                        // let nextRowNum = this.selectedBox.rowNum+1;
                        // if(nextRowNum>this.dim) {
                        //     return;
                        // }
                        // let nextColumnNum = this.selectedBox.columnNum;
                        // this.nextBox =  this.findBox(nextRowNum, nextColumnNum);
                        this.nextBox = this.selectedBox.bottom;
                        if(this.nextBox===undefined) {
                            return;
                        }
                        if(this.nextBox.num===undefined) {
                            this.dir = "down";
                        }
                    } else if(difY<-10) {
                        // let nextRowNum = this.selectedBox.rowNum-1;
                        // if(nextRowNum<1) {
                        //     return;
                        // }
                        // let nextColumnNum = this.selectedBox.columnNum;

                        // this.nextBox =  this.findBox(nextRowNum, nextColumnNum);
                        this.nextBox = this.selectedBox.top;
                        if(this.nextBox===undefined) {
                            return;
                        }
                        if(this.nextBox.num===undefined) {
                            this.dir = "up";
                        }
                    }  
                // }
                } else if(this.dir!==undefined){
                    if(this.dir==="right") {
                        
                        // console.log(this.nextBox);
                        if(this.nextBox!==undefined) {
                            if(this.nextBox.num===undefined) {
                                if(difX<this.size) {
                                    // let pos = 
                                    if(difX>0) {
                                        this.selectedBox.x = point.x-(this.initialTouch.x-this.initialPos.x);
                                    } else {
                                        this.selectedBox.x = this.initialPos.x;
                                    }
                                } else {
                                    this.selectedBox.x = this.nextBox.x
                                }
                            }
                        }
                    } else if( this.dir==="left") {
                        // console.log(this.nextBox);
                        if(this.nextBox!==undefined) {
                            if(this.nextBox.num===undefined) {
                                // console.log(difX, this.size);
                                if(difX>-this.size) {
                                    if(difX<0) {
                                        this.selectedBox.x = point.x-(this.initialTouch.x-this.initialPos.x);//this.selectedBox.width/2;
                                    } else {
                                        this.selectedBox.x = this.initialPos.x;
                                    }
                                } else {
                                    this.selectedBox.x = this.nextBox.x;
                                }
                            }
                        }
                    } else if(this.dir==="down") {
                        if(this.nextBox!==undefined) {
                            if(this.nextBox.num===undefined) {
                                if(difY<this.size) {
                                    // let pos = 
                                    if(difY>0) {
                                        this.selectedBox.y = point.y-(this.initialTouch.y-this.initialPos.y);
                                    } else {
                                        this.selectedBox.y = this.initialPos.y;
                                    }
                                } else {
                                    this.selectedBox.y = this.nextBox.y
                                }
                            }
                        }
                    } else if(this.dir==="up") {
                        if(this.nextBox!==undefined) {
                            if(this.nextBox.num===undefined) {
                                // console.log(difX, this.size);
                                if(difY>-this.size) {
                                    if(difY<0) {
                                        this.selectedBox.y = point.y-(this.initialTouch.y-this.initialPos.y);//this.selectedBox.width/2;
                                    } else {
                                        this.selectedBox.y = this.initialPos.y;
                                    }
                                } else {
                                    this.selectedBox.y = this.nextBox.y;
                                }
                            }
                        }
                    }
                }
            }
        }
        onMouseUp(point: Point): void {
            if(this.initialTouch!=undefined) {
                // let difX =  point.x - this.initialTouch.x;
                // let difY =  point.y - this.initialTouch.y;
                // console.log(difX, difY);
                if(this.dir!==undefined) {
                    this.moveBox(this.selectedBox, this.dir, this.nextBox, this.initialPos);
                }
                // if(Math.abs(difX)>Math.abs(difY)) {
                //     if(difX>50) {
                //         this.moveBox(this.selectedBox, "right", this.nextBox, this.initialPos);
                //     } else if(difX<-50) {
                //         this.moveBox(this.selectedBox, "left", this.nextBox, this.initialPos);
                //     } 
                // } else {
                //     if(difY>50) {
                //         this.moveBox(this.selectedBox, "bottom", this.nextBox, this.initialPos);
                //     } else if(difY<-50) {
                //         this.moveBox(this.selectedBox, "top", this.nextBox, this.initialPos);
                //     }  
                // }
                this.initialTouch = undefined;
                this.selectedBox = undefined;
                this.dir = undefined;
                this.nextBox = undefined;
                this.initialPos = undefined;
            }
            
        }
        public setBoxNum(boxes:Box[]) {
            for(let i=0; i<this.boxes.length; i++){
                this.boxes[i].num = boxes[i].num;
            }
        }

        private setup() {
            
            if(this.dim%2===1) {
                this.numbers = this.getNumbers("odd");
            } else {
                this.numbers = this.getNumbers("even");
            }
            this.blankPos = randomInt(0, this.numbers.length);
            this.resetNumbers();
            
        }
      
        public resetNumbers() {
            let pos = 0;
            let goalNum = 0;
            // console.log(numbers);
            for(let i=0; i<this.dim; i++){
                for(let j=0; j<this.dim; j++) {
                    if(i===this.dim-1 && j===this.dim-1) {
                        goalNum = undefined;
                    } else {
                        goalNum++;
                    }
                    if(this.blankPos===(i*this.dim+j)) {
                        this.boxes[i*this.dim+j] = new Box(this.startingPointHor+j*(this.size+1), this.startingPointVer+i*(this.size+1), this.size, this.size, undefined, goalNum);
                    } else {
                        this.boxes[i*this.dim+j] = new Box(this.startingPointHor+j*(this.size+1), this.startingPointVer+i*(this.size+1), this.size, this.size, this.numbers[pos++], goalNum);
                    }
                    this.boxes[i*this.dim+j].position = new Point(i+1, j+1);
                    
                }
            }
            for(let i=0; i<this.dim; i++) {
                for(let j=0; j<this.dim; j++) {
                    if(i===0 && j===0) {
                        this.boxes[i*this.dim+j].right = this.boxes[i*this.dim+(j+1)];
                        this.boxes[i*this.dim+j].bottom = this.boxes[(i+1)*this.dim+j];
                    } else if(i===this.dim-1 && j===this.dim-1) {
                        this.boxes[i*this.dim+j].left = this.boxes[i*this.dim+(j-1)];
                        this.boxes[i*this.dim+j].top = this.boxes[(i-1)*this.dim+j];
                    } else if(i===0 && j===this.dim-1) {
                        this.boxes[i*this.dim+j].left = this.boxes[i*this.dim+(j-1)];
                        this.boxes[i*this.dim+j].bottom = this.boxes[(i+1)*this.dim+j];
                    } else if(i===this.dim-1 && j===0) {
                        this.boxes[i*this.dim+j].right = this.boxes[i*this.dim+(j+1)];
                        this.boxes[i*this.dim+j].top = this.boxes[(i-1)*this.dim+j];
                    } else if(i===0) { 
                        this.boxes[i*this.dim+j].right = this.boxes[i*this.dim+(j+1)];
                        this.boxes[i*this.dim+j].left = this.boxes[i*this.dim+(j-1)];
                        this.boxes[i*this.dim+j].bottom = this.boxes[(i+1)*this.dim+j];
                    } else if(i===this.dim-1) {
                        this.boxes[i*this.dim+j].right = this.boxes[i*this.dim+(j+1)];
                        this.boxes[i*this.dim+j].left = this.boxes[i*this.dim+(j-1)];
                        this.boxes[i*this.dim+j].top = this.boxes[(i-1)*this.dim+j];
                    } else if(j===0) {
                        this.boxes[i*this.dim+j].right = this.boxes[i*this.dim+(j+1)];
                        this.boxes[i*this.dim+j].top = this.boxes[(i-1)*this.dim+j];
                        this.boxes[i*this.dim+j].bottom = this.boxes[(i+1)*this.dim+j];
                    } else if(j===this.dim-1) {
                        this.boxes[i*this.dim+j].left = this.boxes[i*this.dim+(j-1)];
                        this.boxes[i*this.dim+j].top = this.boxes[(i-1)*this.dim+j];
                        this.boxes[i*this.dim+j].bottom = this.boxes[(i+1)*this.dim+j];
                    } else {
                        this.boxes[i*this.dim+j].left = this.boxes[i*this.dim+(j-1)];
                        this.boxes[i*this.dim+j].right = this.boxes[i*this.dim+(j+1)];
                        this.boxes[i*this.dim+j].top = this.boxes[(i-1)*this.dim+j];
                        this.boxes[i*this.dim+j].bottom = this.boxes[(i+1)*this.dim+j];
                    }
                }
            }
            console.log(this.boxes)
        }
        public checkAnswer():boolean {
            let moving = 0;
            for(let b of this.boxes) {
                if(b.goalNum==b.num) {
                    moving++;
                    console.log(b.goalNum);
                } 
                
            }
            console.log(moving);
            if(this.dim===3 && moving===9) {
                return true;
            } else if(this.dim===4 && moving===16) {
                return true;
            }
            return false;
        }
        private getNumbers(type:string):number[] {
            if(type==="even") {
                let size = this.dim*this.dim-1;
                let numbers =  randomIntArray(1, size);
                return numbers;
            } else if(type==="odd") {
                let size = this.dim*this.dim-1;
                let numbers =  randomIntArray(1, size);
                // let numbers = [1, 8, 2, 4, 3, 7, 6, 5];
                // let numbers = [13, 2, 10, 3, 1, 12, 8, 4, 5, 9, 6, 15, 14, 11, 7];
                // let numbers = [6, 13, 7, 10, 8, 9, 11, 15, 2, 12, 5, 14, 3, 1, 4];
                let inversion = this.getPair(numbers)
                while (inversion%2===1) {
                    numbers = randomIntArray(1, size);
                    inversion = this.getPair(numbers);
                    console.log(inversion);
                }
                console.log(inversion);
                return numbers;
            }

        }
        private getPair(numbers:number[]):number {
            let inversion = 0;
            for(let i=0; i<numbers.length; i++) {
                for(let j=i; j<numbers.length; j++) {
                    if(numbers[i]>numbers[j]) {
                        inversion++;
                    }
                }
            }
            return inversion;
        }
       
        private moveBox(box:Box, dir:string, nextBox:Box, initialPos:Point) {
            if(dir==='left') {
                let distance = box.x-initialPos.x;
                
                if(distance<-this.size/2) {
                    let int = setInterval(()=>{
                        box.x -= 5;
                        if(box.x<=nextBox.x) {
                            this.setPos(box, nextBox, initialPos);
                            clearInterval(int);
                        }
                        // if(box.x>)
                    }, 10)
                } else {
                    let int = setInterval(()=>{
                        box.x += 5;
                        if(box.x>=initialPos.x) {
                            clearInterval(int);
                            box.x = initialPos.x;
                        }
                        // if(box.x>)
                    }, 10)
                }
                
            } else if(dir==='right') {
                let distance = box.x-initialPos.x;
                if(distance>this.size/2) {
                    let int = setInterval(()=>{
                        box.x += 5;
                        if(box.x>=nextBox.x) {
                            this.setPos(box, nextBox, initialPos);
                            clearInterval(int);
                        }
                        // if(box.x>)
                    }, 10)
                } else {
                    let int = setInterval(()=>{
                        box.x -= 5;
                        if(box.x<=initialPos.x) {
                            clearInterval(int);
                            box.x = initialPos.x;
                        }
                        // if(box.x>)
                    }, 10)
                }
            } else if(dir==='down') {
                let distance = box.y-initialPos.y;
                if(distance>=this.size/2) {
                    let int = setInterval(()=>{
                        box.y += 5;
                        if(box.y>=nextBox.y) {
                            this.setPos(box, nextBox, initialPos);
                            clearInterval(int);
                        }
                        // if(box.x>)
                    }, 10)
                } else {
                    let int = setInterval(()=>{
                        box.y -= 5;
                        if(box.y<=initialPos.y) {
                            clearInterval(int);
                            box.y = initialPos.y;
                        }
                        // if(box.x>)
                    }, 10)
                }
              
            } else if(dir==='up') {
                let distance = box.y-initialPos.y;
                if(distance<=-this.size/2) {
                    let int = setInterval(()=>{
                        box.y -= 5;
                        if(box.y<=nextBox.y) {
                            this.setPos(box, nextBox, initialPos);
                            clearInterval(int);
                        }
                        // if(box.x>)
                    }, 10)
                } else {
                    let int = setInterval(()=>{
                        box.y += 5;
                        if(box.y>=initialPos.y) {
                            clearInterval(int);
                            box.y = initialPos.y;
                        }
                        // if(box.x>)
                    }, 10)
                }
            }
        }
        private setPos(box:Box, nextBox:Box, initialPos:Point) {
            let currentNum = box.num, nextNum=nextBox.num;
            box.num = nextNum;
            nextBox.num = currentNum;
            box.x = initialPos.x, box.y = initialPos.y; 
        }
        public update() {
            for(let r of this.boxes) {
                r.update();
            }
        }
        public render() {
            ctx.save();
            ctx.fillStyle = "white";
            ctx.fillRect(this.startingPointHor, this.startingPointVer, this.size*this.dim, this.size*this.dim)
            ctx.restore();
            for(let r of this.boxes) {
                r.render();
            }
        }
    }

}
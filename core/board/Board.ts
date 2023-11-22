namespace Game {
  export class Board implements IManager {
    private dim: number;
    private size: number = 120;
    private boxes: Box[] = [];

    public get getBoxes(): Box[] {
      return this.boxes;
    }
    private initialTouch = undefined;
    private selectedBox = undefined;
    private dir: string = undefined;
    private nextBox: Box = undefined;
    private initialPos: Point = undefined;
    private startingPointHor: number = 180;
    private startingPointVer: number = 100;
    private numbers: number[] = [];
    private blankPos: number;

    private jumbleNum: number = 2;
    public solutionNodes: Node[] = [];
    public solutionBoxes: MovedBox[] = [];
    private lastNode: Node = undefined;
    constructor(dim: number) {
      if (dim == 3) {
        this.jumbleNum = randomInt(12, 18);
      } else if (dim == 4) {
        this.jumbleNum = randomInt(18, 36);
      } else {
        this.jumbleNum = randomInt(20, 45)
      }
      this.startingPointVer = (cvs.height - dim*this.size)/2
      this.dim = dim;
      this.setup();

    }

    onMouseDown(point: Point): void {
      for (let r of this.boxes) {
        if (r.contains(point.x, point.y)) {
          if (r.num !== undefined) {
            this.initialTouch = point;
            this.selectedBox = r;
            this.initialPos = new Point(r.x, r.y);
          }
        };
      }
    }
    onMouseMove(point: Point): void {
      if (this.initialTouch != undefined) {
        let difX = point.x - this.initialTouch.x;
        let difY = point.y - this.initialTouch.y;
        if (this.dir == undefined) {
          if (difX > 10) {
            this.nextBox = this.selectedBox.right;
            if (this.nextBox === undefined) {
              return;
            }
            if (this.nextBox.num === undefined) {
              this.dir = "right";
            }

          } else if (difX < -10) {

            this.nextBox = this.selectedBox.left;
            if (this.nextBox === undefined) {
              return;
            }
            if (this.nextBox.num === undefined) {
              this.dir = "left";
            }
          } else if (difY > 10) {

            this.nextBox = this.selectedBox.bottom;
            if (this.nextBox === undefined) {
              return;
            }
            if (this.nextBox.num === undefined) {
              this.dir = "down";
            }
          } else if (difY < -10) {
            this.nextBox = this.selectedBox.top;
            if (this.nextBox === undefined) {
              return;
            }
            if (this.nextBox.num === undefined) {
              this.dir = "up";
            }
          }
          // }
        } else if (this.dir !== undefined) {
          if (this.dir === "right") {

            if (this.nextBox !== undefined) {
              if (this.nextBox.num === undefined) {
                if (difX < this.size) {
                  if (difX > 0) {
                    this.selectedBox.x = point.x - (this.initialTouch.x - this.initialPos.x);
                  } else {
                    this.selectedBox.x = this.initialPos.x;
                  }
                } else {
                  this.selectedBox.x = this.nextBox.x
                }
              }
            }
          } else if (this.dir === "left") {
            if (this.nextBox !== undefined) {
              if (this.nextBox.num === undefined) {
                if (difX > -this.size) {
                  if (difX < 0) {
                    this.selectedBox.x = point.x - (this.initialTouch.x - this.initialPos.x);//this.selectedBox.width/2;
                  } else {
                    this.selectedBox.x = this.initialPos.x;
                  }
                } else {
                  this.selectedBox.x = this.nextBox.x;
                }
              }
            }
          } else if (this.dir === "down") {
            if (this.nextBox !== undefined) {
              if (this.nextBox.num === undefined) {
                if (difY < this.size) {
                  if (difY > 0) {
                    this.selectedBox.y = point.y - (this.initialTouch.y - this.initialPos.y);
                  } else {
                    this.selectedBox.y = this.initialPos.y;
                  }
                } else {
                  this.selectedBox.y = this.nextBox.y
                }
              }
            }
          } else if (this.dir === "up") {
            if (this.nextBox !== undefined) {
              if (this.nextBox.num === undefined) {
                if (difY > -this.size) {
                  if (difY < 0) {
                    this.selectedBox.y = point.y - (this.initialTouch.y - this.initialPos.y);//this.selectedBox.width/2;
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
      if (this.initialTouch != undefined) {
        if (this.dir !== undefined) {
          this.moveBox(this.selectedBox, this.dir, this.nextBox, this.initialPos);
        }
        this.initialTouch = undefined;
        this.selectedBox = undefined;
        this.dir = undefined;
        this.nextBox = undefined;
        this.initialPos = undefined;
      }

    }
    public setBoxNum(boxes: Box[]) {
      for (let i = 0; i < this.boxes.length; i++) {
        this.boxes[i].num = boxes[i].num;
      }
    }

    private setup() {

      // if (this.dim % 2 === 1) {
      //   this.numbers = this.getNumbers("odd");
      // } else {
      //   this.numbers = this.getNumbers("even");
      // }
      // this.blankPos = randomInt(0, this.numbers.length);
      // this.numbers = [1, 2, 3, 4, 5, 6, 7, 8]
      // this.resetNumbers();
      this.initalizeNum();

    }
    private initalizeNum() {
      let num = 0;
      for (let i = 0; i < this.dim; i++) {
        for (let j = 0; j < this.dim; j++) {

          num++;
          if (num == this.dim * this.dim) { num = undefined }
          this.boxes[i * this.dim + j] = new Box(this.startingPointHor + j * (this.size + 1), this.startingPointVer + i * (this.size + 1), this.size, this.size, num, num)
          this.boxes[i * this.dim + j].position = new Point(i + 1, j + 1);
        }
      }
      for (let i = 0; i < this.dim; i++) {
        for (let j = 0; j < this.dim; j++) {
          if (i === 0 && j === 0) {
            this.boxes[i * this.dim + j].right = this.boxes[i * this.dim + (j + 1)];
            this.boxes[i * this.dim + j].bottom = this.boxes[(i + 1) * this.dim + j];
          } else if (i === this.dim - 1 && j === this.dim - 1) {
            this.boxes[i * this.dim + j].left = this.boxes[i * this.dim + (j - 1)];
            this.boxes[i * this.dim + j].top = this.boxes[(i - 1) * this.dim + j];
          } else if (i === 0 && j === this.dim - 1) {
            this.boxes[i * this.dim + j].left = this.boxes[i * this.dim + (j - 1)];
            this.boxes[i * this.dim + j].bottom = this.boxes[(i + 1) * this.dim + j];
          } else if (i === this.dim - 1 && j === 0) {
            this.boxes[i * this.dim + j].right = this.boxes[i * this.dim + (j + 1)];
            this.boxes[i * this.dim + j].top = this.boxes[(i - 1) * this.dim + j];
          } else if (i === 0) {
            this.boxes[i * this.dim + j].right = this.boxes[i * this.dim + (j + 1)];
            this.boxes[i * this.dim + j].left = this.boxes[i * this.dim + (j - 1)];
            this.boxes[i * this.dim + j].bottom = this.boxes[(i + 1) * this.dim + j];
          } else if (i === this.dim - 1) {
            this.boxes[i * this.dim + j].right = this.boxes[i * this.dim + (j + 1)];
            this.boxes[i * this.dim + j].left = this.boxes[i * this.dim + (j - 1)];
            this.boxes[i * this.dim + j].top = this.boxes[(i - 1) * this.dim + j];
          } else if (j === 0) {
            this.boxes[i * this.dim + j].right = this.boxes[i * this.dim + (j + 1)];
            this.boxes[i * this.dim + j].top = this.boxes[(i - 1) * this.dim + j];
            this.boxes[i * this.dim + j].bottom = this.boxes[(i + 1) * this.dim + j];
          } else if (j === this.dim - 1) {
            this.boxes[i * this.dim + j].left = this.boxes[i * this.dim + (j - 1)];
            this.boxes[i * this.dim + j].top = this.boxes[(i - 1) * this.dim + j];
            this.boxes[i * this.dim + j].bottom = this.boxes[(i + 1) * this.dim + j];
          } else {
            this.boxes[i * this.dim + j].left = this.boxes[i * this.dim + (j - 1)];
            this.boxes[i * this.dim + j].right = this.boxes[i * this.dim + (j + 1)];
            this.boxes[i * this.dim + j].top = this.boxes[(i - 1) * this.dim + j];
            this.boxes[i * this.dim + j].bottom = this.boxes[(i + 1) * this.dim + j];
          }
        }
      }
      this.randomizePuzzle();
    }

    public resetNumbers() {
      if (this.lastNode == undefined) return;
      this.setBoxNum(this.lastNode.boxes)
    }
    private randomizePuzzle() {
      let lastDir: Direction = "";
      this.solutionBoxes = [];
      for (let i = 0; i < this.jumbleNum; i++) {
        for (let box of this.boxes) {
          if (box.num == undefined) {

            let neighbours = [];
            if (box.left != undefined && lastDir != "left") {
              neighbours.push({ dir: "right", box: box.left });
              // lastDir = "left";
            }
            if (box.right != undefined && lastDir != "right") {
              neighbours.push({ dir: "left", box: box.right });
              // lastDir = "right"
            }
            if (box.top != undefined && lastDir != "up") {
              neighbours.push({ dir: "down", box: box.top });
              // lastDir = "up"
            }
            if (box.bottom != undefined && lastDir != "down") {
              neighbours.push({ dir: "up", box: box.bottom });
              // lastDir = "down"
            }
            let randNum = randomInt(0, neighbours.length - 1);
            let nextBox = neighbours[randNum].box;
            lastDir = neighbours[randNum].dir;
            let reverseDir: Direction = this.getReverseDir(lastDir);
            this.setPos(box, nextBox, new Point(box.x, box.y))
            this.solutionBoxes.push(new MovedBox(box, reverseDir))
            break;
          }
        }
      }
      this.solutionBoxes.reverse();
      this.lastNode = new Node(window.structuredClone(this.boxes), this.dim, 0)
    }
    private getReverseDir(dir:Direction){
      let reverseDir:Direction = ""
      if (dir == "left") {
        reverseDir = "right"
      } else if (dir == "right") {
        reverseDir = "left"
      } else if (dir == "down") {
        reverseDir = "up"
      } else if (dir == "up") {
        reverseDir = "down"
      }
      return reverseDir;
    }
    public checkAnswer(): boolean {
      let moving = 0;
      for (let b of this.boxes) {
        if (b.goalNum == b.num) {
          moving++;
        }

      }
      if (this.dim === 3 && moving === 9) {
        return true;
      } else if (this.dim === 4 && moving === 16) {
        return true;
      } else if (this.dim === 2 && moving === 4) {
        return true;
      }
      return false;
    }
    private getNumbers(type: string): number[] {
      if (type === "even") {
        let size = this.dim * this.dim - 1;
        let numbers = randomIntArray(1, size);
        let inversion = this.getPair(numbers);
        let blankLine = undefined;
        if (inversion % 2 == 0) {
          blankLine = randomInt(0, this.dim - 1);
          while (blankLine % 2 == 0) {
            blankLine = randomInt(0, this.dim - 1);
          }
        } else {
          blankLine = randomInt(0, this.dim - 1);
          while (blankLine % 2 == 1) {
            blankLine = randomInt(0, this.dim - 1);
          }

          // let blankPos = randomInt(0, this.dim)*blankLine;
        }
        let int = randomInt(0, this.dim - 1);
        this.blankPos = int + blankLine * this.dim;
        return numbers;
      } else if (type === "odd") {
        let size = this.dim * this.dim - 1;
        let numbers = randomIntArray(1, size);
        // let numbers = [1, 8, 2, 4, 3, 7, 6, 5];
        // let numbers = [13, 2, 10, 3, 1, 12, 8, 4, 5, 9, 6, 15, 14, 11, 7];
        // let numbers = [6, 13, 7, 10, 8, 9, 11, 15, 2, 12, 5, 14, 3, 1, 4];
        let inversion = this.getPair(numbers)
        while (inversion % 2 === 1) {
          numbers = randomIntArray(1, size);
          inversion = this.getPair(numbers);
        }
        this.blankPos = randomInt(0, numbers.length);
        return numbers;
      }

    }
    private getPair(numbers: number[]): number {
      let inversion = 0;
      for (let i = 0; i < numbers.length; i++) {
        for (let j = i; j < numbers.length; j++) {
          if (numbers[i] > numbers[j]) {
            inversion++;
          }
        }
      }
      return inversion;
    }

    private moveBox(box: Box, dir: string, nextBox: Box, initialPos: Point) {
      if (dir === 'left') {
        let distance = box.x - initialPos.x;
        if (distance < -this.size / 2) {
          let int = setInterval(() => {
            box.x -= 5;

            if (box.x <= nextBox.x) {
              this.setPos(box, nextBox, initialPos);
              clearInterval(int);

            }
          }, 10)
        } else {
          let int = setInterval(() => {
            box.x += 5;
            if (box.x >= initialPos.x) {
              clearInterval(int);
              box.x = initialPos.x;
            }
          }, 10)
        }

      } else if (dir === 'right') {
        let distance = box.x - initialPos.x;

        if (distance > this.size / 2) {
          let int = setInterval(() => {
            box.x += 5;
            if (box.x >= nextBox.x) {
              this.setPos(box, nextBox, initialPos);
              clearInterval(int);
            }
          }, 10)
        } else {
          let int = setInterval(() => {
            box.x -= 5;
            if (box.x <= initialPos.x) {
              clearInterval(int);
              box.x = initialPos.x;
            }
          }, 10)
        }
      } else if (dir === 'down') {
        let distance = box.y - initialPos.y;
        if (distance >= this.size / 2) {
          let int = setInterval(() => {
            box.y += 5;
            if (box.y >= nextBox.y) {
              this.setPos(box, nextBox, initialPos);
              clearInterval(int);
            }
          }, 10)
        } else {
          let int = setInterval(() => {
            box.y -= 5;
            if (box.y <= initialPos.y) {
              clearInterval(int);
              box.y = initialPos.y;
            }
          }, 10)
        }

      } else if (dir === 'up') {
        let distance = box.y - initialPos.y;
        if (distance <= -this.size / 2) {
          let int = setInterval(() => {
            box.y -= 5;
            if (box.y <= nextBox.y) {
              this.setPos(box, nextBox, initialPos);
              clearInterval(int);
            }
          }, 10)
        } else {
          let int = setInterval(() => {
            box.y += 5;
            if (box.y >= initialPos.y) {
              clearInterval(int);
              box.y = initialPos.y;
            }
          }, 10)
        }
      }
    }
    public async animateResult(box: Box, dir: string, nextBox: Box, initialPos: Point, time = 10) {
      return new Promise((resolve, reject) => {
        if (dir === 'left') {
          let int = setInterval(() => {
            box.x -= 5;

            if (box.x <= nextBox.x) {
              this.setPos(box, nextBox, initialPos);
              clearInterval(int);
              resolve("left")
            }
          }, time)

        } else if (dir === 'right') {
          let int = setInterval(() => {
            box.x += 5;
            if (box.x >= nextBox.x) {
              this.setPos(box, nextBox, initialPos);
              clearInterval(int);
              resolve("right")
            }
          }, time)
        } else if (dir === 'down') {
          let int = setInterval(() => {
            box.y += 5;
            if (box.y >= nextBox.y) {
              this.setPos(box, nextBox, initialPos);
              clearInterval(int);
              resolve("down")
            }
          }, time)

        } else if (dir === 'up') {
          let int = setInterval(() => {
            box.y -= 5;
            if (box.y <= nextBox.y) {
              this.setPos(box, nextBox, initialPos);
              clearInterval(int);
              resolve("up")
            }
          }, time)
        } else {
          reject("no direction found")
        }
      })
    }
    private setPos(box: Box, nextBox: Box, initialPos: Point) {
      let currentNum = box.num, nextNum = nextBox.num;
      box.num = nextNum;
      nextBox.num = currentNum;
      box.x = initialPos.x, box.y = initialPos.y;
    }
    public update() {
      for (let r of this.boxes) {
        r.update();
      }
    }
    public render() {
      ctx.save();
      ctx.fillStyle = "#4e2a15";
      ctx.beginPath();
      ctx.roundRect(this.startingPointHor-4, this.startingPointVer-4, (this.size * this.dim)+12, (this.size * this.dim)+12, [8])
      ctx.fill()
      ctx.restore();
      for (let r of this.boxes) {
        r.render();
      }
    }
  }

}
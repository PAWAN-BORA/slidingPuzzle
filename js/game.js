var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Game;
(function (Game) {
    class Engine {
        constructor(width, height) {
            this._width = width;
            this._height = height;
            this.preload();
        }
        get width() {
            return this._width;
        }
        get height() {
            return this._height;
        }
        preload() {
            new Game.Picture("btn_format", "assets/texture/btn_format.png");
        }
        init() {
            Game.MouseManager.initialize(Game.cvs);
            Game.TouchManager.initialize(Game.cvs);
            this._world = new Game.World(this);
        }
        loop() {
            requestAnimationFrame(this.loop.bind(this));
            this.render();
            this.update();
        }
        start(canvas) {
            Game.Canvas.Initialize(canvas);
            Game.cvs.width = this._width;
            Game.cvs.height = this._height;
            this.init();
            this.loop();
        }
        resize() {
            let height = window.innerHeight;
            let width = window.innerWidth;
            if (Game.currentState instanceof Game.MenuState) {
                Game.cvs.style.width = `${window.innerWidth}px`;
                Game.cvs.style.height = `${window.innerHeight}px`;
                return;
            }
            let ratio = width / height;
            document.getElementById('canvasArea').style.height = `${height}px`;
            document.getElementById('canvasArea').style.width = `${width}px`;
            if (ratio > (16 / 9)) {
                Game.cvs.style.height = `${window.innerHeight}px`;
                Game.cvs.style.width = `${(683 / 384) * window.innerHeight}px`;
            }
            else {
                Game.cvs.style.width = `${window.innerWidth}px`;
                Game.cvs.style.height = `${(384 / 683) * window.innerWidth}px`;
            }
        }
        update() {
            this._world.update();
        }
        render() {
            this._world.render();
        }
    }
    Game.Engine = Engine;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Animated {
        constructor(x, y) {
            this.images = [];
            this.startTime = 0;
            this.totalTime = 0;
            this.frameTime = 150;
            this.imageNum = 0;
            this.width = 634;
            this.height = 382;
            this.radius = 30;
            this.x = x;
            this.y = y;
        }
        addImage(image) {
            this.images.push(image);
            this.currentImage = image;
        }
        update() {
            let endTime = performance.now();
            let delta = endTime - this.startTime;
            this.totalTime += delta;
            if (this.totalTime > this.frameTime) {
                this.totalTime = 0;
                this.currentImage = this.images[this.imageNum];
                this.imageNum++;
                if (this.imageNum == this.images.length) {
                    this.imageNum = 0;
                }
            }
            this.startTime = endTime;
        }
        render() {
            Game.ctx.save();
            Game.ctx.beginPath();
            Game.ctx.moveTo(this.x + this.radius, this.y);
            Game.ctx.lineTo(this.x + this.width - this.radius, this.y);
            Game.ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + this.radius);
            Game.ctx.lineTo(this.x + this.width, this.y + this.height - this.radius);
            Game.ctx.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - this.radius, this.y + this.height);
            Game.ctx.lineTo(this.x + this.radius, this.y + this.height);
            Game.ctx.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - this.radius);
            Game.ctx.lineTo(this.x, this.y + this.radius);
            Game.ctx.quadraticCurveTo(this.x, this.y, this.x + this.radius, this.y);
            Game.ctx.closePath();
            Game.ctx.fill();
            Game.ctx.clip();
            Game.ctx.drawImage(this.currentImage, this.x, this.y, this.width, this.height);
            Game.ctx.restore();
        }
    }
    Game.Animated = Animated;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class AssetManager {
        static addImage(name, image) {
            AssetManager.pictures[name] = image;
        }
        static addSound(name, sound) {
            AssetManager.sounds[name] = sound;
        }
    }
    AssetManager.pictures = {};
    AssetManager.sounds = {};
    Game.AssetManager = AssetManager;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Picture {
        constructor(name, path) {
            this.loadImage(name, path);
        }
        loadImage(name, path) {
            this.image = new Image();
            this.image.onload = () => {
                Game.AssetManager.addImage(name, this);
            };
            this.image.onerror = () => {
                throw new Error(`Error in loading ${name}`);
            };
            this.image.src = path;
        }
    }
    Game.Picture = Picture;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Sound {
        constructor(name, path) {
            this.loadAudio(name, path);
        }
        loadAudio(name, path) {
            this.sound = new Audio();
            this.sound.onloadeddata = () => {
                Game.AssetManager.addSound(name, this);
            };
            this.sound.src = path;
        }
        play() {
            this.stop();
            this.sound.play();
        }
        pause() {
            this.sound.pause();
        }
        stop() {
            this.pause();
            this.sound.currentTime = 0;
        }
    }
    Game.Sound = Sound;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Board {
        constructor(dim) {
            this.size = 150;
            this.boxes = [];
            this.initialTouch = undefined;
            this.selectedBox = undefined;
            this.dir = undefined;
            this.nextBox = undefined;
            this.initialPos = undefined;
            this.startingPointHor = 180;
            this.startingPointVer = 100;
            this.numbers = [];
            this.dim = dim;
            this.setup();
        }
        get getBoxes() {
            return this.boxes;
        }
        onMouseDown(point) {
            for (let r of this.boxes) {
                if (r.contains(point.x, point.y)) {
                    if (r.num !== undefined) {
                        this.initialTouch = point;
                        this.selectedBox = r;
                        this.initialPos = new Game.Point(r.x, r.y);
                    }
                }
                ;
            }
        }
        onMouseMove(point) {
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
                    }
                    else if (difX < -10) {
                        this.nextBox = this.selectedBox.left;
                        if (this.nextBox === undefined) {
                            return;
                        }
                        if (this.nextBox.num === undefined) {
                            this.dir = "left";
                        }
                    }
                    else if (difY > 10) {
                        this.nextBox = this.selectedBox.bottom;
                        if (this.nextBox === undefined) {
                            return;
                        }
                        if (this.nextBox.num === undefined) {
                            this.dir = "down";
                        }
                    }
                    else if (difY < -10) {
                        this.nextBox = this.selectedBox.top;
                        if (this.nextBox === undefined) {
                            return;
                        }
                        if (this.nextBox.num === undefined) {
                            this.dir = "up";
                        }
                    }
                }
                else if (this.dir !== undefined) {
                    if (this.dir === "right") {
                        if (this.nextBox !== undefined) {
                            if (this.nextBox.num === undefined) {
                                if (difX < this.size) {
                                    if (difX > 0) {
                                        this.selectedBox.x = point.x - (this.initialTouch.x - this.initialPos.x);
                                    }
                                    else {
                                        this.selectedBox.x = this.initialPos.x;
                                    }
                                }
                                else {
                                    this.selectedBox.x = this.nextBox.x;
                                }
                            }
                        }
                    }
                    else if (this.dir === "left") {
                        if (this.nextBox !== undefined) {
                            if (this.nextBox.num === undefined) {
                                if (difX > -this.size) {
                                    if (difX < 0) {
                                        this.selectedBox.x = point.x - (this.initialTouch.x - this.initialPos.x);
                                    }
                                    else {
                                        this.selectedBox.x = this.initialPos.x;
                                    }
                                }
                                else {
                                    this.selectedBox.x = this.nextBox.x;
                                }
                            }
                        }
                    }
                    else if (this.dir === "down") {
                        if (this.nextBox !== undefined) {
                            if (this.nextBox.num === undefined) {
                                if (difY < this.size) {
                                    if (difY > 0) {
                                        this.selectedBox.y = point.y - (this.initialTouch.y - this.initialPos.y);
                                    }
                                    else {
                                        this.selectedBox.y = this.initialPos.y;
                                    }
                                }
                                else {
                                    this.selectedBox.y = this.nextBox.y;
                                }
                            }
                        }
                    }
                    else if (this.dir === "up") {
                        if (this.nextBox !== undefined) {
                            if (this.nextBox.num === undefined) {
                                if (difY > -this.size) {
                                    if (difY < 0) {
                                        this.selectedBox.y = point.y - (this.initialTouch.y - this.initialPos.y);
                                    }
                                    else {
                                        this.selectedBox.y = this.initialPos.y;
                                    }
                                }
                                else {
                                    this.selectedBox.y = this.nextBox.y;
                                }
                            }
                        }
                    }
                }
            }
        }
        onMouseUp(point) {
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
        setBoxNum(boxes) {
            for (let i = 0; i < this.boxes.length; i++) {
                this.boxes[i].num = boxes[i].num;
            }
        }
        setup() {
            if (this.dim % 2 === 1) {
                this.numbers = this.getNumbers("odd");
            }
            else {
                this.numbers = this.getNumbers("even");
            }
            this.resetNumbers();
        }
        resetNumbers() {
            let pos = 0;
            let goalNum = 0;
            for (let i = 0; i < this.dim; i++) {
                for (let j = 0; j < this.dim; j++) {
                    if (i === this.dim - 1 && j === this.dim - 1) {
                        goalNum = undefined;
                    }
                    else {
                        goalNum++;
                    }
                    if (this.blankPos === (i * this.dim + j)) {
                        this.boxes[i * this.dim + j] = new Game.Box(this.startingPointHor + j * (this.size + 1), this.startingPointVer + i * (this.size + 1), this.size, this.size, undefined, goalNum);
                    }
                    else {
                        this.boxes[i * this.dim + j] = new Game.Box(this.startingPointHor + j * (this.size + 1), this.startingPointVer + i * (this.size + 1), this.size, this.size, this.numbers[pos++], goalNum);
                    }
                    this.boxes[i * this.dim + j].position = new Game.Point(i + 1, j + 1);
                }
            }
            for (let i = 0; i < this.dim; i++) {
                for (let j = 0; j < this.dim; j++) {
                    if (i === 0 && j === 0) {
                        this.boxes[i * this.dim + j].right = this.boxes[i * this.dim + (j + 1)];
                        this.boxes[i * this.dim + j].bottom = this.boxes[(i + 1) * this.dim + j];
                    }
                    else if (i === this.dim - 1 && j === this.dim - 1) {
                        this.boxes[i * this.dim + j].left = this.boxes[i * this.dim + (j - 1)];
                        this.boxes[i * this.dim + j].top = this.boxes[(i - 1) * this.dim + j];
                    }
                    else if (i === 0 && j === this.dim - 1) {
                        this.boxes[i * this.dim + j].left = this.boxes[i * this.dim + (j - 1)];
                        this.boxes[i * this.dim + j].bottom = this.boxes[(i + 1) * this.dim + j];
                    }
                    else if (i === this.dim - 1 && j === 0) {
                        this.boxes[i * this.dim + j].right = this.boxes[i * this.dim + (j + 1)];
                        this.boxes[i * this.dim + j].top = this.boxes[(i - 1) * this.dim + j];
                    }
                    else if (i === 0) {
                        this.boxes[i * this.dim + j].right = this.boxes[i * this.dim + (j + 1)];
                        this.boxes[i * this.dim + j].left = this.boxes[i * this.dim + (j - 1)];
                        this.boxes[i * this.dim + j].bottom = this.boxes[(i + 1) * this.dim + j];
                    }
                    else if (i === this.dim - 1) {
                        this.boxes[i * this.dim + j].right = this.boxes[i * this.dim + (j + 1)];
                        this.boxes[i * this.dim + j].left = this.boxes[i * this.dim + (j - 1)];
                        this.boxes[i * this.dim + j].top = this.boxes[(i - 1) * this.dim + j];
                    }
                    else if (j === 0) {
                        this.boxes[i * this.dim + j].right = this.boxes[i * this.dim + (j + 1)];
                        this.boxes[i * this.dim + j].top = this.boxes[(i - 1) * this.dim + j];
                        this.boxes[i * this.dim + j].bottom = this.boxes[(i + 1) * this.dim + j];
                    }
                    else if (j === this.dim - 1) {
                        this.boxes[i * this.dim + j].left = this.boxes[i * this.dim + (j - 1)];
                        this.boxes[i * this.dim + j].top = this.boxes[(i - 1) * this.dim + j];
                        this.boxes[i * this.dim + j].bottom = this.boxes[(i + 1) * this.dim + j];
                    }
                    else {
                        this.boxes[i * this.dim + j].left = this.boxes[i * this.dim + (j - 1)];
                        this.boxes[i * this.dim + j].right = this.boxes[i * this.dim + (j + 1)];
                        this.boxes[i * this.dim + j].top = this.boxes[(i - 1) * this.dim + j];
                        this.boxes[i * this.dim + j].bottom = this.boxes[(i + 1) * this.dim + j];
                    }
                }
            }
            console.log(this.boxes);
        }
        checkAnswer() {
            let moving = 0;
            for (let b of this.boxes) {
                if (b.goalNum == b.num) {
                    moving++;
                    console.log(b.goalNum);
                }
            }
            console.log(moving);
            if (this.dim === 3 && moving === 9) {
                return true;
            }
            else if (this.dim === 4 && moving === 16) {
                return true;
            }
            else if (this.dim === 2 && moving === 4) {
                return true;
            }
            return false;
        }
        getNumbers(type) {
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
                }
                else {
                    blankLine = randomInt(0, this.dim - 1);
                    while (blankLine % 2 == 1) {
                        blankLine = randomInt(0, this.dim - 1);
                    }
                }
                console.log(inversion);
                console.log(blankLine);
                let int = randomInt(0, this.dim - 1);
                console.log(int);
                this.blankPos = int + blankLine * this.dim;
                return numbers;
            }
            else if (type === "odd") {
                let size = this.dim * this.dim - 1;
                let numbers = randomIntArray(1, size);
                let inversion = this.getPair(numbers);
                while (inversion % 2 === 1) {
                    numbers = randomIntArray(1, size);
                    inversion = this.getPair(numbers);
                    console.log(inversion);
                }
                this.blankPos = randomInt(0, numbers.length);
                return numbers;
            }
        }
        getPair(numbers) {
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
        moveBox(box, dir, nextBox, initialPos) {
            if (dir === 'left') {
                let distance = box.x - initialPos.x;
                if (distance < -this.size / 2) {
                    let int = setInterval(() => {
                        box.x -= 5;
                        if (box.x <= nextBox.x) {
                            this.setPos(box, nextBox, initialPos);
                            clearInterval(int);
                        }
                    }, 10);
                }
                else {
                    let int = setInterval(() => {
                        box.x += 5;
                        if (box.x >= initialPos.x) {
                            clearInterval(int);
                            box.x = initialPos.x;
                        }
                    }, 10);
                }
            }
            else if (dir === 'right') {
                let distance = box.x - initialPos.x;
                if (distance > this.size / 2) {
                    let int = setInterval(() => {
                        box.x += 5;
                        if (box.x >= nextBox.x) {
                            this.setPos(box, nextBox, initialPos);
                            clearInterval(int);
                        }
                    }, 10);
                }
                else {
                    let int = setInterval(() => {
                        box.x -= 5;
                        if (box.x <= initialPos.x) {
                            clearInterval(int);
                            box.x = initialPos.x;
                        }
                    }, 10);
                }
            }
            else if (dir === 'down') {
                let distance = box.y - initialPos.y;
                if (distance >= this.size / 2) {
                    let int = setInterval(() => {
                        box.y += 5;
                        if (box.y >= nextBox.y) {
                            this.setPos(box, nextBox, initialPos);
                            clearInterval(int);
                        }
                    }, 10);
                }
                else {
                    let int = setInterval(() => {
                        box.y -= 5;
                        if (box.y <= initialPos.y) {
                            clearInterval(int);
                            box.y = initialPos.y;
                        }
                    }, 10);
                }
            }
            else if (dir === 'up') {
                let distance = box.y - initialPos.y;
                if (distance <= -this.size / 2) {
                    let int = setInterval(() => {
                        box.y -= 5;
                        if (box.y <= nextBox.y) {
                            this.setPos(box, nextBox, initialPos);
                            clearInterval(int);
                        }
                    }, 10);
                }
                else {
                    let int = setInterval(() => {
                        box.y += 5;
                        if (box.y >= initialPos.y) {
                            clearInterval(int);
                            box.y = initialPos.y;
                        }
                    }, 10);
                }
            }
        }
        setPos(box, nextBox, initialPos) {
            let currentNum = box.num, nextNum = nextBox.num;
            box.num = nextNum;
            nextBox.num = currentNum;
            box.x = initialPos.x, box.y = initialPos.y;
        }
        update() {
            for (let r of this.boxes) {
                r.update();
            }
        }
        render() {
            Game.ctx.save();
            Game.ctx.fillStyle = "white";
            Game.ctx.fillRect(this.startingPointHor, this.startingPointVer, this.size * this.dim, this.size * this.dim);
            Game.ctx.restore();
            for (let r of this.boxes) {
                r.render();
            }
        }
    }
    Game.Board = Board;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class BoardSoultion {
        constructor(boxes, dim) {
            this.boxes = [];
            this.dicoveredNodes = [];
            this.solutionNodes = [];
            this.boxes = boxes;
            this.dim = dim;
        }
        setBoxes(boxes) {
            this.boxes = boxes;
        }
        getEmpty(boxes) {
            for (let b of boxes) {
                if (b.num === undefined) {
                    b;
                }
            }
        }
        getCost() {
        }
        idaSolution() {
            return __awaiter(this, void 0, void 0, function* () {
                console.time('idatest');
                let rootNode = new Game.Node(this.boxes, this.dim, 0);
                let maxDepth = 1;
                let num = 0;
                let path = [rootNode];
                let bound = rootNode.ManhattanDistance;
                for (let i = 0; i < 20; i++) {
                    console.log("this is sepreator");
                    let data = this.DLS(path, i, bound);
                    if (data.found) {
                        this.solutionNodes = path;
                        console.log(this.solutionNodes);
                        break;
                    }
                    bound = data.bound;
                }
                console.timeEnd('idatest');
            });
        }
        DLS(path, depth, bound) {
            let node = path[path.length - 1];
            let g = node.cost;
            let f = g + node.ManhattanDistance;
            if (f > bound) {
                return { found: false, bound: f };
            }
            if (node.isSolution()) {
                return { found: true, bound: bound };
            }
            let neighbourNodes = node.getNeigbourNode();
            let min = 10000;
            for (const n of neighbourNodes) {
                if (!path.includes(n)) {
                    path.push(n);
                    let data = this.DLS(path, 1, bound);
                    if (data.found) {
                        return data;
                    }
                    if (data.bound < min) {
                        min = data.bound;
                    }
                    ;
                    path.pop();
                }
            }
            return { found: false, bound: min };
        }
        solution() {
            return __awaiter(this, void 0, void 0, function* () {
                console.time('Atest');
                let queue = [];
                let rootNode = new Game.Node(this.boxes, this.dim, 0);
                queue.push(rootNode);
                let num = 0;
                while (queue.length !== 0) {
                    const [currentNode, index] = this.getCurrentNode(queue);
                    queue.splice(index, 1);
                    if (currentNode.isSolution()) {
                        console.log("is a solution");
                        this.getSolutionNode(currentNode);
                        console.log(this.solutionNodes);
                        break;
                    }
                    currentNode.initialPoint = this.dicoveredNodes.length;
                    this.dicoveredNodes.push(currentNode);
                    let neighbourNode = currentNode.getNeigbourNode();
                    for (let n of neighbourNode) {
                        if (!this.isDiscoverd(n, n.previousNode.initialPoint)) {
                            queue.push(n);
                            num++;
                            if (num >= 500000) {
                                console.log("returned");
                                queue.length = 0;
                                break;
                            }
                        }
                    }
                }
                console.timeEnd('Atest');
            });
        }
        getSolutionNode(node) {
            this.solutionNodes.unshift(node);
            if (node.previousNode !== undefined) {
                this.getSolutionNode(node.previousNode);
            }
        }
        getCurrentNode(nodes) {
            let selectedNode = undefined;
            let selectedIndex = undefined;
            let currentCost = 10000;
            for (let i = 0; i < nodes.length; i++) {
                let nodeCost = nodes[i].cost + nodes[i].ManhattanDistance;
                if (nodeCost < currentCost) {
                    currentCost = nodeCost;
                    selectedNode = nodes[i];
                    selectedIndex = i;
                }
            }
            return [selectedNode, selectedIndex];
        }
        isDiscoverd(node, level) {
            for (let i = level; i < this.dicoveredNodes.length; i++) {
                let d = this.dicoveredNodes[i];
                if (d.isEqual(node)) {
                    return true;
                }
            }
            return false;
        }
        viewSolution() {
            let num = 1;
            setInterval(() => {
            }, 500);
        }
    }
    Game.BoardSoultion = BoardSoultion;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Rectangle {
        constructor(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        contains(x, y) {
            let centerX = this.x + this.width / 2;
            let centerY = this.y + this.height / 2;
            if (Math.abs(centerX - x) < this.width / 2 && Math.abs(centerY - y) < this.height / 2) {
                return true;
            }
            else {
                return false;
            }
        }
        update() {
        }
        render() {
            Game.ctx.save();
            Game.ctx.fillStyle = "black";
            Game.ctx.fillRect(this.x, this.y, this.width, this.height);
            Game.ctx.restore();
        }
    }
    Game.Rectangle = Rectangle;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Box extends Game.Rectangle {
        constructor(x, y, width, height, num, goalNum) {
            super(x, y, width, height);
            this.left = undefined;
            this.right = undefined;
            this.top = undefined;
            this.bottom = undefined;
            this.isMoving = false;
            this.num = num;
            this.goalNum = goalNum;
        }
        update() {
            if (this.isMoving) {
            }
        }
        render() {
            if (this.num !== undefined) {
                Game.ctx.save();
                Game.ctx.textAlign = "center";
                Game.ctx.textBaseline = "middle";
                Game.ctx.fillStyle = "black";
                Game.ctx.fillRect(this.x, this.y, this.width, this.height);
                Game.ctx.fillStyle = "white";
                Game.ctx.font = "50px bold arial";
                Game.ctx.fillText(this.num.toString(), this.x + this.width / 2, this.y + this.height / 2);
                Game.ctx.restore();
            }
            else {
            }
        }
    }
    Game.Box = Box;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Node {
        constructor(boxes, dim, cost) {
            this.previousNode = undefined;
            this.previousMove = undefined;
            this.siblingNodes = [];
            this.cost = 0;
            this.initialPoint = 0;
            this.boxes = boxes;
            this.dim = dim;
            this.cost = cost;
            this.ManhattanDistance = this.getManhattanDistance();
        }
        isSolution() {
            let moving = 0;
            for (let b of this.boxes) {
                if (b.goalNum == b.num) {
                    moving++;
                }
            }
            if (this.dim === 3 && moving === 9) {
                return true;
            }
            else if (this.dim === 4 && moving === 16) {
                return true;
            }
            else if (this.dim === 2 && moving === 4) {
                return true;
            }
            return false;
        }
        getNeigbourNode() {
            let emptyBox = this.getEmptyBox();
            let neighbourNode = [];
            let cost = this.cost + 1;
            if (emptyBox.left !== undefined) {
                let newBoxes = this.switchNum(this.boxes, emptyBox.position, emptyBox.left.position);
                if (this.previousNode != undefined) {
                    if (!this.isPreviousNeighbour(newBoxes)) {
                        let newNode = new Node(newBoxes, this.dim, cost);
                        newNode.previousNode = this;
                        neighbourNode.push(newNode);
                    }
                }
                else {
                    let newNode = new Node(newBoxes, this.dim, cost);
                    newNode.previousNode = this;
                    neighbourNode.push(newNode);
                }
            }
            if (emptyBox.right !== undefined) {
                let newBoxes = this.switchNum(this.boxes, emptyBox.position, emptyBox.right.position);
                if (this.previousNode != undefined) {
                    if (!this.isPreviousNeighbour(newBoxes)) {
                        let newNode = new Node(newBoxes, this.dim, cost);
                        newNode.previousNode = this;
                        neighbourNode.push(newNode);
                    }
                }
                else {
                    let newNode = new Node(newBoxes, this.dim, cost);
                    newNode.previousNode = this;
                    neighbourNode.push(newNode);
                }
            }
            if (emptyBox.top !== undefined) {
                let newBoxes = this.switchNum(this.boxes, emptyBox.position, emptyBox.top.position);
                if (this.previousNode != undefined) {
                    if (!this.isPreviousNeighbour(newBoxes)) {
                        let newNode = new Node(newBoxes, this.dim, cost);
                        newNode.previousNode = this;
                        neighbourNode.push(newNode);
                    }
                }
                else {
                    let newNode = new Node(newBoxes, this.dim, cost);
                    newNode.previousNode = this;
                    neighbourNode.push(newNode);
                }
            }
            if (emptyBox.bottom !== undefined) {
                let newBoxes = this.switchNum(this.boxes, emptyBox.position, emptyBox.bottom.position);
                if (this.previousNode != undefined) {
                    if (!this.isPreviousNeighbour(newBoxes)) {
                        let newNode = new Node(newBoxes, this.dim, cost);
                        newNode.previousNode = this;
                        neighbourNode.push(newNode);
                    }
                }
                else {
                    let newNode = new Node(newBoxes, this.dim, cost);
                    newNode.previousNode = this;
                    neighbourNode.push(newNode);
                }
            }
            return neighbourNode;
        }
        switchNum(boxes, EmptyPos, newPos) {
            let Emptybox, newBox;
            let newBoxes = [];
            for (let b of boxes) {
                newBoxes.push(Object.assign({}, b));
            }
            for (let b of newBoxes) {
                if (b.position.x === EmptyPos.x && b.position.y === EmptyPos.y) {
                    Emptybox = b;
                }
                if (b.position.x === newPos.x && b.position.y === newPos.y) {
                    newBox = b;
                }
            }
            Emptybox.num = newBox.num;
            newBox.num = undefined;
            return newBoxes;
        }
        getEmptyBox() {
            for (let b of this.boxes) {
                if (b.num === undefined) {
                    return b;
                }
            }
        }
        shouldAddOnNeigbour(boxes) {
            let isExist = this.isSiblingExist(this, boxes);
            if (isExist) {
                return false;
            }
            let previousBoxes = this.previousNode.boxes;
            isExist = true;
            for (let i = 0; i < boxes.length; i++) {
                if (boxes[i].num !== previousBoxes[i].num) {
                    isExist = false;
                }
            }
            if (isExist) {
                return false;
            }
            isExist = this.isSiblingExist(this.previousNode, boxes);
            if (isExist) {
                return false;
            }
            else {
                return true;
            }
        }
        isSiblingExist(node, boxes) {
            let isExist = false;
            for (let sib of node.siblingNodes) {
                isExist = true;
                for (let i = 0; i < boxes.length; i++) {
                    if (boxes[i].num !== sib.boxes[i].num) {
                        isExist = false;
                        break;
                    }
                }
                if (isExist) {
                    return true;
                }
            }
            return false;
        }
        isPreviousNeighbour(boxes) {
            let previousBoxes = this.previousNode.boxes;
            for (let i = 0; i < boxes.length; i++) {
                if (boxes[i].num !== previousBoxes[i].num) {
                    return false;
                }
            }
            return true;
        }
        isEqual(node) {
            for (let i = 0; i < node.boxes.length; i++) {
                if (node.boxes[i].num !== this.boxes[i].num) {
                    return false;
                }
            }
            return true;
        }
        getManhattanDistance() {
            let dis = 0;
            for (let b of this.boxes) {
                if (b.num !== b.goalNum) {
                    let goalPos = this.getGoalPostion(b.num);
                    let currentPos = b.position;
                    let travelDis = Math.abs(goalPos.x - currentPos.x) + Math.abs(goalPos.y - currentPos.y);
                    dis += travelDis;
                }
            }
            return dis;
        }
        getGoalPostion(num) {
            for (let b of this.boxes) {
                if (num === b.goalNum) {
                    return b.position;
                }
            }
            console.error(`${num} dose not exist`);
        }
    }
    Game.Node = Node;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Collision {
        static collsionOfCircles(c1, c2) {
            let point = new Game.Point(c1.x, c1.y);
            if (point.dist(c2.x, c2.y) < c1.radius + c2.radius) {
                return true;
            }
            return false;
        }
    }
    Game.Collision = Collision;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Circle {
        constructor(x, y, radius) {
            this.x = x;
            this.y = y;
            this.radius = radius;
        }
        contains(x, y) {
            let point = new Game.Point(this.x, this.y);
            if (point.dist(x, y) < this.radius) {
                return true;
            }
            else {
                return false;
            }
        }
        update() {
        }
        render() {
            Game.ctx.beginPath();
            Game.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            Game.ctx.fill();
            Game.ctx.closePath();
        }
    }
    Game.Circle = Circle;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class DrawableCircle extends Game.Circle {
        constructor() {
            super(...arguments);
            this.color = "black";
        }
        update() {
        }
        render() {
            Game.ctx.save();
            Game.ctx.beginPath();
            Game.ctx.fillStyle = this.color;
            Game.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            Game.ctx.fill();
            Game.ctx.closePath();
            Game.ctx.restore();
        }
    }
    Game.DrawableCircle = DrawableCircle;
})(Game || (Game = {}));
function randomInt(a, b) {
    if (a > b) {
        throw Error(`${a} should be less than ${b}`);
    }
    else {
        let totalNumber = b - a + 1;
        let x = Math.floor(Math.random() * totalNumber + a);
        return x;
    }
}
function randomIntArray(a, b) {
    if (a > b) {
        throw Error(`${a} should be less than ${b}`);
    }
    else {
        let array = [];
        let totalNumber = b - a + 1;
        for (let i = 0; i < totalNumber; i++) {
            let randomNum = randomInt(a, b);
            for (let j = 0; j < array.length; j++) {
                if (randomNum == array[j]) {
                    randomNum = randomInt(a, b);
                    j = -1;
                }
            }
            array.push(randomNum);
        }
        return array;
    }
}
function ranIntArrayInRange(num, range) {
    if (num > (range[1] - range[0])) {
        throw Error(`${num} should be less than the range of numbers`);
    }
    else {
        let array = [];
        for (let i = 0; i < num; i++) {
            let randomNum = randomInt(range[0], range[1]);
            for (let j = 0; j < array.length; j++) {
                if (randomNum == array[j]) {
                    randomNum = randomInt(range[0], range[1]);
                    j = -1;
                }
            }
            array.push(randomNum);
        }
        return array;
    }
}
function TwoDArray(row, column) {
    this.row = row;
    this.coloumn = column;
    let array = new Array(row);
    for (let j = 0; j < row; j++) {
        array[j] = new Array(column);
    }
    return array;
}
function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}
function fullScreen(game) {
    let isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null);
    if (!isInFullScreen) {
        if (game.requestFullscreen) {
            game.requestFullscreen();
        }
    }
    ;
}
;
function click(cvs, box, checkFunction) {
    let status = false;
    let out = true;
    cvs.addEventListener('mousedown', mousedown);
    function mousedown(event) {
        event.preventDefault();
        event.stopPropagation();
        let cvsSize = cvs.getBoundingClientRect();
        let ratioX = cvs.width / cvsSize.width;
        let ratioY = cvs.height / cvsSize.height;
        let x = (event.x - cvsSize.left) * ratioX;
        let y = (event.y - cvsSize.top) * ratioY;
        let boxXCenter = box.x + box.width / 2;
        let boxYCenter = box.y + box.height / 2;
        if (Math.abs(x - boxXCenter) < box.width / 2 && Math.abs(y - boxYCenter) < box.height / 2) {
            status = true;
            box.x = box.x + 4;
            box.y = box.y + 4;
        }
    }
    cvs.addEventListener('mousemove', mousemove);
    function mousemove(event) {
        event.preventDefault();
        event.stopPropagation();
        let cvsSize = cvs.getBoundingClientRect();
        let ratioX = cvs.width / cvsSize.width;
        let ratioY = cvs.height / cvsSize.height;
        let x = (event.x - cvsSize.left) * ratioX;
        let y = (event.y - cvsSize.top) * ratioY;
        let boxXCenter = box.x + box.width / 2;
        let boxYCenter = box.y + box.height / 2;
        if (Math.abs(x - boxXCenter) < box.width / 2 && Math.abs(y - boxYCenter) < box.height / 2) {
            cvs.style.cursor = 'pointer';
            out = false;
        }
        else {
            if (!out) {
                cvs.style.cursor = 'auto';
                out = true;
            }
        }
    }
    cvs.addEventListener('mouseup', mouseup);
    function mouseup() {
        if (status) {
            box.x = box.x - 4;
            box.y = box.y - 4;
            status = false;
            if (checkFunction !== undefined) {
                checkFunction();
            }
        }
    }
}
function touchClick(cvs, box) {
    let status = false;
    cvs.addEventListener('touchstart', touchstart);
    function touchstart(event) {
        event.preventDefault();
        event.stopPropagation();
        let cvsSize = cvs.getBoundingClientRect();
        let ratioX = cvs.width / cvsSize.width;
        let ratioY = cvs.height / cvsSize.height;
        let x = (event.x - cvsSize.left) * ratioX;
        let y = (event.y - cvsSize.top) * ratioY;
        let boxXCenter = box.x + box.length / 2;
        let boxYCenter = box.y + box.width / 2;
        if (Math.abs(x - boxXCenter) < box.length / 2 && Math.abs(y - boxYCenter) < box.width / 2) {
            status = true;
            box.x = box.x + 4;
            box.y = box.y + 4;
        }
    }
    cvs.addEventListener('touchend', touchend);
    function touchend() {
        if (status) {
            box.x = box.x - 4;
            box.y = box.y - 4;
        }
        status = false;
    }
}
function pointInBox(x, y, box) {
    let boxXCenter = box.x + box.width / 2;
    let boxYCenter = box.y + box.height / 2;
    if (Math.abs(x - boxXCenter) < box.width / 2 && Math.abs(y - boxYCenter) < box.height / 2) {
        return true;
    }
    else {
        return false;
    }
}
function pointInEllipse(x, y, ellipse) {
    let leftSimplication = (x - ellipse.x) * Math.cos(ellipse.rotate) + (y - ellipse.y) * Math.sin(ellipse.rotate);
    let rightSimplication = (x - ellipse.x) * Math.sin(ellipse.rotate) - (y - ellipse.y) * Math.cos(ellipse.rotate);
    let leftValue = Math.pow(leftSimplication, 2) / Math.pow(ellipse.rX, 2);
    let rightValue = Math.pow(rightSimplication, 2) / Math.pow(ellipse.rY, 2);
    return leftValue + rightValue <= 1;
}
function timer(min, sec) {
    if (sec == 0) {
        min--;
        sec = 59;
    }
    else {
        sec--;
    }
    return {
        minutes: min,
        seconds: sec,
    };
}
function rotate(ctx, x, y, angle) {
    let rAngel = angle * Math.PI / 180;
    ctx.translate(x, y);
    ctx.rotate(rAngel);
}
function star(ctx, x, y, r1, r2, color) {
    let angle = 36 * Math.PI / 180;
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(r1 * Math.cos(0), r1 * Math.sin(0));
    for (let i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            ctx.lineTo(r2 * Math.cos(angle * (i + 1)), r2 * Math.sin(angle * (i + 1)));
        }
        else {
            ctx.lineTo(r1 * Math.cos(angle * (i + 1)), r1 * Math.sin(angle * (i + 1)));
        }
    }
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}
function pointOncanvas(cvs, event) {
    let cvsSize = cvs.getBoundingClientRect();
    let ratioX = cvs.width / cvsSize.width;
    let ratioY = cvs.height / cvsSize.height;
    let x = (event.clientX - cvsSize.left) * ratioX;
    let y = (event.clientY - cvsSize.top) * ratioY;
    return {
        x: x,
        y: y,
    };
}
var Game;
(function (Game) {
    class Canvas {
        static Initialize(canvasID) {
            if (canvasID === undefined) {
                Game.cvs = document.createElement("canvas");
                document.getElementsByTagName('body')[0].appendChild(Game.cvs);
                if (Game.cvs === undefined || Game.cvs === null) {
                    throw new Error(`canvas is not been created`);
                }
                Game.ctx = Game.cvs.getContext("2d");
            }
            else {
                Game.cvs = document.getElementById(canvasID);
                if (Game.cvs === undefined || Game.cvs === null) {
                    throw new Error(`${canvasID} is undefined`);
                }
                Game.ctx = Game.cvs.getContext("2d");
            }
        }
    }
    Game.Canvas = Canvas;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class KeyboardManager {
        static initialize() {
            for (let i = 0; i < 255; i++) {
                KeyboardManager.keys[i] = false;
            }
            document.addEventListener("keydown", KeyboardManager.keydown);
            document.addEventListener("keyup", KeyboardManager.keyup);
        }
        static keydown(event) {
            KeyboardManager.keys[event.keyCode] = true;
        }
        static keyup(event) {
            KeyboardManager.keys[event.keyCode] = false;
        }
    }
    KeyboardManager.keys = [];
    Game.KeyboardManager = KeyboardManager;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class MouseManager {
        static initialize(canvas) {
            canvas.addEventListener("mousedown", MouseManager.mousedown);
            canvas.addEventListener("mouseup", MouseManager.mouseup);
            canvas.addEventListener("mousemove", MouseManager.mousemove);
            MouseManager._cvs = canvas;
        }
        static setUIManager(uIManager) {
            MouseManager._uIManager = uIManager;
        }
        static mousedown(event) {
            event.preventDefault();
            event.stopPropagation();
            let cvsSize = MouseManager._cvs.getBoundingClientRect();
            let ratioX = MouseManager._cvs.width / cvsSize.width;
            let ratioY = MouseManager._cvs.height / cvsSize.height;
            let x = (event.clientX - cvsSize.left) * ratioX;
            let y = (event.clientY - cvsSize.top) * ratioY;
            let point = new Game.Point(x, y);
            if (MouseManager._uIManager !== undefined && MouseManager._uIManager !== null) {
                MouseManager._uIManager.onMouseDown(point);
            }
        }
        static mouseup(event) {
            event.preventDefault();
            event.stopPropagation();
            let cvsSize = MouseManager._cvs.getBoundingClientRect();
            let ratioX = MouseManager._cvs.width / cvsSize.width;
            let ratioY = MouseManager._cvs.height / cvsSize.height;
            let x = (event.clientX - cvsSize.left) * ratioX;
            let y = (event.clientY - cvsSize.top) * ratioY;
            let point = new Game.Point(x, y);
            if (MouseManager._uIManager !== undefined && MouseManager._uIManager !== null) {
                MouseManager._uIManager.onMouseUp(point);
            }
        }
        static mousemove(event) {
            event.preventDefault();
            event.stopPropagation();
            let cvsSize = MouseManager._cvs.getBoundingClientRect();
            let ratioX = MouseManager._cvs.width / cvsSize.width;
            let ratioY = MouseManager._cvs.height / cvsSize.height;
            let x = (event.clientX - cvsSize.left) * ratioX;
            let y = (event.clientY - cvsSize.top) * ratioY;
            let point = new Game.Point(x, y);
            if (MouseManager._uIManager !== undefined && MouseManager._uIManager !== null) {
                MouseManager._uIManager.onMouseMove(point);
            }
        }
    }
    Game.MouseManager = MouseManager;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class TouchManager {
        static initialize(canvas) {
            canvas.addEventListener("touchstart", TouchManager.touchstart);
            canvas.addEventListener("touchend", TouchManager.touchend);
            canvas.addEventListener("touchmove", TouchManager.touchmove);
            TouchManager._cvs = canvas;
        }
        static setUIManager(uIManager) {
            TouchManager._uIManager = uIManager;
        }
        static touchstart(event) {
            event.preventDefault();
            event.stopPropagation();
            let cvsSize = TouchManager._cvs.getBoundingClientRect();
            let ratioX = TouchManager._cvs.width / cvsSize.width;
            let ratioY = TouchManager._cvs.height / cvsSize.height;
            let x = (event.touches[0].clientX - cvsSize.left) * ratioX;
            let y = (event.touches[0].clientY - cvsSize.top) * ratioY;
            let point = new Game.Point(x, y);
            if (TouchManager._uIManager !== undefined && TouchManager._uIManager !== null) {
                TouchManager._uIManager.onMouseDown(point);
            }
        }
        static touchend(event) {
            event.preventDefault();
            event.stopPropagation();
            let cvsSize = TouchManager._cvs.getBoundingClientRect();
            let ratioX = TouchManager._cvs.width / cvsSize.width;
            let ratioY = TouchManager._cvs.height / cvsSize.height;
            let x = (event.changedTouches[0].clientX - cvsSize.left) * ratioX;
            let y = (event.changedTouches[0].clientY - cvsSize.top) * ratioY;
            let point = new Game.Point(x, y);
            if (TouchManager._uIManager !== undefined && TouchManager._uIManager !== null) {
                TouchManager._uIManager.onMouseUp(point);
            }
        }
        static touchmove(event) {
            event.preventDefault();
            event.stopPropagation();
            let cvsSize = TouchManager._cvs.getBoundingClientRect();
            let ratioX = TouchManager._cvs.width / cvsSize.width;
            let ratioY = TouchManager._cvs.height / cvsSize.height;
            let x = (event.touches[0].clientX - cvsSize.left) * ratioX;
            let y = (event.touches[0].clientY - cvsSize.top) * ratioY;
            let point = new Game.Point(x, y);
            if (TouchManager._uIManager !== undefined && TouchManager._uIManager !== null) {
                TouchManager._uIManager.onMouseMove(point);
            }
        }
    }
    Game.TouchManager = TouchManager;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Popup {
        constructor(world) {
            this.x = 683;
            this.y = 384;
            this.speed = 5;
            this.dimX = 0;
            this.dimY = 0;
            this.isShow = false;
            this.totalTime = 0;
            this.isUpdating = false;
            this._world = world;
        }
        showPopup(image) {
            this.image = image;
            this.width = image.width;
            this.height = image.height;
            this.isShow = true;
            this.isUpdating = true;
            this.startTime = performance.now();
            this._world.disableMouse();
        }
        update() {
            if (!this.isUpdating) {
                return;
            }
            let endTime = performance.now();
            let delta = endTime - this.startTime;
            this.totalTime += delta;
            if (this.totalTime > 30) {
                this.dimX += this.speed;
                this.dimY += this.speed;
                this.totalTime = 0;
                if (this.dimX >= this.width) {
                    this.isUpdating = false;
                    setTimeout(() => {
                        this.dimX = 0;
                        this.dimY = 0;
                        this.isShow = false;
                        this._world.enableMouse();
                    }, 500);
                }
            }
            this.startTime = endTime;
        }
        render() {
            if (this.isShow) {
                Game.ctx.save();
                Game.ctx.drawImage(this.image, this.x - this.dimX / 2, this.y - this.dimY / 2, this.dimX, this.dimY);
                Game.ctx.restore();
            }
        }
    }
    Game.Popup = Popup;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class CurvedRect {
        constructor(x, y, width, height) {
            this.borderRadius = 22;
            this.color = "#000000";
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        contains(x, y) {
            let centerX = this.x + this.width / 2;
            let centerY = this.y + this.height / 2;
            if (Math.abs(centerX - x) < this.width / 2 && Math.abs(centerY - y) < this.height / 2) {
                if (dist(x, y, this.x + this.borderRadius, this.y + this.borderRadius) < this.borderRadius) {
                    return true;
                }
                else if ((dist(x, y, this.x + this.width - this.borderRadius, this.y + this.borderRadius) < this.borderRadius)) {
                    return true;
                }
                else if ((dist(x, y, this.x + this.width - this.borderRadius, this.y + this.height - this.borderRadius) < this.borderRadius)) {
                    return true;
                }
                else if ((dist(x, y, this.x + this.borderRadius, this.y + this.height - this.borderRadius) < this.borderRadius)) {
                    return true;
                }
                else {
                    console.log("retrun");
                    return false;
                }
            }
            else {
                return false;
            }
        }
        update() {
        }
        render() {
            Game.ctx.save();
            Game.ctx.fillStyle = this.color;
            Game.ctx.beginPath();
            Game.ctx.moveTo(this.x, this.y + this.borderRadius);
            Game.ctx.quadraticCurveTo(this.x, this.y, this.x + this.borderRadius, this.y);
            Game.ctx.lineTo(this.x + this.width - this.borderRadius, this.y);
            Game.ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + this.borderRadius);
            Game.ctx.lineTo(this.x + this.width, this.y + this.height - this.borderRadius);
            Game.ctx.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - this.borderRadius, this.y + this.height);
            Game.ctx.lineTo(this.x + this.borderRadius, this.y + this.height);
            Game.ctx.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - this.borderRadius);
            Game.ctx.lineTo(this.x, this.y - this.borderRadius);
            Game.ctx.closePath();
            Game.ctx.fill();
            Game.ctx.restore();
        }
    }
    Game.CurvedRect = CurvedRect;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Ellipse {
        constructor(x, y, rX, rY) {
            this.rotate = 0;
            this.x = x;
            this.y = y;
            this.rX = rX;
            this.rY = rY;
        }
        contains(x, y) {
            let leftEquation = (x - this.x) * Math.cos(this.rotate) + (y - this.y) * Math.sin(this.rotate);
            let rightEuqation = (x - this.x) * Math.sin(this.rotate) - (y - this.y) * Math.cos(this.rotate);
            let leftValue = Math.pow(leftEquation, 2) / Math.pow(this.rX, 2);
            let rightValue = Math.pow(rightEuqation, 2) / Math.pow(this.rY, 2);
            return leftValue + rightValue <= 1;
        }
        render() {
            Game.ctx.save();
            Game.ctx.beginPath();
            Game.ctx.ellipse(this.x, this.y, this.rX, this.rY, this.rotate, 0, Math.PI * 2, false);
            Game.ctx.fill();
            Game.ctx.closePath();
            Game.ctx.restore();
        }
    }
    Game.Ellipse = Ellipse;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Line {
        constructor(x1, y1, x2, y2) {
            this.isHor = false;
            this.point1 = new Game.Point(x1, y1);
            this.point2 = new Game.Point(x2, y2);
            this.offset = new Game.Point(x2 - x1, y2 - y1 - 10);
        }
        get len() {
            return this.point1.dist(this.point2.x, this.point2.y);
        }
        contain(x, y) {
            let AC = { x: x - this.point1.x, y: y - this.point1.y };
            let AB = { x: this.point2.x - this.point1.x, y: this.point2.y - this.point1.y };
            let Kac = AB.x * AC.x + AB.y * AC.y;
            let Kab = AB.x * AB.x + AB.y * AB.y;
            if (0 <= Kac && Kac <= Kab) {
                return true;
            }
            return false;
        }
        update() {
        }
        render() {
            Game.ctx.save();
            Game.ctx.beginPath();
            Game.ctx.moveTo(this.point1.x, this.point1.y);
            Game.ctx.lineTo(this.point2.x, this.point2.y);
            Game.ctx.closePath();
            Game.ctx.stroke();
            Game.ctx.restore();
        }
    }
    Game.Line = Line;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        dist(x, y) {
            return Math.sqrt(Math.pow((this.x - x), 2) + Math.pow((this.y - y), 2));
        }
        update() {
        }
        render() {
        }
    }
    Game.Point = Point;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Triangle {
        constructor(x1, y1, x2, y2, x3, y3) {
            this.color = "orange";
            this.pointA = new Game.Point(x1, y1);
            this.pointB = new Game.Point(x2, y2);
            this.pointC = new Game.Point(x3, y3);
            this.area = this.getArea(this.pointA, this.pointB, this.pointC);
        }
        contains(x, y) {
            let Area1 = (x - this.pointB.x) * (this.pointA.y - this.pointB.y) - (this.pointA.x - this.pointB.x) * (y - this.pointB.y);
            let Area3 = (x - this.pointC.x) * (this.pointB.y - this.pointC.y) - (this.pointB.x - this.pointC.x) * (y - this.pointC.y);
            let Area2 = (x - this.pointA.x) * (this.pointC.y - this.pointA.y) - (this.pointC.x - this.pointA.x) * (y - this.pointA.y);
            let has_pos = (Area1 > 0 || Area2 > 0 || Area3 > 0);
            let has_neg = (Area1 < 0 || Area2 < 0 || Area3 < 0);
            if (has_neg && has_pos) {
                return false;
            }
            else {
                return true;
            }
        }
        getArea(pt1, pt2, pt3) {
            let area = (pt1.x - pt3.x) * (pt2.y - pt3.y) - (pt2.x - pt3.x) * (pt1.y - pt3.y);
            return Math.abs(area / 2);
        }
        update() {
        }
        render() {
            Game.ctx.save();
            Game.ctx.fillStyle = this.color;
            Game.ctx.beginPath();
            Game.ctx.moveTo(this.pointA.x, this.pointA.y);
            Game.ctx.lineTo(this.pointB.x, this.pointB.y);
            Game.ctx.lineTo(this.pointC.x, this.pointC.y);
            Game.ctx.closePath();
            Game.ctx.fill();
            Game.ctx.restore();
        }
    }
    Game.Triangle = Triangle;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class GameOver {
        constructor(world) {
            this.startTime = 0;
            this.totalTime = 0;
            this.posX = 252;
            this.posY = -680;
            this.isAnimating = true;
            this.world = world;
            this.playAgain = new Game.UIButton(600, 440, { type: "rectangle", width: 120, height: 120 });
            this.playAgain.onClick = () => {
                this.posY = -680;
                this.isAnimating = true;
                this.resetGame();
            };
            this.uIManager = new Game.UIManager();
            this.uIManager.addManagers(this.playAgain);
        }
        resetGame() {
            this.world.gameState.resetGame();
            Game.currentState = this.world.gameState;
            Game.currentState.setup();
            Game.score = 0;
            Game.Timer.min = 5;
            Game.Timer.sec = 0;
            Game.Timer.start();
        }
        setup() {
            Game.MouseManager.setUIManager(this.uIManager);
            Game.TouchManager.setUIManager(this.uIManager);
        }
        update() {
            this.uIManager.update();
            let endTime = performance.now();
            let delta = endTime - this.startTime;
            this.totalTime += delta;
            if (this.totalTime > 1000) {
                this.totalTime = 0;
            }
            if (this.isAnimating) {
                this.posY += 8;
                if (this.posY >= 44) {
                    this.isAnimating = false;
                    this.posY = 44;
                }
            }
            this.startTime = endTime;
        }
        render() {
            this.world.gameState.render();
            Game.ctx.save();
            if (!this.isAnimating) {
                Game.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
                Game.ctx.fillRect(0, 0, game.width, game.height);
            }
            Game.ctx.drawImage(Game.AssetManager.pictures["over"].image, this.posX, this.posY);
            Game.ctx.textAlign = "center";
            Game.ctx.textBaseline = "middle";
            Game.ctx.font = "bold 80px arial";
            Game.ctx.fillStyle = "white";
            Game.ctx.fillText(`${Game.score}`, this.posX + 480, this.posY + 280);
            Game.ctx.restore();
            if (!this.isAnimating) {
                this.uIManager.render();
            }
        }
    }
    Game.GameOver = GameOver;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class GameState {
        constructor(world) {
            this.boardDim = 4;
            this.uIManager = new Game.UIManager();
            this.board = new Game.Board(this.boardDim);
            this.buttonManager = new Game.ButtonManager();
            this.uIManager.addManagers(this.board);
            this.uIManager.addManagers(this.buttonManager);
            this.setButtons();
        }
        setup() {
            Game.MouseManager.setUIManager(this.uIManager);
            Game.TouchManager.setUIManager(this.uIManager);
        }
        resetGame() {
        }
        setButtons() {
            let checkBtn = new Game.UIButton(1000, 224.6, { type: "rectangle", width: 143, height: 47 });
            checkBtn.text = "Check";
            checkBtn.textStyle.align = "center";
            checkBtn.textStyle.baseline = "middle";
            checkBtn.textStyle.size = "25px";
            checkBtn.textStyle.color = "white";
            checkBtn.background = Game.AssetManager.pictures["btn_format"].image;
            checkBtn.onClick = () => {
                this.boardSolution = new Game.BoardSoultion(this.board.getBoxes, this.boardDim);
                this.boardSolution.idaSolution();
            };
            let resetBtn = new Game.UIButton(1000, 496.3, { type: "rectangle", width: 143, height: 47 });
            resetBtn.text = "reset";
            resetBtn.textStyle.align = "center";
            resetBtn.textStyle.baseline = "middle";
            resetBtn.textStyle.size = "25px";
            resetBtn.textStyle.color = "white";
            resetBtn.background = Game.AssetManager.pictures["btn_format"].image;
            resetBtn.onClick = () => {
                this.board.resetNumbers();
            };
            let solveBtn = new Game.UIButton(1000, 300, { type: "rectangle", width: 143, height: 47 });
            solveBtn.text = "solve";
            solveBtn.textStyle.align = "center";
            solveBtn.textStyle.baseline = "middle";
            solveBtn.textStyle.size = "25px";
            solveBtn.textStyle.color = "white";
            solveBtn.background = Game.AssetManager.pictures["btn_format"].image;
            solveBtn.onClick = () => {
                this.boardSolution = new Game.BoardSoultion(this.board.getBoxes, this.boardDim);
                this.boardSolution.solution();
            };
            let showSolution = new Game.UIButton(1000, 400, { type: "rectangle", width: 143, height: 47 });
            showSolution.text = "show sol";
            showSolution.textStyle.align = "center";
            showSolution.textStyle.baseline = "middle";
            showSolution.textStyle.size = "25px";
            showSolution.textStyle.color = "white";
            showSolution.background = Game.AssetManager.pictures["btn_format"].image;
            showSolution.onClick = () => {
                if (this.boardSolution.solutionNodes.length !== 0) {
                    this.viewSolution(this.boardSolution.solutionNodes);
                }
                else {
                    console.log("not solved yet");
                }
                ;
            };
            this.buttonManager.addButton(checkBtn);
            this.buttonManager.addButton(resetBtn);
            this.buttonManager.addButton(solveBtn);
            this.buttonManager.addButton(showSolution);
        }
        viewSolution(solutionNodes) {
            let num = 0;
            let interval = setInterval(() => {
                num++;
                this.board.setBoxNum(solutionNodes[num].boxes);
                console.log(num, solutionNodes.length);
                if (num === solutionNodes.length - 1) {
                    clearInterval(interval);
                }
            }, 500);
        }
        checkAnswer() {
        }
        update() {
            this.board.update();
            this.buttonManager.update();
        }
        render() {
            Game.ctx.clearRect(0, 0, Game.cvs.width, Game.cvs.height);
            Game.ctx.save();
            Game.ctx.fillStyle = "#a1e4b9";
            Game.ctx.fillRect(0, 0, Game.cvs.width, Game.cvs.height);
            Game.ctx.restore();
            this.uIManager.render();
            this.board.render();
            this.buttonManager.render();
        }
    }
    Game.GameState = GameState;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class MenuState {
        constructor(world) {
            this.uIManager = new Game.UIManager();
            this.playButton = new Game.UIButton(600, 400, { type: "rectangle", height: 100, width: 100 });
            this.playButton.text = "Play";
            this.playButton.textStyle.size = "25px";
            this.playButton.textStyle.align = "center";
            this.playButton.onClick = () => {
                console.log('worskdfjklsdjf ');
            };
            this.uIManager.addManagers(this.playButton);
        }
        setup() {
            Game.MouseManager.setUIManager(this.uIManager);
            Game.TouchManager.setUIManager(this.uIManager);
        }
        update() {
        }
        render() {
            Game.ctx.drawImage(Game.AssetManager.pictures["front"].image, 0, 0, game.width, game.height);
            this.uIManager.render();
        }
    }
    Game.MenuState = MenuState;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class Timer {
        static start() {
            Timer.running = true;
            Timer.timer = setInterval(() => {
                if (Timer.sec == 0) {
                    Timer.min--;
                    Timer.sec = 59;
                }
                else {
                    Timer.sec--;
                }
                if (Timer.sec === 0 && Timer.min === 0) {
                    Timer.stop();
                }
            }, 1000);
        }
        static stop() {
            Timer.running = false;
            clearInterval(Timer.timer);
        }
        static pause() {
            clearInterval(Timer.timer);
        }
    }
    Timer.min = 5;
    Timer.sec = 0;
    Timer.running = false;
    Game.Timer = Timer;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class UIManager {
        constructor() {
            this._managers = [];
        }
        addManagers(manager) {
            this._managers.push(manager);
        }
        removeManager(manager) {
            let index = this._managers.indexOf(manager);
            if (index !== -1) {
                this._managers.splice(index, 1);
            }
        }
        onMouseDown(point) {
            for (let m of this._managers) {
                m.onMouseDown(point);
            }
        }
        ;
        onMouseUp(point) {
            for (let m of this._managers) {
                m.onMouseUp(point);
            }
        }
        ;
        onMouseMove(point) {
            for (let m of this._managers) {
                m.onMouseMove(point);
            }
        }
        update() {
            for (let m of this._managers) {
                m.update();
            }
        }
        render() {
            for (let m of this._managers) {
                m.render();
            }
        }
    }
    Game.UIManager = UIManager;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class UIObject {
        constructor(x, y, { type, width, height, radius }) {
            this.textStyle = {
                color: "black",
                font: "arial",
                size: "14px",
                weight: "normal",
                align: "start",
                baseline: "alphabetic"
            };
            this._x = x;
            this._y = y;
            if (type === "rectangle") {
                if (width == undefined || height == undefined) {
                    throw new Error('width and height must be defined for rectangular object');
                }
                this._width = width;
                this._height = height;
                this._shape = new Game.Rectangle(x, y, width, height);
                this._shpaeOffset = new Game.Point(0, 0);
            }
            else if (type === "circle") {
                if (radius == undefined) {
                    throw new Error('radius must be defined for circular object');
                }
                this._width = radius * 2;
                this._height = radius * 2;
                this._shape = new Game.Circle(x + radius, y + radius, radius);
                this._shpaeOffset = new Game.Point(radius, radius);
            }
        }
        get hover() {
            return this._hover;
        }
    }
    Game.UIObject = UIObject;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class ButtonManager {
        constructor() {
            this._buttons = [];
        }
        addButton(button) {
            this._buttons.push(button);
        }
        onMouseDown(point) {
            for (let u of this._buttons) {
                u.onMouseDown(point);
            }
        }
        ;
        onMouseUp(point) {
            for (let u of this._buttons) {
                u.onMouseUp(point);
            }
        }
        ;
        onMouseMove(point) {
            for (let u of this._buttons) {
                u.onMouseMove(point);
            }
        }
        update() {
            for (let b of this._buttons) {
                b.update();
                if (b.hover) {
                    break;
                }
            }
        }
        render() {
            for (let b of this._buttons) {
                b.render();
            }
        }
    }
    Game.ButtonManager = ButtonManager;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class UIButton extends Game.UIObject {
        constructor(x, y, { type, width, height, radius }) {
            super(x, y, { type, width, height, radius });
            this.translate = new Game.Point(4, 4);
            this.cursor = "pointer";
            this.onClick = () => { };
            this._pressed = false;
            this.background = undefined;
            this._iniX = x;
            this._iniY = y;
        }
        onMouseDown(point) {
            if (this._shape.contains(point.x, point.y)) {
                this._x += this.translate.x;
                this._y += this.translate.y;
                this._pressed = true;
            }
        }
        onMouseUp(point) {
            if (this._shape.contains(point.x, point.y)) {
                if (this._pressed) {
                    this.onClick();
                }
            }
            this._pressed = false;
            this._x = this._iniX;
            this._y = this._iniY;
        }
        onMouseMove(point) {
            if (this._shape.contains(point.x, point.y)) {
                this._hover = true;
            }
            else {
                this._hover = false;
            }
        }
        update() {
            if (this._hover) {
                Game.cvs.style.cursor = this.cursor;
            }
            else {
                Game.cvs.style.cursor = "auto";
            }
        }
        render() {
            Game.ctx.save();
            if (this.background !== undefined) {
                Game.ctx.drawImage(this.background, this._x, this._y, this._width, this._height);
            }
            if (this.text !== undefined) {
                Game.ctx.fillStyle = this.textStyle.color;
                Game.ctx.font = `${this.textStyle.weight} ${this.textStyle.size} ${this.textStyle.font}`;
                Game.ctx.textAlign = this.textStyle.align;
                Game.ctx.textBaseline = this.textStyle.baseline;
                Game.ctx.fillText(this.text, this._x + this._width / 2, this._y + this._height / 2);
            }
            Game.ctx.restore();
        }
    }
    Game.UIButton = UIButton;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class DraggableObjectManager {
        constructor() {
            this._draggableObjects = [];
        }
        get draggableObjects() {
            return this._draggableObjects;
        }
        set draggableObjects(value) {
            this._draggableObjects = value;
        }
        addDraggableObject(draggableObject) {
            this._draggableObjects.push(draggableObject);
        }
        removeDraggableObject(draggableObject) {
            let index = this._draggableObjects.indexOf(draggableObject);
            if (index !== -1) {
                this._draggableObjects.splice(index, 1);
            }
            else {
                console.warn(`${draggableObject} is not found`);
            }
        }
        onMouseDown(point) {
            for (let u of this._draggableObjects) {
                u.onMouseDown(point);
                if (u.dargable) {
                    break;
                }
            }
        }
        ;
        onMouseUp(point) {
            for (let u of this._draggableObjects) {
                u.onMouseUp(point);
            }
        }
        ;
        onMouseMove(point) {
            for (let u of this._draggableObjects) {
                u.onMouseMove(point);
            }
        }
        update() {
            for (let b of this._draggableObjects) {
                b.update();
                if (b.hover) {
                    break;
                }
            }
        }
        render() {
            for (let b of this._draggableObjects) {
                if (!b.dargable) {
                    b.render();
                }
            }
            for (let b of this._draggableObjects) {
                if (b.dargable) {
                    b.render();
                }
            }
        }
    }
    Game.DraggableObjectManager = DraggableObjectManager;
})(Game || (Game = {}));
var Game;
(function (Game) {
    class UIDraggableObject extends Game.UIObject {
        constructor(x, y, { type, width, height, radius }) {
            super(x, y, { type, width, height, radius });
            this.cursor = "auto";
            this.onDrop = undefined;
            this._dargable = false;
            this.background = undefined;
            this._iniX = x;
            this._iniY = y;
        }
        get dargable() {
            return this._dargable;
        }
        get x() {
            return this._x;
        }
        set x(val) {
            this._x = val;
        }
        get y() {
            return this._y;
        }
        set y(val) {
            this._y = val;
        }
        get width() {
            return this._width;
        }
        get height() {
            return this._height;
        }
        moveBack() {
            this._x = this._iniX;
            this._y = this._iniY;
            this._shape.x = this._x + this._shpaeOffset.x;
            this._shape.y = this._y + this._shpaeOffset.y;
        }
        onMouseDown(point) {
            if (this._shape.contains(point.x, point.y)) {
                this._dargable = true;
            }
        }
        onMouseMove(point) {
            if (this._dargable) {
                this._x = point.x - this._width / 2;
                this._y = point.y - this._height / 2;
                this._shape.x = this._x + this._shpaeOffset.x;
                this._shape.y = this._y + this._shpaeOffset.y;
            }
            if (this._shape.contains(point.x, point.y)) {
                this._hover = true;
            }
            else {
                this._hover = false;
            }
        }
        onMouseUp(point) {
            if (this._shape.contains(point.x, point.y)) {
            }
            if (this._dargable) {
                if (this.onDrop !== undefined) {
                    this.onDrop(point);
                }
                this._dargable = false;
            }
        }
        update() {
            if (this._hover) {
                Game.cvs.style.cursor = this.cursor;
            }
        }
        render() {
            Game.ctx.save();
            if (this.background !== undefined) {
                Game.ctx.drawImage(this.background, this._x, this._y, this._width, this._height);
            }
            if (this.text !== undefined) {
                Game.ctx.fillStyle = this.textStyle.color;
                Game.ctx.font = `${this.textStyle.weight} ${this.textStyle.size} ${this.textStyle.font}`;
                Game.ctx.textAlign = this.textStyle.align;
                Game.ctx.textBaseline = this.textStyle.baseline;
                Game.ctx.fillText(this.text, this._x + this._width / 2, this._y + this._height / 2);
            }
            Game.ctx.restore();
        }
    }
    Game.UIDraggableObject = UIDraggableObject;
})(Game || (Game = {}));
var Game;
(function (Game) {
    Game.score = 0;
    class World {
        constructor(engine) {
            this.engine = engine;
            this.gameState = new Game.GameState(this);
            this.menuState = new Game.MenuState(this);
            this.gameOver = new Game.GameOver(this);
            Game.currentState = this.gameState;
            Game.currentState.setup();
        }
        disableMouse() {
            Game.MouseManager.setUIManager(undefined);
            Game.TouchManager.setUIManager(undefined);
        }
        enableMouse() {
            Game.currentState.setup();
        }
        update() {
            Game.currentState.update();
        }
        render() {
            Game.currentState.render();
        }
    }
    Game.World = World;
})(Game || (Game = {}));
let game = new Game.Engine(1366, 768);
window.onload = () => {
    document.getElementById("loading_screen").style.display = "none";
    game.start("canvas");
    game.resize();
};
window.onresize = () => {
    game.resize();
};
//# sourceMappingURL=game.js.map
/*-----------> random integer genrator function <----------------*/
function randomInt(a, b):number {
    if (a > b) {
        throw Error(`${a} should be less than ${b}`);
       
    }
    else {
        let totalNumber = b - a + 1;
        let x = Math.floor(Math.random() * totalNumber + a);
        return x;
    }
}

/*-----------> random integer array genrator function <----------------*/

function randomIntArray(a:number, b:number):Array<number> {
  if (a > b) {
      throw Error(`${a} should be less than ${b}`);
    
  } else {
    let array = [];
    let totalNumber = b-a+1;
    for(let i=0; i<totalNumber; i++) {
      let randomNum = randomInt(a, b);
      for(let j=0; j<array.length; j++) {
        if(randomNum==array[j]) {
          randomNum = randomInt(a, b);
          j=-1;
        }
      }
      array.push(randomNum);
    }
    return array;
  }
}

/*-----------> random integer array genrator function within certaing rang and with certain number<----------------*/
function ranIntArrayInRange(num:number,  range:Array<number>):Array<number> {
    if(num > (range[1]-range[0])) {
      throw Error(`${num} should be less than the range of numbers`);
    
    } else {
      let array = [];
      for(let i=0; i<num; i++){
        let randomNum = randomInt(range[0], range[1]);
        for(let j=0; j<array.length; j++){
          if(randomNum == array[j]) {
            randomNum = randomInt(range[0], range[1]);
            j=-1;
          }
        }
        array.push(randomNum);
      }
      return array;
    }
  }

/*------------------> Function for make a 2D array<------------------*/ 

function TwoDArray(row:number, column:number):Array<Array<any>> {
  this.row = row;
  this.coloumn = column;
  let array = new Array(row);
      for(let j=0; j<row; j++) {
        array[j] = new Array(column);  
    }
    return array;
}

// let k = new Array(6).reduce(5, 5);
  /*-----------> distance between two points function <----------------*/
  function dist(x1:number,  y1:number, x2:number, y2:number):number{
    return Math.sqrt(Math.pow((x2-x1), 2)+ Math.pow((y2-y1), 2));
  } 

  /*-----------> full Screen function <----------------*/
  function fullScreen(game:HTMLElement) {
    let isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) 
    if(!isInFullScreen) {
      if (game.requestFullscreen) {
        game.requestFullscreen();
      }
      // }  else if (game.mozRequestFullScreen) { /* Firefox */
      //   game.mozRequestFullScreen();
      // } else if (game.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      //   game.webkitRequestFullscreen();
      // } else if (game.msRequestFullscreen) { /* IE/Edge */
      //   game.msRequestFullscreen();
      // }
    };
  };

/*------------------> Function for click an element in canvas <------------------*/
interface ClickBox {
  x:number,
  y:number,
  width:number,
  height:number,
}
function click(cvs:HTMLCanvasElement, box:ClickBox, checkFunction?:Function):void{
  let status:boolean = false;
  let out:boolean =true;
  cvs.addEventListener('mousedown', mousedown);
  function mousedown(event:MouseEvent) {
      event.preventDefault();
      event.stopPropagation();
      let cvsSize: ClientRect = cvs.getBoundingClientRect();
      let ratioX: number = cvs.width / cvsSize.width;
      let ratioY: number = cvs.height / cvsSize.height;
      let x: number = (event.x - cvsSize.left) * ratioX;
      let y: number = (event.y - cvsSize.top) * ratioY;
      let boxXCenter = box.x+box.width/2;
      let boxYCenter = box.y+ box.height/2;
      if(Math.abs(x-boxXCenter)<box.width/2 && Math.abs(y-boxYCenter)<box.height/2) {
          status = true;
          box.x = box.x+4;
          box.y = box.y+4;
      }
  }
  cvs.addEventListener('mousemove', mousemove); 
  function mousemove(event:MouseEvent){

    event.preventDefault();
    event.stopPropagation();
    
    let cvsSize: ClientRect = cvs.getBoundingClientRect();
    let ratioX: number = cvs.width / cvsSize.width;
    let ratioY: number = cvs.height / cvsSize.height;
    let x: number = (event.x - cvsSize.left) * ratioX;
    let y: number = (event.y - cvsSize.top) * ratioY;
    let boxXCenter = box.x+box.width/2;
    let boxYCenter = box.y+ box.height/2;
    if(Math.abs(x-boxXCenter)<box.width/2 && Math.abs(y-boxYCenter)<box.height/2) {
      cvs.style.cursor = 'pointer';   
      out = false;
    } else {
      if(!out) {
        cvs.style.cursor = 'auto';   
        out= true;
      }
    }
  }
  cvs.addEventListener('mouseup', mouseup);
  function mouseup() {
    if(status) {
        box.x = box.x-4;
        box.y = box.y-4;
        status = false;
        if(checkFunction!==undefined) {
          checkFunction();
        }
    }
  }
}

/*------------------> Function for click an element in canvas for touch screen<------------------*/

function touchClick(cvs:HTMLCanvasElement, box):void{
    let status:boolean = false;
    cvs.addEventListener('touchstart', touchstart);
    function touchstart(event) {
        event.preventDefault();
        event.stopPropagation();
        let cvsSize: ClientRect = cvs.getBoundingClientRect();
        let ratioX: number = cvs.width / cvsSize.width;
        let ratioY: number = cvs.height / cvsSize.height;
        let x: number = (event.x - cvsSize.left) * ratioX;
        let y: number = (event.y - cvsSize.top) * ratioY;
        let boxXCenter:number = box.x+box.length/2;
        let boxYCenter:number = box.y+ box.width/2;
        if(Math.abs(x-boxXCenter)<box.length/2 && Math.abs(y-boxYCenter)<box.width/2) {
            status = true;
            box.x = box.x+4;
            box.y = box.y+4;
        }
        
    }
    cvs.addEventListener('touchend', touchend);
    function touchend() {
        if(status) {
            box.x = box.x-4;
            box.y = box.y-4;
        }
        status = false;
        
    }
  }
/*------------------> Function for check point inside a box<------------------*/
function pointInBox(x:number, y:number, box:ClickBox):boolean {
  let boxXCenter = box.x+box.width/2;
  let boxYCenter = box.y+ box.height/2;
  if(Math.abs(x-boxXCenter)<box.width/2 && Math.abs(y-boxYCenter)<box.height/2) {
    return true;
  } else {
    return false;
  }
}
/*------------------> Function for check point inside an ellipse<------------------*/
interface ellipse {
  x:number,
  y:number,
  rX:number,
  rY:number,
  rotate:number
}
function pointInEllipse(x:number, y:number, ellipse:ellipse) {
  // let leftValue = Math.pow((x-ellipse.x), 2)/Math.pow(ellipse.rX, 2);
  // let rightValue = Math.pow((y-ellipse.y), 2)/Math.pow(ellipse.rY, 2);
  // if(leftValue+rightValue>1) {
  //   return false;
  // } else {
  //   return true;
  // }
  let leftSimplication = (x-ellipse.x)*Math.cos(ellipse.rotate)+(y-ellipse.y)*Math.sin(ellipse.rotate);
  let rightSimplication = (x-ellipse.x)*Math.sin(ellipse.rotate)-(y-ellipse.y)*Math.cos(ellipse.rotate);
  let leftValue = Math.pow(leftSimplication, 2)/Math.pow(ellipse.rX, 2);
  let rightValue = Math.pow(rightSimplication, 2)/Math.pow(ellipse.rY, 2);
  return leftValue+rightValue<=1;

}


/*------------------> Function for Getting time<------------------*/
interface timerInterface {
  minutes:number,
  seconds:number,
}
function timer(min:number, sec:number):timerInterface {
  if(sec==0) {
    min--;
    sec=59
  } else {
    sec--;
  }
  return {
    minutes:min,
    seconds:sec,
  }
} 
/*------------------> Function for rotate object around given points<------------------*/
function rotate(ctx:CanvasRenderingContext2D, x:number, y:number, angle:number) {
  let rAngel = angle*Math.PI/180;
  ctx.translate(x, y);
  ctx.rotate(rAngel);
}

/*------------------> Function for make a star<------------------*/

function star(ctx:CanvasRenderingContext2D, x:number, y:number, r1:number, r2:number, color:string):void {
    let angle = 36*Math.PI/180;
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(r1*Math.cos(0), r1*Math.sin(0))
    for(let i=0; i<10; i++) {
      if(i%2==0) {
        ctx.lineTo(r2*Math.cos(angle*(i+1)), r2*Math.sin(angle*(i+1)));
      } else {
        ctx.lineTo(r1*Math.cos(angle*(i+1)), r1*Math.sin(angle*(i+1)));
      }
    }
    ctx.fillStyle = color;
    // ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

/*------------------> Function to get the point on canvas<------------------*/

function pointOncanvas(cvs:HTMLCanvasElement, event:MouseEvent) {
  let cvsSize = cvs.getBoundingClientRect();
  let ratioX = cvs.width/cvsSize.width;
  let ratioY = cvs.height/cvsSize.height;
  let x = (event.clientX - cvsSize.left)*ratioX;
  let y = (event.clientY - cvsSize.top)*ratioY;
  return {
    x:x,
    y:y,
  }
}
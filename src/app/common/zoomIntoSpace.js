import {Ion} from '../vendor/ion';
import {generateInvader} from './generateInvader';

export function zoomIntoSpace(){
  let zoomIntoSpace = new Ion(40),
      startingXLocations = [],
      startingYLocations = [];

  for(let x=0;x<10;x++){
    for(let y=0;y<5;y++){
      let dx = Math.floor(x*v.w/3*2/8),
          dy = Math.floor(y*v.h/3*2/8);

      startingXLocations.push(dx);
      startingYLocations.push(dy);
    } //end for
  } //end for

  // Declare and initialize the scene
  zoomIntoSpace.startX = ()=> r(1, v.w, 1);
  zoomIntoSpace.startY = 15;
  zoomIntoSpace.endX = ()=> startingXLocations.pop();
  zoomIntoSpace.endY = ()=> startingYLocations.pop();
  zoomIntoSpace.windX = ()=> r(0.02)-0.01;
  zoomIntoSpace.windY = ()=> r(0.02)-0.01;
  zoomIntoSpace.image = ()=> generateInvader();
  zoomIntoSpace.imageWidth = 40;
  zoomIntoSpace.imageHeight = 40;
  zoomIntoSpace.tweenDuration = 100;
  zoomIntoSpace.tweenType = 'ease-out-circular';
  zoomIntoSpace.onEnd = (particle)=>{
    particle.startX = particle.endX;
    particle.startY = particle.endY;
    particle.tweenDuration = Infinity;
  };
  zoomIntoSpace.clear = ()=>{
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, v.w, v.h);
    ctx.font = '18px Courier New';
    ctx.fillStyle = 'rgb(255,255,0)';
    ctx.fillText(headerText, 5, v.h - 5);
  };
  zoomIntoSpace.populate();
  return zoomIntoSpace;
} //end zoomIntoSpace()

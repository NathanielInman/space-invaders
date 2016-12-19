import {Ion} from '../ion';

export function flame(name,parameters){
  let {startX,startY,width,height,color,quality} = parameters,
      flame = new Ion(2*(quality||100));

  startX = startX||0;
  startY = startY||0;
  width = width||20,
  height = height||100;
  flame.states = ['initial'];
  flame.clear = false;
  flame.color = color||'rgba(250,170,0,0.2)';
  flame.startX = ()=> this.camera.x+startX+r(0,width)-width/2;
  flame.startY = ()=> this.camera.y+startY;
  flame.endX = ()=> this.camera.x+startX;
  flame.endY = ()=> this.camera.y+startY-height;
  flame.windX = ()=> r(0,0.5)-0.25;
  flame.windY = ()=> r(0,2)-2;
  flame.tweenType = ()=> r(10,20,true);
  flame.tweenDuration = ()=> r(300,600,false);
  flame.onEscape = function onEscape(p){ this.onEnd(p); };
  flame.onEnd =  flame.reevaluate;
  flame.onMove = function onMove(particle){
    let size=(height+width)/4;

    // reset after we reach 15%
    if(particle.tweenCurrent>particle.tweenDuration*0.15){
      this.onEnd(particle);
    }else{
      particle.size=size-size/particle.tweenDuration*particle.tweenCurrent;
    } //end if
  };
  flame.populate();
  return flame;
} //end flame()

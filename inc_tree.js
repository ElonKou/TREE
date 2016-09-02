/**
 * Created by ElonKou on 2016/8/28.
 */


function getMousePos(event,canvas){
    var e = event ;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    return {
        x:x,
        y:y
    }
}

function www(e,canvas,info){
    var p  = getMousePos(e,canvas);
    info.innerHTML= "Position:"+p.x+","+ p.y;
}

//----------------------------------------------------------------


function cell(o){
    this.left = 1;
    this.right = 2;
    this.show = function(){
        for(var i=0;i<4;i++){
            this.push(o);
        }
        return this;
    }
}

//var o = new Object();
//
//console.log(new cell(o).show());


//--------------------------------------------------------------


function rand(start,range){
    return Math.round(Math.random()*range+start);
}

function randNum(start,range,num){
    var i;
    var a=[],arr=[];
    for(i=0;i<num/4+1;i++){
        arr += Math.random().toString().slice(2,num+2);
    }
    for(i=0;i<num;i++){
        a[i]=arr.slice(i*4,4*i+4);

        a[i] *=range*0.0001;
        a[i] +=start;
        a[i] = Math.round(a[i]);
    }

    console.log(a);
}




//--------------------------------------------------------------
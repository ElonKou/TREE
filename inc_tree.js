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

var id = 0;
function cell(arr,size_cell_info,lineWidth,num){
    //the cell start&end position
    this.id = id;
    id++;
    this.pos_all=[];
    this.pos_next = [];
    //this.angle = null;
    this.child_len = rand(1,num);
    this.ccc = [];

    var ang = (parseFloat(arr[2])+1.5708)/2;

    var angle_last = rand_float(ang-size_cell_info[2]/2,size_cell_info[2]);
    var size = rand(size_cell_info[0],size_cell_info[1]);
    var x = Math.round(size*Math.cos(angle_last));
    var y = Math.round(size*Math.sin(angle_last));

    this.pos_all[0]=arr[0];
    this.pos_all[1]=arr[1];
    this.pos_all[2]=x+arr[0];
    this.pos_all[3]=arr[1]-y;
    this.angle = angle_last.toFixed(2);


    for(var i = 0;i<this.child_len;i++){
        this.ccc[i]=null;
        //-------------------
        var ratio = rand_float(size_cell_info[3],size_cell_info[4]);
        var x_x = Math.round(size * ratio * Math.cos(angle_last));
        var y_y = Math.round(size * ratio * Math.sin(angle_last));
        this.pos_next.push([x_x+arr[0],arr[1]-y_y]);
        //-------------------
    }
    draw(this.pos_all,lineWidth);
    drawT(this.pos_all[2],this.pos_all[3],lineWidth+3);
}



function TREE_MAIN(){
    this.root = null;
    this.build = build;
}
//foreach
var time = 0;
function inOrder(node,lineWidth,num){
    //---------------------------------------------------------------------------------
    if(time>=500){
        return false;
    }
    time ++;
    var parent = node;
    var current;


    if(parent != null){
        for(var i = 0; i < parent.child_len;i++){
            current = parent.ccc[i];
            if(current == null){
                var ar =[parent.pos_next[i][0],parent.pos_next[i][1],parent.angle,parent.pos_all[0],parent.pos_all[1]];
                //console.log(ar);
                var no = new cell(ar,size_cell_info,lineWidth,num);
                parent.ccc[i] = no;
            }else{
                inOrder(current,lineWidth,num);
            }
        }
    }

}


function build(size_cell_info,lineWidth,num){
    if(this.root == null){
        var arr = [can_wid/2,can_hei,Math.PI/2,can_wid/2,can_hei];
        var n =  new cell(arr,size_cell_info,lineWidth,num);
        this.root = n;
    }else{
        var node = this.root;
        inOrder(node,lineWidth,num);
    }
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var can_wid = canvas.width;
var can_hei = canvas.height;

function draw(arr,ww){

    ctx.beginPath();

    //ctx.strokeStyle = radgrad_2;
    ctx.lineCap = 'round';
    ctx.lineWidth = ww;
    ctx.moveTo(arr[0],arr[1]);
    ctx.lineTo(arr[2],arr[3]);
    ctx.stroke();
}

function drawT(x,y,r){
    ctx.beginPath();

    //ctx.fillStyle = radgrad_1;
    ctx.moveTo(x,y);
    ctx.quadraticCurveTo(x-r,y-r,x-r,y-2*r);
    ctx.quadraticCurveTo(x-r,y-3*r,x,y-3*r);
    ctx.quadraticCurveTo(x+r,y-3*r,x+r,y-2*r);
    ctx.quadraticCurveTo(x+r,y-r,x,y);

    ctx.fill();
}


var size_start = 50;
var size_end = 150;
var angle_range = Math.PI/2;
var size_pos_start = 0.7;
var size_pos_end= 0.2;
var size_cell_info = [size_start,size_end,angle_range,size_pos_start,size_pos_end];

var tr = new TREE_MAIN();

var color_1 = "rgba("+(25*rand(0,10))+","+(25*rand(0,10))+","+(25*rand(0,10))+",1)";
var color_2 = "rgba("+(25*rand(0,10))+","+(25*rand(0,10))+","+(25*rand(0,10))+",0.8)";
//渐变
var radgrad_1 = randRad();
var radgrad_2 = randRad();



tr.build(size_cell_info,10,3);
tr.build(size_cell_info,8,3);
tr.build(size_cell_info,6,3);
tr.build(size_cell_info,5,3);
tr.build(size_cell_info,3,4);
tr.build(size_cell_info,1.2,2);
tr.build(size_cell_info,1,1);
console.log(tr);
//---------------------------------------------------------------

function randRad(){
    var rad = ctx.createRadialGradient(can_wid/2,can_hei,1,can_wid/2,can_hei,1200);
    rad.addColorStop(0,"rgba("+rand(0,255)+","+rand(0,255)+","+rand(0,255)+",0.8)");
    rad.addColorStop(0.5,"rgba("+rand(0,255)+","+rand(0,255)+","+rand(0,255)+",0.8)");
    rad.addColorStop(1,"rgba("+rand(0,255)+","+rand(0,255)+","+rand(0,255)+",0.8)");

    console.log("de");
    return rad;
}



function rand(start,range){
    return Math.round(Math.random()*range+start);
}
function rand_float(start,range){
    return Math.random()*range+start;
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

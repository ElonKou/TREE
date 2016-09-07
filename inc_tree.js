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


function cell(arr,size_cell_info){
    //the cell start&end position
    this.pos_all=[0,0,0,0];
    this.pos_next = [];
    this.angle = null;
    this.child_len = rand(0,4);
    this.ccc = [];
    for(var i = 0;i<this.child_len;i++){
        this.ccc[i]=null;
        buildInfo(this,arr,size_cell_info);
    }
}
function cau(){
    this.pos_all[2] = rand(this.pos_all[0],0);
}


//return Array contains new position of Cell
function buildInfo (obj,arr,size_cell_info){
    //new position

    var ang = (arr[2]+Math.PI/2)/2;
    var angle_last = rand_float(ang-size_cell_info[2]/2,size_cell_info[2]);
    var size = rand(size_cell_info[0],size_cell_info[1]);
    var x = Math.round(size*Math.cos(angle_last));
    var y = Math.round(size*Math.sin(angle_last));

    //set positon of cell
    obj.pos_all[0]=arr[0];
    obj.pos_all[1]=arr[1];
    obj.pos_all[2]=x+arr[0];
    obj.pos_all[3]=y+arr[1];

    obj.angle =angle_last.toFixed(2);

    for(var i=0;i<obj.child_len;i++){
        var ratio = rand_float(size_cell_info[3],size_cell_info[4]);
        var x_x = Math.round(size * ratio * Math.cos(angle_last));
        var y_y = Math.round(size * ratio * Math.sin(angle_last));
        obj.pos_next.push([x_x,y_y]);
    }

}

function TREE_MAIN(){
    this.root = null;
    this.build = build;
    //this.inOrder = inOrder;
}
//foreach
var time = 0;
function inOrder(parent){
    time ++;
    var current;
    for(var i = 0;i < parent.child_len;i++){
        current = parent.ccc[i];
        console.log("par:"+time+parent.angle);
        if(current != null){
            parent = current;
            inOrder(current);
        }else{
            for(var j=0;j < parent.child_len;j++){
                var arr =[parent.pos_next[j][0],parent.pos_next[j][1],parent.angle];
                var nn = new cell(arr,size_cell_info);
                parent.ccc[j] = nn;
            }
        }
    }
    //if(current != null){
    //    parent = current;
    //    for(var i = 0;i<parent.child_len;i++){
    //        current = parent.ccc[i];
    //        inOrder(parent.ccc[i],parent);
    //    }
    //}else{
    //    parent = current;
    //    for(var j=0;j < parent.child_len;j++){
    //        current = current.ccc[j];
    //        //if(current == null){
    //            var arr =[parent.pos_next[j][0],parent.pos_next[j][1],parent.angle];
    //            var nn = new cell(arr,size_cell_info);
    //            parent.ccc[j] = nn;
    //        //}
    //    }
    //
    //
    //}
}

function build(size_cell_info){
    if(this.root == null){
        arr = [540,300,Math.PI/2];
        var n =  new cell(arr,size_cell_info);
        this.root = n;
    }else{
        var parent = this.root;
        //var current = this.root;
        //var parent;

        inOrder(parent);

        //while(true){
        //    parent = current;
        //
        //    for(var i=0;i < parent.child_len;i++){
        //        current = current.ccc[i];
        //        if(current == null){
        //            //build arr info
        //            var arr =[parent.pos_next[i][0],parent.pos_next[i][1],parent.angle];
        //            n = new cell(arr,size_cell_info);
        //            parent.ccc[i] = n;
        //        }
        //    }
        //}
    }
}

var size_start = 30;
var size_end = 60;
var angle_range = Math.PI/6;
var size_pos_start = 0.8;
var size_pos_end= 0.2;
var size_cell_info = [size_start,size_end,angle_range,size_pos_start,size_pos_end];

var tr = new TREE_MAIN();

tr.build(size_cell_info);
//console.log(tr);
//tr.build(40,50,Math.PI/6,0.7,0.3);
//tr.build(30,60,Math.PI/6,0.8,0.2);
//tr.build(30,60,Math.PI/6,0.8,0.2);
//tr.build(30,60,Math.PI/6,0.8,0.2);
tr.build(30,60,Math.PI/6,0.8,0.2);
console.log(tr);
//---------------------------------------------------------------


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

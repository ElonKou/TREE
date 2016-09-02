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
    this.angle;
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
    var x =size*Math.cos(angle_last);
    var y =size*Math.sin(angle_last);

    //set positon of cell
    this.pos_all[0]=arr[0];
    this.pos_all[1]=arr[1];
    this.pos_all[2]=x+arr[0];
    this.pos_all[3]=y+arr[1];

}

function TREE_MAIN(){
    this.root = null;
    this.build = build;
}
function build(size_cell_info){
    if(this.root == null){
        //start_pos(x,y),length_strength(start,range)
        arr = [540,300];
        var n = new cell(arr,size_cell_info);
        this.root = n;
    }else{
        var current = this.root;
        var parent;
        while(true){
            parent = current;
            for(var i=0;i<parent.child_len;i++){
                current = current.ccc[i];
                //build arr info
                var arr =[parent.pos_next[i][0],parent.pos_next[i][1],parent.angle];
                n = new cell(arr,size_cell_info);
                if(current== null){
                    parent.ccc[i] =n;
                    break;
                }
            }
        }
    }
}

var angle_range = Math.PI/6;
var size_cell_info = [30,60,angle_range];
//--------------------------------------------------------------


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
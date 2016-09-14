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
function cell(arr,size_cell_info){
    //the cell start&end position
    this.id = id;
    id++;
    this.pos_all=[];
    this.pos_next = [];
    //this.angle = null;
    this.child_len = rand(1,3);
    this.ccc = [];

    var ang = (arr[2]+parseInt(Math.PI/2))/2;

    var angle_last = rand_float(ang-size_cell_info[2]/2,size_cell_info[2]);
    var size = rand(size_cell_info[0],size_cell_info[1]);
    var x = Math.round(size*Math.cos(angle_last));
    var y = Math.round(size*Math.sin(angle_last));

    this.pos_all[0]=arr[0];
    this.pos_all[1]=arr[1];
    this.pos_all[2]=x+arr[0];
    this.pos_all[3]=y+arr[1];
    this.angle = angle_last.toFixed(2);


    for(var i = 0;i<this.child_len;i++){
        this.ccc[i]=null;
        //-------------------
        var ratio = rand_float(size_cell_info[3],size_cell_info[4]);
        var x_x = Math.round(size * ratio * Math.cos(angle_last));
        var y_y = Math.round(size * ratio * Math.sin(angle_last));
        this.pos_next.push([x_x+arr[3],y_y+arr[4]]);
        //-------------------
    }
}



function TREE_MAIN(){
    this.root = null;
    this.build = build;
    //this.inOrder = inOrder;
}
//foreach
var time = 0;
function inOrder(node){
    //---------------------------------------------------------------------------------
    if(time>=40){
        return false;
    }
    time ++;
    var parent = node;
    var current;


    if(parent != null){
        for(var i = 0; i < parent.child_len;i++){
            current = parent.ccc[i];
            console.log("par_id:"+parent.id);
            if(current == null){
                console.log(parent);
                var ar =[parent.pos_next[i][0],parent.pos_next[i][1],parent.angle,parent.pos_all[0],parent.pos_all[1]];
                console.log(ar);
                var no = new cell(ar,size_cell_info);
                parent.ccc[i] = no;
                //current = no;
                //var n = new cell([33,34,Math.PI/2,99,99],size_cell_info);
                //parent.ccc[i] = n;
            }else{
                parent = current;
                inOrder(current);
            }
        }
    }

}

function build(size_cell_info){
    if(this.root == null){
        var arr = [540,300,Math.PI/2,540,340];
        var n =  new cell(arr,size_cell_info);
        this.root = n;
    }else{
        var node = this.root;
        console.log("---------------------------");
        inOrder(node);
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
tr.build(30,60,Math.PI/6,0.8,0.2);
tr.build(30,60,Math.PI/6,0.8,0.2);
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

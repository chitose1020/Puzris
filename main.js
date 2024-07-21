//--------------------const-------------------
//canvas
const main_canvas = document.getElementById("main_canvas");
const canvas_width = document.body.clientWidth;
const canvas_height = document.body.clientHeight;
main_canvas.width = canvas_width;
main_canvas.height = canvas_height;
const ctx = main_canvas.getContext("2d");
const x_half = main_canvas.width / 2;
const y_half = main_canvas.height / 2;
const block_size = 20;
const field_x = 10;
const field_y = 50;
const field_draw_y = 22;
const field_xx = x_half - block_size * field_x / 2;
const field_yy = y_half + block_size * (field_draw_y - 2) / 2;

//--------------------let---------------------

let DAS = 5;
let ARR = 1;
let SDF = 1;
let FPS = 0;
let fps = 60;
let F = 0;
let last_time = 0;
let skin = [];
let skin_load = 0;
let skin_id = 0;
let Puz = 0;
let Puzs = [
//blank
  [""],
//Z
  [
    [1,1,0],
    [0,1,1],
    [0,0,0]
  ],
//S
  [
    [0,1,1],
    [1,1,0],
    [0,0,0]
  ],
//J
  [
    [1,0,0],
    [1,1,1],
    [0,0,0]
  ],
//L
  [
    [0,0,1],
    [1,1,1],
    [0,0,0]
  ],
//I
  [
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
  ],
//O
  [
    [0,0,0,0],
    [0,1,1,0],
    [0,1,1,0],
    [0,0,0,0]
  ],
//T
  [
    [0,1,0],
    [1,1,1],
    [0,0,0]
  ]
];
let Puz_sizes = ["",3,3,3,3,4,4,3]
let Puz_type = 0;
let Puz_x = 0;
let Puz_y = 0;
let Next = [];
//---------------------function---------------
function draw_block(x,y,type){
  if(skin_load > 7){
   ctx.drawImage(type,field_xx + block_size * x,field_yy - block_size * y);
  }
}

function Add_Next(){
var Ne = [1,2,3,4,5,6,7];
  for(let i = 6;i >= 0;i--){
   Next.push(Ne.splice(Math.floor(Math.random() * Ne.length), 1)[0]);
  }
}
//----------------Tick--------------
function tick(){
 F++;
//----------------game--------------
//ネクスト補給
  if(Next.length < 20)Add_Next();

//パズセット
  if(Puz_type == 0){
   Puz_type = Next.shift();
   Puz = Puzs[Puz_type];
   Puz_size = Puz_sizes[Puz_type];
   Puz_x = field_x / 2 - 2;
   Puz_y = field_draw_y;
   console.log(Puz,Puz_size);
  }
//----------------draw--------------
ctx.clearRect(0,0,canvas_width,canvas_height);
//フィールド描画
  for(let y = field_draw_y;y > 0;y--){
   var draw_y = field_yy - block_size * y;
    for(let x = 0;x < field_x;x++){
     var draw_x = field_xx + block_size * x;
      if(y < field_draw_y - 1){
       ctx.strokeStyle = "black";
       ctx.lineWidth = 1;
       ctx.strokeRect(draw_x, draw_y,block_size,block_size);
      }
    }
  }
//枠描画
 ctx.strokeStyle = "#555";
 ctx.lineWidth = 5;
 ctx.strokeRect(field_xx - 2, field_yy + 2,block_size * field_x + 4,(block_size * (field_draw_y - 2) + 4) * -1);
//パズ描画
  for(let y = 0; y < Puz_size; y++){
    for(let x = 0; x < Puz_size; x++){
     if(Puz[y][x])draw_block(Puz_x + x,Puz_y - y,skin[Puz_type]);
    }
  }
}
//----------------GameLoop-----------
function gameloop(){
//fps calculate
 var time_now = Date.now();
 var F2 = Math.floor((time_now - last_time) * fps / 1000);
  if(F < F2){
   tick();
  }
  if(time_now - last_time > 1000){
   FPS = F;
   F = 0;
   last_time = time_now;
  }
 document.querySelector("#fps").textContent = FPS;
 requestAnimationFrame(gameloop);
}
//---------------初期化--------------
function game_init(){
//スキンをロード
 skin_load = 0;
 skin = [];
  for(let i = 1; i < 9;i++){
   skin[i] = new Image();
   skin[i].src = `skin/${skin_id}${i}.png`;
    skin[i].onload = () => {
     skin_load++;
    };
  }
 Puz_type = 0;
 Add_Next();

 requestAnimationFrame(gameloop);
 requestAnimationFrame(gameloop);
}
//---------------------イベント------------------


game_init();

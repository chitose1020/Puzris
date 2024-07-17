//--------------------const-------------------
//canvas
const main_canvas = document.getElementById("main_canvas");
main_canvas.width = document.body.clientWidth;
main_canvas.height = document.body.clientHeight;
const ctx = main_canvas.getContext("2d");
console.log(ctx);
const x_half = main_canvas.width / 2;
const y_half = main_canvas.height / 2;
console.log(x_half,y_half);
const block_size = 20;
const field_x = 10;
const field_y = 50;
const field_draw_y = 20;
const field_xx = x_half - block_size * field_x / 2;
const field_yy = y_half - block_size * field_draw_y / 2;

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
let Puz_x = 0;
let Puz_y = 0;
//---------------------function---------------
function draw_block(x,y,type){
  if(skin_load > 7){
   ctx.drawImage(type,field_xx + x,field_yy + y);
  }
}
//---------------------Tick-------------------
function tick(){
 F++;
 
//---------------------draw-------------------
  for(let y = field_draw_y;y > 0;y--){
   var draw_y = block_size * (y - 10) + y_half;
    for(let x = 0;x < field_x;x++){
     var draw_x = block_size * (x - 5) + x_half;
     ctx.strokeStyle = "black";
     ctx.lineWidth = 1;
     ctx.strokeRect(draw_x, draw_y, block_size,block_size);
    }
  }
//枠描画
 ctx.strokeStyle = "#555";
 ctx.lineWidth = 5;
 ctx.strokeRect(x_half - block_size * 5 - 2, y_half - block_size * 9 - 2,block_size * 10 + 4,block_size * 20 + 4);
//試しにブロック描画
console.log(skin[1]);
  for(let i = 0; i < 8; i++){
   draw_block(skin[i],0,block_size * i);
  }
}
//---------------------GameLoop----------------
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

//スキンをロード/ロード完了時にゲームループ開始
skin_load = 0;
for(let i = 0; i < 8;i++){
 skin = [];
 skin[i] = new Image();
 skin[i].src = `skin/skin${skin_id}${i}.png`
 console.log(skin[i]);
  skin[i].onload = (i) => {
   skin_load++;
   console.log("load");
    }
}
console.log(skin[1]);
 requestAnimationFrame(gameloop);

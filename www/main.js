const D_WIDTH = 480;
const D_HEIGHT = 320;
let player;

// 1, Phaser3の設定データ
const config = {
	type: Phaser.AUTO,
	width: D_WIDTH,// ゲーム画面の横幅
	height: D_HEIGHT,// ゲーム画面の高さ
	antialias: false,
	scene: {
		preload: preload,// 素材の読み込み時の関数
		create: create,// 画面が作られた時の関数
		update: update// 連続実行される関数
	},
	fps: {
		target: 24,// フレームレート
		forceSetTimeOut: true
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: true,// スプライトに緑の枠を表示します
			gravity: {y: 300}// 重力の方向とその強さ
		}
	}
}

// 2, Phaser3オブジェクトを作る
let phaser = new Phaser.Game(config);

function preload(){
	console.log("preload!!");
    this.load.image("block", "./assets/block.png");
	this.load.image("ground", "./assets/ground.png");
	this.load.image("pillar", "./assets/pillar.png");
	this.load.image("post", "./assets/post.png");
	this.load.image("sky", "./assets/sky.png");
	this.load.image("tanuki", "./assets/tanuki.png");
    this.load.image("coin", "./assets/coin.png");
}

function create(){
	console.log("create!!");
    this.add.image(D_WIDTH/2, D_HEIGHT/2, "sky");
    player = this.physics.add.sprite(240, 80, "tanuki");

	player.setInteractive({ draggable: true })
        .on("drag", function(pointer, dragX, dragY) {
            player.x = dragX;
            player.y = dragY;
        });

    let staticGroup = this.physics.add.staticGroup();
    staticGroup.create(D_WIDTH/2, D_HEIGHT-32, "ground");
    this.physics.add.collider(player, staticGroup);

    staticGroup.create(100,240,"block");
    staticGroup.create(300,230,"post");
    staticGroup.create(400,160,"pillar");

    let coinGroup = this.physics.add.group();
    

    coinGroup.create(100,0,"coin");
    coinGroup.create(120,0,"coin");
    coinGroup.create(140,0,"coin");
    this.physics.add.collider(coinGroup, staticGroup);

    this.physics.add.overlap(player,coinGroup, (p,c)=>{
        c.destroy();
    },null, this);
}

function update2(){
	console.log("update!!");
    // キーボードの情報を取得
	let cursors = this.input.keyboard.createCursorKeys();
	if(cursors.up.isDown){
		//console.log("Up!!");
		player.setVelocityY(-200);// 上方向の速度を設定
	}else if(cursors.left.isDown){
		//console.log("Left");
		player.setVelocityX(-200);// 左方向の速度を設定
	}else if(cursors.right.isDown){
		//console.log("Right!!");
		player.setVelocityX(200);// 右方向の速度を設定
	}else{
		player.setVelocityX(0);// 横方向の速度を0
	}
}

function update(){
	console.log("update!!");
    // キーボードの情報を取得
	let cursors = this.input.keyboard.createCursorKeys();
	if(cursors.up.isDown){
		//console.log("Up!!");
		player.setVelocityY(-200);// 上方向の速度を設定
	}else if(cursors.left.isDown){
		//console.log("Left");
		player.setVelocityX(-200);// 左方向の速度を設定
	}else if(cursors.right.isDown){
		//console.log("Right!!");
		player.setVelocityX(200);// 右方向の速度を設定
	}else{
		player.setVelocityX(0);// 横方向の速度を0
	}
}
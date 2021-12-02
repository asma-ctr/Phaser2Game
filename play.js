var playState = {

	create: function () {
		game.add.image(0, 0, 'background');
		this.cursor = game.input.keyboard.createCursorKeys();
		this.globalScore = 0;





		//Add player here
		this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 250;
		this.player.animations.add('right', [0, 1], 5, true);
		this.player.animations.add('left', [2, 3], 5, true);
		this.player.animations.add('jumpR', [4]);
		this.player.animations.add('jumpL', [5]);
		this.player.animations.add('jump', [6]);
		this.player.animations.add('stand', [7])

		//first coin

		this.coin = game.add.sprite(100, 250, 'coin');
		game.physics.arcade.enable(this.coin);
		this.coin.anchor.setTo(0.5, 0.5);
		this.coin.angle = 90;
		this.coin.scale.setTo(1.0);


		//Add Enemey
		this.enemies = game.add.group();
		this.enemies.enableBody = true;
		game.physics.arcade.enable(this.enemies);
		this.enemies.createMultiple(11, 'enemy');


		//add score label
		this.scoreLabel = game.add.text(30, 30, 'Score: 0', { font: '17 px Arial', fll: '#fffffff' });





		//level


		//add sound
		var soundSample = this.sound.add('audio');
		soundSample.play();




		//this.createWorld();

		this.createNewWorld();

	},

	addEnemy: function () {
		var enemy = this.enemies.getFirstDead();
		if (!enemy) {
			return;
		}
		enemy.anchor.setTo(0.5, 0.5);
		enemy.reset(game.world.centerX, 0);
		enemy.body.gravity.y = 300;

		//enemy.body.velocity.x = 100 * Phaser.Math.randomSign();
		//enemy.body.velocity.x = 10 * game.rnd.integerInRange(-20, 20);
		enemy.body.velocity.x = Phaser.Utils.randomChoice(-80, 80);



		enemy.checkWorldBounds = true;
		enemy.outOfBoundsKill = true;
		enemy.body.bounce.x = 0.5;
		enemy.body.bounce.y = 0.5;





	},

	createNewWorld: function () {
		this.map = game.add.tilemap('maps');
		this.map.addTilesetImage('tileset');
		this.layer = this.map.createLayer('Tile Layer 1');

		this.layer.resizeWorld();
		this.map.setCollision(1);
	},



	createWorld: function () {
		this.walls = game.add.group();
		this.walls.enableBody = true;


		game.add.sprite(0, 20, "wallv", this.walls);
		game.add.sprite(730, 20, "wallv", 0, this.walls);
		game.add.sprite(0, 0, "wallh", 0, this.walls);
		game.add.sprite(550, 0, "wallh", 0, this.walls);
		game.add.sprite(0, 390, "wallh", 0, this.walls);
		game.add.sprite(550, 390, "wallh", 0, this.walls);
		game.add.sprite(-40, 150, "wallh", 0, this.walls);
		game.add.sprite(550, 200, "wallh", 0, this.walls);
		game.add.sprite(370, 290, "wallh", 0, this.walls);
		game.add.sprite(90, 300, "wallh", 0, this.walls);



		//todo make midle top wall and midle bottom wall

		var middleTop = game.add.sprite(250, 80, "wallh", 0, this.walls);



		middleTop.scale.setTo(1.5, 1);
		this.walls.setAll('body.immovable', true);





	},
	update: function () {
		game.physics.arcade.collide(this.player, this.layer);
		game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);



		game.physics.arcade.collide(this.enemies, this.layer);


		this.addEnemy();



		this.movePlayer();

		if (!this.player.inWorld) {
			this.playerDie();
		}

		//rotate coins
		this.coin.angle += -2.9;



	},


	movePlayer: function () {
		if (this.cursor.left.isDown) {
			this.player.body.velocity.x = -200;
		}
		else if (this.cursor.right.isDown) {
			this.player.body.velocity.x = 200;
		}
		else {
			this.player.body.velocity.x = 0;
		}
		if (
			this.cursor.up.isDown && this.player.body.onFloor()) {
			this.player.body.velocity.y = -320;

		}



	},

	//If the player die, the game return to menu
	playerDie: function () {
		game.state.start('menu');
		this.player.kill();





	},

	takeCoin: function (player, coin) {

		this.coin.kill();
		this.globalScore += 10;
		this.scoreLabel.text = 'Score' + this.globalScore;




		this.updateCoinPosition();
	},

	updateCoinPosition: function () {
		// make an array
		var coinPosition = [
			{ x: 140, y: 60 }, { x: 360, y: 60 },
			{ x: 60, y: 140 },


		];

		for (var i = 0; i < this.updateCoinPosition.length; i++) {
			if (coinPosition[i].x === this.coin.x) {

				coinPosition.splice(i, 1);
			}
		}

		var newPosition = coinPosition[game.rnd.integerInRange(0, coinPosition.length - 1)];
		//the coin make new position 'reset'
		this.coin.reset(newPosition.x, newPosition.y);

	},

};
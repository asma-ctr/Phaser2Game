var loadState = {

	preload: function () {
		// Add a loading label 
		var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
		loadingLabel.anchor.setTo(0.5, 0.5);

		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);






		game.load.image('background', 'assets/background.png');
		game.load.image('player', 'assets/player.png');
		game.load.image('coin', 'assets/coin.png');
		game.load.image('wallv', 'assets/wallvertical.png');
		game.load.image('wallh', 'assets/wallhorizontal.png');
		game.load.image('enemy', 'assets/enemy.png');
		game.load.image('button', 'assets/mutebutton.png');
		game.load.audio('audio', 'assets/audio.mp3');
		game.load.image('background2', 'assets/background2.png');

		game.load.tilemap('maps', 'assets/map2.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tileset', 'assets/tileset.png');










		// Load all assets

		// ...
	},

	create: function () {
		game.state.start('menu');
	}


};
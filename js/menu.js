var menuState = {

	create: function () {


		// Name of the game
		// todo ändra labeln inte satanistiska svärdomar
		var nameLabel = game.add.text(game.world.centerX, 80, ' Coin', { font: '50px Arial', fill: 'Silver' });
		nameLabel.anchor.setTo(0.5, 0.5);




		//game.scale.pageAlignHorizontally = true;
		//game.scale.pageAlignVertically = true;
		//game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//game.stage.disableVisibilityChange = true;






		// How to start the game
		var startLabel = game.add.text(game.world.centerX, game.world.height - 80, 'Press The Up Arrow Key To Start ↑', { font: '25px Arial', fill: '#ffffff' });
		startLabel.anchor.setTo(0.5, 0.5);





		//add mute button

		var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);

		upKey.onDown.addOnce(this.start, this);

		this.mutebutton = game.add.button(20, 20, 'button', this.togglesound, this);
		this.mutebutton.input.useHandCursor = true;

		if (game.sound.mute) {
			this, this.mutebutton.free = 1;
		}


	},

	togglesound: function () {
		game.sound.mute = !game.sound.mute;
		this.mutebutton.fram = game.sound.mute ? 1 : 0

	},




	start: function () {
		console.log("test kommer vi hit");
		game.state.start('play');
	},



};
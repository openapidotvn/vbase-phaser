/**
 * Created by hwngvnd on 7/11/15.
 */

typeof(BasicGame) === 'undefined' ? BasicGame = {} : '';

BasicGame.Boot = function (game) {
    /*
     *   _game: game api
     * */
    var _game = game,
        _gameOptions;

    _gameOptions = _game.options;
    console.log(_game);
    //BOOT
    this.initState = function () {
    };

    this.initState.prototype = {
        init: function () {
            _game.state = _game.stateList.BOOT;
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;

            if (this.game.device.desktop) {
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.setMinMax(320, 213, 900, 600);
                this.scale.setScreenSize(true);
                this.scale.refresh();
            }
            else {
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.setMinMax(320, 213, 900, 600);
                this.scale.forceOrientation(true, false);
                this.scale.setResizeCallback(this.gameResized, this);
                this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
                this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
                this.scale.setScreenSize(true);
                this.scale.refresh();
            }

            _game.triggerEventListener('boot', _gameOptions);
        },

        preload: function () {

        },

        create: function () {
            this.state.start(_game.stateList.PRELOAD);
        },

        gameResized: function () {

        },

        enterIncorrectOrientation: function () {
            if (_gameOptions.forceLandscape) {
                _game.orientated = false;
                document.getElementById('game-orientation').style.display = 'block';
            }
        },

        leaveIncorrectOrientation: function () {
            if (_gameOptions.forceLandscape) {
                _game.orientated = true;
                document.getElementById('game-orientation').style.display = 'none';
            }
        }
    };
};
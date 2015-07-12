/**
 * Created by hwngvnd on 7/11/15.
 */

typeof(BasicGame) === 'undefined' ? BasicGame = {} : '';

BasicGame.Preload = function (game) {
    /*
     *   _game: game api
     * */
    var _game = game,
        _gameOptions,
        baseUrl;

    _gameOptions = _game.options;
    baseUrl = _gameOptions.baseUrl;

    console.log(_game);
    //PRELOAD
    this.initState = function () {
    };

    this.initState.prototype = {
        preload: function () {
            _game.state = _game.stateList.PRELOAD;

            _game.hw = this.game.world.width * 0.5;
            _game.hh = this.game.world.height * 0.5;
            _game.aw = this.game.world.width;
            _game.ah = this.game.world.height;

            _game.triggerEventListener('preload', {});
            //do preload
            this.load.image('bg', baseUrl + 'images/bg.png');
        },

        create: function () {

        },

        update: function () {
            if (this.load.hasLoaded) {
                this.state.start(_game.stateList.GAME);
            }
        }
    }
};
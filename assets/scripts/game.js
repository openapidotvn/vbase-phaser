/**
 * Created by hwngvnd on 7/11/15.
 */

typeof(BasicGame) === 'undefined' ? BasicGame = {} : '';

BasicGame.Game = function (game) {
    /*
     *   _game: game api
     * */
    var _game = game,
        _gameOptions;

    _gameOptions = _game.options;

    //PRELOAD
    this.initState = function () {
    };

    this.initState.prototype = {
        create: function () {
            _game.state = _game.stateList.GAME;
            this.bg = this.add.image(0, 0, 'bg');
            this.bg.width = _game.aw;
            this.bg.height = _game.ah;
            _game.triggerEventListener('game', {});
        }
    };
};
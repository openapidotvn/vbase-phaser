/**
 * Created by hwngvnd on 7/11/15.
 */

typeof(BasicGame) === 'undefined' ? BasicGame = {} : '';

(function () {
    var Game = IGame.core;

    var game = new Game({
        baseUrl: 'assets/',
        states: [{
            name: 'Boot',
            state: BasicGame.Boot
        }, {
            name: 'Preload',
            state: BasicGame.Preload
        }, {
            name: 'Game',
            state: BasicGame.Game
        }],
        autoLoad: true,
        ready: function (game) {
            game.provide('user', {
                username: 'Pham Do hung',
                uid: 12345678,
                avatar: 'http://kenh143.vcmedia.vn/skin/logok14.png',
                link: 'https://www.facebook.com/phamdohung161'
            });

            game.on('boot', function (data) {
                console.log('boot: ', data);
            });

            game.on('preload', function (data) {
                console.log('preload: ', data);
            });

            game.on('game', function (data) {
                console.log('game: ', data);
            });

            game.off('boot');
        }
    });
})();
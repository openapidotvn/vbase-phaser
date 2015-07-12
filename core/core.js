/**
 * Created by phamdohung161 on 7/11/15.
 */

typeof(IGame) === 'undefined' ? IGame = {} : '';

IGame.core = function (options) {
    var _game = {},
        _this = this;
    _game.stateList = {};
    _game.initStates = {};
    _game.state = 'init';
    _game.orientated = null;
    _game.events = {};

    //event
    _game.defaultConfig = {
        container: '#container',
        baseUrl: '',
        forceLandscape: false,
        width: 900,
        height: 600,
        debugMode: true,
        ready: function () {

        }
    };

    //merge options
    _game.options = $.extend(true, {}, _game.defaultConfig, options || {});

    $.each(options.states || [], function (index, obj) {
        var stateName = (obj.name || '').toUpperCase();
        _game.stateList[stateName] = obj.name || '';
        _game.initStates[stateName] = obj.state;
    });

    //load game
    _game.load = function () {
        var $container = $(_game.options.container);
        if ($container.length === 0) {
            console.log('Container is not exist!');
            return false;
        } else {
            _game.gameId = 'game';
            _game.$game = $('<div id="' + _game.gameId + '" class="game"></div>').appendTo($container);
            $('<div id="game-orientation"></div>').appendTo($container);
            _game.initEvent();

            _game.instance = new Phaser.Game(900, 600, Phaser.AUTO, 'game');
            $.each(_game.stateList, function (key, state) {
                if (typeof _game.initStates[key] === 'function') {
                    _game.instance.state.add(state, new _game.initStates[key](_game).initState);
                }
            });
            _game.triggerEventListener('ready', _this);

            //go_state
            _game.instance.state.start(_game.stateList.BOOT);
        }
        return _game;
    };


    _game.initEvent = function () {
        //registering ready event
        _game.addEventListener('ready', _game.options.ready);
        return _game;
    };

    _game.addEventListener = function (type, callback) {
        if (typeof callback !== 'function') {
            console.log('The second parameter is not a function');
            return false;
        }

        if (!_game.events[type]) {
            _game.events[type] = [];
        }
        _game.events[type].push(callback);

        return _game;
    };

    _game.removeEventListener = function (type) {
        delete _game.events[type];

        return _game;
    };

    _game.removeAllEventListener = function () {
        _game.events = {};

        return _game;
    };

    _game.triggerEventListener = function (type, data) {
        if (!_game.events[type]) {
            return;
        }
        $.each(_game.events[type], function (k, func) {
            typeof func === 'function' && func.apply(_this, [data]);
        });

        return _game;
    };

    _game.inject = function (name, fn) {
        if (typeof fn === 'function') {
            return function () {
                try {
                    return fn.apply(_this, arguments);
                } catch (e) {
                    if (_game.options.debugMode) {
                        console.log(e);
                    }
                }
            };
        } else {
            return fn;
        }
    };

    /**
     *   PUBLIC METHOD
     */

    this.getGame = function () {
        return _game.instance;
    };

    this.getState = function () {
        return _game.state;
    };

    this.loadGame = function () {
        if (_game.state === 'init') {
            _game.load();
        } else {
            console.log('Game has been already initialized');
        }
        return this;
    };

    this.provide = function (name, fn) {
        if (_game[name]) {
            console.log('Method name has been already declared');
        } else {
            _game[name] = _game.inject(name, fn);
        }
        return this;
    };

    this.getOptions = function () {
        return _game.options;
    };

    this.setOptions = function (options) {
        _game.removeAllEventListener();
        _game.options = $.extend(true, {}, _game.defaultConfig, options || {});
        _game.addEventListener('ready', _game.options.ready);

        return this;
    };

    this.on = _game.addEventListener;
    this.off = _game.removeEventListener;

    if (_game.options.autoLoad) {
        _game.load();
    }
};
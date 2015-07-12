/**
 * Created by phamdohung161 on 7/11/15.
 */

typeof(IGame) === 'undefined' ? IGame = {} : '';

IGame.utils = {
    extend: function (subClass, superClass) {
        var F = function () { };
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;

        subClass.superclass = superClass.prototype;
        if (superClass.prototype.constructor == Object.prototype.constructor) {
            superClass.prototype.constructor = superClass;
        }
    }
};

/**
 * Created by Halck on 25.06.2018.
 */

var parse_states = function (states) {
    var states = states.split(';');
    states = states.splice(0, states.length - 1)
    var result = [];
    for (var j = 0; j < states.length; j ++ ) {
        result.push({
            name: states[j]
        });
    }
    return result;
}

module.exports.parse_states = parse_states;
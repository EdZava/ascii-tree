var levels = [];
var freetree = require('freetree');
var c0 = String.fromCharCode(9500);
var c1 = String.fromCharCode(9472);
var c2 = String.fromCharCode(9492);
var c3 = String.fromCharCode(9474); 

function generate(str) {
    var tree = freetree.parse(str);
    return _generate(tree, true);
}

function compose(tree, end) {
    var i, ret = '\r\n';
    var c = end ? c2: c0;

    if (tree.level == 0) {
        return tree.value;
    }

    for (i = 1; i < tree.level; ++i) {
        ret += levels[i] ? ' ' : c3
        ret += '  ';
    }

    return ret + c + c1 + ' ' + tree.value;
}

function _generate(tree, end) {
    var last;
    var result = compose(tree, end);

    if (tree.nodes) {
        last = tree.nodes.length - 1;
        tree.nodes.forEach(function(subTree, index) {
            levels[subTree.level] = index == last;
            result +=  _generate(subTree, index == last);
        });
    }

    return result;
}

exports.generate = generate;

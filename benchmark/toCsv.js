require('../toCsv.js');
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

var data = [
    ['It was the "best" of times']
];

for ( var i=1; i<1000000; i++){
    data[0][i] = i;
}

suite
    .add('Array#toCsv', function () {
        data.toCsv();
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({
        async: true
    });

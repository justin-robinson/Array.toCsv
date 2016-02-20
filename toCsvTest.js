/**
 * OUTPUT:

 "one","two","three"
 "1","2","3"
 "2234","00","11"
 "4810","45984","564"
 "235","2134","56"
 "0","1","2"
 "a","b","c"
 "e","f","g"
 "how"
 "dee"
 "hoe"
 "my \"goat\" is dead"
 "two"
 "three"

 */

require('./toCsv.js');

var data = [
    {
        one: '1',
        two: '2',
        three: '3'
    },
    {
        one: '2234',
        two: '00',
        three: '11'
    },
    {
        one: '4810',
        two: '45984',
        three: '564'
    },
    {
        one: '235',
        two: '2134',
        three: '56'
    }
];
console.log(data.toCsv());

data = [
    ['a','b','c'],
    ['e','f','g']
];
console.log(data.toCsv());

data = [
    'how',
    'dee',
    'hoe'
];
console.log(data.toCsv());

data = [
    'my "goat" is dead',
    'two',
    'three'
];
console.log(data.toCsv());

require('./toCsv.js');

var data = [
    {
        header1 : '1',
        header2 : '2',
        header3 : '3'
    },
    {
        header1 : '2234',
        header2 : '00',
        header3 : '11'
    },
    {
        header1 : '4810',
        header2 : '45984',
        header3 : '564'
    },
    {
        header1 : '235',
        header2 : '2134',
        header3 : '56'
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
    'my "boat" has holes in it',
    'another """"""" string with double quotes """""""""',
    'three'
];
console.log(data.toCsv());

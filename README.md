[![Build Status](https://travis-ci.org/justin-robinson/Array.toCsv.svg?branch=master)](https://travis-ci.org/justin-robinson/Array.toCsv.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/justin-robinson/Array.toCsv/badge.svg?branch=master)](https://coveralls.io/github/justin-robinson/Array.toCsv?branch=master)
# Array.toCsv

* Adds toCsv() to the Array prototype
* Handles Array values of Objects, Arrays, and plain scalars


```javascript
// array of objects
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

// array of arrays
data = [
    ['a','b','c'],
    ['e','f','g']
];
console.log(data.toCsv());


// array of scalars
data = [
    'how',
    'dee',
    'hoe'
];
console.log(data.toCsv());

// array with values containing double quotes
data = [
    'my "boat" has holes in it',
    'another """"""" string with double quotes """""""""',
    'three'
];
console.log(data.toCsv());
```

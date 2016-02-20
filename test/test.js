require('../toCsv.js');
var assert = require('assert');
describe('Array', function() {
    describe('toCsv()', function () {
        it('should convert array of objects to csv', function () {

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

            var expectedResult = '"header1","header2","header3"\n' +
                '"1","2","3"\n' +
                '"2234","00","11"\n' +
                '"4810","45984","564"\n' +
                '"235","2134","56"';
            assert.equal(data.toCsv(), expectedResult);
        });
        it('should convert array of arrays to csv', function () {

            var data = [
                ['a','b','c'],
                ['e','f','g']
            ];

            var expectedResult = '"0","1","2"\n' +
                '"a","b","c"\n' +
                '"e","f","g"';

            assert.equal(data.toCsv(), expectedResult);
        });

        it('should convert array of scalars to csv', function () {

            var data = [
                'how',
                'dee',
                'hoe'
            ];


            var expectedResult = '"how"\n"dee"\n"hoe"';

            assert.equal(data.toCsv(), expectedResult);
        });

        it('should handle commas in values', function () {

            var data = [
                {
                    team     : 'Carolina Panthers',
                    location : 'Charlotte, NC'
                },
                {
                    team     : 'Clemson Tigers',
                    location : 'Clemson, SC'
                }
            ];

            var expectedResult = '"team","location"\n' +
                '"Carolina Panthers","Charlotte, NC"\n' +
                '"Clemson Tigers","Clemson, SC"';

            assert.equal(data.toCsv(), expectedResult);
        })
    });
});

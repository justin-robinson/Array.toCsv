require('../src/toCsv.js');
var assert = require('assert');
describe('Array', function() {
    describe('#toCsv()', function () {
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
                ['e','f','g'],
                ['1','2','3']
            ];

            var expectedResult = '"a","b","c"\n' +
                '"e","f","g"\n' +
                '"1","2","3"';

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
        });

        it('should wrap all values in double quotes', function () {

            var data = [
                ['a','b','c'],
                ['e','f','g'],
                [1,2,3]
            ];

            var expectedResult = '"a","b","c"\n' +
                '"e","f","g"\n' +
                '"1","2","3"';

            assert.equal(data.toCsv(), expectedResult);

            data = [
                {
                    col1 : 1,
                    col2 : 2,
                    col3 : 3
                },
                {
                    col1 : 4,
                    col2 : 5,
                    col3 : 6
                }
            ];

            expectedResult = '"col1","col2","col3"\n' +
                    '"1","2","3"\n' +
                    '"4","5","6"';

            assert.equal(data.toCsv(), expectedResult)

        });

        it('should maintain the order of key value pairs for objects', function () {

            var data = [
                {
                    header1 : '1',
                    header2 : '2',
                    header3 : '3'
                },
                {
                    header2 : '00',
                    header1 : '2234',
                    header3 : '11'
                },
                {
                    header3 : '564',
                    header1 : '4810',
                    header2 : '45984'
                },
                {
                    header3 : '56',
                    header2 : '2134',
                    header1 : '235'
                }
            ];

            var expectedResult = '"header1","header2","header3"\n' +
                '"1","2","3"\n' +
                '"2234","00","11"\n' +
                '"4810","45984","564"\n' +
                '"235","2134","56"';
            assert.equal(data.toCsv(), expectedResult);
        });

        it('should convert null values to empty strings', function() {

            var data = [
                ['1', null, '3']
            ];

            var expectedResult = '"1","","3"';

            assert.equal(data.toCsv(), expectedResult);
        });

        it('should properly escape double quotes', function () {

            var data = [
                ['"macaroni"']
            ];

            var expectedResult = '"\\"macaroni\\""';

            assert.equal(data.toCsv(), expectedResult);
        });
    });
});

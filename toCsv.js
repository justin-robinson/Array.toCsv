/**
 * Adds toCsv() to the Array prototype
 * Handles Array values of Objects, Arrays, and plain scalars
 *
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define([], factory(Array, Object));
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(Array, Object);
    } else {
        // Browser globals.
        factory(Array, Object);
    }
})(function (Array, Object) {
    if (Array.prototype.toCsv) {
        return;
    }

    // Polyfills
    if (!Object.values) {
        /**
         * Returns the values in an object
         * @param object
         * @returns {Array}
         */
        Object.values = function (object) {
            var values = [];
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    values.push(object[key]);
                }
            }

            return values;
        };
    }
    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

    // Processor
    var ProcessorAbstract = function () {};

    ProcessorAbstract.prototype = {

        /**
         * converts an array of scalars to a csv row
         * @param valuesArray array
         * @returns {string}
         * @private
         */
        _process: function (valuesArray) {
            // Use the power of stringify to escape potential double quotes
            // but we need to remove the brackets [] it wraps our array in
            return JSON.stringify(valuesArray).slice(1,-1) + '\n';
        },
        processKeys: function () {
            return '';
        },
        processValues: function () {
            return '';
        }
    };

    // Object Processor
    var ObjectProcessor = function () {};

    ObjectProcessor.prototype = Object.create(ProcessorAbstract.prototype);
    ObjectProcessor.constructor = ObjectProcessor;

    /**
     * Process Object keys to csv row
     * @param object
     */
    ObjectProcessor.prototype.processKeys = function (object) {
        return this._process(Object.keys(object));
    };

    /**
     * Process Object values to csv row
     * @param object
     */
    ObjectProcessor.prototype.processValues= function (object) {
        return this._process(Object.values(object));
    };

    // Array Processor
    var ArrayProcessor = function () {};

    ArrayProcessor.prototype = Object.create(ProcessorAbstract.prototype);
    ArrayProcessor.constructor = ArrayProcessor;

    /**
     * Process array values to csv row
     * @param array
     */
    ArrayProcessor.prototype.processValues = function (array) {
        return this._process(array);
    };

    // Scalar Processor
    var ScalarProcessor = function () {};

    ScalarProcessor.prototype = Object.create(ProcessorAbstract.prototype);
    ScalarProcessor.constructor = ScalarProcessor;
    ScalarProcessor.prototype._process = function (scalar) {
        return JSON.stringify(scalar) + '\n';
    };
    ScalarProcessor.prototype.processValues = function (scalar) {
        return this._process(scalar);
    };

    /**
     * Convert Array to csv
     * @returns {string}
     */
    Array.prototype.toCsv = function () {

        // our csv to be built
        var csvString = '';

        // only process arrays with values
        if (this.length > 0) {

            // determine what kind of values this array holds
            var processor;
            if (Array.isArray(this[0])) {
                processor = new ArrayProcessor();
            } else if ( typeof this[0] === 'object') {
                processor = new ObjectProcessor();

                // use object keys as header row if the array does in fact contain objects
                csvString += processor.processKeys(this[0]);
            } else {
                processor = new ScalarProcessor();
            }

            // process each row into csv format
            this.forEach(function (row) {
                csvString += processor.processValues(row);
            });

            // remove newlines from end of csv
            csvString = csvString.trim();
        }

        return csvString;
    };
});

Array.prototype.toCsv.call([["Col1","Col2","Col3"],[2,3,4]]);


console.log(Array.prototype.toCsv.call([
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
]));



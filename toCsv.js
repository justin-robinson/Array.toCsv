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
            // use the power of stringify to escape potential double quotes
            // map ensures all values are strings
            // slice removes the leading and trailing bracket from the stringify
            return JSON.stringify(valuesArray.map(
                    function (value) {
                        return String(value);
                    })).slice(1,-1) + '\n';
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

        // the order of keys on the first row will be used to print out values
        this.headerRowColumnOrder = Object.keys(object);

        return this._process(this.headerRowColumnOrder);
    };

    /**
     * Process Object values to csv row
     * @param object
     */
    ObjectProcessor.prototype.processValues= function (object) {

        // order the values the mimic the header row
        var values = [];
        for (var i = 0; i< this.headerRowColumnOrder.length; i++) {
            values.push(object[this.headerRowColumnOrder[i]]);
        }
        return this._process(values);
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

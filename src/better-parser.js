"use strict";
/* global define, module, setTimeout, jQuery, global, BigInt, require, Blob, Map,
          Set, Symbol */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['bn.js'], function(BN) {
            return (root.lips = factory(root, BN));
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(root, require('bn.js'));
    } else {
        root.lips = factory(root, root.BN);
    }
})(typeof global !== 'undefined' ? global : window, function(root, BN, undefined) {
  function
})();
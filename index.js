'use strict';
const DataLoader = require('dataloader');

module.exports.NiceDataLoader = class NiceDataLoader {
    constructor(_function, cache = false) {
        this._function = _function;
        this._loader = new DataLoader((keys) => this._wrap(keys), {cache: cache});
        this.args = null;
        this.context = null;
        this.info = null;
    }

    _wrap(keys) {
        return this._function(keys, this.args, this.context, this.info);
    }

    get(key, args, context, info) {
        this.args = args;
        this.context = context;
        this.info = info;
        return this._loader.load(key);
    }

    clear() {
        this._loader.clearAll();
        this.args = null;
        this.context = null;
        this.info = null;
    }
}

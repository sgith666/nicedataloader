const NiceDataLoader = require('../index.js').NiceDataLoader;

const testFunction = function (keys, args, context, info) {
    console.log('test functions keys', keys);
    console.log('test functions args', args);
    return Promise.resolve(keys);
}

const niceDataLoader = new NiceDataLoader(testFunction, false);


const args = {'arg': 'args1'};

let result = niceDataLoader.get(1, args, {}, {});
result = niceDataLoader.get(2, args, {}, {});

result.then((val) => {
    console.log(' got result:', val);
    process.exit(0);
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

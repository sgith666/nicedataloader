## About ##
nicedataloader is designed as a wrapper for dataloader.  It will help pass parameters to graphQL  resolver when using dataloader.


## example ##

resolvers.js

    const NiceDataLoader = require('nicedataloader').NiceDataLoader;
    const pricesLoader = new NiceDataLoader(productResolver.getPrices);
    
    const resolvers = {
        Query: {
            Products: (obj, args, context, info) 
                    => productResolver.getProducts( args, context, info),
        },
        Products: {
            Prices: (parent, args, context, info) 
                        => pricesLoader.get(parent.id, args, context, info),
        .
        .
        .
        
        
ProductResolver.js

    const getPrices = async (keys, args, context, info) => {
        const mysqlPool = context.mysqlPool;
        const customerType = args.customerType;
        return new Promise((resolve, reject) => {
            productModel.getPrices(mysqlPool, keys, customerType).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    };

## API ##

| function       | description  | example  | 
| :------------- | :----------: | :----------: | 
|  constructor(_function, cache = false)  | Pass resolver function and set Dataloader cache  | | 
| get(key, args, context, info)  | Pass key, args, context, info to resolver returns results from resolver | | 
| clear() | performs clearAll(), on the dataloader, and sets parameters to null | | 
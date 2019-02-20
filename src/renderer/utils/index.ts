const Datastore = require('nedb')

export const db = new Datastore({ filename: './myData', autoload: true });


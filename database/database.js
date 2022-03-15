const mongoose = require("mongoose");
const Product = require("../model/product/productModel")

class Database {
    constructor() {
        this.mongoDB = 'mongodb://mongo:27017/productdata';
    }

     async connect() {
        await mongoose.connect(this.mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
        this.db = await mongoose.connection;
         this.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
         return this.db.once('open', function callback () {
            console.log("h");
        });

    }

    async close() {
        await this.db.close()
    }

    async saveData(data) {
        console.log("data", data[0])
        Product.insertMany(data);
        //this.db.collection.insertMany(data)
    }

    onInsert(err, docs) {
        if (err) {
            // TODO: handle error
        } else {
            console.info('%d potatoes were successfully stored.', docs.length);
        }
    }
}

module.exports = Database;
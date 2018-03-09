var mongoose = require('mongoose');

var subPageSchema = mongoose.Schema({
    title : {
        required : true,
        type : String
    },
    description : {
        type : String,
        required : true
    },
    body : String,
    order : Number,
    createdOn : {
        type : Date,
        "default" : Date.now
    }
});
var pageSchema = mongoose.Schema({
    title : {
        required : true,
        type : String
    },
    description : {
        type : String,
        required : true
    },
    body : String,
    order : Number,
    createdOn : {
        type : Date,
        "default" : Date.now
    },
    childs: [subPageSchema]
});

mongoose.model('Pages', pageSchema);
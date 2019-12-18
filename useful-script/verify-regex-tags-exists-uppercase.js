var x = ["[A-Z]"];
var regex = x.map(function (e) { return new RegExp(e, "g"); });
db.getCollection('your_collection').find({ tags: {$in: regex} }, { 'tags': 1 } )
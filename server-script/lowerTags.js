/*
    Usage:	Update tags field to be lower case
    Parameters:
        collectionName:     Collection Name - string
    History:
    Date			Author		Description
    2020-01-06	    DN			Intial
*/
db.system.js.save( { _id: "lowerTags",
value : function(contentName) {
	var x = ["[A-Z]"];
	var regex = x.map(function (e) { return new RegExp(e, "g"); });
	db.getCollection(contentName).find({ tags: {$in: regex} }, { 'tags': 1 }, { 'tags': 1 } ).forEach(function(doc) {
		
		var lowerTags = doc.tags.map(v => v.toLowerCase());
		
		db.getCollection(contentName).update(
		   { _id: doc._id},
		   { $set : { 'tags' : lowerTags } },
		   { multi: true }
		)
	});
}});

/*
db.loadServerScripts();
lowerTags("your_collection")

var x = ["[A-Z]"];
var regex = x.map(function (e) { return new RegExp(e, "g"); });
db.getCollection('your_collection').find({ tags: {$in: regex} }, { 'tags': 1 } )
*/
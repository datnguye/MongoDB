db.getCollection('your_collection').find({}, { 'tags': 1 } ).forEach(function(doc) {
	var lowerTags = doc.tags.map(v => v.toLowerCase());
	
	db.getCollection('your_collection').update(
	   { _id: doc._id},
	   { $set : { 'tags' : lowerTags } },
	   { multi: true }
	)
});
#1 - Loop to update
db.getCollection('your_source_collection').find({}, { 'field1': 1, 'field2': 1 } ).forEach(function(doc) {
	db.getCollection('your_target_collection').update(
	   { news_id: doc._id.valueOf()},
	   { $set : { 'field1' : doc.field1, 'field2': doc.field2 } },
	   { multi: true }
	)
});


#2 - Use BULK
#TBU

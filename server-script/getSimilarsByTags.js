/*
    Usage:	Get similar documents by tags field
    Notes:	Default to 10 documents
    Parameters:
        contentName:    Base collection name
        contentId:      Base collection id
        noOfDoc:        No of document relative - default to 10
    History:
    Date                Author		Description
    2019-12-17          DN              Intial
*/
db.system.js.save( { _id: "getSimilarsByTags",
value : function(contentName, contentId, noOfDoc) {
    if(!(noOfDoc)) {
        noOfDoc = 10;
    }
    
    //1. get doc's tags array
    var selectedTags = db.getCollection(contentName).find({_id: ObjectId(contentId)}, {tags:1});
    if(selectedTags) {
        selectedTags = selectedTags[0].tags;
    }
    else {
        selectedTags = [];
    }
    
    //2. get others docs with tags in (1) with count no of existance
    //3. sort by no of existance and get top documents    
    return db.getCollection(contentName).aggregate([
        {
            $match: { 
                _id: { $ne: ObjectId(contentId) }
            }
        },
        {
            $addFields: {
                tagsFilter: {
                    $filter: {
                        input: selectedTags,
                        as: "selectedTag",
                        cond: { $in: ["$$selectedTag", "$tags"] }
                    }
                }
            }
        },
        {
            $addFields: {
                tagsFilterCount: {
                    $size: "$tagsFilter"
                }
            }
        },
        {
            $sort: {
                tagsFilterCount: -1,
                _updated_at: -1
            }
        },
        {
            $limit: noOfDoc
        }
    ]);
}});

/*
db.loadServerScripts();
db.getCollection('your_collection_name').find({_id: ObjectId("your_object_id")})[0].tags;
getSimilarsByTags("your_collection_name","your_object_id")
*/
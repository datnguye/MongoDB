/*
    Usage:	Get collection by properties's filters with sorting & paging 
    Notes:	Default paging is 10 documents
    Parameters:
        collectionName:     Collection Name - string
        properties:         Selected fields of collection - array string
        byProperties:       Filter by fields - array string
        byFilters:          Filter values - array string or object - index must match with byProperties
        sortBys:            Fields to be sorted by - array string
        sortOrders:         Sort order of fields in sortBys - array number - index must match with byProperties. -1 to sort descending, default to 1 - ascending
        pageNo:             Page index - number - start from 0 & default to 0
        pageSize:           Page size, default to 10
    History:
    Date			Author		Description
    2019-12-13	    DN			Intial
*/
db.system.js.save( { _id: "getByProperties",
value : function(collectionName, properties, byProperties, byFilters, sortBys, sortOrders, pageNo, pageSize) {
    if(!(pageNo))
        pageNo = 0;
    if(!(pageSize))
        pageSize = 10;
    
    var filterObj = {};
    if(byProperties) {
        byProperties.forEach(function(e, i) {
            filterObj[e] = byFilters[i];
        });
    }

    var sortObj = {};
    if(sortBys) {
        sortBys.forEach(function(e, i) {
            sortObj[e] = sortOrders && sortOrders[i] ? sortOrders[i] : 1;
        });

    }
    
    if(properties) {
        var propertiesObj = {};
        properties.forEach(function(e){
            propertiesObj[e] = 1;
        });
        
        if(!(properties._id)){
            propertiesObj["_id"] = 1;
        }
        //return db.getCollection(collectionName).find(filterObj, propertiesObj).sort(sortObj).skip(pageSize * pageNo).limit(pageSize); 
        return db.getCollection(collectionName).aggregate([
            {
                $match: filterObj
            },
            {
                $project: propertiesObj
            },
            {
                $sort: sortObj
            },
            {
                $skip: pageSize * pageNo
            },
            {
                $limit: pageSize
            }
        ]); 
    }
    else {
        //return db.getCollection(collectionName).find(filterObj).sort(sortObj).skip(pageSize * pageNo).limit(pageSize);
        return db.getCollection(collectionName).aggregate([
            {
                $match: filterObj
            },
            {
                $sort: sortObj
            },
            {
                $skip: pageSize * pageNo
            },
            {
                $limit: pageSize
            }
        ]); 
    }
}});

/*
db.loadServerScripts();
getByProperties("your-collection", ["field1", "field2", "fieldn"], null, null,["fieldx"], null, 0,10)//sort fieldx asc

*/
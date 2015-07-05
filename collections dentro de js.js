
/** calendar indexes **/
db.getCollection("calendar").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** calendar records **/
db.getCollection("calendar").insert({
  "_id": ObjectId("559996691c3797f810000000"),
  "source": [
    
  ]
});
db.getCollection("calendar").insert({
  "_id": ObjectId("559996c51c3797f810000001"),
  "source": [
    {
      "title": "Clique para remover",
      "start": "2015-07-06T00:00:00.000Z"
    }
  ]
});

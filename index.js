const {MongoClient}=require('mongodb')
const url='mongodb://127.0.0.1:27017'
const client=new MongoClient(url)
async function connect(){
    try{
        await client.connect()
        console.log('connected')
    }catch(error){
        console.log(error)
    }
}
connect()
async function insertDocument(db,collection,document){
    const collection=db.collection(collection)
    let res=await collection.insertOne(document)
    console.log("inserted the document to the database")
}

async function findDocuments(db,collection,query={}){
    const collection=db.collection(collection)
    let res=await collection.find(query).toArray()
}
async function updateDocument(db,collection,filter,update){
    const collection=db.collection(collection)
    let res=await collection.updateOne(filter,{$set:update})
    console.log("updated the document to the database")
}
async function deleteDocument(db,collection,filter){
    const collection=db.collection(collection)
    let res=await collection.deleteOne(filter)
    console.log("deleted the document to the database")
}

async function main(){
    try{
        await connect();
        const database=client.db('your_database_name')
        const collection=database.collection('your_collection_name')
        //insert
        await insertDocument(database,'your_collection_name',{
            name:'your_name',
            age:your_age
        })
        //find
        await findDocuments(database,'your_collection_name')
        //update
        await updateDocument(database,'your_collection_name',{
            name:'your_name'
        },{
            $set:{
                age:your_age
            }
        })
        //delete
        await deleteDocument(database,'your_collection_name',{
            name:'your_name'
        })
    }finally{
        await client.close()
    }
}

main();

//to see database=> open cmd and type mongosh
// show dbs;
// use your_database_name;
// show collections
// db.createCOllections("your_collection_name")
// db.your_collection_name.insertOne({name:"your_name",age:your_age})
// db.your_collection_name.find()
// db.your_collection_name.updateOne({name:"your_name"},{$set:{age:your_age}})
// db.your_collection_name.deleteOne({name:"your_name"})

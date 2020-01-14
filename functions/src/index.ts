import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


admin.initializeApp();
 
import * as algoliasearch from 'algoliasearch';


const client = algoliasearch('4OMR9ESZ2H', 'a68b3af9507e5e8517910b1e3a0e5512' );

//agriculture and cropes --------------------------------------------------------
const index1 = client.initIndex('Agriculture_and_cropes'); 

exports.indexAgriculture = functions.firestore
    .document('Agriculture_and_cropes/{problemId}')
    .onCreate((snap,context)=>{
        const data = snap.data();
        const objectID = snap.id;
        return index1.addObject({
            objectID,data
        });
});

exports.unindexAgriculture = functions.firestore
    .document('Agriculture_and_cropes/{problemId}')
    .onDelete((snap,context)=>{ 
        const objectID = snap.id;
        return index1.deleteObject(objectID);
});


//education---------------------------------------------------------------------
const index2 = client.initIndex('Education'); 

exports.indexEducation = functions.firestore
    .document('Education/{problemId}')
    .onCreate((snap,context)=>{
        const data = snap.data();
        const objectID = snap.id;
        return index2.addObject({
            objectID,data
        });
});

exports.unindexEducation = functions.firestore
    .document('Education/{problemId}')
    .onDelete((snap,context)=>{ 
        const objectID = snap.id;
        return index2.deleteObject(objectID);
});


//Health---------------------------------------------------------------------
const index3 = client.initIndex('Health_and_fitness'); 

exports.indexHealth = functions.firestore
    .document('Health_and_fitness/{problemId}')
    .onCreate((snap,context)=>{
        const data = snap.data();
        const objectID = snap.id;
        return index3.addObject({
            objectID,data
        });
});

exports.unindexHealth = functions.firestore
    .document('Health_and_fitness/{problemId}')
    .onDelete((snap,context)=>{ 
        const objectID = snap.id;
        return index3.deleteObject(objectID);
});


//Science_and_technology---------------------------------------------------------------------
const index4 = client.initIndex('Science_and_technology'); 

exports.indexScience = functions.firestore
    .document('Science_and_technology/{problemId}')
    .onCreate((snap,context)=>{
        const data = snap.data();
        const objectID = snap.id;
        return index4.addObject({
            objectID,data
        });
});

exports.unindexScience = functions.firestore
    .document('Science_and_technology/{problemId}')
    .onDelete((snap,context)=>{ 
        const objectID = snap.id;
        return index4.deleteObject(objectID);
});


//Money and finance---------------------------------------------------------------------
const index5 = client.initIndex('Money_and_finance'); 

exports.indexMoney = functions.firestore
    .document('Money_and_finance/{problemId}')
    .onCreate((snap,context)=>{
        const data = snap.data();
        const objectID = snap.id;
        return index5.addObject({
            objectID,data
        });
});

exports.unindexMoney = functions.firestore
    .document('Money_and_finance/{problemId}')
    .onDelete((snap,context)=>{ 
        const objectID = snap.id;
        return index5.deleteObject(objectID);
});


//Vehicles and transport---------------------------------------------------------------------
const index6 = client.initIndex('Vehicles_and_transport'); 

exports.indexTransport = functions.firestore
    .document('Vehicles_and_transport/{problemId}')
    .onCreate((snap,context)=>{
        const data = snap.data();
        const objectID = snap.id;
        return index6.addObject({
            objectID,data
        });
});

exports.unindexTransport = functions.firestore
    .document('Vehicles_and_transport/{problemId}')
    .onDelete((snap,context)=>{ 
        const objectID = snap.id;
        return index6.deleteObject(objectID);
});

 
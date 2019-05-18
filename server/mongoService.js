const { db } = require('./database');

exports.addConnection = (time) => {
  return new Promise((resolve, reject) => {
    db().collection("connections").insertOne(time, (err, res) => {

      //Error case
      if (err) {
        console.log('Database Connection Error:', err);
        reject("CONNECTION ERROR");
      }

      //Null result
      if (!res) {
        console.log('Database Connection Error: No document returned');
        reject("NULL RESULT ERROR");
      }

      //Return id of new element
      resolve({ id: res.insertedId });
    });
  });
}

exports.addPollData = (category, amount) => {
  return new Promise((resolve, reject) => {
    db().collection("pollResults").insertOne(
      {
        category: category,
        amount: amount
      }, 
      (err, res) => {

        console.log("ADDED "+amount+"to "+category+"!");

      //Error case
      if (err) {
        console.log('Database Connection Error: ', err);
        reject("CONNECTION ERROR");
      }

      //Null result
      if (!res) {
        console.log('Database Connection Error: No document returned');
        reject("NULL RESULT ERROR");
      }

      //Return id of new element
      resolve({ id: res.insertedId });
    });
  });
}

// exports.getPollResults = (categories) => {
  
//   return db().collection("pollResults").aggregate([
//     {$match: {category: {"$in" : categories}}},
//     {$group: { 
//       _id: "$category", 
//       total: { 
//           $sum: "$amount" 
//       }}}
//   ]).toArray();
// }

exports.getPollResults = async (categories) => {
  return db().collection("pollResults").aggregate([
    {$match: {category: {"$in" : categories}}},
    {$group: { 
      _id: "$category", 
      total: { 
          $sum: "$amount" 
      }}}
  ]).toArray();
}
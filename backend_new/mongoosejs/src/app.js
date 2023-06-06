const mongoose = require("mongoose");

//when working with remote server add these 2 paramteters as wll {useCreateIndex: true, useFindAndModify: true,}

//this actually is your promises
mongoose
  .connect("mongodb://localhost:27017/fullstackdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection succesfull!");
  })
  .catch((err) => {
    console.log(err);
  });

const schema = new mongoose.Schema({
  name: {
    type: String,
    //ADDING SOME VALIDATORS
    required: true,//validators for name 
    unique: true, //this means name must be unique
    lowercase: true,
  },
  type: String,
  lec: Number,
  published: Boolean,
  author: String,
  date: {
    type: Date,
    default: Date.now,
  },
});
//we define a model collection for documentation
const model = new mongoose.model("model", schema);
//under the line this equals qsync func
const createDocument = async () => {
  //define a try-catch for error handling
  try {
    //we define a schema for html schema we use the model which is we defined up
    const cssSchema = new model(
      {
        name: "CsS",
        type: "frontend",
        lec: 35,
        published: true,
        author: "Yarkin",
      } //model close
    ); //htmlSchema close
    const jsSchema = new model(
      {
        name: "JavaScript",
        type: "frontend",
        lec: 25,
        published: true,
        author: "Yarkin",
      } //model close
    ); //htmlSchema close


    const result = await model.insertMany([
      cssSchema,
      jsSchema,
    
    ]); //Save function save our documents
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

 //createDocument();

const getDocument = async () => {
  //$gte used for greater or equal than, $gt used for greater than
  //$lt used for less than, $lte used for less than or equal than
  //$in used for matches any of the values in the array .find({  type: {$in: ["backend", "database"]} })
  //$nin used for matches nıne of the values specified in the array bi üsttekinin tam tersi
      
  try {
    const result = await model
      .find({
        type: {$nin: ["frontend", "database"]}
      })
      .select({ name: 1 })
      //.limit(1);
    console.log(result);
    console.log("Your data has been readed");
  } catch (error) {
    console.log(error);
  }
};

// getDocument();
// try {
//   const result = await model.findByIdAndUpdate({_id}, {
//     $set: {
//       name: "nodeJS ADAMDIR"
//     }
//   },{new: true,useFindAndModify: false})
//   console.log(result);
// } This code blocks makes a update your data for the _id and print the updates on the console
const updateDocument = async(_id) => {
  try {
    const result = await model.findByIdAndUpdate({_id}, {
      $set: {
        name: "node"
      }
    },{new: true,useFindAndModify: false})
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
 //updateDocument("644a3877161aa427323210c2");
const deleteDocument = async(name) =>{
  try {
    const result = await model.deleteOne({ name: name });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
 //deleteDocument("node");
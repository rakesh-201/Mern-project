const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://rakesh:@cluster0.ciwiw.mongodb.net/mernproject?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("database connected.");
  })
  .catch(() => {
    console.log("database didn't connect.");
  });

import connectDB from "./db/connectdatabase.js";
import { app } from "./app.js";

connectDB()
  .then(
    app.listen(process.env.PORT,()=>{
        console.log(`app is listen on ${process.env.PORT} Port`);
    })
  )
  .catch((err) => {
    console.log(`DB connection error ${err} `);
  });

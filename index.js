require('dotenv').config()

const express = require("express");
const cors = require("cors");
const app = express();
const mongoose=require("mongoose")
const categoryRouter=require(`./API/Routes/Category`)
const vendorRouter=require(`./API/Routes/Vendor`)
const authRouter=require('./API/Routes/Auth')

mongoose.connect(`${process.env.MONGO_URI}`)

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('Server up and running!');
  });
app.use('/new',categoryRouter)
app.use('/get',categoryRouter)
app.use('/getone',categoryRouter)
app.use('/new',vendorRouter)
app.use('/get',vendorRouter)
app.use('/auth',authRouter)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});
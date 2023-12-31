const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const urlroute = require("./routes/url")

const app = express()
app.use(cors({
    origin: "*"
}))
app.use(express.json())

mongoose.set("strictQuery", false)
const db = "mongodb+srv://yashmulik95:LCxHhpOncymMLJiH@cluster0.arsxn0r.mongodb.net/?retryWrites=true&w=majority"
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connect");
    })
    .catch((err) => {
        console.log(err);
    });

app.use("/url", urlroute);

app.listen(3000, () => {
    console.log("server is running.");
})
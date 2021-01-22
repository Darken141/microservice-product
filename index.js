const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true , useUnifiedTopology: true})
const db = mongoose.connection


db.on('error', (error) => console.log(error))
db.on('open', () => console.log("Connected to Databse"))

db.on('open', function () {
    db.db.listCollections().toArray(function (err, names) {
      if (err) {
        console.log(err);
      } else {
        console.log(names);
      }

      mongoose.db.close();
    });
});

const PORT  = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send({
        message: "Product service"
    })
})

const productRouter = require('./routers/product.routes')

app.use("/products", productRouter)

app.get('*', (req, res) => {
    res.send({message: "API route not found"})
})


app.listen(PORT, () => {
    console.log(`Product service is up and running on port: ${PORT}`)
})
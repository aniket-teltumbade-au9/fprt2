const bodyParser = require("body-parser")
var express = require("express")
const db = require("./db")
const galleryRoute = require("./routers/galleryRoute")
const userRouter = require("./routers/userRoute")
const cors=require("cors")

var app = express()

var port = process.env.PORT

app.use(express.static(`${__dirname}/public`))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

db()

app.use('/user',userRouter)
app.use('/gallery',galleryRoute)

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})
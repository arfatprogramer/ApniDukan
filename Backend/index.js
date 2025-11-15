const express=require("express")
const cors=require("cors")
require('dotenv').config()
const connectDB =require("./config/db")
const index =require("./routes/index")
const admin = require("./routes/admin")
const vender = require("./routes/vender")
const cookieParser = require('cookie-parser')

const app=express()
const whitelist=[process.env.ADMIN_URL,process.env.FRONTEND_URL]

// get it form documentation

// const corsOptionsDelegate = function (req, callback) {
  
//     var corsOptions;
//     if (whitelist.indexOf(req.header('Origin')) !== -1) {
//       corsOptions = { origin: true, credentials:true } // reflect (enable) the requested origin in the CORS response
//     } else {
//       corsOptions = { origin: false,credentials:true } // disable CORS for this request
//     }
//     callback(null, corsOptions) // callback expects two parameters: error and options
//   }
  
// app.use(cors(corsOptionsDelegate))

app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api",index) // this is user middleware for all usr operation route
app.use("/admin",admin) // this is user middleware for all usr operation route
app.use("/vender",vender) // this is vender routes for all vender operation route

app.get("/",function(req,res) {
  res.json({
    message:"Welcome to ApniDukan, Server is Runnig",
    developedBy:"Mo Arfat Ansari, Mob: 8010623265",
    Client_url: process.env.FRONTEND_URL,
    Admin_url: process.env.ADMIN_URL,
  })
})

const port=3000

connectDB().then(()=>{     
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
    })
})

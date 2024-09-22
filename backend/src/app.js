import express from "express"
import cors from "cors"
import Mainpage from "./Routes/index.js"

const app= express()
app.use(cors())
const PORT=8000
app.use(express.json())
app.use(Mainpage)
app.listen(PORT,()=>console.log(`app is started in PORT ${PORT} `))
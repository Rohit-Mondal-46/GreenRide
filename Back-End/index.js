import express from "express";

const PORT = 3001;
const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    return res.end("Hello");
})

app.listen(PORT,()=>{
    console.log(`Server is Listening on PORT: ${PORT}`);
})


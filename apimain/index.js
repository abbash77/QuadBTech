const express=require('express')
const app=express()
const mongoose = require("mongoose");
const cors = require('cors');
const Data =require('./models/Data')
const axios = require('axios');
require('dotenv').config();
mongoose.connect(process.env.PASS);

app.get('/',(req,res)=>{
  res.json("hello")
})
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.get("/getData",async(req,res)=>{
    try {
        // Fetch data from the API
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const apiData = response.data;
        const dataArray = Object.values(apiData);
        console.log(dataArray)
        // Get only the first 10 items from the array
        const firstTenItems = dataArray.slice(0, 10);
        const finalData=firstTenItems.map(({name,last,buy,sell,volume,base_unit})=>{
            return {name,last,buy,sell,volume,base_unit}
        })
        const doc = await Data.insertMany(finalData);
        res.json(finalData)
        // Render the EJS template and pass the data
        
      } catch (error) {
        console.error(error);
      }
})
app.listen(4000)
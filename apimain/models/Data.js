const mongoose=require('mongoose')
const {Schema,model}=mongoose
const DataSchema=new Schema({
    name:{type:String},
    last:{type:Number},
    buy:{type:Number},
    sell:{type:Number},
    volume:{type:Number},
    base_unit:{type:String},
})


const DataModel = model('Data', DataSchema);

module.exports = DataModel;
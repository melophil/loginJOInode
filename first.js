const express=require('express')
const app=express();
const port=3000;
const path=require('path')
const joi=require('joi');
const Joi = require('joi');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:true}))
const schema=Joi.object().keys({
    name:Joi.string().min(3).max(30).required(),
    email:Joi.string().email().required(),
    pass:Joi.string().min(6).required()
});


app.get('/',(req,resp)=>{
    resp.sendFile(path.join(__dirname,'public','index.html'))
})
app.post('/submit',(req,resp)=>{
    const{error,value}=schema.validate(req.body);
    if(error){
        return resp.status(400).send(error.details[0].message);

    }

    const {name,email,pass}=value;
    resp.send(`Name:${name}  , Email:${email} ,  Password:${pass}`)

})
app.listen(port,()=>{
    console.log(`Server is runing on the http://localhost:${port}`)
})







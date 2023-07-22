const express=require('express');
const bodyParser=require("body-parser");
const https=require('https');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("home");
});
let wdata;

app.get("/weatherinfo",function(req,res){
    // wdata=JSON.parse(wdata);
    let winfo=req.query.valid;
    // console.log("hello",winfo);
    winfo=JSON.parse(winfo);
    // console.log("hello",winfo);
    res.render("index.ejs",{wd:winfo});
})
app.post("/",function(req,res){
    let location=req.body.loc;
    console.log(location);
    let api="598c6fba98bfc8e7b607eeb35497c757";
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}&units=metric`;
    https.get(url,function(resp){
        // console.log(res.statusCode);
        resp.on("data",function(data){
            wdata=JSON.parse(data);
            console.log(wdata);
            res.redirect('/weatherinfo?valid='+ data );   
        })
        
    })
   


});


app.listen(3000,function(){
    console.log("Server started at port 3000");
});


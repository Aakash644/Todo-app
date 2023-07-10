const express=require("express");
const bodyParser=require("body-parser");

const app=express();
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
 
var items=[];
//function to search for items in the list to delete 
function search(items,val){
    for(let i=0;i<items.length;i++){
        if(items[i]===val){
            return i;
        }
    }
    return -1;
}

app.get('/',function(req,res){
    
    res.render('index',{items:items});
});

app.post('/',function(req,res){
    var item=req.body.newitem;
    if(item!=""){
    items.push(item); }
 
    res.render('index',{items:items});
});
//delete route
app.post('/del',function(req,res){
    var item2=req.body.item;
    console.log(item2); 
    if(search(items,item2)>=0){
        items.splice(search(items,item2),1);
    }
    res.render('index',{items:items});
});

app.listen(3000,function(){
console.log("listening on port 3000.");
});

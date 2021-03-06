var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var item_detail_name,item_master_id,total_items,damaged_items,description;

router.get('/',function(req,res){
    var sql="SELECT item_details.*, item_masters.item_master_name,item_masters.hsn_code from item_details JOIN item_masters on item_details.item_master_id=item_masters.item_master_id order by item_master_id";
    res.contentType('application/json')
    connect.query(sql, function (err, result, fields) {
        if (err || result.length == 0){        
            res.writeHead(401);
            res.end();
        }else{
            res.end(JSON.stringify(result));
        }
    });
});

router.post('/',function(req,res){

    item_detail_name=req.body.item_detail_name;
    item_master_id=req.body.item_master_id;
    total_items=req.body.total_items;
    damaged_items=req.body.damaged_items;
    description=req.body.description;
    
    sql="INSERT INTO item_details(item_detail_name,item_master_id,total_items,damaged_items,description) values ('"+item_detail_name+"','"+item_master_id+"','"+total_items+"','"+damaged_items+"','"+description+"')";
        console.log(sql);
        connect.query(sql, function (err, result) {
            if (err || result.length == 0){        
                res.writeHead(401);
                res.end();
            }else{
                res.writeHead(200);
                res.end();
            }
    });
});

router.put('/:item_detail_id',function(req,res){

    item_detail_id=req.params.item_detail_id;
    item_detail_name=req.body.item_detail_name;
    item_master_id=req.body.item_master_id;
    total_items=req.body.total_items;
    damaged_items=req.body.damaged_items;
    description=req.body.description;
    
    sql="UPDATE item_details set item_detail_name='"+item_detail_name+"',item_master_id="+item_master_id+",total_items="+total_items+",damaged_items="+damaged_items+",description='"+description+"' WHERE item_detail_id="+item_detail_id+"";
    console.log(sql);
    connect.query(sql, function (err, result) {
        if (err || result.length == 0){        
            res.writeHead(401);
            res.end();
        }else{
            res.writeHead(200);
            res.end();
        }
    });
});

router.delete('/:item_detail_id',function(req,res){

    item_detail_id=req.params.item_detail_id;
    
    sql="DELETE FROM item_details WHERE item_detail_id="+item_detail_id+"";
        console.log(sql);
        connect.query(sql, function (err, result) {
            if (err || result.length == 0){        
                res.writeHead(401);
                res.end();
            }else{
                res.writeHead(200);
                res.end();
            }
    });
});
module.exports = router;
const express=require('express');
const cors=require('cors');
const app=express();
const mysql=require('mysql2');
app.use(cors());
app.use(express.json());

//now after import the mysql then connect the database
//this is the data configuration
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'todo'

})
//now connect
db.connect((err)=>{
    if(err)
    {
        console.log("error connecting to the database");//if error is there then this statement will print and return it,below statement is not printed
    return
    }
    console.log("connected with database");
})

app.get('/',(requestAnimationFrame,res)=>{
    console.log("default route");
    //now fetch the data after inserting is completed
    db.query('select * from todoitems',(err,result)=>{
        if(err)
            {
                console.log("error occured")
                return
            }
            console.log("data:",result);
            res.send(result)
    })
})
app.post('/add-item',(req,res)=>{//data from frontend come to this route,thats why we write it 
    console.log(req.body);
    
    //now database query is inserted here
    db.query(`insert into todoitems(itemdescription) values ('${req.body.text}')`,(err,results)=>{
        if(err)
        {
            console.log("error occured")
            return
        }
        console.log("created successfully")
    })
    res.send("added successfully")
})
app.put('/edit-item',(req,res)=>{
    console.log('line 55:',req.body);
    db.query(`update todoitems set itemdescription="${req.body.itemdescription}"where id=${req.body.id}`,(err,results)=>{
        if(err)
        {
            console.log("error occured")
            return
        }
        console.log("created successfully")
    })
    res.send("success");
})
app.delete('/delete-item/:id', (req, res) => {
    const id = req.params.id;
    db.query(`DELETE FROM todoitems WHERE id=${id}`, (err, results) => {
        if (err) {
            console.log("error occurred");
            return;
        }
        console.log("deleted successfully");
        res.send("deleted successfully");
    });
});



app.listen(3000,()=>{
    console.log("server started running on port 3000")
})
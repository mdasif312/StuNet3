var MongoClient = require('mongodb').MongoClient;
var database;
var url = "mongodb+srv://admin:admin@cluster0.mongodb.net/stunet";
// server.js
// BASE SETUP test
// =============================================================================
// call the packages we need

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

globalErrorResponse={message:"Something went wrong try again.",result:0};
invalidParams={message:"Invalid params",errCode:100,result:0};
var ObjectID = require('mongodb').ObjectID;

execute=(callback) => {

   if(database!=null){
      return callback(database);
    }

  else{

      MongoClient.connect(url, (err,client) => {

      if(err)
          return globalErrorResponse;

      else{
        database=client.db('stunet');
        return callback(database);
      }

    });
  }

};

router.get('/', function(req, res) {

      res.send('Stunet Git Test');

});

router.post('/cities', function(req, res) {

      execute((db) => {


        db.collection('city')
                .find()
                .toArray((err,response) => {
                  if(err)
                    res.json(globalErrorResponse);
                  else {
                    res.json({'data':response});
                  }

                });
      });

});

router.post('/templates', function(req, res) {

      execute((db) => {


        db.collection('template')
                .find()
                .toArray((err,response) => {
                  if(err)
                    res.json(globalErrorResponse);
                  else {
                    res.json({'data':response});
                  }

                });
      });

});

router.post('/addtemplatetoshop', function(req, serres) {

      execute((db) => {

        if(req.body.id!=null&&req.body.shopid!=null)
        {
        db.collection('template')
          .findOne({_id:new ObjectID(req.body.id)},(err,tempres) => {

            if(tempres==null)
              serres.send(globalErrorResponse);
            else {

              db.collection('shop')
                .findOne({_id:new ObjectID(req.body.shopid)},(err,shopres) => {

                  if(shopres==null)
                    serres.send(globalErrorResponse);
                  else{

                    for (var i = 0; i < tempres.data.length; i++) {
                      tempres.data[i].shopid=req.body.shopid;
                    }

                    console.log(tempres.data);


                      db.collection('product')
                        .insertMany(tempres.data,(err,insertres) => {

                          if(insertres==null)
                            serres.send(globalErrorResponse);
                          else {
                            serres.send({message:"template added to shop Successfully",result:1});
                          }
                        });
                  }

            });
          }

          });

        }
        else {
          serres.json(globalErrorResponse);
        }


      });

});

router.post('/categories', function(req, res) {

      execute((db) => {


        db.collection('category')
                .find()
                .toArray((err,response) => {
                  if(err)
                    res.json(globalErrorResponse);
                  else {
                    res.json({'data':response});
                  }

                });
      });

});

router.post('/shops', function(req, res) {

      execute((db) => {


        db.collection('shop')
                .find({'cityid':req.body.cityid})
                .skip(parseInt(req.body.offset))
                .limit(parseInt(req.body.count))
                .sort({'rating':-1})
                .toArray((err,response) => {
                  if(err)
                    res.json(globalErrorResponse);
                  else {
                    res.json({'data':response});
                  }

                });
      });

});

router.post('/shopproducts', function(req, res) {

      execute((db) => {

        sortkey=req.body.sortkey;
        sortorder=-1;

        if(req.body.sortorder!=null&&sortorder==="1"||sortorder==="-1") //1 means ascending, -1 means descending value
          sortorder=parseInt(req.body.sortorder);

        db.collection('product')
                .find({'shopid':req.body.shopid})
                .sort({sortkey:sortorder})
                .limit(parseInt(req.body.count))
                .toArray((err,response) => {
                  if(err)
                    res.json(globalErrorResponse);
                  else {
                    res.json({'data':response});


                  }

                });
      });

});

router.post('/productslots', function(req, res) {

      execute((db) => {


       if(req.body.productid!=null){
        db.collection('slot')
                .find({'productid':req.body.productid})
                .toArray((err,response) => {
                  if(err)
                    res.json(globalErrorResponse);
                  else {
                    res.json({'data':response});
                  }

                });


        }
        else
        {
          res.json(globalErrorResponse);
        }


      });

});

router.post('/searchshops', function(req, res) {

      execute((db) => {

        query = { $text: { $search: "\""+req.body.query+"\"" } } ;
        db.collection('shop')
                .find(query)
                .limit(20)
                .toArray((err,response) => {
                  console.log(err);
                  if(err)
                    res.json(globalErrorResponse);
                  else {
                    res.json({'data':response});
                  }

                });
      });

});

router.post('/searchproducts', function(req, res) {

      execute((db) => {

        query = { $text: { $search: "\""+req.body.query+"\"" } } ;
        db.collection('product')
                .find(query)
                .limit(20)
                .toArray((err,response) => {
                   console.log(err);
                  if(err)
                    res.json(globalErrorResponse);
                  else {
                    res.json({'data':response});
                  }

                });
      });

});

router.post('/createshop', function(req, res) {

      execute((db) => {

        if(req.body.name!=null&&req.body.desc!=null&&req.body.category!=null&&req.body.address!=null&&req.body.city!=null&&req.body.owner_mail!=null&&req.body.owner_mobile!=null)
        {
          db.collection('shop')
                  .insertOne({name:req.body.name,
                              desc:req.body.desc,
                              category:JSON.parse(req.body.category),
                              address:req.body.address,
                              city:JSON.parse(req.body.city),
                              owner_mail:req.body.owner_mail,
                              owner_mobile:req.body.owner_mobile,
                              rating:0},(err,response) => {
                                  if(err)
                                    res.json(globalErrorResponse);
                                  else
                                      res.json({message:"Shop Created Successfully..",result:1});
                              });

        }
        else {
          res.json(invalidParams);
        }

      });


  });

router.post('/createproduct', function(req, res) {

            execute((db) => {

              if(req.body.name!=null&&req.body.price!=null&&req.body.shopid!=null&&req.body.type!=null)
              {


              console.log(req.body.images);
              req.body.images=req.body.images.slice(1,req.body.images.length-1);
              var array = req.body.images.split(",");

              for(i=0;i<array.length;i++){
                console.log(array[i]);
                console.log("------------");

              }
              console.log(array.length);
                db.collection('product')
                        .insertOne({name:req.body.name,
                                    price:req.body.price,
                                    shopid:req.body.shopid,
                                    desc:req.body.desc,
                                    type:req.body.type,
                                    images:array,
                                    rating:0},(err,response) => {
                                        if(err)
                                          res.json(globalErrorResponse);
                                        else
                                            res.json({message:"Product Created Successfully..",result:1});
                                    });

              }
              else {
                res.json(invalidParams);
              }

            });


});

router.post('/bookproduct', function(req, serverresponse) {

            execute((db) => {

              if(req.body.productid!=null&&req.body.slotid!=null&&req.body.quantity!=null&&req.body.userid!=null)
              {

                db.collection('product')
                  .findOne({_id:new ObjectID(req.body.productid)},(err,productres) => {


                    if(productres==null)
                    serverresponse.json(globalErrorResponse);

                    else{
                      db.collection('slot')
                        .findOne({_id:new ObjectID(req.body.slotid)},(err,slotres) => {

                          if(slotres==null)
                          serverresponse.json(globalErrorResponse);
                          else {



                            var orderObject={userid:req.body.userid,
                                    product:productres,
                                    slot:slotres,
                                    quantity:req.body.quantity,
                                    price:(productres.price*req.body.quantity)
                                  };


                             db.collection('order')
                                    .insertOne(orderObject,

                                    (err,response) => {
                                        if(err)
                                          serverresponse.json(globalErrorResponse);
                                        else
                                            serverresponse.json({order:orderObject,message:"Order Created Successfully..",result:1});


                                    });


                          }

                      });
                    }

                  });
              }
              else {
                serverresponse.json(invalidParams);
              }

            });


});

router.post('/createslot', function(req, res) {

            execute((db) => {

              if(req.body.date!=null&&req.body.starttime!=null&&req.body.duration!=null&&req.body.productid!=null)
              {

                db.collection('slot')
                        .insertOne({date:req.body.date,
                                    starttime:
                                    (req.body.starttime),
                                    duration:parseInt(req.body.duration),
                                    productid:req.body.productid
                                  },(err,response) => {
                                        if(err)
                                          res.json(globalErrorResponse);
                                        else
                                            res.json({message:"Slot Created Successfully..",result:1});
                                    });

              }
              else {
                res.json(invalidParams);
              }

            });


});

router.post('/login',(req,res) => {


  execute((db) => {
    if(req.body.mobile!=null)
      {
        db.collection('user')
            .findOne({'mobile':req.body.mobile},
            (err,response) => {

              //no user exsists with given number, hence create account

              if(response!=null){

                  res.json({'message':'OTP has been sent to '+req.body.mobile,result:1});

                  // db.collection('user-otp')
                  //             .insertOne({otp:'1244',
                  //                         userid:req.body.userid},(err,response) => {
                  //
                  //                             if(err)
                  //                               res.json(globalErrorResponse);
                  //                             else
                  //                                 res.json({message:"OTP Verified Successfully..",result:1});
                  //
                  //                         });

            }

              else {
                  res.json({'message':'User not registered ! Please Sign up !',result:0});
              }


          });

        }
    else {
            res.json(invalidParams);
          }
  });

});

router.post('/register',(req,res) => {


  execute((db) => {

  if(req.body.name!=null&&req.body.mobile!=null)
    {
    db.collection('user')
            .insertOne({name:req.body.name,
                        mobile:req.body.mobile},(err,response) => {

                            if(err)
                              res.json(globalErrorResponse);
                            else
                                res.json({message:"User Created Successfully..",result:1});

                        });


      }
      else {
        res.json(invalidParams);
      }


    });

});

router.post('/orders', function(req, res) {

      execute((db) => {

        queryJson=null;

        if(req.body.userid==null&&req.body.shopid!=null)
        queryJson= {"product.shopid": req.body.shopid};

        if(req.body.userid!=null&&req.body.shopid==null)
          queryJson={"userid":req.body.userid};

          db.collection('order')
            .find(queryJson)
            .toArray((err,orderres) => {
              console.log(err);
              console.log(orderres);
              if(orderres==null){
                res.json({'data':null,'message':'No orders Found',result:1});
            }
            else {
              res.send({'data':orderres,result:1});
            }


          });


      });

});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/v1', router);

// START THE SERVER
// =============================================================================


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
//let me see if i got changes

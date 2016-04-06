'use strict';
var eventsConfig =('./config');
var http=require('http');
var hotelModule=require('./hotelMdl'); //bring reference to hotel module.
var events=require('events');
http.createServer(function(req,res){
        res.writeHead(200); //status code in header
        // our first hotel object details
        var hotel1Details={
            starsNum:0,
            hotelName:'beresheet',
            type:'boutique'
        }
        //our second hotel object details
        var hotel2Details={
            starsNum:0,
            hotelName:'Herods',
            type:'spa'
        }

        //creating our first hotel
        var hotel1= new hotelModule();
        hotel1.setAllData(hotel1Details);

         //creating our second hotel
        var hotel2= new hotelModule();
        hotel2.setAllData(hotel2Details);

        //listening to any hotel stars ranking changes.
        hotel1.on(eventsConfig.CHANGE,hotel1.displayNumOfStars);
        hotel1.on(eventsConfig.CHANGE,hotel1.writeToLog);
        hotel1.on(eventsConfig.CHANGE,hotel1.checkOverdraw);

        hotel2.on(eventsConfig.CHANGE,hotel2.displayNumOfStars);
        hotel2.on(eventsConfig.CHANGE,hotel2.writeToLog);
        hotel2.on(eventsConfig.CHANGE,hotel2.checkOverdraw);

        //making some chnges in the amounth of stars.
        hotel1.addStars(8);
        hotel1.removeStars(5);
        hotel1.removeStars(4); //testing a negative number.

        hotel2.addStars(15); //testing another hotel object.
       
        var myLog=hotelModule.getLog(); //receive from "Hotel module" the total log variable.
       
        //send response body 
        res.write("<h1>success</h1>");
        res.write(myLog); // write the log variable to the response to the browser.
        res.end(); //send and close connection.

}).listen(8080); //listen for connection on this port.
console.log("listening on port 8080");
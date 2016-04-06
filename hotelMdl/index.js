
'use strict';
var eventsConfig =('./config');
var EventEmitter=require('events');
        var myLog="";

    module.exports=class Hotel extends EventEmitter{//class for Hotel object

        constructor(){
                    super();   
                    this.data={//will hold the dateils for each hotel
                        starsNum:null,
                        hotelName:null,
                        type:null,
                    };
        }

        setAllData(info){ //setting the hotel object data.
             for(var i in this.data){
               this.data[i]=info[i];
             }
        };

        addStars(amount){
            this.data.starsNum+=amount;
            this.emit(eventsConfig.CHANGE); //fire event- amoubth of stars changed.
        }

        removeStars(amount){
            this.data.starsNum-=amount;
            this.emit(eventsConfig.CHANGE); //fire event- amoubth of stars changed.
        }

        displayNumOfStars(){ 
            console.log("---amount of stars changed!\n>hotel name:"+this.data.hotelName+"\n>hotel type:"+this.data.type+"\n>the updated num of stars is:" + this.data.starsNum+"\n----------------------------------");
        } 

        writeToLog(){
            myLog+="<b>log: amount of stars changed!</b><br>>hotel name:"+this.data.hotelName+"<br>>hotel type:"+this.data.type+"<br>>the updated num of stars is:" + this.data.starsNum+"<br><br>";  
        }
 
  
        checkOverdraw(){
            if(this.data.starsNum<0){
                 console.log("you reached negative amounth of stars!! changing it back to zero...");
                 myLog+=("you reached negative amounth of stars!! changing it back to zero...<br>");
                 this.addStars((-1)*this.data.starsNum);
            }
         }

}

module.exports.getLog=function(){
        return myLog;
 };
 
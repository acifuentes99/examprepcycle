module.exports = {

    calGetId: function(){
        var that = this;
        this.calendar.calendarList.list({
        }, 
        function (err, response){
            if(response){
                console.log('working');
                response.items.forEach(function(item) {
                    if(item.summary == 'Exam Prep Cicle'){ 
                        console.log('deleting calendar..');
                        that.delCalendar(item.id);
                    }
                    if(item.summary == 'U: Certamenes') that.CertId = item.id;
                });
                that.createCal(); //Create the calendar yes or yes, after seeking exam prep.
            }
            else{ 
                return 'noresponse';
            }
        });
    },

    delCalendar: function(iddel){
        var that = this;
        this.calendar.calendarList.delete({ 
            calendarId: iddel 
        });
    },

    createCal: function(){
        var that = this;
        this.calendar.calendars.insert({
            'resource':{
            summary: 'Exam Prep Cicle'
            }
        }, function(err, response) {
            if(err) console.log(err);
            if(response){
                console.log('calendar created!');
                console.log(response.id);
            }
            that.ExamCalId = response.id;
            that.getEvents();
        });
    },

    getEvents: function(){
        var that = this;
        var now = new Date();
        console.log(now);
        this.calendar.events.list({
            'calendarId': that.CertId,
            'timeMin': ISODateString(now)
        },
        function(err, response){
            if(err) console.log(err);
            response.items.forEach(function(ev) {
                console.log(ev.summary+'  '+ev.start.date); 
            }); 
            that.certItems = response.items;
            that.insertEvents();
        });
    },

    insertEvents: function(){
        var that = this;
        this.certItems.forEach(function(ev) {
            var from = ev.start.date.split("-");
            var startDay = new Date(from[0], from[1] - 1, from[2]); 
            console.log('timeZone: '+ev.start.timeZone);
            that.insertph1(startDay, ev.start.timeZone, ev.summary);
            if
        });
    },
    
    insertph1: function(start, tzone, name){
        var that = this;
        //console.log('start: '+start.toDateString()+'; '+start.yyyymmdd());
        var _start = new Date();
        var _end = new Date();
        _start.setTime(start.getTime() - _10days);
        _end.setTime(start.getTime() - _6days); 

        //console.log(name+'  :'+_start.toDateString()+'; '+_end.toDateString());
        //console.log(name+'  :'+_start.yyyymmdd()+'; '+_end.yyyymmdd());
        var object = {
              'summary': 'Prepare Exam Rehersals for: '+name,
              'end': {
                date: _end.yyyymmdd(),
                timeZone: tzone
              },
              'start': {
                date: _start.yyyymmdd(), 
                timeZone: tzone
              }
        };
        this.calendar.events.insert({
            calendarId: that.ExamCalId,
            'resource': object
        },
        function(err, response) {
            if(err) console.log(err);
            if(response) {
                that.insertph2(start, tzone, name);
            }
        });
    },

    insertph2: function(start, tzone, name){
        var that = this;
        var _start = new Date();
        var _end = new Date();
        _start.setTime(start.getTime() - _5days);

        var object = {
              'summary': 'Exam Rehersal #1 for: '+name,
              'end': {
                date: _start.yyyymmdd(),
                timeZone: tzone
              },
              'start': {
                date: _start.yyyymmdd(), 
                timeZone: tzone
              }
        };
        this.calendar.events.insert({
            calendarId: that.ExamCalId,
            'resource': object
        },
        function(err, response) {
            if(err) console.log(err);
            if(response) {
                that.insertph3(start, tzone, name);
            }
        });
    },

    insertph3: function(start, tzone, name){
        var that = this;
        var _start = new Date();
        var _end = new Date();
        _start.setTime(start.getTime() - _5days);
        _end.setTime(start.getTime() - _2days); 

        var object = {
              'summary': 'Study specific sessions for: '+name,
              'end': {
                date: _end.yyyymmdd(),
                timeZone: tzone
              },
              'start': {
                date: _start.yyyymmdd(), 
                timeZone: tzone
              }
        };
        this.calendar.events.insert({
            calendarId: that.ExamCalId,
            'resource': object
        },
        function(err, response) {
            if(err) console.log(err);
            if(response) {
                that.insertph4(start, tzone, name);
            }   
        });
    },

    insertph4: function(start, tzone, name){
        var that = this;
        var _start = new Date();
        _start.setTime(start.getTime() - _2days);

        var object = {
              'summary': 'Exam Rehersal #2 for: '+name,
              'end': {
                date: _start.yyyymmdd(),
                timeZone: tzone
              },
              'start': {
                date: _start.yyyymmdd(), 
                timeZone: tzone
              }
        };
        this.calendar.events.insert({
            calendarId: that.ExamCalId,
            'resource': object
        },
        function(err, response) {
            if(err) console.log(err);
            if(response) console.log('done!');
        });
    }


}

var _10days = 10*24*60*60*1000;
var _6days = 6*24*60*60*1000;
var _5days = 5*24*60*60*1000;
var _2days = 2*24*60*60*1000;

Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy +'-'+ (mm[1]?mm:"0"+mm[0]) +'-'+ (dd[1]?dd:"0"+dd[0]); // padding
};

function ISODateString(d){
 function pad(n){return n<10 ? '0'+n : n}
 return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())+'Z'

}

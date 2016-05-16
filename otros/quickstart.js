var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly','https://www.googleapis.com/auth/calendar'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Los Authorize
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  //authorize(JSON.parse(content), listEvents);
  authorize(JSON.parse(content), examPrep);
  //authorize(JSON.parse(content), createTheCal);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  var calendar = google.calendar('v3');
  calendar.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;
    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 10 events:');
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
      }
    }
  });
}


function createTheCal(auth){
    var calendar = google.calendar({version:'v3', auth: auth});
        calendar.calendars.insert({
            'resource':{
                'summary': "Exam Prep Cicle"
            }
        }, function(err, response) {
            if(response){
                console.log('calendar created!');
            }
            if(err){
                console.log(err);
            }
        });

}

     
    function examPrep(auth) {
        var calendar = google.calendar({version:'v3', auth: auth});
        examPrepApp.calendar = calendar;
        examPrepApp.calendar.calendarList.list({
            auth: auth,
        }, function(err, response) {
            if(err) { return; }
            var calendars = response.items;
            /*
            calendars.forEach(function(item) {
                console.log(item.summary+', ID: '+item.id)
                });
                */
                 examPrepApp.calGetId();
        });
    }

/* 
* Mi Super Variable examPrepApp, con sus métodos, this y todo :p.
* */
var examPrepApp = {
            
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


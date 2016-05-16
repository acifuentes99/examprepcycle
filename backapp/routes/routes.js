
var path = process.cwd();
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var adata= require(path+'/backapp/auth.js');
var examprep = require(path+'/backapp/examprep.js');
var calendars = [];

var oauth2Client = new OAuth2(adata.googleAuth.clientID, adata.googleAuth.clientSecret, adata.googleAuth.callbackURL);

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/calendar'
];

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: scopes // If you only need one scope you can pass it as string
});



module.exports = function (app) {

    app.route('/')
        .get(function(req, res) {
            //res.sendFile(process.cwd() + '/public/index.html');
            res.render('index.ejs', { gurl: url});
    });

    app.route('/cal')
    .get(function(req, res) {
        res.render('calendars.ejs', { gurl: url, cal: calendars });
    })
    .post(function(req, res){
        examprep.examcal = req.body.examcal;
        examprep.calname = req.body.calname;
        console.log(examprep.examcal);

       examPrep(oauth2Client, res); 
    });

    app.route('/done')
    .get(function(req, res){
        res.send('Done!. Now go to your calendar')
    }),

    app.route('/authcallback')
    .get(function(req, res) {
        var code = req.query.code;
            oauth2Client.getToken(code, function(err, tokens){
            oauth2Client.credentials = tokens;
            listCalendars(oauth2Client, res);
          });
    });


//examprep.examPrep(auth);

};

function examPrep(auth, next) {
    var calendar = google.calendar({version:'v3', auth: auth});
    examprep.calendar = calendar;
    examprep.next = next;
    examprep.calendar.calendarList.list({
        auth: auth,
    }, function(err, response) {
        if(err) { return; }
        var calendars = response.items;
        examprep.calGetId();
    });
}

function listCalendars(auth, next) {
    var calendar = google.calendar({version:'v3', auth: auth});
    calendar.calendarList.list({
    }, function(err, response) {
        if(err) { return; }
        calendars = response.items;
        next.redirect('/cal');
    });
}

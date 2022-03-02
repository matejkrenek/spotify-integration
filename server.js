const app = require('express')();
const port = 3000;
var client_id = '0fe327d698b442b5b39a2096d1525e87'; // Your client id
var client_secret = 'ed76c5031c264b84981d0203b458daf5'; // Your secret
var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/index');
})

app.get('/login', (req, res) => {
    var scope = 'user-read-private user-read-email';
  
    res.redirect('https://accounts.spotify.com/authorize?' +
        QueryString.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
        })
    );
});

app.get('/callback', function(req, res) {

    var code = req.query.code || null;
  
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
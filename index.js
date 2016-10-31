const express = require('express');

const app = express();

app.use(express.static(__dirname));

app.set('port', process.env.PORT || 8080);

app.get('/', function(req, res) {
  res.sendFile('/index.html');
})

app.listen(app.get('port'), function () {
  console.log('listening at', app.get('port'));
})

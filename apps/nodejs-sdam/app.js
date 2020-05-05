const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:31000,localhost:31001/?replicaSet=rs';
const client = new MongoClient(url);

client.on('serverDescriptionChanged', function(event) {
  console.log('received serverDescriptionChanged');
  console.log(JSON.stringify(event, null, 2));
});

client.on('serverHeartbeatStarted', function(event) {
  console.log('received serverHeartbeatStarted');
  console.log(JSON.stringify(event, null, 2));
});

client.on('serverHeartbeatSucceeded', function(event) {
  console.log('received serverHeartbeatSucceeded');
  console.log(JSON.stringify(event, null, 2));
});

client.on('serverHeartbeatFailed', function(event) {
  console.log('received serverHeartbeatFailed');
  console.log(JSON.stringify(event, null, 2));
});

client.on('serverOpening', function(event) {
  console.log('received serverOpening');
  console.log(JSON.stringify(event, null, 2));
});

client.on('serverClosed', function(event) {
  console.log('received serverClosed');
  console.log(JSON.stringify(event, null, 2));
});

client.on('topologyOpening', function(event) {
  console.log('received topologyOpening');
  console.log(JSON.stringify(event, null, 2));
});

client.on('topologyClosed', function(event) {
  console.log('received topologyClosed');
  console.log(JSON.stringify(event, null, 2));
});

client.on('topologyDescriptionChanged', function(event) {
  console.log('received topologyDescriptionChanged');
  console.log(JSON.stringify(event, null, 2));
});

client.connect(function(err, client) {
  if(err) throw err;
});


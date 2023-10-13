'use strict';

var Transport = require('./node_modules/azure-iot-device-amqp').Amqp; // require('azure-iot-device-mqtt').Mqtt;

var Client = require('./node_modules/azure-iot-device/device').ModuleClient;
var Message = require('./node_modules/azure-iot-device/device').Message;

var connector = require('./connector');

Client.fromEnvironment(Transport, function (err, client) {
  // Client.fromConnectionString(Transport, function (err, client) {
  if (err) {
    throw err;
  } else {
    client.on('error', function (err) {
      throw err;
    });

    // connect to the Edge instance
    client.open(function (err) {
      if (err) {
        throw err;
      } else {
        console.log('IoT Hub module client initialized');

        client.getTwin(function (err, twin) {
          if (err) {
            console.error('Error getting twin: ' + err.message);
          } else {
            twin.on('properties.desired', function (delta) {
              console.log('Getting twin: ');
              console.log(delta);
              if (delta) {
                this.devices = delta;
                setTimeout(() => {
                  connector.setConnection(this.devices, client, Message);
                }, 1000);
                // connector(delta, client)
              }
            });
          }
        });
      }
    });
  }
});

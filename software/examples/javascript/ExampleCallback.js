var Tinkerforge = require('tinkerforge');

var HOST = 'localhost';
var PORT = 4223;
var UID = 'i33'; // Change to your UID

var ipcon = new Tinkerforge.IPConnection(); // Create IP connection
var ptc = new Tinkerforge.BrickletPTC(UID, ipcon); // Create device object

ipcon.connect(HOST, PORT,
    function(error) {
        console.log('Error: '+error);
    }
); // Connect to brickd
// Don't use device before ipcon is connected

ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED,
    function(connectReason) {
        // Set Period for temperature callback to 1s (1000ms)
        // Note: The callback is only called every second if the
        // temperature has changed since the last call!
        ptc.setTemperatureCallbackPeriod(1000);
    }
);

// Register temperature callback
ptc.on(Tinkerforge.BrickletPTC.CALLBACK_TEMPERATURE,
    // Callback function for temperature
    function(temp) {
        console.log('Temperature: '+temp/100.0+' °C');
        console.log();
    }
);

console.log("Press any key to exit ...");
process.stdin.on('data',
    function(data) {
        ipcon.disconnect();
        process.exit(0);
    }
);

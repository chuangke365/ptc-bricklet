function octave_example_simple
    more off;
    
    HOST = "localhost";
    PORT = 4223;
    UID = "i4G"; % Change to your UID

    ipcon = java_new("com.tinkerforge.IPConnection"); % Create IP connection
    ptc = java_new("com.tinkerforge.BrickletPTC", UID, ipcon); % Create device object

    ipcon.connect(HOST, PORT); % Connect to brickd
    % Don't use device before ipcon is connected

    % Get current temperature (unit is °C/100)
    temperature = ptc.getTemperature()/100;

    fprintf("Temperature: %g °C\n", temperature);

    input("\nPress any key to exit...\n", "s");
    ipcon.disconnect();
end
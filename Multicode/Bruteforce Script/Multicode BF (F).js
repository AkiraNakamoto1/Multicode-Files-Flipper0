let storage = require("storage");
let subghz = require("subghz");
let dirpath = "/ext/subghz/Created/Multicode";

// Setup Sub-GHz radio
print("Setting up Sub-GHz radio...");
let setupResult = subghz.setup();
if (setupResult === true) {
    print("Sub-GHz radio setup complete.");
} else {
    print("Failed to set up Sub-GHz radio.");
}

function transmitSubFile(filepath) {
    print("Attempting to transmit file: " + filepath);

    // Transmit file, and explicitly handle the result
    let result = subghz.transmitFile(filepath);

    // Explicitly check the result of the transmission
    if (result === true) {
        print("Send success: " + filepath);
    } else {
        print("Send failed: " + filepath);
    }

    delay(2000);  // 2 seconds delay between transmissions
}

// Process files from file1.sub to file1024.sub without storing all paths in memory
for (let i = 1; i <= 1024; i++) {
    let filepath = dirpath + "/file" + to_string(i) + ".sub";
    print("Processing file " + to_string(i) + " of 1024");

    // Check if the file exists before attempting to transmit
    if (storage.exists(filepath)) {
        transmitSubFile(filepath);
    } else {
        print("File does not exist: " + filepath + ". Skipping...");
    }

    delay(1000);  // Additional delay to ensure stability
}

print("Brute force transmission completed.");

// Set the radio back to idle mode after the transmission is complete
subghz.setIdle();
print("Sub-GHz radio set to idle.");

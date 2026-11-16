const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter filename: ", function (filename) {

    rl.question("Enter content: ", function (content) {

        // Create / write file
        fs.writeFile(filename, content, "utf8", function (err) {

            if (err) {
                console.log("Error creating file:", err);
                rl.close();
                return;
            }

            console.log("File created successfully.");

            // Read file
            fs.readFile(filename, "utf8", function (err, data) {

                if (err) {
                    console.log("Error reading file:", err);
                    rl.close();
                    return;
                }

                console.log("\nInitial file content:");
                console.log(data);

                rl.question(
                    "\nEnter additional content: ",
                    function (additionalContent) {

                        // Append content
                        fs.appendFile(
                            filename,
                            "\n" + additionalContent,
                            "utf8",
                            function (err) {

                                if (err) {
                                    console.log(
                                        "Error appending file:",
                                        err
                                    );
                                    rl.close();
                                    return;
                                }

                                console.log(
                                    "Content appended successfully."
                                );

                                // Read final content
                                fs.readFile(
                                    filename,
                                    "utf8",
                                    function (err, finalData) {

                                        if (err) {
                                            console.log(
                                                "Error reading final file:",
                                                err
                                            );
                                            rl.close();
                                            return;
                                        }

                                        console.log(
                                            "\nFinal file content:"
                                        );

                                        console.log(finalData);

                                        rl.close();
                                    }
                                );
                            }
                        );
                    }
                );
            });
        });
    });
});

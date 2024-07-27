#!/bin/bash

# Install Node.js dependencies
npm install axios cheerio

# Compile the C program
gcc -o url_validation url_validation.c

echo "Setup complete. You can now run the program using 'run.sh'."

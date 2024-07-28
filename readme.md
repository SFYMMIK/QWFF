# QWFF

A CLI tool that fetches and saves HTML, CSS, JavaScript, and other assets from a given website URL. The program is implemented using a combination of C, Python, and Node.js.

## Overview

This tool allows you to:
- Validate URLs.
- Fetch and save specified HTML content and other file types.
- Optionally fetch and save all related assets (CSS, JavaScript, images).
- Save these files in a specified directory, preserving directory structure.


## Components

1. **C Program**: Validates if a URL starts with `http://` or `https://`.
2. **Python Script**: Coordinates the process, calls the Node.js script, and handles user interaction.
3. **Node.js Script**: Fetches and saves HTML, CSS, JavaScript, and image files.

## Setup

### Prerequisites

- **C Compiler**: Ensure you have `gcc` installed.
- **Python**: Python 3.x should be installed.
- **Node.js**: Node.js and npm (Node Package Manager) should be installed.

### Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. **Make the setup and run scripts executable**

    ```bash
    chmod +x setup.sh && chmod +x run.sh
    ```

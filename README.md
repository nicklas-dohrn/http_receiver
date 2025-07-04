# HTTP Receiver

A simple Node.js application for receiving, viewing, and testing HTTP POST payloads. Useful for debugging webhooks or testing HTTP clients.

## Features

- Receives and stores raw POST payloads (keeps the last 60 seconds).
- Web UI to view received payloads in real time.
- Toggle POST response code between 200 and 500 for testing error handling.
- Clear all stored payloads from the UI.
- Simple configuration endpoint to check current response code.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer recommended)

### Installation

1. Clone this repository:
    ```sh
    git clone <repo-url>
    cd http_receiver
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

### Running the Server

```sh
npm start
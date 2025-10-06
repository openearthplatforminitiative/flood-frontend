#!/bin/sh
set -e
npm run migrate
node server.js

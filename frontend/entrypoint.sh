#!/bin/sh
set -e
npx prisma generate
npm run migrate
node server.js

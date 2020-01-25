const express = require('express');
const { PORT = 3000 } = process.env;
module.exports.PORT = process.env.PORT || 3000;
module.exports.JWT_SECRET = process.env.JWT_SECRET || 'secret key';

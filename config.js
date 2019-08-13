'use strict';

//exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/lodgefinance-app';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb+srv://mentor:mentor@capstone2-dmplh.mongodb.net/test?retryWrites=true&w=majority';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-lodgefinance-app';
exports.PORT = process.env.PORT || 8080;

exports.JWT_SECRET = process.env.JWT_SECRET || 'simple_SECRET';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
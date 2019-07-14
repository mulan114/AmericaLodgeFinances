'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb+srv://mulan114:mulan114@capstone2-dmplh.mongodb.net/test?retryWrites=true&w=majority';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-lodgefinance-app';
exports.PORT = process.env.PORT || 8080;
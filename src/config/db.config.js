const { DB_URI, TEST_DB_URI } = process.env;

var db_url;
console.log('afagagasf'+'===='+DB_URI);
if (process.env.NODE_ENV !== 'test') {
    db_url = DB_URI || "mongodb://localhost:27017/demo_db";
} else {
    db_url = TEST_DB_URI || "mongodb://localhost:27017/test_db";
}

module.exports = {
    url: db_url
};

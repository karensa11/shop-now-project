const dateFormat = require('dateformat');

module.exports = {
    formatDate: function(date) {
        return dateFormat(date, "yyyy-mm-dd HH:MM:ss");
    },
    formatDuration: function(duration) {
        return duration/1000;
    }
}
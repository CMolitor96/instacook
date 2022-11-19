function getDate(timestamp) {
    let milliseconds = Number(timestamp);
    let date = new Date(milliseconds);
    return date.toLocaleString();
}

module.exports = getDate;
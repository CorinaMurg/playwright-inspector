const date = new Date()
    .toUTCString()
    .replace(/[:/]/g, '-')
    .replace(/,/g, '')
    .replace(/ /g, '-');
export default date;

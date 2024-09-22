window.seededRandom = function (seed) {
    var m = 2**35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
        return (s = s * a % m) / m;
    };
}

window.fetchAPI = function(date) {
    let result = [];
    if (typeof date === 'string') {
        date = new Date(date);  // Convert to Date object if it's a string
    }
    let random = seededRandom(date.getDate());

    for(let i = 17; i <= 23; i++) {
        if(random() < 0.5) {
            result.push(i + ':00');
        }
        if(random() < 0.5) {
            result.push(i + ':30');
        }
    }
    return result;
};
window.submitAPI = function(formData) {
    return true;
};
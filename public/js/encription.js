var dictionary = "0123456789qwertyuiopasdfghjklzxcvbnm!?></\a`~+*=@#$%".split('');

var el = document.querySelector('.h1');
var btn = document.querySelector('#btnSubscribe');

var ran = function () {
    return Math.floor(Math.random() * dictionary.length);
}

var ranString = function (amt) {
    var string = '';
    for (var i = 0; i < amt; i++) {
        string += dictionary[ran()];
    }
    return string;
}

var init = function (str) {
    var count = str.length;
    var delay = 50;

    el.innerHTML = '';

    var gen = setInterval(function () {
        el.setAttribute('data-before', ranString(count));
        el.setAttribute('data-after', ranString(count));
        if (delay > 0) {
            delay--;
        }
        else {
            if (count < str.length) {
                el.innerHTML += str[str.length - count - 1];
            }
            count--;
            if (count === -1) {
                clearInterval(gen);
            }
        }
    }, 32);
}

//var showElement = function () {
//    el.classList.remove('hidden');
//}

$('btn').on('click', function () {
        init('Encrypted 👍');
    });



'use strict'

export default {
    openUrlInNewWindow: function(url) {
        window.open(url)
    },
    debounce: function (fn, wait) {
        let timer;
        return function () {
            timer && clearTimeout(timer);
            let _this = this;
            let args = arguments;
            timer = setTimeout(() => {
                fn.apply(_this, args);
            }, wait)
        }
    },
    throttle: function (fn, wait) {
        let timer;
        return function () {
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null;
                    fn.apply(this, arguments);
                }, wait);
            }
        }
    }
}

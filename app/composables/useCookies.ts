import Cookies from 'js-cookie';

export default function() {
    function set(key : string, value: string) {
        Cookies.set(key, value);
    }

    function get(key : string) { 
        return Cookies.get(key);
    }

    function remove(key : string) {
        return Cookies.remove(key);
    }

    function has(key : string) {
        return typeof Cookies.get(key) !== 'undefined';
    }

    return {
        set,
        get,
        remove,
        has
    }
}
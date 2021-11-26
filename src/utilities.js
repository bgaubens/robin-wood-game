export default function includes(value, arr) {
    
    let status = false;

    for (var i = 0; i < arr.length; i++) {
        var instance = arr[i];
        if (instance === value) {
            status = true;
        }
    }
    
    return status;
}
function localStoragePut(key, value){
    //对象
    if (value === Object(value)) {
        var tempLength;
        if (Object.prototype.toString.call(value) == '[object Array]') {
            //Array类型
            localStorage.setItem(key, 'a');
            tempLength = value.length;
        }
        else {
            //Object类型
            localStorage.setItem(key, 'o');
            var objLength = 0;
            for (var i in value) {
                objLength++;
            }
            tempLength = objLength;
        }
        var tempKey = key + "_length";
        localStorage.setItem(tempKey, tempLength);
        
        var index = 0;
        for (var j in value) {
            tempKey = key + "_" + index + "_key";
            localStorage.setItem(tempKey, j);
            
            tempKey = key + "_" + index + "_value";
            localStoragePut(tempKey, value[j]);
            index++
        }
    }
    else {
        //基本数据类型
        localStorage.setItem(key, "n");
        key = key + "_v";
        localStorage.setItem(key, value);
    }
}

function localStorageGet(key, isRemove){
    isRemove = isRemove == undefined ? true : isRemove;
    //对象
    var valueType = localStorage.getItem(key);
    if (isRemove == true) {
        localStorage.removeItem(key);
    }
    var result = null;
    if (valueType === "n") {
        var tempKey = key + "_v";
        result = localStorage.getItem(tempKey);
        if (isRemove == true) {
            localStorage.removeItem(tempKey);
        }
    }
    else {
        if (valueType === "a") {
            result = [];
        }
        else 
            if (valueType === "o") {
                result = {};
            }
        var tempKey = key + "_length";
        var objLength = localStorage.getItem(tempKey);
        if (isRemove == true) {
            localStorage.removeItem(tempKey);
        }
        var index;
        for (var i = 0; i < objLength; i++) {
            tempKey = key + "_" + i + "_key";
            index = localStorage.getItem(tempKey);
            if (isRemove == true) {
                localStorage.removeItem(tempKey);
            }
            tempKey = key + "_" + i + "_value";
            result[index] = localStorageGet(tempKey, isRemove);
        }
    }
    return result;
}
let obj = {
    _a: 1,
    _b: {
        _c: 2,
        _d: {
            _e: 3
        }
    }
};

function convertobj(obj){
    for(let key of Object.keys(obj) ){
        if(typeof obj[key] === 'object'){
            convertobj(obj[key]);
        }
        let val = obj[key];
        let upperkey = key.slice(1).toUpperCase();
        obj[upperkey] = val;
        // obj[key] = null;
        delete obj[key];
       
        
    }
    return obj;
}
convertobj(obj);
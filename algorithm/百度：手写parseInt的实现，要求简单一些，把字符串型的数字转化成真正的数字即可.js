// 可以传两个参数 _parseInt2('123', 5) 将'123' 看作5进制，返回10进制的结果
function _parseInt2(str, radix){
    // 1.对入参做判断
    let strType = typeof str;
    if(strType !== 'string' && strType !== 'number') return NaN;
    if(typeof radix !== 'number' || radix<2 || radix > 36) return NaN;
    

    // 2. 对 str 做处理， 只取整数部分；
    let strHandle = String(str).trim().split('.')[0];
    if(strHandle.length===0) return NaN;
    
    // 3. 对 radix 做处理
    if(!radix) radix = 10;

    // 4.将字符串反转， 并求和
    let strReverse = strHandle.split('').reverse().join('');
    let res = 0;
    for(let i =0; i< strReverse.length; i++){
        if(strReverse[i]>=radix) return NaN;

        
        res += strReverse[i]*Math.pow(radix, i);
    }
    return res;
    
}

console.log('res: ', _parseInt2('123.234', 5));

function _parseInt3(str, radix){
	let strType = typeof str;
	if(strType !== 'string' && strType !=='number') return NaN;
	if(typeof radix !=='number' || radix<2 ||radix>36) return NaN;

	let strHandle = String(str).split('.')[0];
	if(strHandle.length===0) return NaN;

	if(!radix) radix = 10;
	let strReverse = strHandle.split('').reverse().joint('');
	let res = 0;
	for(let i = 0; i < strReverse.length; i++){
		if(strReverse[i]>=radix) return NaN;
		if(typeof strReverse[0] === 'string') return NaN;
		if(typeof strReverse[i] === 'string')
		return res;

		res+=strReverse[i]*Math.pow(raidx, i);
	}

	return res;
}

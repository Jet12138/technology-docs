/*

实现一个 render(template, context) 方法，将 template 中的占位符用 context 填充。

示例：

var template = "{{name}}很厉害，才{{age}}岁"
var context = {name:"bottle",age:"15"}
输入：template context
输出：bottle很厉害，才15岁
要求：

级联的变量也可以展开
分隔符与变量之间允许有空白字符

*/

function render(template, context) {
    return template.replace(/\{\{(.*?)\}\}/g,(match,key)=>{
        let arr =key.trim().split('.')
        return arr.reduce((pre,cur)=>{
            return pre[cur.trim()]
        },context)
    })
}

const template = "{{name}}很厉害，才{{age }}岁,就可以帮{{person.father}}做事,{{deep.a.b}}";

const context = { name: "marcKun", age: "22" ,person:{father:'父亲'},deep:{a:{b:'减轻家里负担'}} }

console.log(render(template, context));//marcKun很厉害，才22岁,就可以帮父亲做事,减轻家里负担
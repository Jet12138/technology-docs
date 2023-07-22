/* 

传进函数的是原对象的地址(或者说引用)，
    这个地址赋值给了形参(形参看做局部变量)，
        形参变量此时指向原对象，后面o=new object的时候，
            形参变量保存的是新对象的地址，指向的是新的对象，
                所以第二次的o.siteUrl 也是给这个新对象属性的赋值，
                    和旧对象无关。
                        最后打印website.SiteUrl 的时候，
                            访问的是旧对象，
                                因为前面的改动都只涉及到形参变量，和website无关，
                                        website依然保存着旧对象的引用。 
                                        

*/

function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com";
  o = new Object();
  o.siteUrl = "http://www.google.com";
}
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl); // 输出结果 http://www.baidu.com

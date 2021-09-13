function processFor (el) {            //第9367行 处理for指令
    var exp;
    if ((exp = getAndRemoveAttr(el, 'u-for'))) {    //如果获取了v-for属性
        console.log(exp,'000')
        var res = parseFor(exp);                      //调用parseFor函数解析该属性
        if (res) {                                    //如果res存在
            extend(el, res);                              //则调用extend()添加AST对象上
        } else {
            warn$2(
                ("Invalid v-for expression: " + exp)
            );
        }
    }
}
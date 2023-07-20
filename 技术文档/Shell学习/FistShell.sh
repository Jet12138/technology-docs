#!/bin/bash

#  #! 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 程序。

:<<END

本文的来源： https://www.runoob.com/linux/linux-shell.html

#! 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种 Shell。

echo 命令用于向窗口输出文本。

#运行 Shell 脚本有两种方法：
1、作为可执行程序

将上面的代码保存为 test.sh，并 cd 到相应目录：

chmod +x ./test.sh  #使脚本具有执行权限
./test.sh  #执行脚本
注意，一定要写成 ./test.sh，而不是 test.sh，运行其它二进制的程序也一样，直接写 test.sh，linux 系统会去 PATH 里寻找有没有叫 test.sh 的，而只有 /bin, /sbin, /usr/bin，/usr/sbin 等在 PATH 里，你的当前目录通常不在 PATH 里，所以写成 test.sh 是会找不到命令的，要用 ./test.sh 告诉系统说，就在当前目录找。

2、作为解释器参数

这种运行方式是，直接运行解释器，其参数就是 shell 脚本的文件名，如：

/bin/sh test.sh
/bin/php test.php

这种方式运行的脚本，不需要在第一行指定解释器信息，写了也没用。


# 多行注释
多行注释还可以使用以下格式：

:<<EOF
注释内容...
注释内容...
注释内容...
EOF

EOF 也可以使用其他符号:

:<<'
注释内容...
注释内容...
注释内容...
'

:<<!
注释内容...
注释内容...
注释内容...
!

END







# -e 开启转义
echo -e "OK! \c" # -e 开启转义 \c 不换行
echo "It is a test"

# -e 开启转义
echo -e "Hello world !\n"
echo `echo \$HOSTNAME`

echo $(echo \$HOSTNAME)


#read 命令从标准输入中读取一行,并把输入行的每个字段的值指定给 shell 变量
echo '请输入 1 到 4 之间的文字：'
read aNum
case $aNum in
    1) echo '你选择了 1'
    ;;
    2) echo '你选择了 2'
    ;;
    3) echo '你选择了 3'
    ;;
    4) echo '你选择了 4'
    ;;
    *) echo '你选择了 你没有输入 1 到 4 之间的数字!!!'
    ;;
esac

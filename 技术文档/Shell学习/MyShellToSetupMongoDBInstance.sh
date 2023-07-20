#!/bin/bash

# 自己编写的用于启动一个 mongod database server，即产生一个mongoDB 实例的shell脚本。
# 我已经把D:/program_files/MongoDB/bin 加入到系统环境变量设置里面的系统变量的path里面了

echo "
---------------
---------------
通过：       "mongod.exe --dbpath D:/data/db --auth"，
产生效果：   MongoDB Database Server :服务启动了！MongoDB server begin running!
即(说人话)： 启动了一个 MongoDB instance（MongoDB 实例）。
怎么关闭：   Ctrl + C
---------------
---------------
"

mongod.exe --dbpath D:/data/db --auth

#或者用下面的写法
# mongod.exe --dbpath D:/data/db --logpath D:/log/db.log --auth
#或者用下面的写法
# mongod.exe--config ./mongod.cfg --auth



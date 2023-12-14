## centos配置的一些记录

### mac配置VMware centos7参考教程

- https://blog.csdn.net/renfeigui0/article/details/102727395
- https://blog.csdn.net/W_Fe5/article/details/131784290
- https://blog.csdn.net/qq_39271952/article/details/128077627

### 给用户添加管理权限

- chmod -v u+w /etc/sudoers
- vim /etc/sudoers
- 找到root ALL=(ALL) ALL 在下边加一行 newuser ALL=(ALL)  NOPASSWD :ALL

### 切换到root用户

su -

输入密码后切换到root用户

### 网络NAT模式下修改网络配置

vi /etc/sysconfig/network-scripts/ifcfg-ens33，需要修改的部分：

```
BOOTPROTO=static # 配置静态 ip  
ONBOOT=yes # 是否激活网卡  
IPADDR=192.168.121.136 # 配置的 ip 地址  
NETMASK=255.255.255.0 # 子网掩码  
GATEWAY=192.168.121.2 # 网关  
DNS1=8.8.8.8 # 配置 dns 地址
```

修改后重启网络服务员：systemctl restart network

获取自己电脑上的几个地址：

子网掩码 ：cat /Library/Preferences/VMware\ Fusion/vmnet8/nat.conf | grep netmask

网关：cat /Library/Preferences/VMware\ Fusion/vmnet8/nat.conf | grep "ip =" -B 1  
\# NAT gateway address

ip地址：ifconfig | grep "inet " | grep -v 127.0.0.1

mac配置centos ip参考：

- https://www.jianshu.com/p/d7ad61ae7793
- https://zhuanlan.zhihu.com/p/555665653?utm_id=0

### 关闭防火墙
想要在本地访问nginx的话，需要把防火墙关闭，有防火墙是不能访问到服务器的

停止防火墙：systemctl stop firewalld.service

永久关闭防火墙：systemctl disable firewalld.service

（centos7中各种操作直接使用systemctl命令）

### 停用selinux
安全增强型linux，简称selinux，是一linux的安全子系统。它的作用主要是最大限度减小系统中服务进程可访问的资源（最小权限原则）

```
// 检查状态
getenforce

// 检查状态
/usr/sbin/sestatus -v

// 停用、关闭
vi /etc/selinux/config 把SELINUX=enforcing 改成 disabled
```

### 安装依赖
nginx使用的相关依赖
```
yum -y install gcc gcc-c++ autoconf pcre pcre-devel make automake
yum -y install wget httpd-tools vim 
```

nginx官方配置文档：https://nginx.org/en/linux_packages.html

各种报错解决方式：

https://lijunmin.blog.csdn.net/article/details/121748409

https://blog.51cto.com/u_16290807/7750727

https://blog.csdn.net/weixin_44657888/article/details/130626816

https://blog.csdn.net/m0_61066945/article/details/129939387

http://www.manongjc.com/detail/57-epwaimoqlmqrzjh.html

### 一些指令的用法

查看指令历史：history

执行上一个指令：!!

也可以用history列表前面的序号：!28



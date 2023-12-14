## Nginx - 核心模块

### 1. 监控nginx客户端的状态

模块名: --with-http_stub_status_module

```
location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
}
// 添加模块配置
location = /status {
    stub_status on;	
}
```

然后打开/status的页面，可以看到

```
Active connections: 1  // 当前nginx正在处理的活动连接数
server accepts handled requests  // 服务 接收 写入 请求
1 1 4
Reading:0 Writing:1 Waiting:0
```

- accepts 总共处理的连接数
- handled 成功创建握手数
- requests 总共处理请求数
- Reading 读取到客户端的Header信息数
- Writing 返回给客户端的Header信息数
- Waiting 开启keep-alive的情况下 这个值等于 active-(reading+writing)

### 2. 文本替换

模块名: --with-http_sub_module

```
location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    stu_filter "haha" "hoho";
    stu_filter_once off; // 是否只替换一次，默认是on，off就全局替换了
}
```

### 3. 请求限制

> 在实际业务场景中，要避免恶意的大量请求，所以要做控制，比如一个ip每秒中只能访问多少次之类的

首先看一下连接的建立流程，三次握手和四次挥手:

![连接建立](./img/nginx3.png)

请求限制有两种 一种是控制连接数 一种是限制请求数

#### 3.1 控制并发的连接数
- --with-limit_conn_module 编译参数时的写法 
- ngx_http_limit_conn_module 实际的模块名

```
location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    limit_conn conn_zone 1;
    limit_conn_status 500;
    limit_conn_log_level warn;
    limit_rate 50;
}
```

#### 3.2 控制并发的请求数
- 模块名 ngx_http_limit_req_module 
- 在NGX_HTTP_PREACCESS_PHASE阶段生效
- 生效算法是漏斗算法，把最突出的流量限定为每秒恒定多少请求

### 额外的记录



## 本次项目使用 `Laravel6.0 + vue.js + elementUI + 微信小程序` 实现沃尔玛扫码购

项目设计---接口

本次项目所有接口使用 `laravel` 框架实现。

项目设计---后台

后台开发使用 `laravel` 集成 `elementUI` 模式，页面套用 `elementUI` 自带样式。

后台模块有：

1、实现后台登录，对接到前端 `vue` 页面

2、购物袋管理：基本的增删改查，使用模态框实现

3、上传图片：单独建一张表，用来存储所有图片，两种方法实现上传：

- 普通方法，上传到七牛 (购物袋模块)

- 后端采用接口返回 `token` 的方式，前端读取接口，获取 `token` ，判断当前图片是否合格。 (商品模块)


4、商品管理：基本的增删改查，首页增加模糊搜索、分页，是否显示、多选删除、导出Excel

5、优惠券管理

6、订单管理：查出所有用户的订单，并查看详情

7、项目启动

```php
php artisan serve
npm run watch
```

项目设计---前台

前台对接微信小程序，页面纯手写。

所有代码根据完成的模块情况，依次提交到 `github` 远程仓库。提交步骤：

```php
git init
git add .
git commit -m "first commit"
git remote rm origin       // 删除远程仓库，此步骤慎用
git remote add origin https://github.com/huangdj/canteen.git
git push -u origin master
```















































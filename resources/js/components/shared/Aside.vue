<template>
    <el-menu
            default-active="/"
            class="el-menu-vertical-demo"
            :router="true"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
        <el-menu-item index="/">
            <span slot="title">
                <i class="el-icon-menu"></i>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页
            </span>
        </el-menu-item>

        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-shopping-cart-full"></i>
                <span>商城管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/products"><i class="el-icon-goods"></i>商品管理</el-menu-item>
                <el-menu-item index="/tags"><i class="el-icon-s-order"></i>订单管理</el-menu-item>
                <el-menu-item index="/bags"><i class="el-icon-shopping-bag-1"></i>购物袋管理</el-menu-item>
                <el-menu-item index="/coupons"><i class="el-icon-present"></i>优惠券管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

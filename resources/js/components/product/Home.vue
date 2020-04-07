<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/products">商品管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="hengxian"></div>

        <el-row class="sousuo">
            <el-col :span="8">
                <div class="controls">
                    <router-link to="/products/create">
                        <el-button type="success" size="small" class="create">新增商品</el-button>
                    </router-link>
                    <el-button type="danger" size="small" class="unfold" @click="handleDeleteMultiple">批量删除</el-button>
                    <el-button type="warning" size="small" class="create">导出商品</el-button>
                </div>
            </el-col>
        </el-row>

        <el-table :data="products" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="编号" prop="id"></el-table-column>
            <el-table-column label="条形码" prop="code"></el-table-column>
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="缩略图" prop="photo_id">
                <template slot-scope="scope">
                    <img :src="scope.row.photo.image" alt="" class="thumb">
                </template>
            </el-table-column>

            <el-table-column label="单价" prop="price"></el-table-column>

            <el-table-column label="是否上架" prop="onsale">
                <template slot-scope="scope">
                    <i :class="scope.row.onsale ? 'el-icon-check' : 'el-icon-close'"
                       @click="change_attr(scope.row)"></i>
                </template>
            </el-table-column>

            <el-table-column label="库存" prop="stock">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.stock" @change="change_stock(scope.row)" size="small"
                              style="width: 40%"></el-input>
                </template>
            </el-table-column>

            <el-table-column label="描述" prop="body" show-overflow-tooltip>
                <template slot-scope="scope">
                    <a class="show_notice" href="https://laravelacademy.org/post/9567.html">{{scope.row.body}}</a>
                </template>
            </el-table-column>

            <el-table-column label="创建时间">
                <template slot-scope="scope">{{scope.row.created_at|edit_date}}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <router-link :to="{ name: 'productEdit', params: { id: scope.row.id }}">
                        <el-button size="mini" type="primary">编辑</el-button>
                    </router-link>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block" style="margin-top: 50px;">
            <span class="el-pagination__total">显示 {{page.from}} 到 {{page.to}} 条，共 {{page.total}} 条</span>
            <el-pagination background layout="prev, pager, next" :total="page.total" style="margin-top: -30px;"
                           @current-change="handleCurrentChange" :page-size="page.size"
                           :current-page.sync="page.currentPage"></el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                products: [],
                multipleSelection: [],
                page: {
                    total: 0,
                    size: 0,
                    currentPage: 1,
                    num: 1,
                    from: 0,
                    to: 0
                },
            }
        },
        created() {
            this.init()
        },
        filters: {
            edit_date: function (val) {
                return val.substring(0, 10)
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page.num = val;
                this.init()
            },
            // 首页
            init() {
                axios.get(`/admin/products?page=${this.page.num}`)
                    .then((res) => {
                        // console.log(res);
                        this.products = res.data.products.data;
                        this.page.total = res.data.products.total
                        this.page.size = res.data.products.per_page
                        this.page.from = res.data.products.from
                        this.page.to = res.data.products.to
                    })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 是否上架
            change_attr(row) {
                axios.patch('/admin/products/is_onsale', {
                    id: row.id,
                    onsale: row.onsale
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '改变成功!',
                    });
                    this.init();
                })
            },
            // 改变库存
            change_stock(row) {
                axios.patch(`/admin/products/change_stock`, {id: row.id, stock: row.stock}).then((res) => {
                    this.$message({
                        type: 'success',
                        message: '改变成功!',
                    });
                    this.init();
                })
            },
            // 删除
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    axios.delete(`/admin/products/${row.id}`).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.init();
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 多选删除
            handleDeleteMultiple() {
                if (this.multipleSelection.length == 0) {
                    this.$message.error('您至少要选中一条记录~');
                    return false;
                }
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let checked_id = this.multipleSelection.map((item) => {
                        return item.id;
                    });
                    axios.post(`/admin/products/destroy_checked`, {checked_id: checked_id})
                        .then(() => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                            });
                            this.init();
                        })
                })
            }
        }
    }
</script>

<style>
    .create {
        margin: 13px 0;
    }

    .thumb {
        width: 60px;
        height: 40px;
    }

    .el-icon-check {
        color: #5EB95E;
        font-weight: bold;
        cursor: pointer;
    }

    .el-icon-close {
        color: red;
        font-weight: bold;
        cursor: pointer;
    }

    .hengxian {
        margin-top: 20px;
        border-top: 1px solid #eeeeee;
    }

    .show_notice {
        text-decoration: none;
        color: #08c;
    }

    .el-pagination {
        margin-left: 1200px;
    }
</style>
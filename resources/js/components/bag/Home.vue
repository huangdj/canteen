<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/bags">购物袋管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>购物袋列表</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="hengxian"></div>

        <el-row class="sousuo">
            <el-col :span="8">
                <div class="controls">
                    <router-link to="/bags/create">
                        <el-button type="success" size="small" class="create">新增购物袋</el-button>
                    </router-link>
                </div>
            </el-col>

            <el-col :span="16" class="name_s">
                <el-form :inline="true" class="search">
                    <el-form-item label="名称">
                        <el-input size="medium" v-model="keyword"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="warning" size="small" @click="handerSearch" icon="el-icon-search">搜索
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <el-table :data="bags" style="width: 100%">
            <el-table-column label="编号" prop="id"></el-table-column>
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="缩略图" prop="photo_id">
                <template slot-scope="scope">
                    <img :src="scope.row.photo.image" alt="" class="thumb">
                </template>
            </el-table-column>
            <el-table-column label="单价" prop="price">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.price" size="small"
                              @change="handleChange(scope.row.id,scope.row.price)" style="width: 40%"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">{{scope.row.created_at|edit_date}}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <router-link :to="{ name: 'bagEdit', params: { id: scope.row.id }}">
                        <el-button size="mini" type="primary">编辑</el-button>
                    </router-link>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bags: [],
                keyword: ''
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
            handerSearch() {
                this.init()
            },
            // 首页
            init() {
                this.loading = true;
                axios.get(`/admin/bags?keyword=${this.keyword}`)
                    .then((res) => {
                        this.bags = res.data.bags;
                    })
            },
            // 改变单价
            handleChange(row_id, val_price) {
                axios.patch(`/admin/bags/change_price`, {id: row_id, price: val_price}).then((res) => {
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
                    axios.delete(`/admin/bags/${row.id}`).then(() => {
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

    .hengxian {
        margin-top: 20px;
        border-top: 1px solid #eeeeee;
    }

    .name_s {
        margin-top: 15px;
    }
</style>
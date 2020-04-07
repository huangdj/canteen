<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/bags">购物袋列表</a></el-breadcrumb-item>
            <el-breadcrumb-item>编辑购物袋</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="hengxian"></div>

        <el-form :model="product" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="name">
                <el-input v-model="product.name"></el-input>
            </el-form-item>

            <el-form-item label="条形码" prop="code">
                <el-input v-model="product.code"></el-input>
            </el-form-item>

            <el-form-item label="缩略图" prop="photo_id">
                <el-upload
                        class="avatar-uploader"
                        action="/admin/photos"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>


            <el-form-item label="单价" prop="price">
                <el-input v-model="product.price"></el-input>
            </el-form-item>

            <el-form-item label="是否上架" prop="onsale">
                <el-switch v-model="product.onsale"></el-switch>
            </el-form-item>

            <el-form-item label="库存" prop="stock">
                <el-input v-model="product.stock"></el-input>
            </el-form-item>

            <el-form-item label="描述信息" prop="body" class="body_height">
                <vue-simplemde v-model="product.body" ref="markdownEditor" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="updateForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import VueSimplemde from 'vue-simplemde'
    export default {
        components: {
            VueSimplemde
        },
        data() {
            return {
                product: {
                    name: '',
                    code: '',
                    price: '',
                    photo_id: '',
                    stock: '',
                    body: '',
                },
                imageUrl: '',
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
                    ],
                    code:[
                        {required: true, message: '请输入条形码', trigger: 'blur'},
                    ],
                    price: [
                        {required: true, message: '请输入单价', trigger: 'blur'}
                    ],
                    photo_id: [
                        {required: true, message: '请上传图片', trigger: 'blur'}
                    ],
                    stock:[
                        {required: true, message: '请输入库存', trigger: 'blur'},
                    ],
                    body:[
                        {required: true, message: '请输入描述信息', trigger: 'blur'},
                    ]
                },
            };
        },
        created() {
            let id = this.$route.params.id;
            axios.get(`/admin/products/${id}`).then((res) => {
                // console.log(res)
                this.product = res.data.product
                this.product.onsale = !!res.data.product.onsale;//重新赋值
                this.imageUrl = res.data.product.photo.image
            })
        },
        methods: {
            updateForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.put(`/admin/products/${this.product.id}`, this.product)
                            .then((res) => {
                                this.$notify({
                                    title: '成功',
                                    message: '编辑商品成功',
                                    type: 'success'
                                });
                                this.$router.push({name: 'products'})
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || 'image/png';
                const isLt3M = file.size / 1024 / 1024 < 3;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
                }
                if (!isLt3M) {
                    this.$message.error('上传头像图片大小不能超过 3MB!');
                }
                return isJPG && isLt3M;
            },
            handleAvatarSuccess(res, file) {
                // console.log(res);
                this.imageUrl = res.image;
                this.product.photo_id = res.photo_id;
            },
        }
    }
</script>

<style>
    @import '~simplemde/dist/simplemde.min.css';
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .demo-ruleForm {
        margin: 30px 0;
    }

    .hengxian {
        margin-top: 20px;
        border-top: 1px solid #eeeeee;
    }
</style>
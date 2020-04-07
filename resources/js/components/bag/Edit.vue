<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/bags">购物袋列表</a></el-breadcrumb-item>
            <el-breadcrumb-item>编辑购物袋</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="hengxian"></div>

        <el-form :model="bag" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="name">
                <el-input v-model="bag.name"></el-input>
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
                <el-input v-model="bag.price"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="updateForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bag: {
                    name: '',
                    price: '',
                    photo_id: '',
                },
                imageUrl: '',
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    price: [
                        {required: true, message: '请输入单价', trigger: 'blur'}
                    ],
                    photo_id: [
                        {required: true, message: '请上传图片', trigger: 'blur'}
                    ]
                },
            };
        },
        created() {
            let id = this.$route.params.id;
            axios.get(`/admin/bags/${id}`).then((res) => {
                // console.log(res)
                this.bag = res.data.bag
                this.imageUrl = res.data.bag.photo.image
            })
        },
        methods: {
            updateForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.put(`/admin/bags/${this.bag.id}`, this.bag)
                            .then((res) => {
                                this.$notify({
                                    title: '成功',
                                    message: '编辑购物袋成功',
                                    type: 'success'
                                });
                                this.$router.push({name: 'bags'})
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
                this.bag.photo_id = res.photo_id;
            },
        }
    }
</script>

<style>
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
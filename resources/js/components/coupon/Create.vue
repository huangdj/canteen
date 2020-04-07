<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/coupons">优惠券列表</a></el-breadcrumb-item>
            <el-breadcrumb-item>新增优惠券</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="hengxian"></div>

        <el-form :model="coupon" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input v-model="coupon.title"></el-input>
            </el-form-item>

            <el-form-item label="缩略图" prop="photo_id">
                <el-upload
                        class="avatar-uploader"
                        action="/admin/photos"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="coupon.image" :src="coupon.image" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="类型">
                <el-radio-group size="medium" v-model="coupon.type" class="radio_type">
                    <el-radio :label="1">固定金额</el-radio>
                    <el-radio :label="0">折扣比例</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="折扣" prop="value">
                <el-input v-model="coupon.value" placeholder="折扣请以%结束"></el-input>
            </el-form-item>

            <el-form-item label="总量" prop="total">
                <el-input v-model="coupon.total"></el-input>
            </el-form-item>

            <el-form-item label="最低金额" prop="min_amount">
                <el-input v-model="coupon.min_amount"></el-input>
            </el-form-item>

            <el-form-item label="开始时间">
                <el-col :span="11">
                    <el-date-picker type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="coupon.started_at"></el-date-picker>
                </el-col>
            </el-form-item>

            <el-form-item label="结束时间">
                <el-col :span="11">
                    <el-date-picker type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="coupon.ended_at"></el-date-picker>
                </el-col>
            </el-form-item>

            <el-form-item label="是否启用" prop="enabled">
                <el-switch v-model="coupon.enabled"></el-switch>
            </el-form-item>

            <el-form-item label="描述" prop="description">
                <el-input type="textarea" v-model="coupon.description"></el-input>
            </el-form-item>

            <el-form-item label="使用说明" prop="detail" class="body_height">
                <vue-simplemde v-model="coupon.detail" ref="markdownEditor"/>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
                coupon: {
                    title: '',
                    photo_id: '',
                    type: 1,
                    image: '',
                    value: '',
                    total: '',
                    used: 0,
                    min_amount: '',
                    enabled: 1,
                    description: '',
                    started_at: '',
                    ended_at: '',
                },
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    photo_id: [
                        {required: true, message: '请上传图片', trigger: 'blur'}
                    ],
                    value: [
                        {required: true, message: '请输入折扣', trigger: 'blur'},
                    ],
                    total: [
                        {required: true, message: '请输入兑换数量', trigger: 'blur'}
                    ],
                    min_amount: [
                        {required: true, message: '请输入最低金额', trigger: 'blur'},
                    ],
                    started_at: [
                        {required: true, message: '请选择开始时间', trigger: 'blur'},
                    ],
                    ended_at: [
                        {required: true, message: '请选择结束时间', trigger: 'blur'},
                    ],
                    description: [
                        {required: true, message: '请输入优惠券描述', trigger: 'blur'},
                    ],
                    detail: [
                        {required: true, message: '请输入优惠券使用说明', trigger: 'blur'},
                    ],
                },
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post(`/admin/coupons`, this.coupon)
                            .then((res) => {
                                // console.log(res)
                                this.$notify({
                                    title: '成功',
                                    message: '新增优惠券成功',
                                    type: 'success'
                                });
                                this.$router.push({name: 'coupons'})
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
                const isLt2M = file.size / 1024 / 1024 < 3;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 3MB!');
                }
                return isJPG && isLt2M;
            },
            handleAvatarSuccess(res, file) {
                // console.log(res);
                this.coupon.image = res.image;
                this.coupon.photo_id = res.photo_id;
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

    .radio_type{
        margin-top: 10px;
    }
</style>
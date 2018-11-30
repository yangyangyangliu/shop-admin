<template>
  <div class="login">
    <el-row class="login" type="flex" justify="center" align="middle">
      <el-col :xs="12" :sm="12" :md="10" :lg="8" :xl="6">
        <el-form label-position="top" :model="loginForm" :rules="rules" ref="ruleForm" label-width="100px" class="login-form">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item type="password" label="密码" prop="password">
            <el-input v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导入axios
import axios from 'axios'

export default {
  data () {
    return {
      // 登录表单数据
      loginForm: {
        username: '',
        password: ''
      },
      // 用户名和密码的校验规则
      rules: {
        username: [
          // required 是否为必填项，true表示必填项 表单校验符 *
          // message 表单校验时的提示信息
          // trigger 触发表单验证的时机
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 6, message: '用户长度在 3到6个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            min: 6,
            max: 12,
            message: '密码长度在 6 到 12 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 登录事件
    submitForm (formName) {
      // $refs在Vue中用来直接获取组件或者dom对象
      // validate 方法用来实现表单校验
      this.$refs[formName].validate(valid => {
        // this.$refs.ruleForm就是el-form表单组件
        // console.log(this.$refs.ruleForm)
        // this.$refs.ruleForm.validate(valid => {
        // 没有校验成功
        if (!valid) {
          return false
        }
        // 校验成功,发送请求到登录接口,完成接口
        // console.log(this.loginForm)
        axios
          .post('http://localhost:8888/api/private/v1/login', this.loginForm)
          .then(res => {
            console.log('登录结果为:', res)
            if (res.data.meta.status === 200) {
              // 2. 保存token到localStorage中
              localStorage.setItem('token', res.data.data.token)
              // 1. 登录成功跳转到首页
              this.$router.push('/home')
              this.$message({
                message: res.data.meta.msg,
                type: 'success',
                duration: 800
              })
            } else {
              // 登录失败 重新登录
              this.$message({
                message: res.data.meta.msg,
                type: 'error',
                duration: 1000
              })
            }
          })
      })
    },
    // 表单重置
    resetForm (formName) {
      // resetFields()方法用来重置表单
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.login {
  height: 100%;
  background-color: #2d434c;
}
.login-form {
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
}
</style>


import AppUtil from 'util/app-util.jsx'


const appUtil = new AppUtil();


class LoginService {

    // 用户登录
    login(loginInfo){
        return appUtil.request({
            type: 'post',
            url: '/guest/user/login',
            data: loginInfo
        });
    }

    // 用户注册
    register(registerInfo){
        return appUtil.request({
            type: 'post',
            url: '/guest/user/register',
            data: registerInfo
        });
    }

    // 检查登录接口的数据是不是合法
    checkLoginInfo(loginInfo){
        let phone = $.trim(loginInfo.phone),
            pwd = $.trim(loginInfo.pwd);
        // 判断用户名为空
        if(typeof phone !== 'string' || phone.length ===0){
            return {
                status: false,
                msg: '用户名不能为空！'
            }
        }
        // 判断密码为空
        if(typeof pwd !== 'string' || pwd.length ===0){
            return {
                status: false,
                msg: '密码不能为空！'
            }
        }
        return {
            status : true,
            msg : '验证通过'
        }
    }

    // 检查登录接口的数据是不是合法
    checkRegisterInfo(registerInfo){
        // 判断密码是否一致
        if(registerInfo.repwd != registerInfo.pwd){
            return {
                status: false,
                msg: '两次密码输入不一致！'
            }
        }
        return {
            status : true,
            msg : '验证通过'
        }
    }

    // 退出登录
    logout(){
        return appUtil.request({
            type    : 'post',
            url     : '/guest/logout'
        });
    }
}


export default LoginService;

import AppUtil from 'util/app-util.jsx'


const appUtil = new AppUtil();


class UserService {

    update(user){
        return appUtil.request({
            type: 'post',
            url: '/guest/user/update',
            data: user
        });
    }

    updatePwd(param){
        return appUtil.request({
            type: 'post',
            url: '/guest/user/updatePwd',
            data: param
        });
    }

}


export default UserService;
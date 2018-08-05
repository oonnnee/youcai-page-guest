
class AppUtil{

    request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                type        : param.type        || 'get',
                url         : param.url         || '',
                dataType    : param.dataType    || 'json',
                data        : param.data        || null,
                success     : resp => {
                    // 数据请求成功
                    if(0 === resp.code){
                        typeof resolve === 'function' && resolve(resp.data, resp.msg);
                    }
                    // 没有登录状态，强制登录
                    else if(1 === resp.code){
                        this.removeStorage('user');
                        this.doLogin();
                    }
                    else{
                        typeof reject === 'function' && reject(resp.msg || resp.data);
                    }
                },
                error       : err => {
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });
    }

    doLogin(){
        $('#loginModal').modal('show');
    }

    errorTip(msg){
        alert(msg || '好像哪里不对哦')
    }

    successTip(msg){
        alert(msg || '成功')
    }

    setStorage(name, data){
        let dataType = typeof data;
        // json对象
        if(dataType === 'object'){
            // window.localStorage.setItem(name, JSON.stringify(data));
            window.sessionStorage.setItem(name, JSON.stringify(data));
        }
        // 基础类型
        else if(['number','string','boolean'].indexOf(dataType) >= 0){
            // window.localStorage.setItem(name, data);
            window.sessionStorage.setItem(name, data);
        }
        // 其他不支持的类型
        else{
            this.errorTip('该类型不能用于本地存储');
        }
    }

    getStorage(name){
        let data = window.sessionStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }
        else{
            return '';
        }
    }

    removeStorage(name){
        window.sessionStorage.removeItem(name);
    }


    removeElementInArray(arr, e){
        let index = -1;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === e){
                index = i;
            }
        }
        if (index != -1){
            arr.splice(index, 1);
        }
    }

    getDateString(date){
        const f = {
            format: data => {
                return data<10 ? `0${data}`:`${data}`;
            }
        }
        return `${date.getFullYear()+'-'+f.format(date.getMonth()+1)+'-'+f.format(date.getDate())}`;
    }

    getDeployAddress(){
        return 'localhost';
        // return '123.206.13.129';
    }

    disable(target, text){
        target.disabled = true;
        target.innerHTML = text+"中...";
    }
    enable(target, text){
        target.disabled = false;
        target.innerHTML = text;
    }

    getCurrentUser(){
        return this.getStorage('user');
    }
}


export default AppUtil;
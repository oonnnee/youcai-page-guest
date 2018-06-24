import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class CategoryService{

    // 获取大类map
    map(){
        return appUtil.request({
            type: 'get',
            url: '/guest/category/findMap'
        });
    }

    // 获取大类list
    list(){
        return appUtil.request({
            type: 'get',
            url: '/guest/category/findList'
        });
    }

    listWithProducts(){
        return appUtil.request({
            type: 'get',
            url: '/guest/category/findListWithProducts'
        });
    }
}

export default CategoryService;
import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class CategoryService{

    // 获取大类map
    map(){
        return appUtil.request({
            type: 'get',
            url: '/guest/category/map'
        });
    }

    // 获取大类list
    list(){
        return appUtil.request({
            type: 'get',
            url: '/guest/category/list'
        });
    }

    listWithProducts(){
        return appUtil.request({
            type: 'get',
            url: '/guest/category/listWithProducts'
        });
    }
}

export default CategoryService;
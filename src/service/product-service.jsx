import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class ProductService{

    // 获取产品列表
    list(param){
        let url     = '',
            data    = {};
        data.page = param.page;
        data.size = param.size;
        if(param.type === 'list'){
            url = '/guest/product/findPage';
        }else if(param.type === 'search'){
            url = '/guest/product/findPageByNameLikeAndCodeIn';
            if (typeof param.PCodes !== 'undefined'){
                data.PCodes = param.PCodes;
            }
            if (typeof param.name !== 'undefined'){
                data.name = param.name;
            }
        }
        return appUtil.request({
            type    : 'get',
            url     : url,
            data    : data
        });
    }

    // 获取产品详情
    findById(id){
        return appUtil.request({
            type    : 'get',
            url     : '/guest/product/findOne',
            data    : {
                id : id
            }
        });
    }

}

export default ProductService;
import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class PricelistService{

    findLatest(){
        return appUtil.request({
            type    : 'get',
            url     : '/guest/pricelist/findLatest'
        });
    }
}

export default PricelistService;
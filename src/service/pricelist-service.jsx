import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class PricelistService{

    findLatest(){
        const user = appUtil.getStorage('user');
        return appUtil.request({
            type    : 'get',
            url     : '/guest/pricelist/findLatest',
            data    : {guestId: user.id}
        });
    }
}

export default PricelistService;
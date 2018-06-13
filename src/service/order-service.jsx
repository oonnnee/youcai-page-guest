import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class OrderService{

    new(products){
        return appUtil.request({
            type: 'post',
            url: '/guest/order/new',
            data: {products: products}
        });
    }

    findDates(){
        return appUtil.request({
            type: 'get',
            url: '/guest/order/findDates'
        });
    }

    findByDate(date){
        return appUtil.request({
            type: 'get',
            url: '/guest/order/findByDate',
            data: {date: date}
        });
    }
}

export default OrderService;
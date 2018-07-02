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

    findStatesByDate(date){
        return appUtil.request({
            type: 'get',
            url: '/guest/order/findStatesByDate',
            data: {date: date}
        });
    }

    findByDateAndState(date, state){
        return appUtil.request({
            type: 'get',
            url: '/guest/order/findOneByDateAndState',
            data: {date: date, state: state}
        });
    }

    back(date){
        return appUtil.request({
            type: 'post',
            url: '/guest/order/back',
            data: {date: date}
        });
    }

}

export default OrderService;
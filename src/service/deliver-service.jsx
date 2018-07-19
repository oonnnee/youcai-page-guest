import AppUtil from 'util/app-util.jsx'

const appUtil = new AppUtil();

class DeliverService{

    findDates(){
        return appUtil.request({
            type: 'get',
            url: '/guest/deliver/findDates'
        });
    }


    findByDate(date){
        return appUtil.request({
            type: 'get',
            url: '/guest/deliver/findOneByDate',
            data: {date: date}
        });
    }

    receive(date){
        return appUtil.request({
            type: 'post',
            url: '/guest/deliver/receive',
            data: {date: date}
        });
    }

}

export default DeliverService;
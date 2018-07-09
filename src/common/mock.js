import MockAdapter from 'axios-mock-adapter'
import Mock from 'mockjs'

export default {

    init: function (_axios) {
        let mock = new MockAdapter(_axios);
        mock.onPost('/users/admin/login').reply(200, {
            token: '21232F297A57A5A743894A0E4A801FC3',
            type: 'admin'
        });

        mock.onGet('/groups').reply(200, Mock.mock({
            "rows|11-50": [
                {
                    label: /\d{10,10}/,
                    des: '一号分组',
                    type: 0,
                    width: 700,
                    height: 1400,
                    operater: /\d{10,10}/,
                    updateTime: 0,
                }
            ]
        }));

        mock.onGet('/users').reply(200, Mock.mock({
            "rows|11-50": [
                {
                    label: /\d{10,10}/,
                    des: 'operater1', 
                    group: /\d{10,10}/,
                    updateTime: 0,
                }
            ]
        }));
    }
}



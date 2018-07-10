import MockAdapter from 'axios-mock-adapter'
import Mock from 'mockjs'

export default {

    init: function (_axios) {
        let mock = new MockAdapter(_axios);
        mock.onPost('/account/login').reply(200, {
            token: '21232F297A57A5A743894A0E4A801FC3',
            type: 'operator'
        });

        mock.onPost('/account/logout').reply(200, {
            err: 1,
        });

        //////////group///////////
        mock.onGet('/groups').reply(200, Mock.mock({
            "rows|11-50": [
                {
                    label: 'group',
                    des: '一号分组',
                    type: 0,
                    width: 700,
                    height: 1400,
                    operater: /\d{10,10}/,
                    updateTime: 0,
                }
            ]
        }));

        mock.onPost('/groups/add').reply(200, {
            err: 1,
        });

        mock.onPost('/groups/group/update').reply(200, {
            err: 1,
        });

        mock.onPost('/groups/group/delete').reply(200, {
            err: 1,
        });

        //////////user///////////
        mock.onGet('/users').reply(200, Mock.mock({
            "rows|11-50": [
                {
                    label: 'username',
                    des: 'operater1',
                    group: /\d{10,10}/,
                    updateTime: 0,
                }
            ]
        }));

        mock.onPost('/users/add').reply(200, {
            err: 1,
        });

        mock.onPost('/users/username/reset').reply(200, {
            err: 1,
        });

        mock.onPost('/users/username/delete').reply(200, {
            err: 1,
        });

        //////////messages///////////
        mock.onGet('/messages').reply(200, Mock.mock({
            "rows|11-50": [
                {
                    label: 'msg',
                    content: /\d{10,10}/,
                    beginTime: 0,
                    endTime: 0,
                    status: 1,
                    updateTime: 0,
                }
            ]
        }));

        mock.onPost('/messages/add').reply(200, {
            err: 1,
        });

        mock.onPost('/messages/msg/reset').reply(200, {
            err: 1,
        });

        mock.onPost('/messages/msg/delete').reply(200, {
            err: 1,
        });
    }
}



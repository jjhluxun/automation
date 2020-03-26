const auto = require('miniprogram-automator')
const projectPath = require('../util/projectPath')

describe('element operation', () => {
    let miniProgram

    beforeAll(async () => {
        miniProgram = await auto.launch({
            projectPath: projectPath.projectPath
        });
    }, 30000);

    afterAll(async () => {
        await miniProgram.close()
    });

    //自定义组件调用callMethod方法
    test('callMethod', async () =>{
        const navigationPage = await miniProgram.navigateTo('/page/weui/example/navigation/navigation')
        await navigationPage.waitFor('.page__title')
        const navigationBack = await navigationPage.$('mp-navigation-bar')
        await navigationBack.callMethod('back')
    })

    test('callWxMethod', async () =>{
        const page = await miniProgram.navigateTo('/page/API/pages/storage/storage')
        await miniProgram.callWxMethod('setStorage',{
            key: 'test',
            data: 'jjh'
        })
        const { data } = await miniProgram.callWxMethod('getStorage',{key:'test'})
        expect(data).toBe('jjh')
    })

    test('mockWxMethod', async () =>{
        const page = await miniProgram.navigateTo('/page/API/pages/storage/storage')
        await miniProgram.mockWxMethod(
            'getStorage',
            function(key, value) {
                if (key === 'name') return 'jiang'
                if (key === 'age') return 31
                return value
            },
            'unknown',
        )
    })

})
const auto = require('miniprogram-automator')
const projectPath = require('../util/projectPath')

describe('navigator', () =>{
    let miniProgram
    let page

    beforeAll(async () =>{
        console.log('tab beforeAll')
        miniProgram = await auto.launch({
            projectPath: projectPath .projectPath
        });
        page = await miniProgram.switchTab('/page/weui/example/index')
    },30000);
    afterAll(async () =>{
        console.log('tab afterAll')
        await miniProgram.close()
    });

    test('tabbar navigate',async () =>{
        console.log('tab test1')
        expect(page.path).toBe('page/weui/example/index')
        const page_title = await page.$('.page__title')
        expect(await page_title.text()).toContain('小程序UI组件库')
    })

    test('subpage navigate',async () =>{
        console.log('tab test2')
        const current_page = await miniProgram.navigateTo('/page/component/pages/scroll-view/scroll-view')
        await current_page.waitFor(3000)
        expect(current_page.path).toBe('page/component/pages/scroll-view/scroll-view')
        const page_title = await current_page.$('.page-head-title')
        expect(await page_title.text()).toBe('scroll-view')
    })

    test('form action',async () =>{
        console.log('tab test3')
        const currentPage = await miniProgram.navigateTo('/page/weui/example/form/form')
        const title = await currentPage.$('.weui-form__title')
        expect(await title.text()).toBe('表单结构')
        const radioGroup = await currentPage.$('radio-group')
        const radiolist = await radioGroup.$('mp-checkbox:last-of-type')
        const radio = await radiolist.$('mp-cell')
        await radio.tap()

        const checkboxGroup = await currentPage.$('checkbox-group')
        const checkbox_list = await checkboxGroup.$('mp-checkbox:last-child')
        const checkbox = await checkbox_list.$('mp-cell')
        await checkbox.tap()

        const name = await currentPage.$('[data-field=\"name\"]')
        expect(await name.attribute('placeholder')).toBe('请输入姓名')
        await name.input('jhjiang')

        const qq = await currentPage.$("[data-field=\"qq\"]")
        await qq.input('12345678')

    })

})
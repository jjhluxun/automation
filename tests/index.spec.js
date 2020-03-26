const auto = require('miniprogram-automator')
const projectPath = require('../util/projectPath')

describe('index', () =>{
    let miniProgram
    let page

    beforeAll(async () =>{
        console.log('index beforeAll')
        miniProgram = await auto.launch({
            projectPath: projectPath.projectPath
        });
        page = await miniProgram.switchTab('/page/component/index')
    },30000);

    afterAll(async () =>{
        console.log('index afterAll')
        await miniProgram.close()
    });


    it("description",async () => {
        console.log('index it1')
        const des = await page.$('.index-desc')
        expect(await des.text()).toContain('小程序官方组件能力')
    });

    it('lists', async () =>{
        console.log('index it2')
        const lists = await page.$$('.kind-list-item')
        expect(lists.length).toBe(8)
        const list = await lists[0].$('.kind-list-item-hd')
        expect(await list.text()).toBe('视图容器')
    });

    it('list operation',async () =>{
        console.log('index it3')
        const list = await page.$('#view')
        await list.tap()
        // const list_meta =await page.$('.navigator-box navigator-box-show')
        // const sub_lists = await page.$$('.navigator')
        // const view  =  sub_lists[0]
        // expect(await view.property('url')).toBe('pages/view/view')
        // await view.tap()
        const item = await page.$('.index-bd navigator')
        await item.tap()
        await page.waitFor(5000)
        expect((await miniProgram.currentPage()).path).toBe('page/component/pages/view/view')
        expect((await miniProgram.navigateBack()).path).toBe('page/component/index')
    })


})
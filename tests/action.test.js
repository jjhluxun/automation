const auto = require('miniprogram-automator')
const createFile = require('../util/createFile')
const projectPath = require('../util/projectPath')

describe('element operation', () => {
    let miniProgram
    let page

    beforeAll(async () => {
        miniProgram = await auto.launch({
            projectPath: projectPath.projectPath
        });
        // 真机调试，真机上不支持截图
        // await miniProgram.remote()
        // page = await miniProgram.switchTab('/page/component/index')
        createFile.dirCreate('reports')
    }, 30000);

    afterAll(async () => {
        await miniProgram.close()
    });

    test('picker',async () =>{
        const currentPage = await miniProgram.navigateTo('/page/component/pages/picker/picker')
        const pickers = await currentPage.$$('picker')
        const region = pickers[0]
        await region.trigger('change', { value: "1"})
        const time = pickers[1]
        await time.trigger('change',{value: "20:01"})
        const date = pickers[2]
        await date.trigger('change',{value: "2020-02-25"})
        await currentPage.waitFor(500)
        await miniProgram.screenshot({path: './reports/picker.png'})
        expect(await time.property('value')).toBe("20:01")

    })
//实际上获取不到滚动高端，也滚动不了
    test('scroll',async () =>{
        const currentPage = await miniProgram.navigateTo('/page/component/pages/scroll-view/scroll-view')
        const scroll_view = await currentPage.$$('scroll-view')
        const s_view1 = scroll_view[0]
        const height = await s_view1.scrollHeight()
        await s_view1.scrollTo(0,50)

        const s_view2 = scroll_view[1]
        const width = await s_view2.scrollWidth()
        await s_view2.scrollTo(-50,0)

        await currentPage.waitFor(500)
        await miniProgram.screenshot({path: './reports/scroll.png'})

    })

    test('move',async () =>{
        const currentPage = await miniProgram.navigateTo('/page/component/pages/movable-view/movable-view')
        const move_view = await currentPage.$$('movable-view')
        const m_view1 = move_view[0]
        await m_view1.moveTo(40,40)
        await currentPage.waitFor(500)
        await miniProgram.screenshot({path: './reports/move1.png'})

        const m_view2 = move_view[2]
        const { left, top } = await m_view2.offset()
        await miniProgram.pageScrollTo(top)
        await m_view2.moveTo(40,0)
        await currentPage.waitFor(500)
        await miniProgram.screenshot({path: './reports/move2.png'})

    })

    test('slide',async () =>{
        const currentPage = await miniProgram.navigateTo('/page/component/pages/swiper/swiper')
        const sliderElement = await currentPage.$$('slider')
        const slider1 = sliderElement[0]
        await slider1.slideTo(1500)
        await currentPage.waitFor(500)
        await miniProgram.screenshot({path:'./reports/slide.png'})

    })

    test('video',async () =>{
        const currentPage = await miniProgram.navigateTo('/page/component/pages/video/video')
        const v = await currentPage.$('#myVideo')
        await v.callContextMethod('play')
        await currentPage.waitFor(1000)
        await miniProgram.screenshot({path:'reports/video.png'})
    })

    test('swipe',async () =>{
        const currentPage = await miniProgram.navigateTo('/page/component/pages/swiper/swiper')
        const swiper = await currentPage.$('swiper')
        await swiper.swipeTo(2)
        await currentPage.waitFor(500)
        await miniProgram.screenshot({path:'./reports/swipe.png'})
    })
    test('dialog',async () =>{
        const currentPage = await miniProgram.navigateTo('/page/weui/example/dialog/dialog')
        const btn = await currentPage.$$('button')
        const btn1 = btn[0]
        await btn1.tap()
        await currentPage.waitFor('.weui-dialog')
        await miniProgram.screenshot({path:'./reports/dialog.png'})

    })
    //自定义组件还是可以通过page.$()获取元素
    //页面跳转之后，页面等待使用的是上一页面，当前页面需要重新获取，
    //跳转到tarbar页面需要用switchTab方法
    test('searchbar', async () =>{
        const compoentPage = await miniProgram.switchTab('/page/weui/example/index')
        const search = await compoentPage.$('#search')
        await search.tap()
        const bar = await compoentPage.$('[url=\"searchbar/searchbar\"]')
        await bar.tap()
        await compoentPage.waitFor(500)
        const searchPage = await miniProgram.currentPage()
        const searchBar = await searchPage.$('mp-searchbar')
        const searchBox = await searchBar.$('.weui-search-bar__label')
        await searchBox.tap()
        const searchInput = await searchBar.$('input')
        await searchInput.input('sousou')
        await searchPage.waitFor(500)
        await miniProgram.screenshot({path:'./reports/search.png'})
    })

})
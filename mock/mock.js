import Mock from 'mockjs'

let song = Mock.mock('http://song.cn', {
    'status': '0',
    'result|3-6': [{
        'id|+1': 0,
        'songName': '@cname'
    }]
})
let hot = Mock.mock('http://hot.cn', {
    'status': '0',
    'result|10': [{
        'id|+1': 0,
        'songName': '@cname'
    }]
})
let swipes = Mock.mock('http://swipe.cn', {
    'status': '0',
    'swipeData': [
        {title: '轮播1', url: '/ts1', img: require('images/swipe/swipe_1.jpg')},
        {title: '轮播2', url: '/ts2', img: require('images/swipe/swipe_2.jpg')},
        {title: '轮播3', url: '/ts3', img: require('images/swipe/swipe_3.jpg')},
        {title: '轮播4', url: '/ts4', img: require('images/swipe/swipe_4.jpg')}
    ]
})
let sheel = Mock.mock('http://sheel.cn', {
    'status': '0',
    'sheelData': [
        {title: 'sheel1', img: require('images/sheel/1.jpg')},
        {title: 'sheel2', img: require('images/sheel/1.jpg')},
        {title: 'sheel3', img: require('images/sheel/1.jpg')},
        {title: 'sheel4', img: require('images/sheel/1.jpg')},
        {title: 'sheel1', img: require('images/sheel/1.jpg')},
        {title: 'sheel2', img: require('images/sheel/1.jpg')},
        {title: 'sheel3', img: require('images/sheel/1.jpg')},
        {title: 'sheel4', img: require('images/sheel/1.jpg')},
        {title: 'sheel1', img: require('images/sheel/1.jpg')},
        {title: 'sheel2', img: require('images/sheel/1.jpg')},
        {title: 'sheel3', img: require('images/sheel/1.jpg')},
        {title: 'sheel4', img: require('images/sheel/1.jpg')},
        {title: 'sheel1', img: require('images/sheel/1.jpg')},
        {title: 'sheel2', img: require('images/sheel/1.jpg')},
        {title: 'sheel3', img: require('images/sheel/1.jpg')},
        {title: 'sheel4', img: require('images/sheel/1.jpg')}

    ]
})

let sheel2 = Mock.mock('http://sheel2.cn',function (options) {
    let result = {
        'status': '1',
        'sheelData': [
            {title: 'sheel1', img: require('images/sheel/1.jpg')},
            {title: 'sheel2', img: require('images/sheel/1.jpg')},
            {title: 'sheel3', img: require('images/sheel/1.jpg')},
            {title: 'sheel4', img: require('images/sheel/1.jpg')},

            {title: 'sheel3', img: require('images/sheel/1.jpg')},
            {title: 'sheel4', img: require('images/sheel/1.jpg')}
        ]
    }
    let result2 = {
        'status': '2',
        'sheelData': [
            {title: 'sheel1', img: require('images/sheel/1.jpg')},
            {title: 'sheel2', img: require('images/sheel/1.jpg')},
            {title: 'sheel3', img: require('images/sheel/1.jpg')},
            {title: 'sheel4', img: require('images/sheel/1.jpg')},
            {title: 'sheel1', img: require('images/sheel/1.jpg')},
            {title: 'sheel2', img: require('images/sheel/1.jpg')},
            {title: 'sheel3', img: require('images/sheel/1.jpg')},
            {title: 'sheel4', img: require('images/sheel/1.jpg')},
            {title: 'sheel1', img: require('images/sheel/1.jpg')},
            {title: 'sheel2', img: require('images/sheel/1.jpg')},
            {title: 'sheel3', img: require('images/sheel/1.jpg')},
            {title: 'sheel4', img: require('images/sheel/1.jpg')},
            {title: 'sheel1', img: require('images/sheel/1.jpg')},
            {title: 'sheel2', img: require('images/sheel/1.jpg')},
            {title: 'sheel3', img: require('images/sheel/1.jpg')},
            {title: 'sheel4', img: require('images/sheel/1.jpg')},
            {title: 'sheel4', img: require('images/sheel/1.jpg')},
            {title: 'sheel1', img: require('images/sheel/1.jpg')},
            {title: 'sheel2', img: require('images/sheel/1.jpg')},
            {title: 'sheel3', img: require('images/sheel/1.jpg')},
            {title: 'sheel4', img: require('images/sheel/1.jpg')}
        ]
    }
    if (JSON.parse(options.body).id === 1 && JSON.parse(options.body).index === 2) {
        return result2
    } else {
        return result
    }
})

let musicList = Mock.mock('http://musicList.cn', {
    'status': '0',
    'musicListData': [
        {songName: '一直很安静', singerName: '阿桑', src: require('~/music/yzhaj.mp3'), time: 251},
        {songName: '冰雨', singerName: '刘德华', src: require('~/music/bingyu.mp3'), time: 350},
        {songName: 'Lemon', singerName: '米津玄師', src: require('~/music/米津玄師 - Lemon.mp3'), time: 305},
        {songName: '逍遥叹', singerName: '奇然', src: require('~/music/奇然 - 逍遥叹.mp3'), time: 305},
        {songName: '瑠璃色の地球', singerName: '広瀬すず', src: require('~/music/広瀬すず - 瑠璃色の地球.mp3'), time: 305},
        {songName: ' Happy Sunshine', singerName: '伊藤かな恵', src: require('~/music/伊藤かな恵 - Happy Sunshine.mp3'), time: 305}
    ]
})
export default { song, hot, swipes, sheel, sheel2, musicList }

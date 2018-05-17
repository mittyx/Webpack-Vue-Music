import Mock from 'mockjs';

let song = Mock.mock('http://song.cn',{
	"status":"0",
	'result|3-6':[{
		'id|+1':0,
		'songName':'@cname',
	}]
})
let hot = Mock.mock('http://hot.cn',{
	"status":"0",
	'result|10':[{
		'id|+1':0,
		'songName':'@cname',
	}]
})
let swipes = Mock.mock('http://swipe.cn',{
	"status" : "0",
	"swipeData" : [
		{title:'轮播1',url:'/ts1',img:require('~/swipe/swipe_1.jpg')},
        {title:'轮播2',url:'/ts2',img:require('~/swipe/swipe_2.jpg')},
        {title:'轮播3',url:'/ts3',img:require('~/swipe/swipe_3.jpg')},
        {title:'轮播4',url:'/ts4',img:require('~/swipe/swipe_4.jpg')}
	]
})
let sheel = Mock.mock('http://sheel.cn',{
    "status" : "0",
    "sheelData" : [
        {title:'sheel1',img:require('~/sheel/1.jpg')},
        {title:'sheel2',img:require('~/sheel/1.jpg')},
        {title:'sheel3',img:require('~/sheel/1.jpg')},
        {title:'sheel4',img:require('~/sheel/1.jpg')},
        {title:'sheel1',img:require('~/sheel/1.jpg')},
        {title:'sheel2',img:require('~/sheel/1.jpg')},
        {title:'sheel3',img:require('~/sheel/1.jpg')},
        {title:'sheel4',img:require('~/sheel/1.jpg')},
        {title:'sheel1',img:require('~/sheel/1.jpg')},
        {title:'sheel2',img:require('~/sheel/1.jpg')},
        {title:'sheel3',img:require('~/sheel/1.jpg')},
        {title:'sheel4',img:require('~/sheel/1.jpg')},
        {title:'sheel1',img:require('~/sheel/1.jpg')},
        {title:'sheel2',img:require('~/sheel/1.jpg')},
        {title:'sheel3',img:require('~/sheel/1.jpg')},
        {title:'sheel4',img:require('~/sheel/1.jpg')}

    ]
})

let sheel2 = Mock.mock('http://sheel2.cn',function (options) {
    let result = {
        "status" : "1",
        "sheelData" : [
            {title:'sheel1',img:require('~/sheel/1.jpg')},
            {title:'sheel2',img:require('~/sheel/1.jpg')},
            {title:'sheel3',img:require('~/sheel/1.jpg')},
            {title:'sheel4',img:require('~/sheel/1.jpg')},

            {title:'sheel3',img:require('~/sheel/1.jpg')},
            {title:'sheel4',img:require('~/sheel/1.jpg')}
        ]
    }
    let result2 = {
        "status" : "2",
        "sheelData" : [
            {title:'sheel1',img:require('~/sheel/1.jpg')},
            {title:'sheel2',img:require('~/sheel/1.jpg')},
            {title:'sheel3',img:require('~/sheel/1.jpg')},
            {title:'sheel4',img:require('~/sheel/1.jpg')},
            {title:'sheel1',img:require('~/sheel/1.jpg')},
            {title:'sheel2',img:require('~/sheel/1.jpg')},
            {title:'sheel3',img:require('~/sheel/1.jpg')},
            {title:'sheel4',img:require('~/sheel/1.jpg')},
            {title:'sheel1',img:require('~/sheel/1.jpg')},
            {title:'sheel2',img:require('~/sheel/1.jpg')},
            {title:'sheel3',img:require('~/sheel/1.jpg')},
            {title:'sheel4',img:require('~/sheel/1.jpg')},
            {title:'sheel1',img:require('~/sheel/1.jpg')},
            {title:'sheel2',img:require('~/sheel/1.jpg')},
            {title:'sheel3',img:require('~/sheel/1.jpg')},
            {title:'sheel4',img:require('~/sheel/1.jpg')},
            {title:'sheel4',img:require('~/sheel/1.jpg')},
            {title:'sheel1',img:require('~/sheel/1.jpg')},
            {title:'sheel2',img:require('~/sheel/1.jpg')},
            {title:'sheel3',img:require('~/sheel/1.jpg')},
            {title:'sheel4',img:require('~/sheel/1.jpg')}
        ]
    }
    if (JSON.parse(options.body).id == 1 && JSON.parse(options.body).index == 2) {
        return result2
    }else{
        return result
    }
})
export default { song, hot, swipes, sheel,sheel2 }
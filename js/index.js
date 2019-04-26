$(function() {
	var liNum = 5 * 5 * 5; //暂且认为125个

	//拖拽与滚轮



	init();
	//混乱排序
	function init() {

		for (var i = 0; i < liNum; i++) {

			var $li = $('<li><p class="title">'+demoJson[0].title+'</p><span class="autor">'+demoJson[0].author+'</span><span class="date">'+demoJson[0].date+'</span></li>');

			var x = (Math.random() - 0.5) * 5000;
			var y = (Math.random() - 0.5) * 5000;
			var z = (Math.random() - 0.5) * 5000;
			$li.css({
				'transform': 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)'
			})
			$('#main').append($li);
		}
		setTimeout(function() {
			Grid();
		}, 300);

		$('#styleBtn li').click(function() {
			var index = $(this).index();
			switch (index) {
				case 0:
					Table();
					break;
				case 1:
					Sphere();
					break;
				case 2:
					Helix();
					break;
				case 3:
					Grid();
					break;
			}
		})
	}

	(function() {
		var nowX, lastX, minusX = 0; //若不给初始值就会出错！！！
		var nowY, lastY, minusY = 0;
		var roY = 0,
			roX = 0,
			ttZ = -2000;
		var timer1, timer2;
		$(document).mousedown(function(ev) {
			ev = ev || window.event;
			lastX = ev.clientX;
			lastY = ev.clientY;
			// console.log('鼠标按下了'); 
			clearInterval(timer1); //清除上次的timer

			$(this).on('mousemove', function(ev) {
				ev = ev || window.event;
				nowX = ev.clientX;
				nowY = ev.clientY;

				minusX = nowX - lastX;
				minusY = nowY - lastY;
				roY += minusX * 0.2;
				roX -= minusY * 0.2;

				$('#main').css({
					'transform': 'translateZ(' + ttZ + 'px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
				})

				lastX = nowX;
				lastY = nowY;

			});
			return false;
		}).mouseup(function() {
			$(this).off('mousemove');
			timer1 = setInterval(function() {
				minusX *= 0.9;
				minusY *= 0.9;
				roY += minusX * 0.2;
				roX -= minusY * 0.2;
				$('#main').css({
					'transform': 'translateZ(' + ttZ + 'px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
				})
				if (Math.abs(minusX) < 0.5 && Math.abs(minusY) < 0.5) {
					clearInterval(timer1);
				}
			}, 13)
			// console.log('鼠标抬起了')
		}).mousewheel(function(e, d) { //滚轮事件
			// var d = arguments //不定参数 实参的集合
			ttZ += d * 80;
			ttZ = Math.min(0, ttZ); //Math.min()
			ttZ = Math.max(-8000, ttZ);
			clearInterval(timer2);
			$('#main').css({
				'transform': 'translateZ(' + ttZ + 'px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
			})
			timer2 = setInterval(function() {
				d *= 0.85;
				ttZ += d * 80;
				ttZ = Math.min(0, ttZ); //Math.min()
				ttZ = Math.max(-8000, ttZ);
				$('#main').css({
					'transform': 'translateZ(' + ttZ + 'px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
				})
				if (Math.abs(d) < 0.01) {
					clearInterval(timer2);
				}
			}, 13)
		})
	})();

	function Grid() {
		$('#main li').each(function(i) {

			var tx = 500,
				ty = 500,
				tz = 800; //水平间隔 垂直间隔
			var firstX = -2 * tx; //第一个li水平偏移量
			var firstY = -2 * ty; //第一个li垂直偏移量
			var firstZ = -2 * tz; //第一个li z轴偏移量
			var ix = (i % 25) % 5;
			var iy = parseInt((i % 25) / 5);
			var iz = parseInt(i / 25);

			$(this).css({
				'transform': 'translate3d(' + (firstX + ix * tx) + 'px,' + (firstY + iy * ty) + 'px,' + (firstZ + iz * tz) + 'px)',
				'transition': '4s ease-in-out'
			});
		});
	}

	function Helix() {
		var roY = 10,
			tY = 10;
		var midLi = Math.floor($('#main li').length / 2);
		var firsttY = -10 * midLi;
		$('#main li').each(function(i) { //firsttY + 10*i就是一个个向下移动并且是一个10 单位向下移动
			$(this).css({
				'transform': 'rotateY(' + roY * i + 'deg) translateY(' + (firsttY + tY * i) + 'px) translateZ(900px)'
			});
		})

	}

	function Sphere() {
		// var tZ = 800;
		// var firstRoX = 0;
		// var firstRoY = 0;
		// var roX = 20 , roY =360 / (liNum /18 ); //总数除以18得到条数，360除以条数就是可以得到每一圈的度数

		// $('#main li').each(function(i) { //firsttY + 10*i就是一个个向下移动并且是一个10 单位向下移动
		// 	var iY = Math.floor(i / 18); //18是一圈的个数
		// 	$(this).html('fly');
		// 	var x = (firstRoX +20*i)%360;
		// 	var z = 0;
		// 	if( x > 90 && x < 270){
		// 		z = 180;
		// 	}
		// 	$(this).css({
		// 		'transform': 'rotateY('+(firstRoY+iY*roY)%360+'deg) rotateX(' +x+ 'deg) rotateZ('+z+'deg) translateZ(900px)'
		// 	});
		// })

		//注意，以上的因为圆的顶部太密集，所以此法不可通
		// var len , arr = [];
		// for(var x = 0;x< 10000;x++ ){
		// 	var a =16*x+9;
		// 	if(a  >= 125 ){
		// 		len = x;
		// 		break;
		// 	}
		// }
		// for(var i = 1;i<2*len;i++){
		// 	if(i<=len){
		// 		arr.push(2*i-1);
		// 	}
		// 	else{
		// 		arr.push(2*(2*len-i) -1);
		// 	}
		// }

		// var roX = 360 / arr.length;
		// var firstRoX = 90;
		// $('#main li').each(function(index){
		// 	var sum = 0;
		// 	var lever,ge;
		// 	$(this).html('fly');
		// 	for(var i = 0; i<arr.length; i++){
		// 		sum += arr[i];
		// 		if( sum >= index+1 ){
		// 			lever = i;
		// 			ge = arr[i] - (sum - index);
		// 			break;
		// 		}
		// 	}
			
		// 	var y = 360 / arr[lever];
		// 	var x = (lever % 2)? (firstRoX + lever*roX):(firstRoX - lever*roX);
		// 	var z = 0;
		
		// 	if(x>90 && x<270){
		// 		z=180; 
		// 	}
			
		// 	$(this).css({
		// 		'transform' : 'rotateY('+y+'deg) rotateX('+x+'deg) rotateZ(0deg) transitionZ(800px)'
		// 	})
			
		// });
		//以上是失败的效果

		var arr = [1,4,8,10,12,16,22,16,14,9,8,4,1];

		var roX = 180/arr.length;
		var firstRoX = 90;
		$('#main li').each(function(j){
			var sum = 0;

			var index, num;

			for(var i = 0; i<arr.length; i++){
				sum += arr[i];
				if(sum >= j+1){
					index = i;
					num = arr[i] - (sum -j);
					break;
				}
			}
			var roY = 360/arr[index];
			var x = (index%2)? firstRoX + index*roX : firstRoX - index*roX;
			var y = num * roY;
			var z = 0;
			if( x > 90 && x < 270 ){
				z = 180;
			} 
			$(this).css({
				'transform' : 'rotateY('+y+'deg) rotateX('+x+'deg) rotateZ('+z+'deg) translateZ(800px)'
			})
		})
	}

	function Table(){

		var tX = 160 , tY = 200;
		var firstX = -9*tX + 80;
		var minH = Math.ceil( liNum / 18 / 2);
		var firstY = -minH * tY;
		var arr = [			//元素周期表
			{x:firstX,y:firstY},
			{x:firstX+17*tX,y:firstY},
			{x:firstX , y:firstY+tY },
			{x:firstX+tX , y:firstY+tY},
			{x:firstX+12*tX , y:firstY+tY },
			{x:firstX+13*tX , y:firstY+tY },
			{x:firstX+14*tX , y:firstY+tY },
			{x:firstX+15*tX , y:firstY+tY },
			{x:firstX+16*tX , y:firstY+tY },
			{x:firstX+17*tX , y:firstY+tY },
			{x:firstX , y:firstY+tY*2 },
			{x:firstX+tX , y:firstY+tY*2},
			{x:firstX+12*tX , y:firstY+tY*2 },
			{x:firstX+13*tX , y:firstY+tY*2 },
			{x:firstX+14*tX , y:firstY+tY*2 },
			{x:firstX+15*tX , y:firstY+tY*2 },
			{x:firstX+16*tX , y:firstY+tY*2 },
			{x:firstX+17*tX , y:firstY+tY*2 }
		];

		$('#main li').each(function(i){
			var x, y;

			if( i < 18 ){
				x = arr[i].x;
				y = arr[i].y;

			}else{
				var iX = (i+18) % 18;
				var iY = parseInt((i+18)/18);
				x = firstX + iX*tX;
				y = firstY + iY*tY;
			}
			
			$(this).css({
				'transform' : 'translate('+x+'px,'+y+'px)'
			})


		})

	}

	(function(){
		var $mainLi = $('#main li');
		var $show = $('#show');
		$mainLi.click(function(ev){
			ev = ev || window.event;
			$('#show').fadeIn(1000).css({
				'transform' : 'rotateY(0deg) scale(1)'
			})
			ev.stopPropagation();//阻止冒泡 
		});
		$(document).click(function(){
			$('#show').fadeOut(1000,function(){
				$(this).css({
					'transform' : 'rotateY(0deg) scale(1.5)'
				})
			}).css({
				'transform' : 'rotateY(180deg) scale(0.1)'
			})
		})
		$show.click(function(ev){
			$('#wrap').animate({
				'marginLeft' : '-100%'
			},1000,function(){
				$show.css({
					'transform' : 'rotateY(0deg) scale(1.5)'
				})	
			});
			$('#frame').show().animate({
				left: 0
			},1000).find('iframe').attr('src','demo/I love.html');
			
		});
		$('#back').click(function(){
			$('#wrap').animate({
				'marginLeft' : 0
			},1000);
			$('#frame').show().animate({
				left : '100%'
			},1000);
		ev = ev || window.event;
		ev.stopPropagation();

		})

	})();

	

})
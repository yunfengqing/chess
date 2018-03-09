$(function(){
	let qipan=$("ul.qipan");
	let flag=true;
	let black={};//用一个black对象保存当前页面显示的黑棋子
	let write={};//用一个write对象保存当前页面显示的白棋子
	let blank={};//用一个blank对象保存当前页面空白位置的棋子
	/*blank[0_0]:{x:0,y:0} */
	let isAi=true;
	for(let i=0;i<15;i++){
		for(let j=0;j<15;j++){
			$('<li>').appendTo('ul.qipan').addClass('qizi').attr('id',i+'_'+j).data("pos",{x:i,y:j});//用data添加一个关于位置的对象数据
		    blank[i+'_'+j]={x:i,y:j};
		}
	}
	for(let i=0;i<15;i++){
		$('<div>').appendTo('ul.qipan').addClass('row');
		$('<span>').appendTo('ul.qipan').addClass('col');
	}
	for(let i=0;i<5;i++){
		$('<i>').appendTo('ul.qipan').addClass('dian');
	}
	
	$('.qizi').on('click',function(){
		
		if($(this).hasClass('black')||$(this).hasClass('write')){
			return;
		}//如果当前这枚棋子已经被点击过，将不能再重复点击
		
		let data=$(this).data('pos');//将位置信息保存到data中
		
		if(flag){
			$(this).addClass('black');
			black[data.x+'_'+data.y]=true;
			delete blank[data.x+'_'+data.y];
			if(panduan(data,black)>=5){
				$('.qizi').off();
				alert('黑棋赢');	
			}
			
			if(isAi){
				let pos=ai();
				$(`#${pos.x}_${pos.y}`).addClass('write');
				delete blank[pos.x+'_'+pos.y];
				write[pos.x+'_'+pos.y]=true;
				if(panduan(pos,write)>=5){
					$('.qizi').off();
					alert('白棋赢');	
				}
				return;
			}
		}else{
			$(this).addClass('write');
			write[data.x+'_'+data.y]=true;
			if(panduan(data,write)>=5){
				$('.qizi').off();
				alert('白棋赢');
			}
		}
		flag=!flag;
	})
	
	function ai(){
		let max=-Infinity;//Infinity是无穷大量,-Infinity是无穷小量
		let zb=null;//存放坐标
		let max1=-Infinity;
		let zb1=null;
		for(let i in blank){
			let score=panduan(blank[i],black);
			if(score>max){
				max=score;
				zb=blank[i];
			}
		}
		
		for(let i in blank){
			let score1=panduan(blank[i],write);
			if(score1>max1){
				max1=score1;
				zb1=blank[i];
			}
		}
		
		return (max>=max1)?zb:zb1;
	}
	//pos保存当前棋子的位置信息，type保存棋子类型，类型为黑白棋子
	
	/*cols记录相邻横排当前类型棋子的个数，
	 rows记录相邻竖排当前类型棋子的个数，
	 zx记录相邻左斜排当前类型棋子的个数，
	 yx记录相邻右斜排当前类型棋子的个数，
	 * 
	 * 
	 * */
	function panduan(pos,type){
		let cols=1,rows=1,zx=1,yx=1;
		let i=pos.x,j=pos.y+1;
		//横
		while(type[i+'_'+j]){
			rows++;
			j++;
		}
		j=pos.y-1;
		while(type[i+'_'+j]){
			rows++;
			j--;
		}
		//竖
		i=pos.x-1,j=pos.y;
		while(type[i+'_'+j]){
			cols++;
			i--;
		}
		i=pos.x+1;
		while(type[i+'_'+j]){
			cols++;
			i++;
		}
		//左斜
		i=pos.x+1,j=pos.y+1;
		while(type[i+'_'+j]){
			zx++;
			i++;
			j++;
		}
		i=pos.x-1,j=pos.y-1;
		while(type[i+'_'+j]){
			zx++;
			i--;
			j--;
		}
		
		//右斜
		i=pos.x+1,j=pos.y-1;
		while(type[i+'_'+j]){
			yx++;
			i++;
			j--;
		}
		i=pos.x-1,j=pos.y+1;
		while(type[i+'_'+j]){
			yx++;
			i--;
			j++;
		}
		return Math.max(rows,cols,zx,yx);
	}
	

	
	 
	
	
})

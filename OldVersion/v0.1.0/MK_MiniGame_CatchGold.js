//=============================================================================
// MK_MiniGame_CatchGold.js
// 
//=============================================================================
//  author : Mikan 
//  plugin : MK_MiniGame_CatchGold.js 捡金币小游戏
// version : v0.1.x 2019/10/23 开发中
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
//  [GitHub] https://github.com/MikanHako1024/
//    [Blog] NONE
//=============================================================================




/*:
 * @plugindesc 捡金币小游戏
 * @author Mikan 
 * @version v0.1.x 2019/10/23 开发中
 * v0.1.0 2019/10/23 开发中
 * 
 * 
 * @param ==== 游戏参数配置 ====
 * 
 * @param 
 * @desc 
 * @default 
 * 
 * @param ==== 插件指令配置 ====
 * 
 * @param 
 * @desc 
 * @default 
 * 
 * @param ==== under ====
 * 
 * 
 * 
 * 
 * @help
 * ---- 插件指令 ----
 * 
 *   # 呼叫捡金币小游戏.
 *   MK_CallMiniGame_CatchGold $gameVariables_Id
 *   ex : MK_CallMiniGame_CatchGold 1
 * 
 * 
 * 
 * ---- 用语说明 ----
 * 
 * NONE
 * 
 * 
 * 
 * ---- 参数描述 ----
 * NONE
 * 
 * 
 * 
 * ---- 标签设置 ----
 * 
 * NONE
 * 
 * 
 * 
 * ---- 使用方法 ----
 * 
 * NONE
 * 
 * 
 * 
 * ---- 开发方法 ----
 * 
 * NONE
 * 
 * 
 * 
 * ---- 使用规约 ----
 * 
 * 如果需要使用本插件，只需要在GitHub给本插件一个Star或Watching即可。
 * 仓库：https://github.com/MikanHako1024/  ___TBD___
 * 
 * 这之后，可以对本插件随意修改使用，或二次开发。（但是，请保留页眉的著作权表示部分。）
 * 
 * 使用形式（自由游戏、商业游戏、R-18作品等）没有限制，请随意使用。
 * 
 * 由于使用本插件而发生的问题，作者不负任何责任。有必要时请注意备份。
 * 
 * 如果您有任何要求，您可能需要本插件的版本升级。
 * 根据版本升级，本插件的规格有可能变更。请谅解。
 * 
 * 如果有什么意见或建议可以联系我，欢迎。
 * 
 */





// ？仿照 Scene_Map 和 Scene_MenuBase, Scene_Menu ...


//-----------------------------------------------------------------------------
// Scene_MiniGame_CatchGold
// 接金币小游戏场景

function Scene_MiniGame_CatchGold() {
    this.initialize.apply(this, arguments);
}


Scene_MiniGame_CatchGold.prototype = Object.create(Scene_Base.prototype);

Scene_MiniGame_CatchGold.prototype.constructor = Scene_MiniGame_CatchGold;

Scene_MiniGame_CatchGold.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);

    this._gameWindow = null;

	this._gameStart = false;
	this._gamePause = true;

	this._density = 0; // 密度
	this._score = 0;
	this._life = 0;

	this._count_gameRun = 0;
	this._count_newItem = 0;

    //this.createWindowLayer();

    this.initItemData(); // initGameData
    this.initPlayerData();
    //this.createAllWindow();
};


// ？initXXData

// ？initAllData





// ------------------------
// 参数配置
{
	Scene_MiniGame_CatchGold.GAMEWINDOW_POS_X       	= 100;
	Scene_MiniGame_CatchGold.GAMEWINDOW_POS_Y       	= 100;
	Scene_MiniGame_CatchGold.GAMEWINDOW_WIDTH       	= 616;
	Scene_MiniGame_CatchGold.GAMEWINDOW_HEIGHT      	= 424;
	Scene_MiniGame_CatchGold.GAMEWINDOW_BACKPIC     	= 'back1';
	// ？可以改为 插件参数控制 ...

	// ？若居中 则不需要 x, y ...


	Scene_MiniGame_CatchGold.GAMEBOARD_WIDTH        	= 240;
	Scene_MiniGame_CatchGold.GAMEBOARD_HEIGHT       	= 380; // 200
		// Window 自带padding : 18
	Scene_MiniGame_CatchGold.GAMEBOARD_PADDINGWIDTH 	= 0;
	Scene_MiniGame_CatchGold.GAMEBOARD_PADDINGHEIGHT 	= 0;


	Scene_MiniGame_CatchGold.GAMECONFIG_NEXTITEM    	= 50;
	//Scene_MiniGame_CatchGold.GAMECONFIG_          	= 240;



	Scene_MiniGame_CatchGold.ITEMDATA_INITSPEED_MIN 	= 3;
	Scene_MiniGame_CatchGold.ITEMDATA_INITSPEED_MAX 	= 5;



	Scene_MiniGame_CatchGold.ITEMDATA_GOLD_ADD      	= 10;
	Scene_MiniGame_CatchGold.ITEMDATA_GOLD_FREQUENCY 	= 20;
	Scene_MiniGame_CatchGold.ITEMDATA_BOOM_ADD      	= -30;
	Scene_MiniGame_CatchGold.ITEMDATA_BOOM_FREQUENCY 	= 10;
}




// ------------------------
// 背景模糊 (仿照 Scene_MenuBase)
{
	Scene_MiniGame_CatchGold.prototype.create = function() {
	    Scene_Base.prototype.create.call(this);
	    this.createBackground();
	    this.createWindowLayer();

	    this.createAllWindow();
	};
	Scene_MiniGame_CatchGold.prototype.createBackground = function() {
	    this._backgroundSprite = new Sprite();
	    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
	    this.addChild(this._backgroundSprite);
	};
	Scene_MiniGame_CatchGold.prototype.setBackgroundOpacity = function(opacity) {
	    this._backgroundSprite.opacity = opacity;
	};
}




// ------------------------
// 物体及物体种类数据
{
	Scene_MiniGame_CatchGold.prototype.initItemData = function() {

		//this._gameData = {}; // ？游戏数据全部装入一个对象 ...


		// initItemData ...

		this._itemList = [];
		this._item_model = {
			type: 0, 
			position: { x: 0, y: 0 }, 
			speed: { x: 0, y: 0 }, 
			accelerate: { x: 0, y: 0 }, 
			size: { width: 0, height: 0 }, 
		}; // ？代替物体类的属性 ...

		this._itemType = []; 
		this._itemType_model = {
			step: function() {},
			//...//////////
			// ？其他方法 包含但不限于 : 物体默认数据
		}; // ？代替物体类的方法 ...

		this.initItemType();
	};

	// ？物品的特殊效果函数 可以调用外界的函数 而不在其中具体实现 ...


	Scene_MiniGame_CatchGold.prototype.initItemType = function() {

		// 金币
		this.addItemType({
			image: 'gold', 
			size: { width: 36, height: 40 }, 

			// ？速度范围 ...

			//scoreAdd: 10, 
			//frequency: 20, // 频率
			scoreAdd: Scene_MiniGame_CatchGold.ITEMDATA_GOLD_ADD, 
			frequency: Scene_MiniGame_CatchGold.ITEMDATA_GOLD_FREQUENCY, // 频率

		}, 0);

		// 炸弹
		this.addItemType({
			image: 'boom', 
			size: { width: 38, height: 42 }, 

			//scoreAdd: -30, 
			//frequency: 5,
			scoreAdd: Scene_MiniGame_CatchGold.ITEMDATA_BOOM_ADD, 
			frequency: Scene_MiniGame_CatchGold.ITEMDATA_BOOM_FREQUENCY, // 频率

		}, 1);

		// 其他

	};

	Scene_MiniGame_CatchGold.prototype.addItemType = function(itemType, id) {
		//Object.assign ... (this._itemType_model ... , itemType ... )
		// ？代替 类实例 ...

		// ？？直接用类 ...

		if (id === undefined) this._itemType.push(itemType);
		else this._itemType[id] = itemType;

		ImageManager.loadPicture(itemType.image);
		// ？预加载图片 ...
		// ？放进 itemType 的 初始化方法里 ...
	};


	// 其他的操作 ...
}




// ------------------------
// 人物数据
{
	Scene_MiniGame_CatchGold.prototype.initPlayerData = function() {
	 
		this._player = {
			position: { x: 0, y: 0 }, 
			speed: { x: 0, y: 0 }, 
			accelerate: { x: 0, y: 0 }, 
			size: { width: 0, height: 0 }, 
		};

		this._player.size.width = 48;
		this._player.size.height = 48;
		this._player.position.x = (Scene_MiniGame_CatchGold.GAMEBOARD_WIDTH - this._player.size.width) / 2;
		this._player.position.y = (Scene_MiniGame_CatchGold.GAMEBOARD_HEIGHT - this._player.size.height);
		this._player.speed.x = 0;
		this._player.speed.y = 0;
		this._player.accelerate.x = 0;
		this._player.accelerate.y = 0;


		var leaderData = $gameParty.leader().actor();
		this._playerImage = {
			characterIndex: leaderData.characterIndex, 
			characterName: leaderData.characterName, 

			characterImage: null,  
		};

		//this.loadPlayerImage(); // 预加载
		// ？可以储存它 ...
		this._playerImage.characterImage = this.loadPlayerImage();


		this._playerState = {
			isInMotion: false, 
			isMovingLeft: true, 
		};

	};


	Scene_MiniGame_CatchGold.prototype.loadPlayerImage = function() {
		return ImageManager.loadCharacter(this._playerImage.characterName);
	};

	Scene_MiniGame_CatchGold.prototype.getPlayerImage = function() {
		return this._playerImage.characterImage 
			|| (this._playerImage.characterImage = this.loadPlayerImage());
	};

	Scene_MiniGame_CatchGold.prototype.getPlayerCharacterIndex = function() {
		return this._playerImage.characterIndex;
	};



	//Scene_MiniGame_CatchGold.prototype.getPlayerImageWidth = function() {
	//	var image = this.getPlayerImage();
	//	return image.width / 12;
	//};

	//Scene_MiniGame_CatchGold.prototype.getPlayerImageHeight = function() {
	//	var image = this.getPlayerImage();
	//	return image.height / 8;
	//};

	Scene_MiniGame_CatchGold.prototype.getPlayerImageRect = function() {

		var character = this.getPlayerImage();
		var cIndex = this.getPlayerCharacterIndex();
		var dir = this.getPlayerDirection();
		var pattern = this.getPlayerPattern();

		return this.getCharacterImageRect(character, cIndex, dir, pattern);
	};

	Scene_MiniGame_CatchGold.prototype.getCharacterImageRect = function(character, cIndex, dir, pattern) {
		character = character || new Bitmap(); // ？...
		cIndex = cIndex || 0;
		dir = dir || 8;
		pattern = pattern || 1;

		var rect = new Rectangle();

		//rect.width  = this.getPlayerImageWidth ();
		//rect.height = this.getPlayerImageHeight();

		rect.width  = character.width  / 12;
		rect.height = character.height /  8;

		//var cIndex = this._playerImage.characterIndex;
		var colBlock = cIndex % 4;
		var rowBlock = Math.floor(cIndex / 4); // 注意要取整 否则结果有小数 ...
		var colInBlock = pattern;
		var rowInBlock = dir / 2 - 1;

		var col = 4 * colBlock + colInBlock;
		var row = 2 * rowBlock + rowInBlock;

		rect.x = Math.floor(col * rect.width );
		rect.y = Math.floor(row * rect.height);

		return rect;
	}; // ？未用到任何 this.xx 可以从类对象的方法里提出来 ...


	Scene_MiniGame_CatchGold.prototype.getPlayerPattern = function() {
		if (this.isPlayerMoveCannot()) return 1; // 不允许移动
		if (this.isPlayerMoveStop()) return 1; // 未移动

		//return this._count_gameRun % 3; // ？会"抽搐" ...
		return Math.floor(this._count_gameRun / (48 / 5)) % 3; // ？【暂时】 (width / speed)...

		// ？【待】 考虑一次移动的距离 并结合速度等 ...
		// ？模仿 Scene_Map 上角色移动 (看源码) ...
	};
}





// ------------------------
// 人物控制

//Scene_MiniGame_CatchGold.prototype.playerMoveDirection = function() {
//	// 下2 左4 右6 上8 -> 左4 右6 停8
//	     if (this.isPlayerMoveLeft()) 	return 4;
//	else if (this.isPlayerMoveRight()) 	return 6;
//	//else if (this.isPlayerMoveStop()) 	return 8;
//	else                               	return 8;
//};
//
//Scene_MiniGame_CatchGold.prototype.isPlayerMoveLeft = function() {
//	// 按了左键
//};
//
//Scene_MiniGame_CatchGold.prototype.isPlayerMoveRight = function() {
//	// 按了右键
//};
//
//Scene_MiniGame_CatchGold.prototype.isPlayerMoveStop = function() {
//	return !this.isPlayerMoveLeft() && !this.isPlayerMoveRight();
//};






Scene_MiniGame_CatchGold.prototype.playerMoveLeft = function() {
	//this._player.accelerate.x -= 1; // ？参数控制移动能力
	//this._player.position.x -= 5;
	this._player.speed.x = -5;
		// ？设置速度 在playerStep里 自动修改 position ...

	// ？标记左移 ...
		// ？用于其他地方判断移动状态 ...
	this._playerState.isInMotion = true;
	this._playerState.isMovingLeft = true;
};

Scene_MiniGame_CatchGold.prototype.playerMoveRight = function() {
	//this._player.accelerate.x += 1; // ？参数控制移动能力
	//this._player.position.x += 5;
	this._player.speed.x = 5;

	// ？标记右移 ...
		// ？用于其他地方判断移动状态 ...
	this._playerState.isInMotion = true;
	this._playerState.isMovingLeft = false;
};

Scene_MiniGame_CatchGold.prototype.playerMoveStop = function() {
	this._player.speed.x = 0;

	// ？标记停止 ...
		// ？用于其他地方判断移动状态 ...
	this._playerState.isInMotion = false;
};
// ？停止 ...
// ？不按的时候恢复 ...
// ？或 每帧开始的时候置0 ...





Scene_MiniGame_CatchGold.prototype.getPlayerDirection = function() {

	     if (this.isPlayerMoveCannot()) return 8;
	else if (this.isPlayerMoveLeft  ()) return 4;
	else if (this.isPlayerMoveRight ()) return 6;
	else if (this.isPlayerMoveStop  ()) return 8;
	else                                return 8;
};

Scene_MiniGame_CatchGold.prototype.isPlayerMoveCannot = function() {
	return !this.isGameStart();
	// ？游戏未开始时方向固定向上
};

Scene_MiniGame_CatchGold.prototype.isPlayerMoveLeft = function() {
	return this._playerState.isInMotion && this._playerState.isMovingLeft;
};

Scene_MiniGame_CatchGold.prototype.isPlayerMoveRight = function() {
	return this._playerState.isInMotion && !this._playerState.isMovingLeft;
};

Scene_MiniGame_CatchGold.prototype.isPlayerMoveStop = function() {
	return !this._playerState.isInMotion;
};








// 写一个方法用于随机数 ...
// 范围随机数函数 ...

function MK_makeRandomInteger(lower, upper) {
	return Math.floor(Math.random() * (upper - lower + 1) + lower);
} // 待使用

function MK_makeRandomNumber(lower, upper, length) {
	//...
}




// ------------------------
// 制作随机种类
{
	Scene_MiniGame_CatchGold.prototype.getItemType = function() {
		return this._itemType;
	};

	Scene_MiniGame_CatchGold.prototype.makeRandomType = function() {
		var sumFreq = this.getSumFrequency();
		var random = Math.floor(Math.random()*sumFreq); // 0 - (sumFreq-1)
		var typeIndex = this.selectType(random);
		//return this.getItemType()[typeIndex]; 
		return typeIndex;
	};

	Scene_MiniGame_CatchGold.prototype.getSumFrequency = function() {
		var typeList = this.getItemType();
		var sum = 0;
		for (var idx=0; idx<typeList.length; idx++) {
			sum += typeList[idx].frequency;
		}
		return sum;
	}; // ？因为 frequency 可能/允许变动 所以每次都需要重新求和 ...

	Scene_MiniGame_CatchGold.prototype.selectType = function(number) {
		var typeList = this.getItemType();
		for (var idx=0; idx<typeList.length; idx++) {
			if (number < typeList[idx].frequency) {
				return idx;
			}
			number -= typeList[idx].frequency;
		}
		return 0;
	};
}




// ------------------------
// 制作随机物体
{
	Scene_MiniGame_CatchGold.prototype.getItemList = function() {
		return this._itemList;
	};

	Scene_MiniGame_CatchGold.prototype.addRandomItem = function() {
		var itemTypeIndex = this.makeRandomType();
		this.addItem(this.makeItem(itemTypeIndex));
	};

	Scene_MiniGame_CatchGold.prototype.makeItem = function(typeIndex) {
			// ？传入 type 还是 typeIndex ...
			// ？传入 type 可以事前有所修改 ...
				// ？如果物品不用到 物品种类里的初始数据 那么只需要种类id 即可 ...

		//this.addItem(itemTypeIndex);

		//var item = new this._item_model(); // ？不行 ...
		//var item = Object.assign({}, this._item_model); // ？不行 返回值指向的相同 ...
		// ？因为 this._item_model 里有 object 所以需要深拷贝 ...
		var item = JSON.parse(JSON.stringify(this._item_model)); // ？用JSON序列化 可行 ...

		var type = this._itemType[typeIndex];

		item.type = typeIndex;

		item.size.width  = type.size.width ;
		item.size.height = type.size.height;
		// ？改用 type里的方法 ...

		item.position.y = -item.size.height;
		//item.position.x = Math.floor(Math.random() * (Scene_MiniGame_CatchGold.GAMEBOARD_WIDTH - item.size.width));
		item.position.x = Math.floor(Math.random() * (Scene_MiniGame_CatchGold.GAMEBOARD_WIDTH - 10 - item.size.width) + 5);
		// ？改用 item里或type里的方法 ...

		//item.speed.y = Math.floor(Math.random() * 3 + 1); // 暂时
		item.speed.y = MK_makeRandomInteger(
			Scene_MiniGame_CatchGold.ITEMDATA_INITSPEED_MIN, 
			Scene_MiniGame_CatchGold.ITEMDATA_INITSPEED_MAX, 
		); // 暂时
		// ？【待】 用 type 限制 并用 type 里的方法 ...


		//this.addItem(item);
		return item;
	};

	Scene_MiniGame_CatchGold.prototype.addItem = function(item) { 
		return this.getItemList().push(item);
	};
}




// ------------------------
// 捡到物体和删除物体
{
	// 移除物体 
		// ？为方便整理数组 移除时直接去除空位 (？用 splice 或 slice) ...
		// ？同时 循环检测并删除时 需要从后往前 ...
	Scene_MiniGame_CatchGold.prototype.removeItemByIndex = function(index) {
		this.getItemList().splice(index, 1);
	};

	Scene_MiniGame_CatchGold.prototype.playerCatchItemByIndex = function(index) {

		// ？是否要 调用item对应type的 捡到 方法 ...

		//this._score += this.getItemType()[this.getItemList()[index].type].scoreAdd; // ？暂时
		this.addScore(this.getItemType()[this.getItemList()[index].type].scoreAdd); // ？暂时

		this.removeItemByIndex(index);
	};
}




// ------------------------
// 分数计算
{
	Scene_MiniGame_CatchGold.prototype.getScore = function() {
		return this._score;
	};
	Scene_MiniGame_CatchGold.prototype.setScore = function(score) {
		this._score = score;
	};

	Scene_MiniGame_CatchGold.prototype.addScore = function(dScore) {
		this.setScore(this.getScore() + dScore);
	};
	Scene_MiniGame_CatchGold.prototype.subScore = function(dScore) {
		this.setScore(this.getScore() - dScore);
	};
	Scene_MiniGame_CatchGold.prototype.resetScore = function() {
		this.setScore(0);
	};
}




// ------------------------
// 创建游戏窗口
{
	Scene_MiniGame_CatchGold.prototype.createAllWindow = function() {
		this.createGameWindow();
	};

	Scene_MiniGame_CatchGold.prototype.createGameWindow = function() {

	    this._gameWindow = new Window_MiniGame_CatchGold_Game(
	    	this.constructor.GAMEWINDOW_POS_X, 
	    	this.constructor.GAMEWINDOW_POS_Y, 
	    	this.constructor.GAMEWINDOW_WIDTH, 
	    	this.constructor.GAMEWINDOW_HEIGHT, 
	    );

	    // ？setupXXX 方法 (和 processHandling 一类)
	    this._gameWindow.setHandler('ok', this.startGame.bind(this));
	    this._gameWindow.setHandler('cancel', this.popScene.bind(this));

	    this._gameWindow.setHandler('left', this.playerMoveLeft.bind(this));
	    this._gameWindow.setHandler('right', this.playerMoveRight.bind(this));
	    this._gameWindow.setHandler('stop', this.playerMoveStop.bind(this)); 
	    	// ？暂时无停止按键 但是要设这个 handler ...


	    this._gameWindow.activate(); // ？需要激活 才能执行 handler ...
	    // ？放到其他地方 ...

	    this.addWindow(this._gameWindow);
	};

	Scene_MiniGame_CatchGold.prototype.getContents = function() {
		return this._gameWindow.contents;
	}; // ？获取窗口的contents 在这上面画游戏画面 ...
}




// ------------------------
// 游戏控制
{
	Scene_MiniGame_CatchGold.prototype.startGame = function() {
		this._gameStart = true;
	};
	Scene_MiniGame_CatchGold.prototype.endGame = function() {
		this._gameStart = false;
	};
	Scene_MiniGame_CatchGold.prototype.pauseGame = function() {
		this._gamePause = true;
	};
	Scene_MiniGame_CatchGold.prototype.continueGame = function() {
		this._gamePause = false;
	};

	Scene_MiniGame_CatchGold.prototype.isGameStart = function() {
		return this._gameStart;
	};
	Scene_MiniGame_CatchGold.prototype.isGamePause = function() {
		return this._gamePause;
	};
}







// ------------------------
// 游戏帧

Scene_MiniGame_CatchGold.prototype.update = function() {

	this.updateGame();
	this.drawGameBoard();

	Scene_Base.prototype.update.call(this); 
	// ？会对孩子更新 所以放后面 ...
};

Scene_MiniGame_CatchGold.prototype.updateGame = function() {

	if (!this.isGameStart()) return ;

	//this.processHandling(); // ？写在 Window_XX 里 ...

	this.allItemsStep();

	this.playerStep();

	this.processItemOutBoundary(); // ？消失 ？出界

	this.processItemContact(); // ？接触 ？捡拾 ？接住

	this.newItemStep();


	// ？各部分的顺序 ...
};


Scene_MiniGame_CatchGold.prototype.allItemsStep = function() {

	//this.forEachItems(function(item) {
	//	this.itemStepByItem(item);
	//	// ？这个 this 将是 window ...
	//});

	for (var idx=0; idx<this._itemList.length; idx++) {
		var item = this._itemList[idx];
		this.itemStepByItem(item);
	}
};
// ？是否要 step 的同时 判断接触 ...
	// ？不要

//Scene_MiniGame_CatchGold.prototype.forEachItems = function(func) {
//	this._itemList.forEach(func);
//		// ？是否要用函数 取 _itemList ...
//};

Scene_MiniGame_CatchGold.prototype.itemStepByItem = function(item) {
	item.position.x += item.speed.x;
	item.position.y += item.speed.y;

	item.speed.x += item.accelerate.x;
	item.speed.y += item.accelerate.y;
		// ？加速度还要考虑 不越过0 ...
};

Scene_MiniGame_CatchGold.prototype.itemStepByIndex = function(index) {
	index<this._itemList.length && !!this._itemList[index]
		&& this.itemStepByItem(this._itemListList[index]);
};





// 处理出界
	// ？inBoard方法判断 ？检测与游戏画布矩形无接触 ...
	// ？注意在画布顶上的不要删除 ...
Scene_MiniGame_CatchGold.prototype.processItemOutBoundary = function() {

	var gameBoardRect = this.getGameBoardRect();

	var itemList = this.getItemList();
	//for (var idx=0; idx<itemList.length; idx++) {
		// ？因为要填满list(暂时) 所以从后面开始 边检测边删除 ...
	for (var idx=itemList.length-1; idx>=0; idx--) {
		var item = itemList[idx];
		if (!isRectContact(gameBoardRect, this.getItemRect(item))) {
			this.removeItemByIndex(idx);
		}
	}
};

Scene_MiniGame_CatchGold.prototype.getGameBoardRect = function() {
	var rect = new Rectangle();
	rect.x = 0;
	rect.y = 0;
	rect.width = Scene_MiniGame_CatchGold.GAMEBOARD_WIDTH;
	rect.height = Scene_MiniGame_CatchGold.GAMEBOARD_HEIGHT;
	return rect;
};




// 处理接触
	// ？矩形接触(暂时) 还是 像素接触 ...
Scene_MiniGame_CatchGold.prototype.processItemContact = function() {

	var playerRect = this.getPlayerRect();

	var itemList = this.getItemList();
	//for (var idx=0; idx<itemList.length; idx++) {
		// ？因为要填满list(暂时) 所以从后面开始 边检测边删除 ...
	for (var idx=itemList.length-1; idx>=0; idx--) {
		var item = itemList[idx];
		if (isRectContact(playerRect, this.getItemRect(item))) {
			//this.removeItemByIndex(idx);
			this.playerCatchItemByIndex(idx);
		}
	}
};

Scene_MiniGame_CatchGold.prototype.getPlayerRect = function() {
	//var player = this._player;
	//var rect = new Rectangle();
	//rect.x = player.position.x;
	//rect.y = player.position.y;
	//rect.width = player.size.width;
	//rect.height = player.size.height;
	//return rect;
	return this.getGameDataRect(this._player);
};

Scene_MiniGame_CatchGold.prototype.getItemRect = function(item) {
	//var rect = new Rectangle();
	//rect.x = item.position.x;
	//rect.y = item.position.y;
	//rect.width = item.size.width;
	//rect.height = item.size.height;
	//return rect;
	return this.getGameDataRect(item);
};
// ？暂时可以兼容合并两者 ...

Scene_MiniGame_CatchGold.prototype.getGameDataRect = function(data) {
	var rect = new Rectangle();
	rect.x      = data.position.x ;
	rect.y      = data.position.y ;
	rect.width  = data.size.width ;
	rect.height = data.size.height;
	return rect;
};





// 判断矩形接触
	// ？若是 必有 某一个矩形的某一个点在另一个矩形里 ...
function isRectContact(rect1, rect2) {
	var rectList = [ rect1, rect2 ];
	var vertList = [ getVertexesFromRect(rect1), getVertexesFromRect(rect2) ];

	for (var k=0; k<=1; k++)
		for (var idx=0; idx<vertList[k].length; idx++)
			if (isPointInRect(vertList[k][idx], rectList[1-k]))
				return true;
	return false;
}


// 判断点在矩形里
	// ？若是 必有 点在矩形上下边缘之间和左右边缘之间 ...
function isPointInRect(point, rect) {
	return (rect.x <= point.x && point.x <= rect.x + rect.width )
		&& (rect.y <= point.y && point.y <= rect.y + rect.height);
}

// 获取矩形顶点
function getVertexesFromRect(rect) {
	return [
		{ x: rect.x             , y: rect.y               }, 
		{ x: rect.x             , y: rect.y + rect.height }, 
		{ x: rect.x + rect.width, y: rect.y               }, 
		{ x: rect.x + rect.width, y: rect.y + rect.height }, 
	];
}





Scene_MiniGame_CatchGold.prototype.newItemStep = function() {
	this._count_newItem--;
	if (this.isNeedCreateNewItem()) {
		this.addRandomItem();
		this.setNextNewItem();
	}
};

Scene_MiniGame_CatchGold.prototype.isNeedCreateNewItem = function() {
	return this._count_newItem <= 0;
};

Scene_MiniGame_CatchGold.prototype.setNextNewItem = function() {
	this._count_newItem = Scene_MiniGame_CatchGold.GAMECONFIG_NEXTITEM;
	// ？非相同间隔 (有波动 并且 均值会随时间变化)
};






Scene_MiniGame_CatchGold.prototype.playerStep = function() {
	var player = this._player;
	player.position.x += player.speed.x;
	player.position.y += player.speed.y;
		// ？还要考虑不超出游戏界面 ...

	if (this.isPlayerOverLeft ()) this.setPlayerBoundaryLeft ();
	if (this.isPlayerOverRight()) this.setPlayerBoundaryRight();


	//player.speed.x += player.accelerate.x;
	//player.speed.y += player.accelerate.y;
		// ？加速度还要考虑 不越过0 ...


};


Scene_MiniGame_CatchGold.GAMECONFIG_ALLOWOVER_PER = 0.15; // 0.00
	// ？允许越界的程度 (大小的比例) ...

Scene_MiniGame_CatchGold.prototype.isPlayerOverLeft = function() {
	//return this._player.position.x < 0;
	//return this._player.position.x < 0 + Math.floor(this._player.size.width * Scene_MiniGame_CatchGold.GAMECONFIG_ALLOWOVER_PER);
	return this._player.position.x < 0 - this.playerAllowOverWidth();
};
Scene_MiniGame_CatchGold.prototype.setPlayerBoundaryLeft = function() {
	//this._player.position.x = 0;
	//this._player.position.x = 0 + Math.floor(this._player.size.width * Scene_MiniGame_CatchGold.GAMECONFIG_ALLOWOVER_PER);
	this._player.position.x = 0 - this.playerAllowOverWidth();
};

Scene_MiniGame_CatchGold.prototype.isPlayerOverRight = function() {
	//return this._player.position.x + this._player.size.width > Scene_MiniGame_CatchGold.GAMEBOARD_WIDTH;
	// ？写得和 setPlayerBoundaryRight 的"排列"一样 ...
	//return this._player.position.x > Scene_MiniGame_CatchGold.GAMEBOARD_WIDTH - this._player.size.width;
	//return this._player.position.x > Scene_MiniGame_CatchGold.GAMEBOARD_WIDTH - this._player.size.width + Math.floor(this._player.size.width * Scene_MiniGame_CatchGold.GAMECONFIG_ALLOWOVER_PER);
	return this._player.position.x > Scene_MiniGame_CatchGold.GAMEBOARD_WIDTH - this._player.size.width + this.playerAllowOverWidth();
};
Scene_MiniGame_CatchGold.prototype.setPlayerBoundaryRight = function() {
	//this._player.position.x = Scene_MiniGame_CatchGold.GAMEBOARD_WIDTH - this._player.size.width;
	//this._player.position.x = Scene_MiniGame_CatchGold.GAMEBOARD_WIDTH - this._player.size.width + Math.floor(this._player.size.width * Scene_MiniGame_CatchGold.GAMECONFIG_ALLOWOVER_PER);
	this._player.position.x = Scene_MiniGame_CatchGold.GAMEBOARD_WIDTH - this._player.size.width + this.playerAllowOverWidth();
};

Scene_MiniGame_CatchGold.prototype.playerAllowOverWidth = function() {
	return Math.floor(this._player.size.width * Scene_MiniGame_CatchGold.GAMECONFIG_ALLOWOVER_PER);
}





// ------------------------
// 画游戏画面
{
	Scene_MiniGame_CatchGold.prototype.drawGameBoard = function() {
		
		// initGameBoard
		this.clearGameBoard();
		//this.clipGameBoard();

		this.drawGameBoard_background();
		this.drawGameBoard_player();
		this.drawGameBoard_allItems();

		this.drawGameBoard_score();

		this.clipGameBoard(); // ？使用清除方法实现 ...

		this._count_gameRun++; // 游戏帧
	};

	Scene_MiniGame_CatchGold.prototype.drawGameBoard_background = function() {
		var bitmap = ImageManager.loadPicture(Scene_MiniGame_CatchGold.GAMEWINDOW_BACKPIC);

		var paddingW = Scene_MiniGame_CatchGold.GAMEBOARD_PADDINGWIDTH;
		var paddingH = Scene_MiniGame_CatchGold.GAMEBOARD_PADDINGHEIGHT;

		var x = -paddingW;
		var y = -paddingH;
			// ？画布原点设在 去掉padding的左上角 ...
		var w = Scene_MiniGame_CatchGold.GAMEBOARD_WIDTH + 2 * paddingW;
		var h = Scene_MiniGame_CatchGold.GAMEBOARD_HEIGHT + 2 * paddingW;
		// ？改用方法 获得背景实际矩形 ...

		// ？显示边线 可视化 debug ...

		this.drawGameImage(bitmap, x, y, w, h);
	};
	{ ImageManager.loadPicture(Scene_MiniGame_CatchGold.GAMEWINDOW_BACKPIC); } // 预加载

	Scene_MiniGame_CatchGold.prototype.drawGameBoard_allItems = function() {
		//this.forEachItems(this.drawGameBoard_item().bind(this)); // ？错了 不是 func().bind 而是 func.bind ...
		//this.forEachItems(this.drawGameBoard_item); 
		//this.getItemList().forEach(this.drawGameBoard_item); // ？不行 drawGameBoard_item里的this将会是item...
		
		//this.getItemList().forEach(this.drawGameBoard_item.bind(this)); // ？是否可行 ...
		var list = this.getItemList();
		for (var idx=0; idx<list.length; idx++) {
			this.drawGameBoard_item(list[idx]);
		}
	};

	Scene_MiniGame_CatchGold.prototype.drawGameBoard_item = function(item) {
		var itemType = this.getItemType()[item.type];
		var picturePath = itemType.image;
		var bitmap = ImageManager.loadPicture(picturePath);
		this.drawGameImage(bitmap, item.position.x, item.position.y, item.size.width, item.size.height);
	};

	Scene_MiniGame_CatchGold.prototype.drawGameBoard_player = function() {
		//var bitmap = ImageManager.loadPicture('Actor1'); // ？待 获取领队行走图 ...
		var bitmap = this.getPlayerImage();
		var rect = this.getPlayerImageRect();
		var player = this._player;
		this.drawGameImage(bitmap, 
			player.position.x, player.position.y, player.size.width, player.size.height, 
			rect.x, rect.y, rect.width, rect.height, 
		);
	};
	//{ ImageManager.loadPicture('Actor1'); } // 预加载

	// ？【待】 人物行走方向 ...


	Scene_MiniGame_CatchGold.GAMESCORE_POS_X    = 5;
	Scene_MiniGame_CatchGold.GAMESCORE_POS_Y    = 0;
	Scene_MiniGame_CatchGold.GAMESCORE_MAXWIDTH = 200;
	//Scene_MiniGame_CatchGold.GAMESCORE_HEIGHT   = 15;

	Scene_MiniGame_CatchGold.GAMESCORE_ALIGN    = 'left';
	//Scene_MiniGame_CatchGold.GAMESCORE_COLOR    = 'red';
	//Scene_MiniGame_CatchGold.GAMESCORE_FONTSIZE = 14;

	// 【待】 完善
	// 【待】 移入配置块


	Scene_MiniGame_CatchGold.prototype.drawGameBoard_score = function() {
		this.drawGameText(
			this.getScore(), 
			Scene_MiniGame_CatchGold.GAMESCORE_POS_X, 
			Scene_MiniGame_CatchGold.GAMESCORE_POS_Y, 
			Scene_MiniGame_CatchGold.GAMESCORE_MAXWIDTH, 
			Scene_MiniGame_CatchGold.GAMESCORE_ALIGN, 
		);
	};


	// ？有些方法可以移到 Window_MiniGame_CatchGold_Game ...
	// ？或者 获取Window的contents 然后直接在 Scene_XX 里操作 ...
}






//-----------------------------------------------------------------------------
// Window_MiniGame_CatchGold_Game
// 接金币小游戏场景用窗口
{
	function Window_MiniGame_CatchGold_Game() {
	    this.initialize.apply(this, arguments);
	};

	//Window_MiniGame_CatchGold_Game.prototype = Object.create(Window_Base.prototype);
	Window_MiniGame_CatchGold_Game.prototype = Object.create(Window_Selectable.prototype);
		// ？Selectable 有 setHandler ...

	Window_MiniGame_CatchGold_Game.prototype.constructor = Window_MiniGame_CatchGold_Game;

	Window_MiniGame_CatchGold_Game.prototype.initialize = function(x, y, width, height) {
	    Window_Selectable.prototype.initialize.call(this, x, y, width, height);

	    //this.contents = new Bitmap(this.contentsWidth(), this.contentsHeight()); = null;
	    // ？放入方法里 ...

	    this.refresh();
	};

	Window_MiniGame_CatchGold_Game.prototype.refresh = function() {

	};

	Window_MiniGame_CatchGold_Game.prototype.open = function() {
	    this.refresh();
	    Window_Selectable.prototype.open.call(this);
	};
}




// ------------------------
// 窗口绘画接口
{
	Scene_MiniGame_CatchGold.prototype.drawGameImage = function(image, x, y, w, h, bx, by, bw, bh) {
		this._gameWindow.drawImage(image, x, y, w, h, bx, by, bw, bh);
		//this._gameWindow.drawImage(arguments); // ？不可 ...
	};

	Scene_MiniGame_CatchGold.prototype.drawGameText = function(text, x, y, maxWidth, align) {
		this._gameWindow.drawText(text, x, y, maxWidth, align); 
	};

	// ？canvas 的 蒙版 ...
	// ？清除显示在画布外的内容 ...
	// ？clip ...
	Scene_MiniGame_CatchGold.prototype.clipGameBoard = function() {
		var x = 0;
		var y = 0;
		var w = Scene_MiniGame_CatchGold.GAMEBOARD_WIDTH;
		var h = Scene_MiniGame_CatchGold.GAMEBOARD_HEIGHT;
		this._gameWindow.clipGameBoard(x, y, w, h);
	};

	Scene_MiniGame_CatchGold.prototype.clearGameBoard = function() {
		this._gameWindow.clearContents();
	};



	Window_MiniGame_CatchGold_Game.prototype.drawImage = function(image, x, y, w, h, bx, by, bw, bh) {
		this.drawImageForBoard(image, x, y, w, h, bx, by, bw, bh);
		//this.drawImageForBoard(arguments);
	};

	Window_MiniGame_CatchGold_Game.prototype.drawImageForBoard = function(image, x, y, w, h, bx, by, bw, bh) {
		x += this.getGameBoardMarginLeft();
		y += this.getGameBoardMarginTop();
		this.drawImageForWindow(image, x, y, w, h, bx, by, bw, bh);
		//this.drawImageForWindow(arguments);
	};

	Window_MiniGame_CatchGold_Game.prototype.drawImageForWindow = function(image, x, y, w, h, bx, by, bw, bh) {
		//this.contents.drawImage(image, x, y);
		// ？...
		//this.contents.context.drawImage(image, x, y);
		// ？...
		//this.contents.blt(image, 0, 0, image.width, image.height, x, y, w, h);

		bx = bx || 0;
		by = by || 0;
		bw = bw || image.width;
		bh = bh || image.height;
		this.contents.blt(image, bx, by, bw, bh, x, y, w, h);
			// ？对于缺省 bx, by, bw, bh 在方法blt里会处理 ...
	};

	Window_MiniGame_CatchGold_Game.prototype.drawText = function(text, x, y, maxWidth, align) {
		x += this.getGameBoardMarginLeft();
		y += this.getGameBoardMarginTop();
	    this.contents.drawText(text, x, y, maxWidth, this.lineHeight(), align);
	}; // 模仿 Window_Base.prototype.drawText

	Window_MiniGame_CatchGold_Game.prototype.clipGameBoard = function(x, y, w, h) {
		x += this.getGameBoardMarginLeft();
		y += this.getGameBoardMarginTop();
		this.clipContents(x, y, w, h);
	}

	Window_MiniGame_CatchGold_Game.prototype.clipContents = function(x, y, w, h) {
		//var context = this.contents.context;
		//context.save();
		//context.rect(x, y, w, h);
		//context.clip();
		//context.restore();
		// ？不行 会影响渲染 ...

		// ？改成清除其他部分 ...
			// ？可行 会保留Window的背景 ...
		//this.contents.clearRect(0, 0, x+w, y); // 左上 和 上 (窗口左上 到 画布右上)
		// ...
		// ？改 左上和上 + 右上和右 + 右下和下 + 左上和左 ...
		// ？为 上 + 左 + 下 + 右 ...
			// ？可以让清除部分重复 ... 
		var bw = this.contents.width ;
		var bh = this.contents.height;
		this.contents.clearRect( 0,  0, bw,  y);
		this.contents.clearRect( 0,  0,  x, bh);
		this.contents.clearRect(bw, bh, -bw, -(bh-y-h));
		this.contents.clearRect(bw, bh, -(bw-x-w), -bh);
			// ？宽高可以是负数 表示反向的 ...
	};

	Window_MiniGame_CatchGold_Game.prototype.clearContents = function() {
		this.contents.clear();
	};


	//Scene_MiniGame_CatchGold.GAMEBOARD_WIDTH   = 240;
	//Scene_MiniGame_CatchGold.GAMEBOARD_HEIGHT  = 400;

	Window_MiniGame_CatchGold_Game.prototype.getGameBoardMarginLeft = function() {
		//return (this.width - Scene_MiniGame_CatchGold.GAMEBOARD_WIDTH) / 2;
		// ？错了 this.width 算上了边框等 而 contents 不算这些 ...
		// ？使用 Window_Base.prototype.contentsWidth 方法 ...
		return (this.contentsWidth() - Scene_MiniGame_CatchGold.GAMEBOARD_WIDTH) / 2;
			// ？宽高可能后期变化 所以获取真实宽高 ...
	};

	Window_MiniGame_CatchGold_Game.prototype.getGameBoardMarginTop = function() {
		//return (this.height - Scene_MiniGame_CatchGold.GAMEBOARD_HEIGHT) / 2;
		return (this.contentsHeight() - Scene_MiniGame_CatchGold.GAMEBOARD_HEIGHT) / 2;
	};
}




// ------------------------
// 游戏按键
{
	// ？写在 Window_XX 还是 Scene_XX 里 ...

	Window_MiniGame_CatchGold_Game.prototype.processHandling = function() {
	    //if (this.isGameStart()) {
	    		// ？错了 游戏未开始 但是要监听OK键 为了开始游戏 ...
	        if (this.isOkTriggered()) {
	            this.processOk();
	        } else if (this.isCancelTriggered()) {
	            this.processCancel();	 
	        }

	        if (this.isHandled('left') && Input.isPressed('left')) {
	        		// ？isTriggered按住只触发一次 isRepeated按住每两次触发一次 isPressed按住每次都触发 ...
	            this.processLeft();
	        } else if (this.isHandled('right') && Input.isPressed('right')) {
	            this.processRight();
	        } else if (this.isHandled('stop')) { // 未按左或右 停止移动
	        	this.processStop();
	        }
	    //}
	};


	Window_MiniGame_CatchGold_Game.prototype.isGameStart = function() {
		return this.parent && this.parent.parent && this.parent.parent.isGameStart(); // ？暂时这样 ...
	};


	Window_MiniGame_CatchGold_Game.prototype.isOkTriggered = function() {
	    return Input.isRepeated('ok');
	};
	Window_MiniGame_CatchGold_Game.prototype.processOk = function() {
	    this.callHandler('ok');
	};

	Window_MiniGame_CatchGold_Game.prototype.isCancelTriggered = function() {
	    return Input.isRepeated('cancel');
	};
	Window_MiniGame_CatchGold_Game.prototype.processCancel = function() {
	    this.callHandler('cancel');
	};

	Window_MiniGame_CatchGold_Game.prototype.processLeft = function() {
	    this.callHandler('left');
	};
	Window_MiniGame_CatchGold_Game.prototype.processRight = function() {
	    this.callHandler('right');
	};
	Window_MiniGame_CatchGold_Game.prototype.processStop = function() {
	    this.callHandler('stop');
	};
}




// ------------------------
// 事件接口
{
	var pluginCode = "MK_CallMiniGame_CatchGold";

	var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args)
	{
	    _Game_Interpreter_pluginCommand.apply(this, arguments);

	    if (command === pluginCode) 
	    	call_Scene_MiniGame_CatchGold();
	};

	function call_Scene_MiniGame_CatchGold() {
		SceneManager.push(Scene_MiniGame_CatchGold);
	}
}






// ？【待】 定义/设置 游戏帧数 60 ...



// ？【待】 更严格的游戏控制 并在游戏结束能结算分数 ...
	// ？游戏结束时把分数写进变量 再用公共事件结算分数 ...

// ？如：初始化数据 以应对重新开始游戏 ...
// 等



// ？【待】 一些必要的说明和状态显示等 ...



// ？【待】 游戏限制 : 时间 或 生命 ...
	// ？炸弹减玩家生命 ...



// ？【待】 设定游戏变量 并把游戏分数放入变量 ...

// ？【待】 能检测到游戏结束的时机 并且能读取分数 进行相应处理 ...













// ？Selectable 里 handler 的实现原理 ...
	// ？提取出需要的写成一个类 ...



// ？【待】 可以提出基础的小游戏类 ...



// ？先决定大模块 然后把模块逐步展开 实现并完善 ...



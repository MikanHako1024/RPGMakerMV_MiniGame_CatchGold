//=============================================================================
// MK_ShowStandDraw.js
//     MK_立绘显示
//=============================================================================
//  author : Mikan 
//  plugin : MK_ShowStandDraw.js 立绘显示
// version : v0.1.x 2019/10/16 开发中
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
//  [GitHub] https://github.com/MikanHako1024/
//    [Blog] NONE
//=============================================================================




/*:
 * @plugindesc 立绘显示
 * @author Mikan 
 * @version v0.1.x 2019/10/16 开发中
 * v0.1.7 2019/10/16 添加了动作事件 并完善了地图上的事件
 * v0.1.6 2019/10/16 解决了人物差分图片不读取的问题
 * v0.1.5 2019/10/15 解决了有装备且设置了人物差分时，并行的公共事件非常卡的问题
 * v0.1.4 2019/10/14 完善了窗口位置的设置
 * v0.1.3 2019/10/13 缓存加载的图片
 * v0.1.2 2019/10/08 增加了一些插件参数
 * v0.1.1 2019/10/06 立绘类基本结构完成
 * v0.1.0 2019/10/03 基本的层叠图像测试
 * 
 * 
 * @param ==== 标签名配置 ====
 * 
 * @param StandDraw_prefix
 * @desc 
 * 设置立绘用标签的前缀 <SD_xxx:yyy>
 * 有重名时可以进行修改 其他情况不建议修改
 * @default SD_
 *
 * @param StandDraw_name
 * @desc 
 * 设置立绘用标签中的部件名 <SD_name:yyy>
 * 有重名时可以进行修改 其他情况不建议修改
 * @default name
 * 
 * @param ==== 文件名配置 ====
 *
 * @param actorDiffName
 * @desc 
 * 设置差分人物名的组合方式 如 : ${actor}_${diff}
 * 固定不变的是 ${actor}表示人物名, ${diff}表示差分名
 * ${actor}/${diff} 的形式 可以指定子文件夹下的文件
 * @default ${actor}_${diff}
 *
 * @param pictureName
 * @desc 
 * 设置文件名的组合方式 如 : ${actor}_${item}
 * 固定不变的是 ${actor}表示人物名(含差分), ${item}表示物件名(含差分)
 * ${actor}/${item} 的形式 可以指定子文件夹下的文件
 * ps : 不需要 .png  不需要 .png  不需要 .png
 * @default SD_${actor}_${item}
 * 
 * @param ==== 地图显示配置 ====
 * 
 * @param MapStandDraw_Show
 * @desc 是否默认在地图页面上显示人物立绘
 * true: 是 | false: 否 | 其他: 否
 * @default true
 * 
 * @param MapStandDraw_Size
 * @desc 地图页面上人物立绘容器的默认尺寸
 * format : Width, Height [限数字]
 * @default 320, 480
 * 
 * @param MapStandDraw_LeftPos
 * @desc 地图页面上人物立绘容器的默认左侧位置 (距离左上角)
 * format : X, Y [限数字]
 * @default 0, 0
 * 
 * @param MapStandDraw_RightPos
 * @desc 地图页面上人物立绘容器的默认右侧位置 (距离右上角)
 * format : X, Y [限数字]
 * @default 0, 0
 * 
 * @param MapStandDraw_Side
 * @desc 地图页面上人物立绘容器的默认侧方
 * left: 左 | right: 右 | 其他: 左
 * @default left
 * 
 * @param ==== 其他配置 ====
 * 
 * @param showActorId
 * @desc 【临时】 需要显示立绘的角色id (仅显示一个)
 * @default 3
 * 
 * @param ShowEquips
 * @desc 
 * 是否需要显示装备图片
 * true: 是 | false: 否 | 其他: 否
 * @default false
 * 
 * @param ==== under ====
 * 
 * 
 * 
 * 
 * @help
 * ---- 插件指令 ----
 * 
 * 	 ## 设置人物的差分
 * 
 *   # 预定角色设置姿势/差分.
 *   StandDraw setActorDiff diffName 
 * 
 *   # 预定角色解除姿势/差分.
 *   StandDraw unsetActorDiff 
 * 
 * 	 ## 添加与移除其他图片
 * 
 *   # 预定角色设置表情.
 *   StandDraw setFace faceName	
 *
 *   # 预定角色解除表情.
 *   StandDraw unsetFace 
 * 
 *   # 预定角色设置附着物.
 *   StandDraw setAddition additionName	
 * 
 *   # 预定角色解除附着物.
 *   StandDraw unsetAddition 
 * 
 *   # 预定角色设置物件 标识符class 优先级priority.
 *       预设的标识符有 'equips[0]'~'equips[4]', 'face'.
 *   StandDraw setItem class name priority 
 * 
 *   # 预定角色解除物件.
 *   StandDraw unsetItem class 
 * 
 *   # 预定角色解除物件.
 *   StandDraw setActorDiff diffName 
 * 
 *   # 预定角色解除物件.
 *   StandDraw unsetActorDiff 
 * 
 * 	 ## 设置地图立绘容器位置
 * 
 *   # 设置地图立绘容器在左侧
 *   StandDraw setMapSDLocal left 
 * 
 *   # 设置地图立绘容器在右侧
 *   StandDraw setMapSDLocal right 
 * 
 *   # 设置地图立绘容器在指定位置
 *   StandDraw setMapSDLocal other x y
 * 
 * 
 * ---- 用语说明 ----
 * 
 * 人物 : TODO
 * 
 * 物件 : TODO
 * 
 * 表情 : TODO
 * 
 * 优先级 : 各图片的覆盖顺序，优先级高的图片在上面，不容易被覆盖。
 * 
 * 文件名组合 : TODO
 * 
 * 
 * 
 * ---- 参数描述 ----
 * 各参数的说明，稍微详细地说明参数。
 * 
 * 【TODO】
 * 
 * 
 * 
 * ---- 标签设置 ----
 * 
 * 人物标签 :
 *     标签名                          标签名描述	        值描述    
 * StandDraw_prefixStandDraw_name	  前缀 名称        	人物名	
 * StandDraw_prefixactorDiffNameA	  前缀 差分A       	人物差分A的表情的优先级
 * StandDraw_prefixactorDiffNameB	  前缀 差分B       	人物差分B的表情的优先级
 * StandDraw_prefixactorDiffName5	  前缀 差分5       	人物差分5的表情的优先级
 * 
 * 示例 :
 * 如 配置StandDraw_prefix为SD_ 配置StandDraw_name为name
 *     <标签名:值>                       描述    
 * <SD_name:neko>            配置该人物图片 名称为 neko
 * <SD_normal:5.1>           配置该人物图片 该姿势名称为normal 对应表情优先级为5.1
 * <SD_injured:5.1>          配置该人物图片 该姿势名称为injured 对应表情优先级为5.1
 * <SD_back:4.9>             配置该人物图片 该姿势名称为back 对应表情优先级为4.9
 * 
 * 装备标签 :
 *     标签名                          标签名描述	        值描述    
 * StandDraw_prefixStandDraw_name	  前缀 名称        	装备名	
 * StandDraw_prefixactorDiffNameA	  前缀 差分A       	装备对应人物差分A的优先级
 * StandDraw_prefixactorDiffNameB	  前缀 差分B       	装备对应人物差分B的优先级
 * StandDraw_prefixactorDiffName5	  前缀 差分5       	装备对应人物差分5的优先级
 * 
 * 示例 :
 * 如 配置StandDraw_prefix为SD_ 配置StandDraw_name为name
 *     <标签名:值>                       描述    
 * <SD_name:hat>             配置该装备图片 名称为 hat
 * <SD_normal:8>             配置该装备图片 该姿势名称为normal 对应装备优先级为8
 * <SD_injured:8>            配置该装备图片 该姿势名称为injured 对应装备优先级为8
 * <SD_back:2>               配置该人物图片 该姿势名称为back 对应装备优先级为2
 * 
 * 对应图片文件 : 
 * 如 配置actorDiffName为${actor}-${diff} 配置pictureName为SD/${actor}_${item}
 * 人物neko基本姿势 					 : 工程目录/img/pictures/SD/neko.png
 * 人物neko基本姿势的装备hat 			 : 工程目录/img/pictures/SD/neko_hat.png
 * 人物neko受伤姿势injured 			 : 工程目录/img/pictures/SD/neko-injured.png
 * 人物neko受伤姿势injured的装备hat 	 : 工程目录/img/pictures/SD/neko-injured_hat.png
 * 人物neko背面姿势back 				 : 工程目录/img/pictures/SD/neko-back.png
 * 人物neko背面姿势back的装备hat 		 : 工程目录/img/pictures/SD/neko-back_hat.png
 * 
 * 
 * 
 * ---- 使用方法 ----
 * 
 * 基本功能的使用方法
 * TODO
 * 
 * 一些需求的实现方法
 * TODO
 * 
 * 示例工程及其说明
 * 链接 TODO
 * 
 * 
 * 
 * ---- 开发方法 ----
 * 
 * 扩展使用用结构介绍
 * TODO
 * 
 * 功能开发用结构介绍
 * TODO
 * 
 * 更多详细结构说明
 * 链接 TODO
 * 
 * 
 * 
 * ---- 使用规约 ----
 * 
 * 如果需要使用本插件，只需要在GitHub给本插件一个Star或Watching即可。
 * 仓库：https://github.com/MikanHako1024/RPGMakerMV_showStandDraw
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



/*
 * 舍弃的项目
 *
 * @param StandDraw_priority
 * @desc 
 * 设置立绘用标签中的部件优先级 <SD_priority:yyy>
 * 有重名时可以进行修改 其他情况不建议修改
 * @default priority
 *
 * @param itemDiffName
 * @desc 
 * 设置差分人物名的组合方式 如 : ${item}_${diff}
 * 固定不变的是 ${item}表示人物名, ${diff}表示差分名
 * ${item}/${diff} 的形式 可以指定子文件夹下的文件
 * @default ${item}_${diff}
 * 
 */


// ？【待】 trim() ...

// ？【待】 priority 的 Number 统一化 ...

// ？【待】 一些应对数据缺省的操作 ...

// ？【待】 应对缺少文件 ...

// ？【待】 提取出核心 ...


// ？？延时操作 ...

// ？【待】 模拟攻击动作中 可以在间隔中 可以移动 等 ...

// ？【待】 检测某些情况下 ok键 不攻击 ...



// ？【待】 可以设置一些简单的动作序列 ...
	// ？或 可以用到 动作序列插件里 ...


// ===  break  201910142255  ===
// setFace 等 ...
// ？预设item名(face, equip[idx] ...) 不需要给优先级 判断已有时也不对优先级判断 ...



// ？？【待】 储存 各物件对于不同人物及差分 的sprite 减少加载 ...

// ？【待】 暂时 不需要 item 差分 直接用不同 item 即可 ...

// ？【待】 闪光等效果 ...
	// ？设置 algha ...

// ？？【待】 直接把 人物图像 当作一个 item ...


// ？【待】 可以用 方法和插件指令 获取某些参数 如 actorDiff 等 ...


// ？【待】 地图页面上人物立绘的默认右侧位置 使用右上角坐标 之后计算出左上角 ...


// ？Sprite_Battler / Sprite_Enemy 的闪光效果 等 ...



// 【待】 MapStandDraw_RightPos 相关

// 【待】 Sprite_StandDraw.width|height ... 相关


// ？【待】 人物移动到立绘覆盖区域 图片透明显示 (可配置透明度 含不透明 即无需透明显示) ...



// ？${actor}${actorDiff} : actor 或 actor_diff ...

// ？？还需要设置 差分名的组合方式 ...
// ？若有差分 则为 组合方式 如 ${actor}_${actorDiff} ...
// ？若无差分 则为 直接的人物名 如 ${actor} ...
// ？...


// 【待】 物件差分的设置 


// ？【待】 配置差分名是否要前缀 ...



// ？Sprite.prototype.setColorTone([255, 255, 255, 1])
// ？Sprite.prototype.setBlendColor([255, 255, 255, 1])
// ？Sprite.prototype._refresh()

// ？Sprite_StandDraw._sprite_standDraw[3].children[xx].setColorTone([255, 255, 255, 1]);




// ？${xxx} 的 xxx 是否要允许可配置 ...



// ？【待】 相同装备在不同槽位中 ...


// 【待】 分开代码


// ？LD


// ？pose名为空时 不是 actor_ 而是 actor 的特别处理 ...


// ？所有人物的 pose名 也共用 ...
	// ？暂不 ...

// ？人物本体优先级强制为5 设置值为其表情的优先级 ...
	// ？在没有图片管理器时 这样比较方便 ...


// ？这样 还需要改动 setFace ...
// 【待】


// ？设置 附着物 固定 9(?10) ...
// ？设置 背景板 固定 1(?0) ...



// ？TODO : 一个物件多部分图片 ...
	// ？如 背面_盾牌 有 盾牌 + 把手 ...



// ？一个物件的不同状态 ...
// 【待】



var parameters = PluginManager.parameters('MK_ShowStandDraw');


var StandDraw_prefix = String(parameters['StandDraw_prefix']) || 'SD_';
var StandDraw_name = String(parameters['StandDraw_name']) || 'name';
//var StandDraw_priority = String(parameters['StandDraw_priority']) || 'priority';

var actorDiffName = String(parameters['actorDiffName']) || '${actor}_${diff}';
//var itemDiffName = String(parameters['itemDiffName']) || '${item}_${diff}';
var pictureName = String(parameters['pictureName']) || 'SD_${actor}_${item}';

var MapStandDraw_Show = String(parameters['MapStandDraw_Show']) || 'true';
var MapStandDraw_Size = String(parameters['MapStandDraw_Size']) || '200, 624';
var MapStandDraw_LeftPos = String(parameters['MapStandDraw_LeftPos']) || '0, 0';
var MapStandDraw_RightPos = String(parameters['MapStandDraw_RightPos']) || '0, 0';
var MapStandDraw_Side = String(parameters['MapStandDraw_Side']) || 'left';

var showActorId = Number(parameters['showActorId']) || 3;
var ShowEquips = String(parameters['ShowEquips']) || 'false';


// ？【待】 装进一个专门用来放插件参数的对象里 ...

// ？【待】 写成方法 ...


StandDraw_name = StandDraw_prefix + StandDraw_name;
//StandDraw_priority = StandDraw_prefix + StandDraw_priority;
// ？...



var MapStandDraw_Config = {};
MapStandDraw_Config.isNeedShow = !!(/true/i.exec(MapStandDraw_Show));

//var MapStandDraw_Size_Width 
//		= array_loadto_object(getTwoNumbersFromString(MapStandDraw_Size), ['width', 'height']);
//var MapStandDraw_LeftPos 
//		= array_loadto_object(getTwoNumbersFromString(MapStandDraw_Left), ['x', 'y']);
//var MapStandDraw_RightPos 
//		= array_loadto_object(getTwoNumbersFromString(MapStandDraw_Right), ['x', 'y']);

putInto_array2object(getTwoNumbersFromString(MapStandDraw_Size    ), MapStandDraw_Config, ['width' , 'height']);
putInto_array2object(getTwoNumbersFromString(MapStandDraw_LeftPos ), MapStandDraw_Config, ['leftX' , 'leftY' ]);
putInto_array2object(getTwoNumbersFromString(MapStandDraw_RightPos), MapStandDraw_Config, ['rightX', 'rightY']);

// ？【待】 写成方法 ...

//MapStandDraw_Config.rightX = Graphics.boxWidth - MapStandDraw_Config.rightX;
// ？此时没有 Graphics.boxWidth ...


function getTwoNumbersFromString(str) {
	//var reg = /^[^\.0-9]*([\.0-9]+)[^\.0-9]+([\.0-9]+)[^\.0-9]*$/;
	var reg = /^[^0-9]*((\d+\.?\d*)|(\d*\.?\d+))[^0-9]*((\d+\.?\d*)|(\d*\.?\d+))[^0-9]*$/;
	var regResult = reg.exec(str);

	if (!regResult) return null;

	//return [Number(regResult[1]), Number(regResult[2])];
	return [Number(regResult[1]), Number(regResult[4])];
}

// ？改进为任意数量的数值 ...
function getNumbersFromString(str, num) {

	var regStr_head = '/^[^0-9]*';
	var regStr_loop = '((\\d+\\.?\\d*)|(\\d*\\.?\\d+))[^0-9]*';
	var regStr_tail = '$/';
	
	var regStr_body = '';

	for (var i=0; i<num; i++) {
		regStr_body += regStr_loop;
	}
	var regStr = regStr_head + regStr_body + regStr_tail;

	var reg = eval(regStr);
	var regResult = reg.exec(str);

	if (!regResult) return null;

	//return [Number(regResult[1]), Number(regResult[4])];

	var result = [];
	for (var i=0; i<num; i++) {
		result.push(Number(regResult[3*i+1]));
	}
	return result;
}
// ？【待】 putInto_array2object 和 getNumbersFromString 融合 并自动检测需要的个数 ...


// 【未测试】


function putInto_array2object(array, object, keyList) {
// ？暂时用返回式的 ...
//function array_loadto_object(array, keyList) {
	//if (typeof object != 'object') object = {};
	//var object = {};
	for (var idx=0; idx<keyList.length; idx++) {
		object[keyList[idx]] = array[idx];
	}
	//return object;
}




MapStandDraw_Config.defaultSide = !!(/right/i.exec(MapStandDraw_Side)) ? 'right' : 'left';

//switch(MapStandDraw_Config.defaultSide) {
//	case 'left':
//		MapStandDraw_Config.realX = MapStandDraw_Config.leftX;
//		MapStandDraw_Config.realY = MapStandDraw_Config.leftY; 
//		break;
//	case 'right':
//		MapStandDraw_Config.realX = MapStandDraw_Config.rightX;
//		MapStandDraw_Config.realY = MapStandDraw_Config.rightY; 
//		break;
//	default:
//		MapStandDraw_Config.realX = MapStandDraw_Config.leftX;
//		MapStandDraw_Config.realY = MapStandDraw_Config.leftY; 
//};
// 暂时这样 ...

// ？【待】 储存位置模式 左、右、自定义 ...




function centerInBoard(picture, board) {
	if (!picture || !board) return null;
	//if (!board.x || !board.y || !board.width || !board.height) return null;
	// ？错了 x,y可以是0 此时 !x,!y 为 true ...
	//if (board.x==null || board.y==null || !board.width || !board.height) return null;
	// ？不需要 board.x|y ...
	if (!board.width || !board.height) return null;
	if (!picture.width || !picture.height) return null;
	if (board.width<=0 || board.height<=0) return null;
	if (picture.width<=0 || picture.height<=0) return null;

	var result = {
		pos  : { x    : 0, y     : 0}, // 左上角坐标
		size : { width: 0, height: 0}, // 真实尺寸
		scale: { x    : 1, y     : 1}, // 缩放程度
	};

	var ratio_pic = picture.width / picture.height;
	var ratio_brd = board  .width / board  .height;

	if (ratio_pic > ratio_brd) {
		// 相同高的情况下 图片宽较大 图片需要 贴合宽缩放高

		result.size.width = board.width;
		result.scale.x = result.size.width / picture.width;
		result.scale.y = result.scale.x;
		result.size.height = picture.height * result.scale.y;
		//result.pos.x = board.x;
		//result.pos.y = board.y + (board.height - result.size.height) / 2;
		// ？错了 sprite 的 x,y 是相对于其容器的 ...
		// ？于是 对于 相对容器x,y的sprite 不需要 容器相对整个游戏的x,y ...
		result.pos.x = 0;
		result.pos.y = (board.height - result.size.height) / 2;
	}
	else {
		// 相同高的情况下 图片宽较小 图片需要 缩放宽贴合高

		result.size.height = board.height;
		result.scale.x = result.size.height / picture.height;
		result.scale.y = result.scale.x;
		result.size.width = picture.width * result.scale.x;
		//result.pos.y = board.y;
		//result.pos.x = board.x + (board.width - result.size.width) / 2;
		result.pos.y = 0;
		result.pos.x = (board.width - result.size.width) / 2;

		// ？width与height互换 x与y 互换 ...
	}

	return result;
}




var isNeedShowEquips = !!(/true/i.exec(ShowEquips));
// 【待】 待完善相关代码
// ===  break  201910061857  ===




//-----------------------------------------------------------------------------
// windowFunctions
// 计算位置和尺寸的相关函数







//-----------------------------------------------------------------------------
// filenameFunctions
// 计算文件名的相关函数

function makeReplaceEvalStr(str, list) {

	if (!list) list = [];
	//if (typeof list != 'array') list = [list];
	// ？错了 typeof [] 是 'object' ...
	// ？应该用 Array.isArray(arr) 判断是否是数组 ...
		// ？？或用 !!xx.length ...
	if (!Array.isArray(list)) list = [list];

	var tmp = '';
	var isFirst = true;
	for (var idx=0; idx<list.length; idx++) {
		tmp = tmp + (isFirst?'':'|') + list[idx];
		isFirst = false;
	}
	tmp = '/\\${(' + tmp + ')}/g';
	
	var reg1 = eval(tmp);
	var reg2 = /^(.*)$/;
	
	var evalStr = str.replace(reg1, '\' + $1 + \'').replace(reg2, '\'$1\'');
	return evalStr;
}
// ？【待】 允许 查找list中的值 并替换为 另一个数组中的 它的映射名 ...
// ？映射 key 可由用户设定, 映射 value 为规定值 在代码中使用 ...
	// ？？或者直接用函数参数的功能 实现变量名的映射 ...
	// ？...

function getEvalStr_actorDiffName() {
	return makeReplaceEvalStr(actorDiffName, ['actor', 'diff']);
}
function getEvalStr_itemDiffName() {
	return makeReplaceEvalStr(itemDiffName, ['item', 'diff']);
}
function getEvalStr_pictureName() {
	return makeReplaceEvalStr(pictureName, ['actor', 'item']);
}


function getName_actorDiffName(actor, diff) {
	//if (!actor) return '';
		// ？考虑 actor 为空的情况 ...
	// ？？actorName 允许为 '' ...
	if (!actor && actor !== '') return '';
	return diff
		 ? eval(makeReplaceEvalStr(actorDiffName, ['actor', 'diff']))
		 	// ？【待】 可以 储存 makeReplaceEvalStr(xx) 的结果 ...
		 	
		 : actor;
}
function getName_itemDiffName(item, diff) {
	if (!item) return '';
		// ？考虑 item 为空的情况 ...
	return diff
		 ? eval(makeReplaceEvalStr(itemDiffName, ['item', 'diff']))
		 : item;
}
function getName_pictureName(actor, item) {
	//if (!actor) return '';
		// ？考虑 actor 为空的情况 ...
	if (!actor && actor !== '') return '';
	return item
		 ? eval(makeReplaceEvalStr(pictureName, ['actor', 'item']))
		 : actor;
}
// ？三者可以兼容合并 ...


//function getMetaName_diffName(diffName) {
// ？确切地说 应该是 priority 的 metaName ...
function getMetaName_priority(diffName) {
	return StandDraw_prefix + diffName;
}
// ？对于物件 获得物件对应某差分的 优先级的标签名 ...
// ？对于人物 获得表情对应某差分的 优先级的标签名 ...
// ？...




(function test_makeReplaceEvalStr() {
	return ;

	var s1 = makeReplaceEvalStr(actorDiffName, ['actor', 'diff']);
	var s2 = makeReplaceEvalStr(itemDiffName, ['item', 'diff']);
	var s3 = makeReplaceEvalStr(pictureName, ['actor', 'item']);

	var actor = 'actorA';
	var diff = 'back';
	console.log(s1);
	console.log(eval(s1));
	var tmp1 = eval(s1);

	var item = 'hat';
	var diff = 'breaked';
	console.log(s2);
	console.log(eval(s2));
	var tmp2 = eval(s2);

	var actor = tmp1;
	var item = tmp2;
	console.log(s3);
	console.log(eval(s3));

})();

// ？是否直接区别插件参数中的有无差分的actor和item ...
// ？如 含差分的actor 改 ${actor} 为 ${actorDiff} ...
// ？以达到区分的目的 ...









// TODO : 应对文件名有误的情况 ...


// ？资源清理的问题 ...





//-----------------------------------------------------------------------------
// metaFunctions
// 获取meta数据的相关函数

// ？是否要放入 Sprite_StandDraw ...

function hasMeta(data) {
	return data 
		&& typeof data == 'object' 
		&& data.meta;
}

function getActorName(actorData) {
	if (!hasMeta(actorData)) return null;
	return actorData.meta[StandDraw_name];
}

function getActorPriorityList(actorData) {
	if (!hasMeta(actorData)) return null;
	var result = {};
	for (var key in actorData.meta) {
		if (checkPrefix(key))
			result[removePrefix(key)] = actorData.meta[key];
	}
	return result;
}

function getItemName(equipData) {
	if (!hasMeta(equipData)) return null;
	return equipData.meta[StandDraw_name];
}

function getItemPriorityList(equipData) {
	if (!hasMeta(equipData)) return null;
	var result = {};
	for (var key in equipData.meta) {
		if (checkPrefix(key))
			result[removePrefix(key)] = equipData.meta[key];
	}
	return result;
}
// ？【待】 实际使用

// ？目前 actorData 可以和 equipData 兼容合并 ...



function checkPrefix(key) {
	//return key && typeof key == 'string' 
	// ？改 判断key为string 为 判断key有startsWith方法 ...
		// ？这样可以兼容 其他拥有startsWith方法的数据 ...
	return key && !!key.startsWith 
			&& key.startsWith(StandDraw_prefix);
}

function removePrefix(key) {
	if (!checkPrefix(key)) return null;
	return key.substr(StandDraw_prefix.length);
}

// ？是否要 事先全部提取完并保存 ...
// ？还是 用到时提取 ...
// ？还是 用到时提取并保存 ...
	// ？暂时选择第二者 ...

// ===  break  201910041758  ===


//function 得到人物某姿势的脸优先级 (人物, 姿势)
//function 得到物件对于某人某姿势的脸优先级 (物件, 人物, 姿势)



//function 得到物件对于某人某姿势的组合名 (物件, 人物, 姿势)
			// 组合方式可以在插件参数中设置
// ？暂时 物件对于不同人物的相同姿势优先级相同 ...


//function getItemPriority(equipData, diffName) {
//	if (!hasMeta(equipData)) return null;
//
//
//	StandDraw_prefix, diffName 
//	var result = {};
//	for (var key in equipData.meta) {
//		if (checkPrefix(key))
//			result[removePrefix(key)] = equipData.meta[key];
//	}
//	return result;
//}
// ？...


// ？<prefix_diff_xxx:xxxname> 差分序号diff_xxx 差分物件名name ...



//-----------------------------------------------------------------------------
// Sprite_StandDraw
// 显示立绘的精灵

function Sprite_StandDraw() {
	//if (!this.loadDataCompleted) {
	//	this.loadData();
	//}
	
	this.initialize.apply(this, arguments);
}

//Sprite_StandDraw.loadData = function() {
//	if (!$dataActors) return ;
//	if (!$dataArmors) return ;
//	if (!$dataWeapons) return ;
//	// ？可以调用原框架中完成加载的函数 ...
//
//	console.log('Sprite_StandDraw : loading data');
//
//	this.dataActors = [];
//	for (var idx=0; idx<$dataActors.length; idx++) {
//		if ($dataActors[idx])
//			this.dataActors[idx] = {
//				'name': $dataActors[idx].meta[StandDraw_name],
//				'priority': $dataActors[idx].meta[n ],
//			};
//	}
//
//	this.dataArmors = [];
//	for (var idx=0; idx<$dataArmors.length; idx++) {
//		if ($dataArmors[idx])
//			this.dataArmors[idx] = {
//				'name': $dataArmors[idx].meta[StandDraw_name],
//				'priority': $dataArmors[idx].meta[StandDraw_priority],
//			};
//	}
//
//	this.dataWeapons = [];
//	for (var idx=0; idx<$dataWeapons.length; idx++) {
//		if ($dataWeapons[idx]) 
//			this.dataWeapons[idx] = {
//				'name': $dataWeapons[idx].meta[StandDraw_name],
//				'priority': $dataWeapons[idx].meta[StandDraw_priority],
//			};
//	}
//
//	// ？删掉 没有标签或标签不完整/错误的 作为不参与显示立绘 ...
//
//	this.loadDataCompleted = true;
//
//	console.log('Sprite_StandDraw : load data completed');
//};
// ？不方便知道要获取哪个的数据 ...




// 立绘精灵的储存 

// 人物立绘容器精灵
Sprite_StandDraw._sprite_standDraw = [];
Sprite_StandDraw._sprite_standDraw_temp = []; // ？...

Sprite_StandDraw._putStandDraw = function(actorId, that) {
	if (typeof actorId === 'object') actorId = actorId.actorId();
	this._sprite_standDraw[actorId] = that;
}; // ？？...

Sprite_StandDraw.getStandDraw = function(actorId) {
	if (typeof actorId === 'object') actorId = actorId.actorId();
	// ？没有设立该人物时 自动创建 ...
	//this._sprite_standDraw[actorId] 
	//	= this._createStandDraw($gameActors.actor(actorId));
	// ？错了 必要判断是否已有 否则每次都会创建一个新的 ...
	if (!this.isReady(actorId))
		//this._sprite_standDraw[actorId] 
		//	= this._createStandDraw($gameActors.actor(actorId));
		// ？xx.prototype.setActor 时 会 put ...
			// ？这样是否好 ...
			// 【待 思考】
		this._createStandDraw($gameActors.actor(actorId));
			// ？$gameActors 未准备好时 跳出 ...
				// 【待】
	return this._sprite_standDraw[actorId];
};

Sprite_StandDraw.isReady = function(actorId) {
	if (typeof actorId === 'object') actorId = actorId.actorId();
	return !!this._sprite_standDraw[actorId]; 
		// ？存在将返回 true, 不存在将返回 false ...
};

Sprite_StandDraw.touchIt = function(actorId) {
	this.getStandDraw(actorId);
	return true; // ？为一些兼容性操作 ...
}; // ？？激活, 准备 ...
// ？设置 访问 Sprite_StandDraw._sprite_sprite_standDraw[idx] 时 准备它 ...
// 【待】

Sprite_StandDraw._createStandDraw = function(actor) {
	if (typeof actor === 'number') actor = $gameActors.actor(actor);
	var sprite_StandDraw = new Sprite_StandDraw();
	sprite_StandDraw.setActor(actor);
	return sprite_StandDraw;
};

Sprite_StandDraw.deleteStandDraw = function(actorId) {
	if (typeof actorId === 'object') actorId = actorId.actorId();
	delete(this._sprite_standDraw[actorId]);
};

Sprite_StandDraw._createTempStandDraw = function(actor) {
	//if (typeof actor === 'number') actor = $gameActors.actor(actor);
	var sprite_StandDraw = new Sprite_StandDraw();
	sprite_StandDraw.setActor(actor);
	return sprite_StandDraw;
}; // ？...




// 人物和物件(？暂时 仅限武器和护甲)的差分设置

//Sprite_StandDraw._diffList_actor = [];
//Sprite_StandDraw._diffList_actor_temp = []; // ？...
//Sprite_StandDraw._diffList_item = [];
//Sprite_StandDraw._diffList_item_temp = []; // ？...
// ？没必要单独设置 ...
// ？在 ._sprite_xxx[idx] 里能找到 actorDiff ...


// __一些方法__ ...
// 修改 原型方法 ...

// ===  break  201910051736  ===




// 物件图片储存
	// ？防止多次重复加载 导致占用内存过多 ...
	// ？也可以节省加载时间 ...
// ？图片名作为key 载入图片的bitmap作为value ...

Sprite_StandDraw._bitmap_picture = {};

Sprite_StandDraw.getBitmap_picture = function(filename) {
	if (!this._bitmap_picture[filename])
		this._bitmap_picture[filename] = this.loadPicture(filename);
	return this._bitmap_picture[filename];
};

Sprite_StandDraw.loadPicture = function(filename) {
	//return ImageManager.loadPicture(filename);
	return ImageManager.loadPicture(filename);
};

// ？改 储存 bitmap 为 储存 sprite ...

//Sprite_StandDraw._sprite_picture = {};
//
//Sprite_StandDraw.getSprite_picture = function(filename) {
//	if (!this._sprite_picture[filename]) {
//		this._sprite_picture[filename] = new Sprite();
//		this._sprite_picture[filename].bitmap = this.loadPicture(filename);
//	}
//	return this._sprite_picture[filename];
//};
//
//Sprite_StandDraw.loadPicture = function(filename) {
//	if (!filename) return new Bitmap();
//	//return ImageManager.loadPicture(filename);
//	return ImageManager.loadPicture(filename);
//};
// 【暂时回滚】



// 地图立绘容器的位置设置

Sprite_StandDraw.setMapStandDrawPosition = function(x, y) {

	if (x === undefined || y === undefined ) return ;
	if (MapStandDraw_Config.realX == x && MapStandDraw_Config.realY == y) return ;

	MapStandDraw_Config.realX = x;
	MapStandDraw_Config.realY = y;
	this.setMapStandDrawPosition_refreshWindow();
};

Sprite_StandDraw.setMapStandDrawPosition_left = function() {

	//MapStandDraw_Config.realX = MapStandDraw_Config.leftX;
	//MapStandDraw_Config.realY = MapStandDraw_Config.leftY;
	//this.setMapStandDrawPosition_refreshWindow();
	// ？改成调用 this.setMapStandDrawPosition ...
	var tx = MapStandDraw_Config.leftX;
	var ty = MapStandDraw_Config.leftY;
	this.setMapStandDrawPosition(tx, ty);
};

Sprite_StandDraw.setMapStandDrawPosition_right = function() {

	//MapStandDraw_Config.realX = Graphics.boxWidth - MapStandDraw_Config.rightX;
	//MapStandDraw_Config.realY = MapStandDraw_Config.rightY;
	//this.setMapStandDrawPosition_refreshWindow();
	// ？改成调用 this.setMapStandDrawPosition ...
	var tx = Graphics.boxWidth - MapStandDraw_Config.rightX - MapStandDraw_Config.width;
	var ty = MapStandDraw_Config.rightY;
	this.setMapStandDrawPosition(tx, ty);
};

Sprite_StandDraw.setMapStandDrawPosition_init = function() {
	
	switch(MapStandDraw_Config.defaultSide) {
		case 'right':
			this.setMapStandDrawPosition_right();
			break;
		case 'left':
		default:
			this.setMapStandDrawPosition_left();
	};
};

Sprite_StandDraw.setMapStandDrawPosition_refreshWindow = function() {

	// ？暂时这样取窗口 ...
	//if (this._sprite_standDraw[showActorId].parent 
	//		&& this._sprite_standDraw[showActorId].parent.constructor == 'Window_StandDraw_NoBoard')
	// ？直接取两次父亲 判断是否是地图 ...
	//var sprite = this._sprite_standDraw[showActorId];
	var sprite = this.getStandDraw(showActorId);
	//if (sprite.parent && sprite.parent.parent && sprite.parent.parent.constructor == 'Scene_Map') {
	// ？错了 constructor属性 得到类 而不是 类名的字符串 ...
	if (sprite.parent && sprite.parent.parent && sprite.parent.parent.constructor === Scene_Map) {
		var spriteWindow = sprite.parent;
		spriteWindow.x = MapStandDraw_Config.realX;
		spriteWindow.y = MapStandDraw_Config.realY;
		spriteWindow.refreshStandDrawLocal();
	}
};




// 立绘精灵原型

Sprite_StandDraw.prototype = Object.create(Sprite_Base.prototype);
//Sprite_StandDraw.prototype = Object.create(Sprite_Enemy.prototype);
Sprite_StandDraw.prototype.constructor = Sprite_StandDraw;

Sprite_StandDraw.prototype.initialize = function() {
	Sprite_Base.prototype.initialize.call(this);
	//Sprite_Enemy.prototype.initialize.call(this);

	this._actor = null;
	this._actorData = {};
	this._actorDiff = ''; 
		// ？null ？'' ...
		// ？使用 '' 可以兼容 连接前缀得到 meta的key ...

	this._actor_isNeedRefresh = false;

	this._isNeedRefreshDiff = false;
	// ？当人物差分变化时 需要更新所有物件的 图片及优先级 ...

	// ？【待】 是否要优化记录优先级的结构 ...

	this._actorSprite = null;

	// ？是否 actor 也要使用 item 的储存结构 ...


	//this._itemList = {};
	//this._itemNeedRefresh = {};
	//this._itemSpriteList = {};
	// ？它们使用相同的 key 尝试合成一个 object ...
	this._item = {};
		// ？this._item[key] = {data, isNeedRefresh, sprite} ...

};

Sprite_StandDraw.prototype.clear = function() {

	this._actor = null;
	this._actorData = {};
	this._actorDiff = ''; 

	//this._itemList = {};
	//this._itemNeedRefresh = {};
	//this._itemSpriteList = {};
	this._item = {};
};

Sprite_StandDraw.prototype.setActor = function(actor) {
	if (!actor || actor===this._actor) return ;

	this.clear();

	this._actor = actor;
	this._getActorData();

	//this._putStandDraw(this._actor.actorId(), this);
	// ？在公共数据里记录立绘的引用 ...
	// ？类的公共的方法要用类名 不能用this ...
	//Sprite_StandDraw._putStandDraw(this._actor.actorId(), this);
	// ？或 用 this.constructor 得到类 (this.constructor.xxx) ...
	this.constructor._putStandDraw(this._actor.actorId(), this);

	this.refresh();
};

Sprite_StandDraw.prototype._getActorData = function() {

	var actorData = this._actor.actor();
	this._actorData = {
		'name': actorData.meta[StandDraw_name],
		//'priority': actorData.meta[StandDraw_priority], 
		'priority': 5,
	};

	this._actorSprite = this._createActorSprite();
};

Sprite_StandDraw.prototype._createActorSprite = function() {
	//return this._createPartSprite('', this._actorData['priority']);
	return this._createPartSprite('', 5);
};


Sprite_StandDraw.prototype.refresh = function() {
	if (!this._actor) return ;

	this._setupEquips();

	// ？差分变更时 要有特别的刷新 ...
	this._refreshActorDiff(); 
		// ？重要 : 更新差分的处理, _item[idx].priority 的管理 ...
		// ？人物差分时的表情的优先级和刷新 等 ...
		// ===  break  201910060118  ===

	// ？还需要刷新人物Sprite ...
	// ？【待】 尝试与item 兼容合并 ...
	this._refreshActorSprite();

	this._refreshItemSprite();
	this.redraw();

	// ？【待】 被继承类的refresh ...
};

Sprite_StandDraw.prototype._refreshActorDiff = function() {
	if (!this._isNeedRefreshDiff) return ; // 不需要则不刷新 ...

	for (var key in this._item) {
		if (this._item[key] && this._item[key].data) { // ？被删除的不刷新 ...

			//this._item[key].data['priority'] = 
				// ？不需要修改物件名 只修改优先级 ...
				// ？具体的文件名会在之后 用人物名和物件名组合 ...
			// ？装备物件会在 _setupEquips 中更新 对应diff的优先级 ...
			// ？【待】 其他物件 暂时没有其他优先级 ...

			this._item[key].isNeedRefresh = true;
				// ？之后交给物件精灵的刷新 创建新精灵 ...
		}
	}
	// ？只需把刷新标记全部打开即可 ...
	// ？...

	// ？face 有其他优先级 这里暂时特别修改 ...
	// ？【待】 更具有兼容性 可以设置其他的 有不同优先级的 额外物件 ...
	if (this._item['face']) {
		if(!this._item['face'].data) this._item['face'].data = {}; // ？防没有 ...

		this._item['face'].data['priority'] = 
			this._actor.actor().meta[getMetaName_priority(this._actorDiff)] || 5;
	}


	// ？【待】 是否要 this._item[key].data['priority'] 存所有 优先级 ...


	// ？还需要标记 actor_diff 的刷新 ...
	this._actor_isNeedRefresh = true;


	//_isNeedRefreshDiff = false;
	// 错了 忘了 this. 导致了 设置了actorDiff后autoFace公共事件非常卡 ...
	this._isNeedRefreshDiff = false;
};

Sprite_StandDraw.prototype._refreshActorSprite = function() {
	if (!this._actor_isNeedRefresh) return ;
	
	this._actorSprite = this._createPartSprite();

	this._actor_isNeedRefresh = false;
};

Sprite_StandDraw.prototype._refreshItemSprite = function() {
	//console.log(this._item);

	//for (var idx=0; idx<this._item.length; idx++) {
	//	if (this._item[key] && this._item[key].isNeedRefresh) {
	//		this._item[key].sprite = this._createPartSprite(
	//			this._item[key].data[name], this._item[key].data[priority]);
	//	}
	//}
	// ？错了 this._item 不是 array 而是 object ...
	for (var key in this._item) {
		if (this._item[key] && this._item[key].isNeedRefresh) {
			this._item[key].sprite = this._createPartSprite(
				this._item[key].data['name'], 
				this._item[key].data['priority'], ////////
			);

			// ？别忘了把 isNeedRefresh 设回false ...
			this._item[key].isNeedRefresh = false;

			//this.isNeedRedraw = true; // 【暂时回滚】
			// ？改变了 sprite 需要重绘 ... 
			// ？【待】 更变物件差分(优先级不变) 或 更变表情(优先级不变) 时 【尝试】改变引用即可 无需重绘 ...
				// ？【待】表情作为一种物件差分 ...
		}
	}
};

// ？？统一 this._item[key].attr 和 this._item[key][attr] ...

Sprite_StandDraw.prototype._createPartSprite = function(itemName, itemPriority) {
	itemName = itemName || ''; // ？没有 itemName 时创造人物本体 ...
	var priority = itemPriority || 5;

	//var filename = this._getFilename(itemName);
	//if (!filename) return ;
	//
	//var sprite = new Sprite();
	//sprite.bitmap = ImageManager.loadPicture(filename);
	//sprite.priority = priority;
	// ？没有找到图片时 仍然返回一个 sprite 以达到兼容的目的 ...

	var filename = this._getFilename(itemName);
	var sprite = new Sprite();
	
	if (filename)
		//sprite.bitmap = ImageManager.loadPicture(filename);
		sprite.bitmap = this.constructor.getBitmap_picture(filename);
	//
	// ？改为 储存 sprite ...
	//var sprite = this.constructor.getSprite_picture(filename);
	// 【暂时回滚】

	sprite.priority = priority;

	return sprite;
};

Sprite_StandDraw.prototype._getFilename = function(itemName) {
	//return itemName 
	//	 ? this._actorData['name'] + '_' + itemName
	//	 : this._actorData['name'];
	// ？暂时这样 以后根据插件参数设置 构造文件名 ...

	//var actor = this._actorData['name'];
	//var item = itemName;
	//return item 
	//	 ? eval(getEvalStr_pictureName())
	//	 : actor;

	// ？方法化 ...

	//return getName_pictureName(this._actorData['name'], itemName);
	// ？【待】 添加差分的处理 ...

	//return 
	//	getName_pictureName(
	// ？错了 不可以换行 否则将会返回 undefined ...
	return getName_pictureName(
			getName_actorDiffName(this._actorData['name'], this._actorDiff), 
			itemName,
		);
	// ？【待】 物件的差分 ...

	// ？
	/*
	var actorDiff = getName_xxx(this._actorData['name'], __diff__);
	var itemDiff = getName_xxx(itemName, __diff__);
	return getName_pictureName(actorDiff, itemDiff);
	*/
};

//Sprite_StandDraw.prototype.addItem = function() {
//};

Sprite_StandDraw.prototype._setupEquips = function() {
	
	//var that = this;

	// ？actor.equips() 可以直接得到 装备的数据库数据 ...
	//this._actor.equips().forEach(function(equipData){
	// ？不方便得到装备栏索引号 (需要作为 this._itemList 的 key) ...
	var dataList = this._actor.equips();
	for (var idx=0; idx<dataList.length; idx++) {
		//if (dataList[idx]) {
		//	//that._setItem('equips['+idx+']', 
		//	this._setItem('equips['+idx+']', 
		//		dataList[idx].meta[StandDraw_name],
		//		dataList[idx].meta[StandDraw_priority], // ？可以多出逗号 ...
		//	);
		//}
		// ？错了 ...
		// ？获取到的装备数据库数据为 null 表示没有装备 ...
		// ？此时应该是设置对应的item为空 而不是跳过不管 ...
			// ？否则卸下装备时 将不能正确显示立绘 ...
		// ？...
		if (dataList[idx]) {
			//that._setItem('equips['+idx+']', 
			this._setItem('equips['+idx+']', 
				dataList[idx].meta[StandDraw_name],
				//dataList[idx].meta[StandDraw_priority], 
										// ？可以多出逗号 ...
				//dataList[idx].meta[getMetaName_diffName(this._actorDiff)],
				dataList[idx].meta[getMetaName_priority(this._actorDiff)],
			);
		}
		else { // ？没有装备 ...
			this._unsetItem('equips['+idx+']');
		}
	};
};

Sprite_StandDraw.prototype.redraw = function() {

	// ？判断 整体是否有变化 若无变化则无需再次创建 ...
	//if (!this.isNeedRedraw) return ; // 【暂时回滚】

	this.removeChildren();
	this._addChild_all();
	this._sortChildren();
};

Sprite_StandDraw.prototype._addChild_all = function() {
	this._addChild_actor();
	this._addChild_items();
};

Sprite_StandDraw.prototype._addChild_actor = function() {
	this.addChild(this._actorSprite);
};

Sprite_StandDraw.prototype._addChild_items = function() {
	for (var key in this._item) {
		if (this._item[key] && this._item[key].sprite) {
			this.addChild(this._item[key].sprite);
		}
	}
};

Sprite_StandDraw.prototype._sortChildren = function() {
	this.children.sort(function(a, b){ 
		return a.priority>b.priority; 
	}); // 递增
};


//Sprite_StandDraw.prototype.redraw = function(actor) {
//
//	this.removeChildren();
//
//	var actorData = actor.actor();
//	this.addChild(this.createPartSprite(actorData, actorData));
//
//	var that = this; 
//	actor.equips().forEach(function(equipData) {
//		equipData && equipData.meta[StandDraw_name]
//			&& that.addChild(that.createPartSprite(actorData, equipData));
//	});
//
//	this.children.sort(function(a, b){ return a.priority>b.priority; }); 
//};
//
//Sprite_StandDraw.prototype.createPartSprite = function(actorData, itemData) {
//
//	var filename = this.getFilename(actorData, itemData);
//	if (!filename) return ;
//
//	var sprite = new Sprite();
//	sprite.bitmap = ImageManager.loadPicture(filename);
//	var priority = this.getPriority(actorData, itemData) || 5;
//
//	sprite.priority = priority;
//	return sprite;
//};
//
//Sprite_StandDraw.prototype.getFilename = function(actorData, itemData) {
//	
//	return actorData===itemData 
//		 ? actorData.meta[StandDraw_name] 
//		 : actorData.meta[StandDraw_name] + '_' + itemData.meta[StandDraw_name];
//};
//
//Sprite_StandDraw.prototype.getPriority = function(actorData, itemData) {
//
//	return itemData.meta[StandDraw_priority];
//};
//
//Sprite_StandDraw.prototype.addItem = function(actorData, itemData) {
//
//};




// 设置人物的差分

	// ？差分(diff) ？姿势(pose) ...

Sprite_StandDraw.prototype.setActorDiff = function(diffName) {
	this._setActorDiff(diffName);
	this.refresh();
};

Sprite_StandDraw.prototype.unsetActorDiff = function() {
	this._unsetActorDiff();
	this.refresh();
};

Sprite_StandDraw.prototype._setActorDiff = function(diffName) {
	if (!diffName) diffName = ''; // ？允许从差分名为空 ...

	var isSame = this._compareDiffName(this._actorDiff, diffName);

	if (!isSame) {
		this._actorDiff = diffName;
		this._isNeedRefreshDiff = true;
	}
};

Sprite_StandDraw.prototype._unsetActorDiff = function() {

	var isSame = this._compareDiffName(this._actorDiff, '');

	if (!isSame) {
		this._actorDiff = '';
		this._isNeedRefreshDiff = true;
	}
};

Sprite_StandDraw.prototype._compareDiffName = function(a, b) {
	return a===b;
}; // ？【待】 不需要这个方法 ...
// ？【待】 是否要与 _compareData 兼容合并 ...
// ？不要 ...



// ？【待】 在类的公共方法里设置这个 以及 插件指令 ...


// ？【待】 修改 priority 的读取 ...
	// ？有些可以写成方法 ...

// ？【待】 测试


// ？【待】 物件的差分




Sprite_StandDraw.prototype.getActorMetaList = function() {
	if (!this._actor) return {};
	return this._actor.actor().meta;
};




// 添加与移除其他图片

Sprite_StandDraw.prototype.setFace = function(name) {
	// ？？【待】 是否 表情名为空 ...
	//this.setItem('face', name, 5.1);
	// ？不同差分的 表情的优先级 可以不同 ...
	// ？主要用于某些姿势那是表情 ...
		// ？如 背面 ...

	//if (!this._item['face'] || this._item['face'].data.name == name)
	this.setItem('face', name, 
		this.getActorMetaList()[getMetaName_priority(this._actorDiff)] // ？...
	);
}; 
// ？改为 储存信息 自动获取优先级 ... 
// ？改为 先检测再计算参数 ...

Sprite_StandDraw.prototype.unsetFace = function() {
	this.unsetItem('face');
};

Sprite_StandDraw.prototype.setAddition = function(name) {
	this.setItem('addition', name, 8.5); 
	// ？暂时 8.5 ...
		// ？是否应该 用户预设置 ...
		// ？还是应该 用户指令中给予 ...
};

Sprite_StandDraw.prototype.unsetAddition = function() {
	this.unsetItem('addition');
};
// ？addition 是否是唯一的 ...
	// ？非唯一类 ...
		// 【待】
	// ？类的限制条件 和 处理办法 ...


// 【未测试】

// ？考虑 name 为空 ...




// ？添加(？改为) Sprite_StandDraw类的 方法 ...
// ？如 Sprite_StandDraw.xxxsetxxx(id, name) ...




// ？需要在 公共事件里 能设置 ...
// ？所以需要把 立绘类 放在一个公共的 能快速找到的地方 ...


// ？所有窗口和场景共享角色立绘 ...
// ？即 窗口或场景不必创建 Sprite_StandDraw ...
// ？而是 引用 存储在某个位置上的 Sprite_StandDraw ...
	// ？这样可以保留设置 减少重复操作 等 ... 
// ？...

// ？可以再设 临时角色立绘 ...
		// ？于是 还要能复制设置 ...
	// ？每人一个 或 共用一个 ...
// ？用于某些需求 如 选择但未确定选择装备时的临时角色 ...
// ？...


// 待 更多常用的 物件 ...
// ===  break  201910031746  ===




// ？考虑 name 为空 ...

Sprite_StandDraw.prototype.setItem = function(className, name, priority) {
	//this._itemList[className] = { name: name, priority: priority, };
	this._setItem(className, name, priority);
	this.refresh();
};

Sprite_StandDraw.prototype.unsetItem = function(className) {
	this._unsetItem(className);
	this.refresh();
};

Sprite_StandDraw.prototype._setItem = function(className, name, priority) {
	//this._item[className].data = { name: name, priority: priority, };

	var tmpData = { 'name': name, 'priority': priority, }; 
	//var isSame = this._item[className]
					// ？unset时设为{} 会被当做 true ... 
					// ？或者 unset 应该 delete ...
	var isSame = this._item[className] && this._item[className].data
			   ? this._compareData(this._item[className].data, tmpData)
			   : false;

	if (!isSame) {
		if (!this._item[className]) this._item[className] = {}; // ？应对第一次没有将其设为 object ...
		this._item[className].data = tmpData;
		this._item[className].isNeedRefresh = true;
	}
};
// ？设置而不刷新 ...
// ？为了 有些时候 大量设置没必要立刻刷新的情况 ...

Sprite_StandDraw.prototype._unsetItem = function(className) {
	this._item[className] = {}; // ？是否需要 delete ...
	// ？在下次 redraw 时 把全部子类清除 之后就不再会 添加这项 ...
};
// ？【待】 是否要 判断相同 设置 isNeedRefresh ...
// ？？不需要 ...

Sprite_StandDraw.prototype._compareData = function(a, b) {

	// ？暂时只比较 name 和 priority ...
	return a.name===b.name && a.priority===b.priority;

	// ？区分 仅仅priority不同 和 name不同 ... 
	// ？仅仅priority不同 不需要重新加载 但要重新排序 ...
	// ？...
		// ？？暂时不考虑 相同文件不同优先级 ...

	// ？比较数据库引用 ...
//xx	return a===b; // ？没有必要定义这个函数 ...
};

// 【待】
// ？物件里存装备的数据库数据的引用 (如果有的话) ...
// ？方便再次获取meta 以及 用于比较是否相同 ...
// ？...



// ？动画 sprite ...



console.log("load success : MK_ShowStandDraw");



// ？存放在 $xxx (？全局变量) 里 ...


// ？actor图像 尝试 兼容放进 _item ...


// ？【待】 每个 item 都存一个 以 diff 为 key 的列表 储存每个优先级 ...






//-----------------------------------------------------------------------------
// 尝试添加闪光等效果
// 

/*
//初始化
var _Sprite_StandDraw_initialize      = Sprite_StandDraw.prototype.initialize;
//Sprite_StandDraw.prototype.initialize = function(battler) {
Sprite_StandDraw.prototype.initialize = function() {
    //Sprite_Battler.prototype.initialize.call(this, battler);

    _Sprite_StandDraw_initialize.apply(this, arguments);
    this.initMembers();
};
//初始化成员
Sprite_StandDraw.prototype.initMembers = function() {
    //Sprite_Battler.prototype.initMembers.call(this);
    //this._enemy = null;
    this._appeared = false;
    this._battlerName = '';
    this._battlerHue = 0;
    this._effectType = null;
    this._effectDuration = 0;
    this._shake = 0;
    //this.createStateIconSprite();
};
//更新
Sprite_StandDraw.prototype.update = function() {
    //Sprite_Battler.prototype.update.call(this);
    //if (this._enemy) {
    if (this._actor) {
        this.updateEffect();
        this.updateStateSprite();
    }
};
//更新帧
Sprite_StandDraw.prototype.updateFrame = function() {
    Sprite_Battler.prototype.updateFrame.call(this);
    var frameHeight = this.bitmap.height;
    if (this._effectType === 'bossCollapse') {
        frameHeight = this._effectDuration;
    }
    this.setFrame(0, 0, this.bitmap.width, frameHeight);
};
//更新位置
Sprite_StandDraw.prototype.updatePosition = function() {
    Sprite_Battler.prototype.updatePosition.call(this);
    this.x += this._shake;
};
//更新状态精灵
Sprite_StandDraw.prototype.updateStateSprite = function() {
    this._stateIconSprite.y = -Math.round((this.bitmap.height + 40) * 0.9);
    if (this._stateIconSprite.y < 20 - this.y) {
        this._stateIconSprite.y = 20 - this.y;
    }
};
//初始化可见度
Sprite_StandDraw.prototype.initVisibility = function() {
    this._appeared = this._enemy.isAlive();
    if (!this._appeared) {
        this.opacity = 0;
    }
};
//设置效果
Sprite_StandDraw.prototype.setupEffect = function() {
    if (this._appeared && this._enemy.isEffectRequested()) {
        this.startEffect(this._enemy.effectType());
        this._enemy.clearEffect();
    }
    //if (!this._appeared && this._enemy.isAlive()) {
    if (!this._appeared) {
        this.startEffect('appear');
    } else if (this._appeared && this._enemy.isHidden()) {
        this.startEffect('disappear');
    }
};
//开始效果
Sprite_StandDraw.prototype.startEffect = function(effectType) {
    this._effectType = effectType;
    switch (this._effectType) {
    case 'appear':
        this.startAppear();
        break;
    case 'disappear':
        this.startDisappear();
        break;
    case 'whiten':
        this.startWhiten();
        break;
    case 'blink':
        this.startBlink();
        break;
    case 'collapse':
        this.startCollapse();
        break;
    case 'bossCollapse':
        this.startBossCollapse();
        break;
    case 'instantCollapse':
        this.startInstantCollapse();
        break;
    }
    this.revertToNormal();
};
//开始出现
Sprite_StandDraw.prototype.startAppear = function() {
    this._effectDuration = 16;
    this._appeared = true;
};
//开始消失
Sprite_StandDraw.prototype.startDisappear = function() {
    this._effectDuration = 32;
    this._appeared = false;
};
//开始变白
Sprite_StandDraw.prototype.startWhiten = function() {
    this._effectDuration = 16;
};
//开始闪烁
Sprite_StandDraw.prototype.startBlink = function() {
    this._effectDuration = 20;
};
//开始死亡
Sprite_StandDraw.prototype.startCollapse = function() {
    this._effectDuration = 32;
    this._appeared = false;
};
//开始boss死亡
Sprite_StandDraw.prototype.startBossCollapse = function() {
    this._effectDuration = this.bitmap.height;
    this._appeared = false;
};
//开始立即死亡
Sprite_StandDraw.prototype.startInstantCollapse = function() {
    this._effectDuration = 16;
    this._appeared = false;
};
//更新效果
Sprite_StandDraw.prototype.updateEffect = function() {
    this.setupEffect();
    if (this._effectDuration > 0) {
        this._effectDuration--;
        switch (this._effectType) {
        case 'whiten':
            this.updateWhiten();
            break;
        case 'blink':
            this.updateBlink();
            break;
        case 'appear':
            this.updateAppear();
            break;
        case 'disappear':
            this.updateDisappear();
            break;
        case 'collapse':
            this.updateCollapse();
            break;
        case 'bossCollapse':
            this.updateBossCollapse();
            break;
        case 'instantCollapse':
            this.updateInstantCollapse();
            break;
        }
        if (this._effectDuration === 0) {
            this._effectType = null;
        }
    }
};
//是效果中
Sprite_StandDraw.prototype.isEffecting = function() {
    return this._effectType !== null;
};
//恢复到正常
Sprite_StandDraw.prototype.revertToNormal = function() {
    this._shake = 0;
    this.blendMode = 0;
    this.opacity = 255;
    this.setBlendColor([0, 0, 0, 0]);
};
//更新变白
Sprite_StandDraw.prototype.updateWhiten = function() {
    var alpha = 128 - (16 - this._effectDuration) * 10;
    this.setBlendColor([255, 255, 255, alpha]);
};
//更新闪烁
Sprite_StandDraw.prototype.updateBlink = function() {
    this.opacity = (this._effectDuration % 10 < 5) ? 255 : 0;
};
//更新出现
Sprite_StandDraw.prototype.updateAppear = function() {
    this.opacity = (16 - this._effectDuration) * 16;
};
//更新消失
Sprite_StandDraw.prototype.updateDisappear = function() {
    this.opacity = 256 - (32 - this._effectDuration) * 10;
};
//更新死亡
Sprite_StandDraw.prototype.updateCollapse = function() {
    this.blendMode = Graphics.BLEND_ADD;
    this.setBlendColor([255, 128, 128, 128]);
    this.opacity *= this._effectDuration / (this._effectDuration + 1);
};
//更新boss死亡
Sprite_StandDraw.prototype.updateBossCollapse = function() {
    this._shake = this._effectDuration % 2 * 4 - 2;
    this.blendMode = Graphics.BLEND_ADD;
    this.opacity *= this._effectDuration / (this._effectDuration + 1);
    this.setBlendColor([255, 255, 255, 255 - this.opacity]);
    if (this._effectDuration % 20 === 19) {
        SoundManager.playBossCollapse2();
    }
};
//更新迅速死亡
Sprite_StandDraw.prototype.updateInstantCollapse = function() {
    this.opacity = 0;
};
//伤害偏移x
Sprite_StandDraw.prototype.damageOffsetX = function() {
    return 0;
};
//伤害偏移y
Sprite_StandDraw.prototype.damageOffsetY = function() {
    return -8;
};
*/









//-----------------------------------------------------------------------------
// 插件指令
// 


var pluginCode = 'StandDraw'; 
// ？【待】 可以在插件参数中设置成别的 ...
// ？setFace等 也是 ...


// ？【待】 不区分大小写 (可以在插件参数中开关) ...


// ？【待】 可以选定设置的角色 ...


var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args)
{
    _Game_Interpreter_pluginCommand.apply(this, arguments);

    if (command !== pluginCode) return;
    								// ？只会跳出该层 不会影响其他的续写 ...

    switch (args[0]) {

		// 设置人物的差分

	    case 'setActorDiff':
	        Sprite_StandDraw.getStandDraw(showActorId)
	        	.setActorDiff(args[1]);
	        break;

	    case 'unsetActorDiff':
	        Sprite_StandDraw.getStandDraw(showActorId)
	        	.unsetActorDiff();
	        break;
	    // ？【待】 可以自定义 命令名 ...
	    // ？【待】 如果不要 itemDiff 直接叫 setDiff
	    	// ？还是不这样了 反正可以自定义 ...


		// 添加与移除其他图片

	    case 'setFace':
	        //Sprite_StandDraw.isReady(showActorId)
	        // ？改查询准备 为准备它 ...
	        //Sprite_StandDraw.touchIt(showActorId)
	        //	&& Sprite_StandDraw._sprite_standDraw[showActorId].setFace(args[1]);
	        // ？直接 Sprite_StandDraw.getStandDraw(showActorId) ...
	        // ？getStandDraw 既能 强制准备 又能 获取对象 ...
	        Sprite_StandDraw.getStandDraw(showActorId)
	        	.setFace(args[1]);
	        break;

	    case 'unsetFace':
	        Sprite_StandDraw.getStandDraw(showActorId)
	        	.unsetFace();
	        break;

	    case 'setAddition':
	        Sprite_StandDraw.getStandDraw(showActorId)
	        	.setAddition(args[1]);
	        break;

	    case 'unsetAddition':
	        Sprite_StandDraw.getStandDraw(showActorId)
	        	.unsetAddition();
	        break;

	    case 'setItem':
	        Sprite_StandDraw.getStandDraw(showActorId)
	        	.setItem(args[1], args[2], args[3]);
	        break;

	    case 'unsetItem':
	        Sprite_StandDraw.getStandDraw(showActorId)
	        	.unsetItem(args[1]);
	        break;


	    // 设置地图立绘容器位置

	    case 'setMapSDLocal':
	    	switch (args[1]) {
	    		case 'left':
	    			Sprite_StandDraw.setMapStandDrawPosition_left();
	    			break;

	    		case 'right':
	    			Sprite_StandDraw.setMapStandDrawPosition_right();
	    			break;

	    		case 'other':
	    			Sprite_StandDraw.setMapStandDrawPosition(args[2], args[3]);
	    			break;
	    	}
	        break;


	    // unknown

	    default:
	        console.error('[%s %s] Unknown command.', pluginCode, args[0]);
	        	// ？...
	        break;
    }

};


// 设置 显示/隐藏 窗口位置(包含但不限于 左右侧)/缩放 动作 等 ...
	// ？自动 左右侧 防挡 ...
// ===  break  201910032325  ===

// ？与角色buff 相关的条件 ...





//-----------------------------------------------------------------------------
// 装入场景或窗口
// 

// 测试/示范用窗口 有需要请自行重写窗口

var _Window_Base_initialize   = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function() {
	if (this.isNeedStandDraw()) this._standDrawSprite = null;
	_Window_Base_initialize.apply(this, arguments);
};

Window_Base.prototype._createAllParts = function() {
	Window.prototype._createAllParts.call(this);
	if (this.isNeedStandDraw()) this.createStandDrawSprite();
};

Window_Base.prototype.createStandDrawSprite = function() {
	//this._standDrawSprite = new Sprite_StandDraw();
	//this._standDrawSprite.setActor($gameActors._data[showActorId]);
		// ？【临时】
	this._standDrawSprite = Sprite_StandDraw.getStandDraw(showActorId);
		// ？...

	//console.log(111);
	// ？？没有调用 ... 【待 debug】

	this.addChild(this._standDrawSprite);
};


Window_Base.prototype.isNeedStandDraw = function() {
	return false; 
};
Window_Base.prototype.refreshStandDraw = function() {
	if (this._actor && this.isNeedStandDraw()) {
		//this._standDrawSprite.redraw(this._actor);
		this._standDrawSprite.refresh();
	}
};




// 装备场景立绘显示

function Window_StandDraw() {
	this.initialize.apply(this, arguments);
}

Window_StandDraw.prototype = Object.create(Window_Base.prototype);
Window_StandDraw.prototype.constructor = Window_StandDraw;
Window_StandDraw.prototype.initialize = function(x, y, width, height) {
	//var width = this.windowWidth();
	//var height = this.windowHeight();
	Window_Base.prototype.initialize.call(this, x, y, width, height);
	this._actor = null;
	this._tempActor = null;

	//this._standDrawSprite = new Sprite_StandDraw(); 
	this._standDrawSprite = Sprite_StandDraw.getStandDraw(showActorId);

	//this._standDrawSprite.scale = new Point(0.75, 0.75);

	//var centerConfig = centerInBoard({
	//	//width: MapStandDraw_Config.width, 
	//	//height: MapStandDraw_Config.height, 
	//	// ？载入到 bitmap 后 宽高不是原来图片的宽高 ...
	//	// ？需要读取 bitmap ...
	//	//width: this._standDrawSprite._bitmap.width, 
	//	//height: this._standDrawSprite._bitmap.height, 
	//	// ？容器没有 bitmap 应该取孩子 ...
	//	width : this._standDrawSprite.children[0] ? this._standDrawSprite.children[0]._bitmap.width  : 0, 
	//	height: this._standDrawSprite.children[0] ? this._standDrawSprite.children[0]._bitmap.height : 0, 
	//},{ 
	//	//x: x,
	//	//y: y,
	//	// ？不再需要 ...
	//
	//	//width: width,
	//	//height: height, 
	//	width : width  || this.windowWidth (),
	//	height: height || this.windowHeight(), 
	//});
	//
	//if (centerConfig) {
	//	this._standDrawSprite.scale = centerConfig.scale;
	//
	//	//this._standDrawSprite.x = centerConfig.pos.x;
	//	//this._standDrawSprite.y = centerConfig.pos.y;
	//	// ？【待】 可以用 this._standDrawSprite.position ...
	//	this._standDrawSprite.position = centerConfig.pos;
	//}
	// 移入 this.refreshStandDrawLocal() (在 this.refresh()中执行)

	this.addChild(this._standDrawSprite);
	this.refresh();
};

Window_StandDraw.prototype.windowWidth = function() {
	return 312;
};
Window_StandDraw.prototype.windowHeight = function() {
	//return 624-108;
	return 624-228;
};
Window_StandDraw.prototype.setActor = function(actor) {
	if (this._actor !== actor) {
		this._actor = actor;

		//this._standDrawSprite.setActor(actor);
		// ？引用其他角色的立绘 而不是改变 Sprite 的绑定 actor ...
		this._standDrawSprite = Sprite_StandDraw.getStandDraw(actor);

		this.refresh();
	}
};
Window_StandDraw.prototype.refresh = function() {

	this.contents.clear();
	//if (this._tempActor)
	//	this._standDrawSprite.redraw(this._tempActor); // ？...
	//else if (this._actor)
		//this._standDrawSprite.redraw(this._actor);
		this._standDrawSprite.refresh();
	this.refreshStandDrawLocal();
};
Window_StandDraw.prototype.setTempActor = function(tempActor) {
	if (this._tempActor !== tempActor) {
		this._tempActor = tempActor;
		this.refresh();
	}
};

Window_StandDraw.prototype.refreshStandDrawLocal = function() {

	var centerConfig = centerInBoard({
		//width: MapStandDraw_Config.width, 
		//height: MapStandDraw_Config.height, 
		// ？载入到 bitmap 后 宽高不是原来图片的宽高 ...
		// ？需要读取 bitmap ...
		//width: this._standDrawSprite._bitmap.width, 
		//height: this._standDrawSprite._bitmap.height, 
		// ？容器没有 bitmap 应该取孩子 ...
		width : this._standDrawSprite.children[0] ? this._standDrawSprite.children[0]._bitmap.width  : 0, 
		height: this._standDrawSprite.children[0] ? this._standDrawSprite.children[0]._bitmap.height : 0, 
	},{ 
		//x: x,
		//y: y,
		// ？不再需要 ...

		//width: width,
		//height: height, 
		//width : width  || this.windowWidth (),
		//height: height || this.windowHeight(), 
		width : this.width, 
		height: this.height, 
	});

	if (centerConfig) {
		this._standDrawSprite.scale = centerConfig.scale;

		//this._standDrawSprite.x = centerConfig.pos.x;
		//this._standDrawSprite.y = centerConfig.pos.y;
		// ？【待】 可以用 this._standDrawSprite.position ...
		this._standDrawSprite.position = centerConfig.pos;
	}
	// ？【待】 改用方法 对sprite设置centerConfig ...
};


if (isNeedShowEquips) {

Scene_Equip.prototype.createStatusWindow = function() {
    //this._statusWindow = new Window_EquipStatus(0, this._helpWindow.height);
    var wx = Graphics.boxWidth - (new Window_EquipStatus()).windowWidth();
    var wy = this._helpWindow.height;
    this._statusWindow = new Window_EquipStatus(wx, wy);
    this.addWindow(this._statusWindow);
};

Scene_Equip.prototype.createCommandWindow = function() {
    //var wx = this._statusWindow.width;
    var wx = Graphics.boxWidth - 2 * this._statusWindow.width;
    var wy = this._helpWindow.height;
    //var ww = Graphics.boxWidth - this._statusWindow.width;
    var ww = this._statusWindow.width;
    this._commandWindow = new Window_EquipCommand(wx, wy, ww);
    this._commandWindow.setHelpWindow(this._helpWindow);
    this._commandWindow.setHandler('equip',    this.commandEquip.bind(this));
    this._commandWindow.setHandler('optimize', this.commandOptimize.bind(this));
    this._commandWindow.setHandler('clear',    this.commandClear.bind(this));
    this._commandWindow.setHandler('cancel',   this.popScene.bind(this));
    this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._commandWindow.setHandler('pageup',   this.previousActor.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_Equip.prototype.createSlotWindow = function() {
    //var wx = this._statusWindow.width;
    var wx = Graphics.boxWidth - 2 * this._statusWindow.width;
    var wy = this._commandWindow.y + this._commandWindow.height;
    //var ww = Graphics.boxWidth - this._statusWindow.width;
    var ww = this._statusWindow.width;
    var wh = this._statusWindow.height - this._commandWindow.height;
    this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
    this._slotWindow.setHelpWindow(this._helpWindow);
    this._slotWindow.setStatusWindow(this._statusWindow);
    this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
    this._slotWindow.setHandler('cancel',   this.onSlotCancel.bind(this));
    this.addWindow(this._slotWindow);
};

Scene_Equip.prototype.createItemWindow = function() {
    //var wx = 0;
    //var wx = this._statusWindow.x + this._statusWindow.width;
    var wx = this._slotWindow.x;
    var wy = this._statusWindow.y + this._statusWindow.height;
    //var ww = Graphics.boxWidth;
    var ww = Graphics.boxWidth - wx;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_EquipItem(wx, wy, ww, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setStatusWindow(this._statusWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this._slotWindow.setItemWindow(this._itemWindow);
    this.addWindow(this._itemWindow);
};
// ？可以续写在后面 对this._xxxWindow修改x,y,w,h ...


var _Scene_Equip_create      = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function() {
	_Scene_Equip_create.apply(this, arguments);

	this.createStandDrawWindow();
	this.refreshActor(); // ？...
};

Scene_Equip.prototype.createStandDrawWindow = function() {
	//this._standDrawWindow = new Window_StandDraw(0, this._helpWindow.height);
	//this._standDrawWindow = new Window_StandDraw(0, 0);
    //var wx = 0;
    //var wy = this._statusWindow.y + this._statusWindow.height;
    //var ww = this._statusWindow.width;
    //var wh = Graphics.boxHeight - wy;

    var wx = 0;
    var wy = this._commandWindow.y;
    var ww = this._commandWindow.x;
    var wh = Graphics.boxHeight - wy;
    this._standDrawWindow = new Window_StandDraw(wx, wy, ww, wh);
	this.addWindow(this._standDrawWindow);
};

var _Scene_Equip_refreshActor      = Scene_Equip.prototype.refreshActor;
Scene_Equip.prototype.refreshActor = function() {
	_Scene_Equip_refreshActor.apply(this, arguments);
	var actor = this.actor();
	if (this._standDrawWindow) this._standDrawWindow.setActor(actor);
		// ？修改 窗口的setActor的实现 而不是修改这句话(？这个结构 ...) ...
};


var _Scene_Equip_commandEquip      = Scene_Equip.prototype.commandEquip;
Scene_Equip.prototype.commandEquip = function() {
	_Scene_Equip_commandEquip.apply(this, arguments);

	this._standDrawWindow.refresh();
};
var _Scene_Equip_commandOptimize      = Scene_Equip.prototype.commandOptimize;
Scene_Equip.prototype.commandOptimize = function() {
	_Scene_Equip_commandOptimize.apply(this, arguments);

	this._standDrawWindow.refresh();
};
var _Scene_Equip_commandClear      = Scene_Equip.prototype.commandClear;
Scene_Equip.prototype.commandClear = function() {
	_Scene_Equip_commandClear.apply(this, arguments);

	this._standDrawWindow.refresh();
};
var _Scene_Equip_onItemOk      = Scene_Equip.prototype.onItemOk;
Scene_Equip.prototype.onItemOk = function() {
	_Scene_Equip_onItemOk.apply(this, arguments);

	this._standDrawWindow.refresh();
};

}




// 地图场景立绘显示

// ？偷懒 继承 Window_StandDraw 并消除背景 ...
function Window_StandDraw_NoBoard() {
    this.initialize.apply(this, arguments);
}

Window_StandDraw_NoBoard.prototype = Object.create(Window_StandDraw.prototype);
Window_StandDraw_NoBoard.prototype.constructor = Window_StandDraw_NoBoard;

Window_StandDraw_NoBoard.prototype.initialize = function(x, y, width, height) {
	Window_StandDraw.prototype.initialize.apply(this, arguments);
	//this._standDrawSprite.scale = new Point(1, 1);

	//this._standDrawSprite.scale = centerInBoard({
	//	width: MapStandDraw_Config.width, 
	//	height: MapStandDraw_Config.height, 
	//},{ 
	//	//x: MapStandDraw_Config.leftX, 
	//	//y: MapStandDraw_Config.leftY, 
	//	//width: MapStandDraw_Config.width, 
	//	//height: MapStandDraw_Config.height, 
	//	x: x, 
	//	y: y, 
	//	width: width, 
	//	height: height, 
	//}).scale;
	// 移入 Window_StandDraw
}; // ？可全部省略 ...
Window_StandDraw_NoBoard.prototype.loadWindowskin = function() {
    this.windowskin = new Bitmap(); 
};



if (MapStandDraw_Config.isNeedShow) {

var Scene_Map_createAllWindows       = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	Scene_Map_createAllWindows.apply(this, arguments);

    this.createStandDrawWindow();
};

Scene_Map.prototype.createStandDrawWindow = function() {

    //this._standDrawWindow = new Window_StandDraw_NoBoard(0, 0);

    ///if (!MapStandDraw_Config.realX || !MapStandDraw_Config.realY) 
    // ？错了 当值为0时 !0 为 true ...
    if (MapStandDraw_Config.realX === undefined || MapStandDraw_Config.realY === undefined) 
    	Sprite_StandDraw.setMapStandDrawPosition_init();

    var wx = MapStandDraw_Config.realX;
    var wy = MapStandDraw_Config.realY;
    var ww = MapStandDraw_Config.width;
    var wh = MapStandDraw_Config.height;
    this._standDrawWindow = new Window_StandDraw_NoBoard(wx, wy, ww, wh);

    this._standDrawWindow.setActor($gameActors.actor($gameParty._actors[0]));
	//this.addWindow(this._standDrawWindow);
	// ？这样会加在WindowLayer里 会导致图片覆盖对话框 ...
	this.addChildAt(this._standDrawWindow, 1); // ？...
	// ？直接用图片好 还是用window好 ...
	// 【待】
};


var _Scene_Map_start      = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
	this._standDrawWindow.show();
	_Scene_Map_start.apply(this, arguments);
};
var _Scene_Map_terminate      = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	this._standDrawWindow.hide();
	_Scene_Map_terminate.apply(this, arguments);
};

}




/**
 * 設定値
 */
var settings = null;

/**
 * 各種関数マップ
 */
var findKeyElements = null;
var findTargetElement = null;
var renderHTML = null;
var observeHTML = null;

/**
 * ターゲットかどうかを調べる。
 * @param settings 
 */
function findMatchedTarget( settings ){
	let ret = null;
	let current = location.href;
	let targets = settings.target;
	targets.forEach(function( t ) {
		if( current.startsWith( t.domain )){
			ret = t;
		}
	});
	return ret;
}

/**
 * GitHubのキー要素を取得する。
 */
function findKeyElementsGitHub(){
	return document.querySelectorAll("pre[lang='plantuml']");
}

function renderPartGitHub( umlElem , index ){
	var codeNode = umlElem.querySelector("code");
	var parent =  codeNode.parentNode;

	var plantuml = codeNode.textContent.trim();
	if (plantuml.substr(0, "@startuml".length) != "@startuml") return;

	var url = settings.plantuml + compress(plantuml);
	var imgElem = document.createElement("img");
	imgElem.setAttribute("src", escapeHtml(url));
	imgElem.setAttribute("title", plantuml);

	parent.replaceChild(imgElem, codeNode);
	imgElem.onclick = function() {
		parent.replaceChild(codeNode, imgElem);
	};
	codeNode.onclick = function() {
		parent.replaceChild(imgElem, codeNode);
	};
}

/**
 * GitHub用のレンダリングをする。
 * @param {*} keyElems 
 */
function renderHTMLGitHub( keyElems ){
	keyElems.forEach( function( umlElem , index ){
		if( umlElem.classList.contains("rendered") ){
			return;
		}else{
			umlElem.classList.add("rendered");
			renderPartGitHub( umlElem , index );
		}
	});
}

/**
 * GitHubの場合は要素はdiscussion_bucket要素を監視する。
 */
function observeHTMLGitHub(){
	// nothing to do.
	var observer = new MutationObserver(function(){
		let keyElems = findKeyElements();
		renderHTML(keyElems);
	});
	list = document.querySelectorAll( "#discussion_bucket");
	list.forEach( function(node){
		observer.observe(node, {
			childList: true,
			subtree: true,
		});
	});
}

/**
 * GitHubの処理セットを適用する。
 */
function setGitHubFunctions(){
	findKeyElements = findKeyElementsGitHub;
	renderHTML = renderHTMLGitHub;
	observeHTML = observeHTMLGitHub;
}

/**
 * GitLabのキー要素を取得する。
 */
function findKeyElementsGitLab(){
	return document.querySelectorAll("pre[lang='plantuml']");
}

function renderPartGitLab( umlElem , index ){
	var codeElem = umlElem.querySelector("code");
	var plantuml = codeElem.textContent.trim();
	if (plantuml.substr(0, "@startuml".length) != "@startuml") return;	
	var url = settings.plantuml + compress(plantuml);
	var imgElem = document.createElement("img");
	imgElem.setAttribute("src", escapeHtml(url));
	imgElem.setAttribute("title", plantuml);
	umlElem.classList.remove("code");		
	umlElem.replaceChild(imgElem, codeElem);
	imgElem.onclick = function() {
		umlElem.classList.add("code");
		umlElem.replaceChild( codeElem, imgElem);
	};
	codeElem.onclick = function() {
		umlElem.classList.remove("code");
		umlElem.replaceChild(imgElem, codeElem);
	};
}

/**
 * GitLab用のレンダリングをする。
 * @param {*} keyElems 
 */
function renderHTMLGitLab( keyElems ){
	keyElems.forEach( function( umlElem , index ){
		if( umlElem.classList.contains("rendered") ){
			return;
		}else{
			umlElem.classList.add("rendered");
			renderPartGitLab( umlElem , index );
		}
	});
}

/**
 * GitLabの場合はページロード後に変更されるため、ページを監視する。
 */
function observeHTMLGitLab(){
	var observer = new MutationObserver(function(){
		let keyElems = findKeyElements();
		renderHTML( keyElems );
	});
	list = document.querySelectorAll( "div.blob-viewer[data-type='rich']");
	list.forEach( function(node){
		observer.observe(node, {
			childList: true,
			subtree: true,
		});
	});
}

/**
 * GitLabの処理セットを適用できるようにする。
 */
function setGitLabFunctions(){
	findKeyElements = findKeyElementsGitLab;
	renderHTML = renderHTMLGitLab;
	observeHTML = observeHTMLGitLab;
}

/**
 * メイン
 */
async function planterMain(){
	settings = await getStorageValue();

	/**
	 * ターゲットかどうかを調べる。
	 */
	let target = findMatchedTarget( settings );
	if( target === null ){
		return;
	}

	/**
	 * ターゲットの場合はレンダリング方法に合わせてレンダリング処理をする。
	 */
	switch( target.type ){
		case DOCTYPE.GITLAB:
		setGitLabFunctions();
		break;
		case DOCTYPE.GITHUB:
		setGitHubFunctions();
		break;
		default:
		return;
	}

	/**
	 * レンダリング処理をする。
	 */
	let keyElems = findKeyElements();	
	renderHTML( keyElems );
	observeHTML();
}
planterMain();

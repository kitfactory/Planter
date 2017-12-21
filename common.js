const DOCTYPE = {
	GITHUB:"GITHUB",
	GITLAB:"GITLAB",
}

/**
 * 
 */
function getStorageValue(){
	var defalutVal = {
		plantuml: "https://www.plantuml.com/plantuml/img/",
		target: [
			{
				domain:"https://github.com/",
				type:DOCTYPE.GITHUB
			},
			{
				domain:"https://gitlab.com/",
				type:DOCTYPE.GITLAB
			},
		]
	};

	return new Promise( function( r ){
		chrome.storage.local.get(defalutVal, r);		
	});
}

var settings = null;

/**
 * 
 */
function deleteButtonPushed( ev ){
    var src = ev.srcElement;
    var targetID = src.value;
    settings.target.splice(targetID , 1);
    refreshTargets();
}

/**
 * 
 */
function addButtonPushed(){
    let defaultVal = {
        "domain": "https://github.com/",
        "type": DOCTYPE.GITHUB
    };
    settings.target.push( defaultVal );
    refreshTargets();
}

function updateSettings(){
    let plantuml = document.getElementById("plantuml").value;
    let len = settings.target.length;
    let target = [];
    for( let i = 0 ;  i < len ; i++ ){
        let inputId = "input"+i;
        let inputVal = document.getElementById( inputId ).value;

        let selectId = "select"+i;
        let selectIdx = document.getElementById( selectId ).selectedIndex;
        let selectedValue;
        if( selectIdx === 0 ){
            selectedValue = DOCTYPE.GITHUB;
        }else{
            selectedValue = DOCTYPE.GITLAB;            
        }
        target.push({
            domain: inputVal,
            type: selectedValue
        });
    }
    let newSettings = {
        "plantuml":plantuml,
        "target":target
    }
    settings = newSettings;
}

/**
 * 
 */
function saveButtonPushed(){
    updateSettings();
    chrome.storage.local.set( settings , function(){
    });
}

/**
 * 
 */
function refreshTargets(){

    var top = document.querySelector(".targets");
    // remove all nodes.
    while (top.firstChild) {
        top.removeChild(top.firstChild);
    }
    // append all nodes.
    for( i = 0 ; i < settings.target.length ; i++ ){
        let domain = settings.target[i].domain;
        let type = settings.target[i].type;

        let targetNode = document.createElement("div");
        targetNode.id = "target"+i;

        let labelNode = document.createElement("h2");
        labelNode.innerText = "ターゲット " + (i+1);

        let domainNode = document.createElement("div");
        let domainPreNode = document.createElement("pre");
        domainPreNode.innerText = "ドメイン:";
        let domainInputNode = document.createElement("input");
        domainInputNode.id = "input"+i;
        domainInputNode.type = "url";
        domainInputNode.size = 60;
        domainInputNode.value = domain;
        domainNode.appendChild( domainPreNode );
        domainPreNode.appendChild( domainInputNode );

        targetNode.appendChild( labelNode );
        targetNode.appendChild( domainNode );

        let selectDivNode = document.createElement("div");
        let selectPreNode = document.createElement("pre");
        selectPreNode.innerText = "レンダリング方法:";
        selectDivNode.appendChild( selectPreNode );

        let selectNode = document.createElement("select");
        selectNode.id = "select"+i;

        let optionGitHubNode = document.createElement("option");
        optionGitHubNode.value = DOCTYPE.GITHUB;
        optionGitHubNode.innerText = DOCTYPE.GITHUB;
        if( type === DOCTYPE.GITHUB ){
            optionGitHubNode.selected = true;
        }
        selectNode.appendChild( optionGitHubNode );

        let optionGitLabNode = document.createElement("option");
        optionGitLabNode.value = DOCTYPE.GITLAB;
        optionGitLabNode.innerText = DOCTYPE.GITLAB;
        if( type === DOCTYPE.GITLAB ){
            optionGitLabNode.selected = true;
        }
        selectNode.appendChild( optionGitLabNode );
        selectPreNode.appendChild( selectNode );
        targetNode.appendChild( selectDivNode );

        let deleteButton = document.createElement("button");
        deleteButton.id = "delete"+i;
        deleteButton.value = i;
        deleteButton.innerText = "このターゲットを削除する";
        targetNode.appendChild( deleteButton );
        deleteButton.onclick = deleteButtonPushed;
        top.appendChild( targetNode );
    }
}


async function init(){
    var addButton = document.getElementById("add");
    addButton.onclick = addButtonPushed;

    var saveButton = document.getElementById("save");
    saveButton.onclick = saveButtonPushed;

    settings = await getStorageValue();
    var plantuml = document.querySelector("#plantuml");
    plantuml.value = settings.plantuml;
    refreshTargets();
}

init();

function search() {
    console.log("BEGIN SEARCH")
    let searchTerm = document.getElementById("searchInput").value.toLowerCase();
    var docs = {'Game':{'class':['CharacterClass','GameClass','HarvestableClass','PlayerClass','ScriptableObjectClass','ShapeClass','ToolClass','UnitClass','WorldClass'],'userdata': ['AiState','AreaTrigger','BlueprintVisualization','Body','BuilderGuide','Character','Color','Container','CullSphereGroup','Effect','GuiInterface','Harvestable','Interactable','Joint','Lift','LoadCellHandle','Network','PathNode','Player','Portal','Quat','RaycastResult','ScriptableObject','Shape','Storage','Tool','Unit','Uuid','Vec3','Widget','World'],'namespace': ['GLOBAL','sm','sm.ai','sm.areaTrigger','sm.audio','sm.body','sm.builderGuide','sm.camera','sm.cell','sm.challenge','sm.character','sm.color','sm.construction','sm.container','sm.creation','sm.cullSphereGroup','sm.debris','sm.debugDraw','sm.effect','sm.event','sm.game','sm.gui','sm.gui.widget','sm.harvestable','sm.interactable','sm.item','sm.joint','sm.json','sm.localPlayer','sm.log','sm.melee','sm.menuCreation','sm.noise','sm.particle','sm.pathNode','sm.pathfinder','sm.physics','sm.player','sm.portal','sm.projectile','sm.quat','sm.render','sm.scriptableObject','sm.shape','sm.storage','sm.tool','sm.unit','sm.util','sm.uuid','sm.vec3','sm.visualization','sm.world']},'Terrain': {'userdata': ['Color','Harvestable','Quat','Uuid','Vec3','World'],'namespace': ['GLOBAL','sm','sm.color','sm.debugDraw','sm.harvestable','sm.json','sm.log','sm.noise','sm.quat','sm.terrainData','sm.terrainGeneration','sm.terrainTile','sm.util','sm.uuid','sm.vec3']}};
    const list = document.getElementById('content');
    while (list.children[1]) {
        list.removeChild(list.lastChild);
    }
    let searchResults = new Array();
    for (let env in docs) {
        for (let type in docs[env]) {
            for (let obj of docs[env][type]) {
                if (obj.toLowerCase().includes(searchTerm)) {
                    searchResults.push({'name':obj,'path':type + '_' + env + '_' + obj.replaceAll(".","_"), 'env': env});
                }
            }
        }
    }
    if ((searchResults.length === 0)) {
        document.getElementById('content').insertAdjacentHTML("beforeend",'<br><div>No Results Found, please try again.</div>');
    } else {
        for (let result of searchResults) {
            document.getElementById('content').insertAdjacentHTML("beforeend",'<br><div><a href="https://scrapmechanic.com/api/' + result.path + '.html">' + result.name + ' (' + result.env + ')</a></div>');
        }
    }
}

function addSearchBar(searchInput) {
    if (searchInput) {
        document.body.innerHTML = `
        <div id="searchBar" style="background-color:#282c34;padding:3px;border-radius:10px;display:flex;">
            <a href="${chrome.runtime.getURL("main.html")}"><img src="${chrome.runtime.getURL("logo.png")}" width="50" height="50"></a>&nbsp;<h1>SM API Dark Mode</h1>
            <div id="searchBox">
            <a href="https://scrapmechanic.com/api/index.html"/><button>Home</button></a>
            Search: <input type="text" id="searchInput"><button class="confirmSearch">Search!</button>
           </div>
        </div>` + document.body.innerHTML;
        for (let element of document.getElementsByClassName("confirmSearch")) {
            element.addEventListener("click", search, false);
        }
    } else {
        document.body.innerHTML = `
        <div id="searchBar" style="background-color:#282c34;padding:3px;border-radius:10px;display:flex;">
            <a href="${chrome.runtime.getURL("main.html")}"><img src="${chrome.runtime.getURL("logo.png")}" width="50" height="50"></a>&nbsp;<h1>SM API Dark Mode</h1>
        </div>` + document.body.innerHTML;
    }

}
chrome.storage.local.get(["searchEnabled"], function(result) {
        addSearchBar(result.searchEnabled)
});
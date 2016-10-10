/* global matrixDecoder */

window.onload = function(){
	var animatedBox = document.getElementById("animatedBox");
	var consoleBox = document.getElementById("output");	
	var resetButton = document.getElementById("resetValues");
	var getRanges = document.querySelectorAll("input[type=range]");
	var getSelects = document.querySelectorAll("select");
	var getOutputs = document.querySelectorAll("[data-unit]");
	var getCheckboxes = document.querySelectorAll("[type=checkbox]");
	resetButton.addEventListener("click",resetValues);
	window.addEventListener("resize",refreshBoxes);
	
	for(var i=0;i<500;i++){
		animatedBox.innerHTML += "Hello World! ";
	}
	
	for(var i=0;i<getSelects.length;i++){
		getSelects[i].addEventListener("change",refreshBoxes);
	}
	
	for(var i=0;i<getCheckboxes.length;i++){
		getCheckboxes[i].addEventListener("change",disableRange);
	}
	
	for(var i=0;i<getRanges.length;i++){
		setOutputValue(getRanges[i]);
		var getEvent = ["input","change"];
		for(var ii=0;ii<2;ii++){
			getRanges[i].addEventListener(getEvent[ii],function(event){
				setOutputValue(event.target);
				refreshBoxes();
			});
		}
	}
	
	refreshBoxes();

	function refreshBoxes(){
		refreshAnimatedBox(animatedBox,getOutputs,getSelects);
		refreshConsoleBox(animatedBox,consoleBox);
		refreshCoordsBoxes(animatedBox);		
	}

	function resetValues(){
			for(var i=0;i<getCheckboxes.length;i++){
				getCheckboxes[i].checked = getCheckboxes[i].defaultChecked;
			}
			for(var i=0;i<getRanges.length;i++){
				getRanges[i].disabled = false;
				getRanges[i].value = getRanges[i].getAttribute("value");
				setOutputValue(getRanges[i]);
			}
			for(var i=0;i<getSelects.length;i++){
				getSelects[i].selectedIndex = "0";
			}
		refreshBoxes();
	}

	function disableRange(event){
		var range = event.target.nextElementSibling;
		var outputBox = range.nextElementSibling;
		if(event.target.checked){
			range.value = range.getAttribute("value");
			range.disabled = false;
			setOutputValue(range);
		} else {
			range.value = range.getAttribute("min");
			range.disabled = true;	
			outputBox.innerHTML = "none";
		}
		refreshBoxes();
	}
};

function setOutputValue(getObject){
	var value = Number(getObject.value);
	var outputBox = getObject.nextElementSibling;
	var unit = outputBox.getAttribute("data-unit");
	outputBox.innerHTML = value+unit;
}

function refreshCoordsBoxes(getElement){
	var matrix = matrixDecoder.decode(getElement);
	var getSel = document.getElementById("typeSelect").value;
	var getID = ["cornerA","cornerB","cornerC","cornerD"];
	var getCorner = ["A","B","C","D"];
	for(var i=0;i<4;i++){
		var output = document.getElementById(getID[i]);
		output.style.top = matrix.parent[getCorner[i]].y + "px";
		output.style.left = matrix.parent[getCorner[i]].x + "px";
		output.style.transform = "translateZ("+matrix.parent[getCorner[i]].z + "px)";
		output.children[0].innerHTML =	"<b>x: </b>" + matrix[getSel][getCorner[i]].x + "px<br/>" + 
										"<b>y: </b>" + matrix[getSel][getCorner[i]].y + "px<br/>" + 
										"<b>z: </b>" + matrix[getSel][getCorner[i]].z + "px";
	}
}

function refreshAnimatedBox(getElement,getOutputs,getSelects){
	var getParent = getElement.parentElement;
	var styles = ["width","height","top","left","borderWidth","margin"];
	var transStyles = ["rotate","rotateX","rotateY","rotateZ","translateX","translateY","translateZ","scaleX","scaleY","scaleZ","skewX","skewY"];
	var createTransform = "";
	
	for(var i=0;i<styles.length;i++){
		getElement.style[styles[i]] = getOutputs[i].innerHTML;
	}
	
	for(var i=6;i<transStyles.length+6;i++){
		createTransform += transStyles[i-6]+"(" + getOutputs[i].innerHTML + ") ";
	}
	
	getParent.style.transformStyle = getSelects[0].value;
	getElement.style.backfaceVisibility = getSelects[1].value;
	
	getElement.style.transform = createTransform;
	getElement.style.transformOrigin = getOutputs[18].innerHTML + " " + getOutputs[19].innerHTML + " " + getOutputs[20].innerHTML;
	getParent.style.perspective = getOutputs[21].innerHTML === "none" ? null:getOutputs[21].innerHTML;
	getParent.style.perspectiveOrigin = getOutputs[21].innerHTML === "none" ? null:getOutputs[22].innerHTML + " " + getOutputs[23].innerHTML;
	getParent.style.transform = getOutputs[24].innerHTML === "none" ? null:"perspective(" + getOutputs[24].innerHTML + ")";
}

function refreshConsoleBox(getElement,getConsole){
	var computedStyles = window.getComputedStyle(getElement, null);
	getConsole.innerHTML =	"<b>transform: </b>" + computedStyles.getPropertyValue("transform") +
							"<br/><b>transform-origin: </b>" + computedStyles.getPropertyValue("transform-origin");
}
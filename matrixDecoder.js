var matrixDecoder = {
	precision: null,
	decode: function(elem){
		return this.validate(elem,false);
	},
	decodePrecise: function(elem){
		return this.validate(elem,true);
	},
	validate: function(elem, precState){
		this.precision = precState;
		if(!elem||typeof elem !== "object") return;
		var computed = window.getComputedStyle(elem, null);
		return this.computeMatrix(elem,is3d(),computed);
		function is3d(){
			var gT = computed.getPropertyValue("transform");
			return gT.search("none")===0 ? 2:gT.search("matrix3d")===0 ? 1:0;
		}
	},
	computeMatrix: function(elem,is3d,computed){
		var crd,getTransform,transOrigin,offW,offH,chDims,pDims,addX,addY,retModes,corner,nr,orX,orY,orZ,getX,getY,getZ;

		if(is3d===2){
			crd = [1,0,0,1,0,0];
		} else {
			getTransform = computed.getPropertyValue("transform");
			crd = ((getTransform.slice(getTransform.search(/\x28/)+1,getTransform.search(/\x29/))).split(","));
			for(var i=0;i<crd.length;i++){
				crd[i] = parseFloat(crd[i]);
			}
			if(is3d===0) crd.push(0);
		}
		transOrigin = computed.getPropertyValue("transform-origin").split(" ");
		offW = [0,elem.offsetWidth,elem.offsetWidth,0];
		offH = [0,0,elem.offsetHeight,elem.offsetHeight];
		chDims = this.fixedPositions(elem);
		pDims = this.fixedPositions(elem.parentElement);
		addX = [chDims.left,0,chDims.left-pDims.left+elem.parentElement.clientLeft];
		addY = [chDims.top,0,chDims.top-pDims.top+elem.parentElement.clientTop];
		retModes = ["fixed","element","parent"];
		corner = ["A","B","C","D"];
		nr = is3d===1 ? [0,4,8,12,1,5,9,13,2,6,10,14]:[0,2,6,4,1,3,6,5,6,6,6,6];
		orX = parseFloat(transOrigin[0]);
		orY = parseFloat(transOrigin[1]);
		orZ = transOrigin[2]&&is3d ? parseFloat(transOrigin[2]):0;
		
		for(var i=0;i<corner.length;i++){
			getX = ((crd[nr[0]] * (offW[i]-orX)) + (crd[nr[1]] * (offH[i]-orY)) + (crd[nr[2]] * (-orZ)) + crd[nr[3]]);
			getY = ((crd[nr[4]] * (offW[i]-orX)) + (crd[nr[5]] * (offH[i]-orY)) + (crd[nr[6]] * (-orZ)) + crd[nr[7]]);
			getZ = ((crd[nr[8]] * (offW[i]-orX)) + (crd[nr[9]] * (offH[i]-orY)) + (crd[nr[10]] * (-orZ)) + crd[nr[11]]);
			
			for(var ii=0;ii<retModes.length;ii++){
				this.returnableValues[retModes[ii]][corner[i]].x = this.precision ? getX+addX[ii]+orX:Math.round(getX+addX[ii]+orX);
				this.returnableValues[retModes[ii]][corner[i]].y = this.precision ? getY+addY[ii]+orY:Math.round(getY+addY[ii]+orY);
				this.returnableValues[retModes[ii]][corner[i]].z = this.precision ? getZ+orZ:Math.round(getZ+orZ);
			}
		}
		
		return this.returnableValues;
	},
	fixedPositions: function(elem){
		var parent,left,top,scroll,scrollX,scrollY;
		
		parent = getParent(elem);
		left = elem.offsetLeft;
		top = elem.offsetTop;
		scroll = getScroll(elem);
		scrollX = scroll.x;
		scrollY = scroll.y;

		while(parent!==document.body){
			left += parent.offsetLeft + parent.clientLeft;
			top += parent.offsetTop + parent.clientTop;
			scroll = getScroll(parent);
			scrollX += scroll.x;
			scrollY += scroll.y;
			parent = getParent(parent);
		}

		return {left:left-scrollX,top:top-scrollY};
		
			function getScroll(first){
				var parent,scrollX,scrollY;
				
				if(first.offsetParent===null) return {x:0,y:0};
				parent = first.parentElement;
				scrollX = returnScroll(parent,1);
				scrollY = returnScroll(parent,0);

				while(parent!==first.offsetParent){
					parent = parent.parentElement;
					scrollX += returnScroll(parent,1);
					scrollY += returnScroll(parent,0);
				}
				return {x:scrollX,y:scrollY};
			}

			function getParent(elem){
				return elem.offsetParent===null ? document.body:elem.offsetParent;
			}
			
			function returnScroll(elem,side){
				var getSide = ["scrollTop","scrollLeft"][side];
				return elem===document.body ? document.body[getSide]||document.documentElement[getSide]:elem[getSide];
			}
	},
	returnableValues: {
		fixed: {
			A: {x:null,y:null,z:null},
			B: {x:null,y:null,z:null},
			C: {x:null,y:null,z:null},
			D: {x:null,y:null,z:null}
		},
		element: {
			A: {x:null,y:null,z:null},
			B: {x:null,y:null,z:null},
			C: {x:null,y:null,z:null},
			D: {x:null,y:null,z:null}
		},
		parent: {
			A: {x:null,y:null,z:null},
			B: {x:null,y:null,z:null},
			C: {x:null,y:null,z:null},
			D: {x:null,y:null,z:null}
		}
	}
};






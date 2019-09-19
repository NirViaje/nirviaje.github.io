//Nebula Bliss Engine
nebula_sprite = THREE.ImageUtils.loadTexture( "star-texture/star_small.png");//particleTexture.png" );
//star-texture/star_small.png, star_large.png, cloud_01.png
scale_uniform = { type: "f", value: window.innerHeight / 2	};

function addNebulaParticle(geometry,vertex,size,opacity,color){
		geometry.vertices.push( vertex );
		geometry.colors.push( color );
		geometry.sizes.push(size*window.devicePixelRatio);
		geometry.opacities.push(opacity);
};
function addStars(geometry){
	for(var i=0;i<10000;i++){
		var vertex = new THREE.Vector3();
		vertex.x = Math.random()*100000-50000;
		vertex.y = Math.random()*100000-50000;
		vertex.z = Math.random()*100000-50000;
		
		var rgb = colorTemperatureToRGB(Math.random()*5000+1000);
		var size =Math.random()+1;
		var color = new THREE.Color( rgb.r/256.0,rgb.g/256.0,rgb.b/256.0 );
		addNebulaParticle(geometry,vertex,1250*size,0.25,color);
		addNebulaParticle(geometry,vertex,250*size,0.75,color);
		addNebulaParticle(geometry,vertex,50*size,0.5,color);
	}
}
function createNebulaMaterial(geometry){
	var attributes = {
		size: {	type: 'f', value: geometry.sizes },
		opacity: {	type: 'f', value: geometry.opacities },
		customColor: { type: 'c', value: geometry.colors }
	};

	var uniforms = {
		texture:   { type: "t", value: nebula_sprite},
		scale:   scale_uniform,
		val:	{ type: 'f', value: 1.0}	//
	};

	return nebulaMaterial = new THREE.ShaderMaterial( {
		uniforms:       uniforms,
		attributes:     attributes,
		vertexShader:   document.getElementById( 'vertexshader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
		blending:       THREE.AdditiveBlending,
		blendSrc:THREE['SrcAlphaFactor'],
		blendDst:THREE['DstColorFactor'],
		blendEquation:THREE.AddEquation,
		depthTest:      false,
		transparent:    true
	});	
}
function createNebulaMappedMaterial(geometry){
	var attributes = {
		size: {	type: 'f', value: geometry.sizes },
		opacity: {	type: 'f', value: geometry.opacities },
		customColor: { type: 'v2', value: geometry.colors }
	};

	var uniforms = {
		texture:   { type: "t", value: nebula_sprite},
		colormap:    { type: "t", value: nebula_colormap},
		scale:   scale_uniform
	};

	return nebulaMaterial = new THREE.ShaderMaterial( {
		uniforms:       uniforms,
		attributes:     attributes,
		vertexShader:   document.getElementById( 'mappedvertexshader' ).textContent,
		fragmentShader: document.getElementById( 'mappedfragmentshader' ).textContent,
		blending:       THREE.AdditiveBlending,
		blendSrc:THREE['SrcAlphaFactor'],
		blendDst:THREE['DstColorFactor'],
		blendEquation:THREE.AddEquation,
		depthTest:      false,
		transparent:    true
	});	
}

//Nebula Bliss
nebulas.push({
	name:'Hourglass Nebula',
	audio:'sounds/timehole-32kb.ogg',
	audio_name:'Time Hole',
	image_url:'https://upload.wikimedia.org/wikipedia/commons/3/34/MyCn18-crop.png',
	image_small:'images/thumbs/hour_glass_nebula_small.png',
	image_desc:'Hubble Space Telescope image of the Hourglass Nebula',
	observation:[
			{	
				key:'Distance from Earth',
				value:'8000 ly (2.5 kpc)'
			},
			{	
				key:'Size',
				value:' 1.3 ly'
			},
			{	
				key:'Apparent Magnitude',
				value:'13.00'
			},
			{	
				key:'Constellation',
				value:'Musca'
			},
		],
	description:"This Hubble image reveals the true shape of MyCn18 to be an hourglass with an intricate pattern of 'etchings' in its walls. This picture has been composed from three separate images taken in the light of ionized nitrogen (represented by red),	hydrogen (green), and doubly-ionized oxygen (blue). The results are of great interest because they shed new light on the poorly understood ejection of stellar matter which accompanies the slow death of Sun-like stars. In previous ground-based images, MyCn18 appears to be a pair of large outer rings with a smaller central one, but the fine details cannot be seen.",
	func:function (scene, lod){
		var geometry = new THREE.Geometry();

		//https://threejs.org/docs/#manual/en/introduction/How-to-update-things
		// geometry.verticesNeedUpdate = true;
		// geometry.elementsNeedUpdate = true;
		// geometry.morphTargetsNeedUpdate = true;
		// geometry.uvsNeedUpdate = true;
		// geometry.normalsNeedUpdate = true;
		// geometry.colorsNeedUpdate = true;
		// geometry.tangentsNeedUpdate = true;

		geometry.colors = [];
		geometry.sizes = [];
		geometry.opacities = [];
		for(var lev=0;lev<lod;lev++){
			for ( i = 0; i < 1300*(1<<lev); i ++ ) {
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.random() * 2+0.25;
				vertex.z+=Math.abs(Math.sin(0+1.0/(1.5-vertex.z))*0.3);
				var rgb = colorTemperatureToRGB(1000/(vertex.z-0.5));
				var color = new THREE.Color( rgb.r/256.0,rgb.g/256.0,rgb.b/256.0 ).setHSL (0.045,0.9,0.45); //setHSL ( h, s, l ) this
				vertex.x = Math.sin(phi)*vertex.z*(1000+Math.random()*lev*10);
				vertex.y = Math.cos(phi)*vertex.z*(1000+Math.random()*lev*10);
				var z=Math.random();
				vertex.z *=vertex.z*1000*(Math.pow(z,0.25));
				//vertex.z *=vertex.z*1000*Math.cos(vertex.z);
				vertex.z -=100;
				vertex.z*=((i%2)*2-1);
				vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.2);
				addNebulaParticle(geometry,vertex,2200>>lev,(lev*0.2+0.1)*0.2,color);
			}
			for ( i = 0; i < 1300*(1<<lev); i ++ ) {
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.random() * 2+0.25;
				vertex.z+=Math.abs(Math.sin(0+1.0/(1.5-vertex.z))*0.3);
				var rgb = colorTemperatureToRGB(1000/(vertex.z-0.5));
				var color = new THREE.Color( rgb.r/256.0,rgb.g/256.0,rgb.b/256.0 ).setHSL (0.045,0.9,0.45); //setHSL ( h, s, l ) this
				vertex.x = Math.sin(phi)*vertex.z*(1000+Math.random()*lev*10);
				vertex.y = Math.cos(phi)*vertex.z*(1000+Math.random()*lev*10);
				var z=Math.random();
				vertex.z *=vertex.z*1000*(Math.pow(z,0.25));
				//vertex.z *=vertex.z*1000*Math.cos(vertex.z);
				vertex.z -=100;
				vertex.z*=((i%2)*2-1);

				vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.2);
				addNebulaParticle(geometry,vertex,2200>>lev,(lev*0.2+0.1)*0.2,color);
				
			}
		}

		//blue eye
		for(i=0;i<95;i++){
				var vertex = new THREE.Vector3();
				vertex.x = -Math.sin(i*Math.PI*2*0.02)*340;
				vertex.y = Math.cos(i*Math.PI*2*0.02)*340;
				vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.2);
				addNebulaParticle(geometry,vertex,1500,0.15,new THREE.Color( 0,1,1 ));
		}
		//red-purple
		for ( j = 4; j < 7; j ++ ) {
			var v=(j*1)*3;
			for ( i = 0; i < v; i ++ ) {
				var vertex = new THREE.Vector3();
				vertex.x=Math.sin(Math.PI*2*i/v)*j*110;
				vertex.y=Math.cos(Math.PI*2*i/v)*j*100;
				vertex.x+=Math.random()*50;
				vertex.y+=Math.random()*50;
				vertex.x+=-50;

				
				var rgb = colorTemperatureToRGB(4500-vertex.length()*3);
				vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.1);
				var color = new THREE.Color(0.2,0.25,1.0).setHSL (0.9,0.8,0.35); //.setHSL (0.60,0.8,0.35); //setHSL ( h, s, l ) this
				addNebulaParticle(geometry,vertex,2000-j*5,0.3-j*0.01,color);
			}			
		}

				//green
		for ( j = 3; j < 4; j ++ ) {
			var v=(j*1)*3;
			for ( i = 0; i < v; i ++ ) {
				var vertex = new THREE.Vector3();
				vertex.x=Math.sin(Math.PI*2*i/v)*j*110;
				vertex.y=Math.cos(Math.PI*2*i/v)*j*100;
				vertex.x+=Math.random()*50;
				vertex.y+=Math.random()*50;
				vertex.x+=-50;

				
				var rgb = colorTemperatureToRGB(4500-vertex.length()*3);
				vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.1);
				var color = new THREE.Color( 0.2*rgb.r/256.0,12*rgb.g/256.0,1*rgb.b/256.0 );
				addNebulaParticle(geometry,vertex,2000-j*5,0.3-j*0.01,color);
			}			
		}
		
		//custom stars
		var vertex = new THREE.Vector3();
		vertex.x = -100;
		
		addNebulaParticle(geometry,vertex,500,1.0,new THREE.Color( 1,1,1 ));
		addNebulaParticle(geometry,vertex,125,1.0,new THREE.Color( 1,1,1 ));
		var vertex = new THREE.Vector3();
		vertex.x = 500;
		vertex.y = -500;
		vertex.z=-4000;
		
		addNebulaParticle(geometry,vertex,500,1.0,new THREE.Color( 1,1,1 ));
		addNebulaParticle(geometry,vertex,125,1.0,new THREE.Color( 1,1,1 ));
		
		addStars(geometry);
		
		var nebulaMaterial =createNebulaMaterial(geometry);
				
		var particles = new THREE.PointCloud( geometry, nebulaMaterial);
		particles.sortParticles = true;
		particles.isNebula=true;
		scene.add( particles );
	}
});
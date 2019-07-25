//Nebula Bliss
nebulas.push({
	name:'Cat\'s Eye Nebula',
	audio:'sounds/ganymede-32kb.ogg',
	audio_name:'Lost in space',
	image_url:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Cat\'s_Eye_Nebula_Redux.jpg/768px-Cat\'s_Eye_Nebula_Redux.jpg',
	image_small:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Cat\'s_Eye_Nebula_Redux.jpg/240px-Cat\'s_Eye_Nebula_Redux.jpg',
	image_desc:'This is a composite of data from NASA\'s Chandra X-ray Observatory and Hubble Space Telescope of Cat\'s Eye Nebula',
	observation:[
			{	
				key:'Distance from Earth',
				value:'3.3 +/- 0.9 kly (1.0 +/- 0.3 kpc)'
			},
			{	
				key:'Size',
				value:' 0.2 ly'
			},
			{	
				key:'Apparent Magnitude',
				value:'9.8'
			},
			{	
				key:'Constellation',
				value:'Draco'
			},
		],
	description:"The Cat's Eye (NGC 6543) represents a brief, yet glorious, phase in the life of a sun-like star. This nebula's dying central star may have produced the simple, outer pattern of dusty concentric shells by shrugging off outer layers in a series of regular convulsions. But the formation of the beautiful, more complex inner structures is not well understood. Of course, gazing into the Cat's Eye, astronomers may well be seeing the fate of our sun, destined to enter its own planetary nebula phase of evolution... in about 5 billion years.",
	func: function (scene, lod){
		
		var geometry = new THREE.Geometry();
		geometry.colors = [];
		geometry.sizes = [];
		geometry.opacities = [];

		var geometry2 = new THREE.Geometry();
		geometry2.colors = [];
		geometry2.sizes = [];
		geometry2.opacities = [];

		var geometry3 = new THREE.Geometry();
		geometry3.colors = [];
		geometry3.sizes = [];
		geometry3.opacities = [];

		var axisx = new THREE.Vector3( 1, 0, 0 );
		var axisy = new THREE.Vector3( 0, 1, 0 );
		var axisz = new THREE.Vector3( 0, 0, 1 );
		var angle = (Math.PI *356)/180;
		var angle2 = (Math.PI *35)/180;

		var color1 = new THREE.Color(0,0.5,0.65);
		var color2 = new THREE.Color(0.2,0.25,1.0).setHSL (0.6,0.8,0.35); //.setHSL (0.60,0.8,0.35); //setHSL ( h, s, l ) this
		var color3 = new THREE.Color(0.65,0,0.25);
		var color4 = new THREE.Color(0.8,0.25,0.15).setHSL (0.046,0.8,0.35);
		var color5 = new THREE.Color(0.65,0.5,0);
		var color6 = new THREE.Color(0.8,0.5,0.25).setHSL (0.07,0.8,0.35); //.setHSL (0.046,0.7,0.35); //setHSL ( h, s, l ) this
				
		for(var lev=0;lev<lod;lev++){
			
			for ( i = 0; i < 600*(1<<lev); i ++ ) {
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 1.2+0.75;
				vertex.z+=Math.abs(Math.sin(1.0/(1.5-vertex.z))*0.3);
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				
				vertex.x = Math.sin(phi)*vertex.z*(1000);
				vertex.y = Math.cos(phi)*vertex.z*(1000);
				
				if(i%3==1){
					vertex.x*=0.4;
					vertex.y*=0.4;
				}

				vertex.x+=Math.sin(vertex.z*10)*(500);
				vertex.y+=Math.cos(vertex.z*10)*(500);

				vertex.x*=Math.cos(vertex.z*1+2.5)*3.0;
				vertex.y*=Math.cos(vertex.z*1+2.5)*3.0;
				vertex.z *=vertex.z*2500*Math.cos(vertex.z);
				vertex.z -=1000;
				
				if(i%3==2){
					vertex.x*=0.4;
					vertex.y*=0.4;
					vertex.z*=0.4;
				}


				vertex.z*=((i%2)*2-1);
				vertex.y*=((i%2)*2-1);
				vertex.x*=((i%2)*2-1);
				
				if(i%3==2){
				vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.1);				
			addNebulaParticle(geometry2,vertex,4000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/16000+0.5,vertex.y/12000+0.5));
				} else {
					vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.1);				
					addNebulaParticle(geometry,vertex,4000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/16000+0.5,vertex.y/12000+0.5));
				}				
			}
			for ( i = 0; i < 350*(1<<lev); i ++ ) {
			var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2+0.3;
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.4,1.0);
				var color2 = new THREE.Color(1.0,0.5,0.2).setHSL (0.07,0.8,0.75);
				var color3 = new THREE.Color(0.6,0.5,0.2);
			
				vertex.x = Math.sin(phi)*vertex.z*(2800);
				vertex.y = Math.cos(phi)*vertex.z*(2800);
				
				var a = Math.cos(vertex.z*1.5+1.15);
				if(a>0)
					a=a+0.15;
				else
					a=a-0.15;
				a*=a;
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=-6200*0.8;
				vertex.z +=2600;
				vertex.z*=((i%2)*2-1);
					var len = vertex.length(); 
				
				if(i%2==0){ //large outer bluge 
					if (vertex.z > 2500 && vertex.z < 7500){
					vertex.multiplyScalar(0.5+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.05);
					addNebulaParticle(geometry3,vertex,4000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/16000+0.5,vertex.y/12000+0.5));
					vertex.z -=780; //reposition
					}

				} else{ 
					if (vertex.z < -2500 && vertex.z > -7500){
					vertex.multiplyScalar(0.5+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.05);
					addNebulaParticle(geometry3,vertex,4000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/16000+0.5,vertex.y/12000+0.5));
					vertex.z +=780; //reposition
					}
				}
				
			}	

			
		}

		

		nebula_colormap = THREE.ImageUtils.loadTexture( "catseye_colormap_cloud.png" );
		var nebulaMappedMaterial =createNebulaMappedMaterial(geometry);
		var particles = new THREE.PointCloud( geometry, nebulaMappedMaterial);
		particles.sortParticles = true;
		particles.isNebula=true;
		scene.add( particles );

		nebula_colormap = THREE.ImageUtils.loadTexture( "catseye_colormap_eye.png" );
		var nebulaMappedMaterial2 =createNebulaMappedMaterial(geometry2);
		var particles2 = new THREE.PointCloud( geometry2, nebulaMappedMaterial2);
		particles2.sortParticles = true;
		particles2.isNebula=true;
		scene.add( particles2 );

		nebula_colormap = THREE.ImageUtils.loadTexture( "catseye_colormap_shell.png" );
		var nebulaMappedMaterial3 =createNebulaMappedMaterial(geometry3);
		var particles3 = new THREE.PointCloud( geometry3, nebulaMappedMaterial3);
		particles3.sortParticles = true;
		particles3.isNebula=true;
		scene.add( particles3 );

		var geometry = new THREE.Geometry();
		geometry.colors = [];
		geometry.sizes = [];
		geometry.opacities = [];
		var nebulaMaterial =createNebulaMaterial(geometry);
		
		//custom stars
		var vertex = new THREE.Vector3();
		//addNebulaParticle(geometry,vertex,1500,1.0,new THREE.Color( 0.2,0.35,0.8 ));
		addNebulaParticle(geometry,vertex,1500,1.0,new THREE.Color( 1.0,0.75,0.5 ));
		addNebulaParticle(geometry,vertex,500,1.0,new THREE.Color( 1,1,1 ));		
		addStars(geometry);		
		
		var particles = new THREE.PointCloud( geometry, nebulaMaterial);
		particles.sortParticles = true;
		particles.isNebula=true;
		scene.add( particles );    

		var clouds = new THREE.Sprite( new THREE.SpriteMaterial( {
					map: THREE.ImageUtils.loadTexture( "cateye_clouds.jpg" ),
					blending: THREE.AdditiveBlending
				} ));
		clouds.position.set( 50, 50, 200 );		
		clouds.scale.x =17000;
		clouds.scale.y =17000;
		clouds.isNebula=true;
		scene.add(clouds);
	}
});
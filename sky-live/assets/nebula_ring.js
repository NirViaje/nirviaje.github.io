//Nebula Bliss
nebulas.push({
	name:'Ring Nebula',
	audio:'sounds/shockwave-32kb.ogg',
	audio_name:'Shock Wave',
	image_url:'https://pbs.twimg.com/media/CdcRrXqUkAA7Hf0.jpg:large',
	//image_url:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Hubble_reveals_the_Ring_Nebula%E2%80%99s_true_shape.jpg/1103px-Hubble_reveals_the_Ring_Nebula%E2%80%99s_true_shape.jpg',
	image_small:'images/thumbs/ring_nebula_small.png',
	image_desc:'M57, Hubble Space Telescope image of the Ring Nebula',
	observation:[
			{	
				key:'Distance from Earth',
				value:'2300 ly (0.7kpc)'
			},
			{	
				key:'Size',
				value:' 1.0 ly'
			},
			{	
				key:'Apparent Magnitude',
				value:'8.8'
			},
			{	
				key:'Constellation',
				value:'Lyra'
			},
		],
	description:"The Ring nebula(M57) is illuminated by a central white dwarf. It's not an abrupt explosion of materials, but a more gentle sloughing off into space. Hubble observations reveal that the nebula's shape is more complicated than astronomers thought. NASA said: \"The blue gas in the nebula's center is actually a football-shaped structure that pierces the red doughnut-shaped material. Hubble also uncovers the detailed structure of the dark, irregular knots of dense gas embedded along the inner rim of the ring. The knots look like spokes in a bicycle. The Hubble images have allowed the research team to match up the knots with the spikes of light around the bright, main ring, which are a shadow effect.\"",
	func: function (scene, lod){
		noise.seed(Math.random());
		var geometry = new THREE.Geometry();		
		geometry.colors = [];
		geometry.sizes = [];
		geometry.opacities = [];
		var geometry2 = new THREE.Geometry();
		geometry2.colors = [];
		geometry2.sizes = [];
		geometry2.opacities = [];
		var axis = new THREE.Vector3( 0, 1, 0 );
		var angle = Math.PI / 2;
		var angle270 = 3* Math.PI / 2;
			for ( i = 0; i < 15000; i ++ ) {
				var vertex = new THREE.Vector3();
				var ns =0;
				do{
					vertex.x=Math.random()*2-1;
					vertex.y=Math.random()*2-1;
					vertex.z=Math.random()*2-1;
					vertex.multiplyScalar(noise.simplex3(vertex.x*0.7,vertex.y*0.7,vertex.z*0.7)*3);
					var len = vertex.length();
					ns = len;
			
				}while(vertex.length()>1);
				vertex.setLength(3500*(len*len*0.5+1));
			
				var rgb = colorTemperatureToRGB(0);
				var color = new THREE.Color( rgb.r/256.0,rgb.g/256.0,rgb.b/256.0 );
				//addNebulaParticle(geometry,vertex,200,0.135,color);
		
			}
			for ( i = 0; i < 5000; i ++ ) {
				var vertex = new THREE.Vector3();
				var ns =0;
				do{
					vertex.x=Math.random()*2-1;
					vertex.y=Math.random()*2-1;
					vertex.z=Math.random()*2-1;
					vertex.multiplyScalar(noise.simplex3(vertex.x*0.7,vertex.y*0.7,vertex.z*0.7)*6);
					var len = vertex.length();
					ns = len;
			
				}while(vertex.length()>1);
				vertex.setLength(2400*(len*len*0.5+1));		
				var rgb = colorTemperatureToRGB(0);
				var color = new THREE.Color( rgb.r/256.0,rgb.g/256.0,rgb.b/256.0 );
				//addNebulaParticle(geometry,vertex,200,0.135,color);
		
			}
		
		
		for(var lev=0;lev<lod;lev++){
			for ( i = 0; i < 500*(1<<lev); i ++ ) {
				var vertex = new THREE.Vector3();
				var len=0;
				do{
					vertex.x=Math.random()*2-1;
					vertex.y=Math.random()*2-1;
					vertex.z=Math.random()*2-1;
					len = vertex.length();
				}while(vertex.length()>1);
				
				vertex.setLength(1050-len*100);
				vertex.z*=1.3;
				var rgb = colorTemperatureToRGB(10000);
				var color = new THREE.Color( 0,0.5,1 );
				vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.06);
				vertex.applyAxisAngle( axis, angle );	
				addNebulaParticle(geometry,vertex,2000>>lev,(lev*0.1+0.1)*0.1,color);
			}
			for ( i = 0; i < 3500*(1<<lev); i ++ ) { //outer disc
			var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2+0.3;
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.4,1.0);
				var color2 = new THREE.Color(1.0,0.1,0.1);//.setHSL (0.07,0.8,0.75);
				var color3 = new THREE.Color(0.6,0.5,0.2);
			
				vertex.x = Math.sin(phi)*vertex.z*(4500);
				vertex.y = Math.cos(phi)*vertex.z*(4500);
				
				var a = Math.cos(vertex.z*1.5+1.05);
				if(a>0)
					a=a+0.35;
				else
					a=a-0.35;
				a*=a;
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=-3200*0.68;
				vertex.z +=4600;
				vertex.z*=((i%2)*2-1);
					var len = vertex.length(); 



				if(i%2==0){ 
					if (vertex.z > 1){
						vertex.z -=200;
									vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.1);	
									vertex.applyAxisAngle( axis, angle );			
				addNebulaParticle(geometry2,vertex,4000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/16000+0.5,vertex.y/12000+0.5));
					}

				} else{ 
					if (vertex.z < -1){
						vertex.z +=200;
									vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.1);		
									vertex.applyAxisAngle( axis, angle );			
				addNebulaParticle(geometry2,vertex,4000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/16000+0.5,vertex.y/12000+0.5));
					}
				}
				
			}	

			for ( i = 0; i < 800*(1<<lev); i ++ ) { //inner disc
			var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2+0.3;
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.4,1.0);
				var color2 = new THREE.Color(1.0,0.1,0.1);//.setHSL (0.07,0.8,0.75);
				var color3 = new THREE.Color(0.6,0.5,0.2);
			
				vertex.x = Math.sin(phi)*vertex.z*(2000);
				vertex.y = Math.cos(phi)*vertex.z*(2000);
				
				var a = Math.cos(vertex.z*1.5+1.05);
				if(a>0)
					a=a+0.35;
				else
					a=a-0.35;
				a*=a;
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=-3200*0.68;
				vertex.z +=4600;
				vertex.z*=((i%2)*2-1);
					var len = vertex.length(); 



				if(i%2==0){ 
					if (vertex.z > 1){
						//vertex.z -=200;
									vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.1);	
									vertex.applyAxisAngle( axis, angle );			
				addNebulaParticle(geometry2,vertex,4000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/16000+0.5,vertex.y/12000+0.5));
					}

				} else{ 
					if (vertex.z < -1){
						//vertex.z +=200;
									vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.1);		
									vertex.applyAxisAngle( axis, angle );			
				addNebulaParticle(geometry2,vertex,4000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/16000+0.5,vertex.y/12000+0.5));
					}
				}
				
			}	
		}
		//yellow red
		for ( j = 11; j < 18; j ++ ) {
			var v=(j*1)*3;
			for ( i = 0; i < v; i ++ ) {
				var vertex = new THREE.Vector3();
				vertex.x=Math.sin(Math.PI*2*i/v)*j*100;
				vertex.y=Math.cos(Math.PI*2*i/v)*j*100;
				vertex.x+=Math.random()*60;
				vertex.y+=Math.random()*60;
				
				var rgb = colorTemperatureToRGB(4500-vertex.length()*3);
				vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.2);
				var color = new THREE.Color( 0.9*rgb.r/256.0,2*rgb.g/256.0,rgb.b/256.0 );
				vertex.applyAxisAngle( axis, angle );	
				addNebulaParticle(geometry,vertex,3000-j*50,0.3-j*0.01,color);
			}			
		}
		//green
		for ( j = 11; j < 12; j ++ ) {
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
				var color = new THREE.Color( 0.2*rgb.r/256.0,10*rgb.g/256.0,1*rgb.b/256.0 );
				vertex.applyAxisAngle( axis, angle );	//rotate 90 to map
				addNebulaParticle(geometry,vertex,3500-j*5,0.3-j*0.01,color);
			}			
		}
		//blue
		for ( j = 7; j < 8; j ++ ) {
			var v=(j*1)*3;
			for ( i = 0; i < v; i ++ ) {
				var vertex = new THREE.Vector3();
				vertex.x=Math.sin(Math.PI*2*i/v)*j*110;
				vertex.y=Math.cos(Math.PI*2*i/v)*j*100;
				vertex.x+=Math.random()*50;
				vertex.y+=Math.random()*50;
				vertex.x+=-50;

				
				//var rgb = colorTemperatureToRGB(4500-vertex.length()*3);
				//vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.1);
				//var color = new THREE.Color(0.2,0.25,1.0).setHSL (0.6,0.8,0.65); //.setHSL (0.60,0.8,0.35); //setHSL ( h, s, l ) this
				var rgb = colorTemperatureToRGB(4500-vertex.length()*3);
				var color = new THREE.Color( 0.2*rgb.r/256.0,9*rgb.g/256.0,7*rgb.b/256.0 );
				vertex.applyAxisAngle( axis, angle );	//rotate 90 to map
				addNebulaParticle(geometry,vertex,3000-j*5,0.3-j*0.01,color);
			}			
		}
		//custom stars
		var vertex = new THREE.Vector3();
		
		addNebulaParticle(geometry,vertex,500,1.0,new THREE.Color( 1,1,1 ));
		var vertex = new THREE.Vector3();
		addStars(geometry);
		
		var nebulaMaterial =createNebulaMaterial(geometry);
		var particles = new THREE.PointCloud( geometry, nebulaMaterial);	
		particles.rotation.y = 3*angle;	//rotate back 270
		particles.isNebula=true;
		scene.add( particles );	

		nebula_colormap = THREE.ImageUtils.loadTexture( "ringcloud.png" );
		var nebulaMappedMaterial2 =createNebulaMappedMaterial(geometry2);
		var particles2 = new THREE.PointCloud( geometry2, nebulaMappedMaterial2);
		particles2.rotation.y = 3*angle; //rotate back 270
		particles2.sortParticles = true;
		particles2.isNebula=true;
		scene.add( particles2 );

		/*var clouds = new THREE.Sprite( new THREE.SpriteMaterial( {
					map: THREE.ImageUtils.loadTexture( "ringcloud.png" ),
					blending: THREE.AdditiveBlending
				} ));
		clouds.position.set( 0, 0, 200 );		
		clouds.scale.x =8000;
		clouds.scale.y =8000;
		clouds.rotation.y = Math.PI * 45 / 180;
		clouds.isNebula=true;
		scene.add(clouds);*/
	}
});
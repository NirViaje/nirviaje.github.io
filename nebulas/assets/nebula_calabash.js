//Nebula Bliss
nebulas.push({
	name:'Rotten Egg Nebula',
	audio:'sounds/deepspace-32kb.ogg',
	audio_name:'Deep Space',
	image_url:'https://upload.wikimedia.org/wikipedia/commons/e/e5/Calabash_Nebula.jpg',
	image_small:'images/thumbs/rotten_egg_nebula_small.png',
	image_desc:'Hubble Space Telescope image of the Rotten Egg Nebula',
	observation:[
			{	
				key:'Distance from Earth',
				value:'4200 ly (1.3 kpc)'
			},
			{	
				key:'Size',
				value:' 0.7 ly'
			},
			{	
				key:'Apparent Magnitude',
				value:'9.47'
			},
			{	
				key:'Constellation',
				value:'Puppis'
			},
		],
	description:"The name \"Rotten Egg\" nebula is derived from it's relatively large amount of sulfur. The densest parts of the nebula are composed of material ejected recently by the central star and accelerated in opposite directions. This material, shown as yellow in the image, is zooming away at speeds up to one and a half million kilometers per hour (one million miles per hour). Most of the star's original mass is now contained in these bipolar gas structures. The bright yellow-orange colors in the picture show how dense, high-speed gas is flowing from the star, like supersonic speeding bullets ripping through a medium in opposite directions. The central star itself is hidden in the dusty band at the center.",
	func: function (scene, lod){
		
		var geometry = new THREE.Geometry();
		geometry.colors = [];
		geometry.sizes = [];
		geometry.opacities = [];
		for(var lev=0;lev<lod;lev++){
			for ( i = 0; i < 55*(1<<lev); i ++ ) { //front blue burst
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2;
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.4,1.0);
				var color2 = new THREE.Color(0,0.4,1.0);
				
				vertex.x = Math.sin(phi)*vertex.z*(1100);
				vertex.y = Math.cos(phi)*vertex.z*(1100);
				
				var a = 0.5;
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=vertex.z*200;
				vertex.z -=200;
				var color = color1.lerp(color2,-vertex.z/15000);
				vertex.z*=((i%2)*2-1);
				var len = vertex.length(); 
				vertex.setLength(475); //scale

				if(i%2>0){
					if(i%4>0) vertex.z -=1100;
					vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.003,vertex.y*0.003,vertex.z*0.003)*0.09);
					addNebulaParticle(geometry,vertex,1000>>lev,(lev*0.1+0.3)*0.2,color);
					vertex.z -=200; //reposition
				}
			}
			for ( i = 0; i < 35*(1<<lev); i ++ ) { //front yellow disc
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2;
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(1.0,0.5,0.2);
				var color2 = new THREE.Color(0.6,0.5,0.2);
			
				
				vertex.x = Math.sin(phi)*vertex.z*(1100);
				vertex.y = Math.cos(phi)*vertex.z*(1100);
				
				var a = 0.5;
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=vertex.z*200;
				vertex.z -=300;
				var color = color1.lerp(color2,-vertex.z/15000);
				vertex.z*=((i%2)*2-1);
				var len = vertex.length(); 
				vertex.setLength(155); //scale

				if(i%2>0){
					if(i%4>0) vertex.z -=1150;
					vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.003,vertex.y*0.003,vertex.z*0.003)*0.09);
					addNebulaParticle(geometry,vertex,1000>>lev,(lev*0.1+0.3)*0.2,color);
					vertex.z -=300; //reposition
				}
			}
			for ( i = 0; i < 45*(1<<lev); i ++ ) { //back blue anomaly
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2;
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.4,1.0);
				var color2 = new THREE.Color(1.0,0.5,1.0);
				
				vertex.x = Math.sin(phi)*vertex.z*(300);
				vertex.y = Math.cos(phi)*vertex.z*(350);
				
				var a = 0.9;
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=vertex.z*200;
				vertex.z -=200;
				var color = color1.lerp(color2,-vertex.z/15000);
				vertex.z*=((i%2)*2-1);
				var len = vertex.length(); 
				vertex.setLength(355); //scale

				if(i%2==0){
					if(i%2>0) vertex.z +=600;
					vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.003,vertex.y*0.003,vertex.z*0.003)*0.09);
					addNebulaParticle(geometry,vertex,1000>>lev,(lev*0.1+0.3)*0.2,color);
					vertex.z +=4500; //reposition
				}
			}
			
			for ( i = 0; i < 500*(1<<lev); i ++ ) {
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2+0.75;
				vertex.z+=Math.abs(Math.sin(1.0/(1.5-vertex.z))*0.3);
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.5,0.65);
				var color2 = new THREE.Color(0.5,0.25,1.0);
				
				vertex.x = Math.sin(phi)*vertex.z*(1000);
				vertex.y = Math.cos(phi)*vertex.z*(1000);
				var z=1;//Math.random();
				z=Math.sqrt(z);
				vertex.x*=Math.cos(vertex.z+1);
				vertex.y*=Math.cos(vertex.z+1);
				vertex.z *=vertex.z*2500*(Math.pow(z,0.25))*Math.cos(vertex.z);
				vertex.z -=1000;
				var color = color1.lerp(color2,0.5+vertex.z/10000);
				vertex.z*=((i%2)*2-1);
				vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.1);
			}
			for ( i = 0; i < 500*(1<<lev); i ++ ) { //large burst 
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2+0.3;
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.4,1.0);
				var color2 = new THREE.Color(1.0,0.5,0.2);
				var color3 = new THREE.Color(0.6,0.5,0.2);
			
				vertex.x = Math.sin(phi)*vertex.z*(1000);
				vertex.y = Math.cos(phi)*vertex.z*(1000);
				
				var a = Math.cos(vertex.z*1.5+1.15);
				if(a>0)
					a=a+0.3;
				else
					a=a-0.3;
				a*=a;
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=-6000*0.8;
				vertex.z +=2600;
				vertex.z*=((i%2)*2-1);
				
				if(i%2==0){ //large outer burst 
					vertex.multiplyScalar(0.5+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.05);
					addNebulaParticle(geometry,vertex,1000>>lev,(lev*0.1+0.3)*0.2,color1);
				}
				else{ //large inner burst 
					var color = color2.lerp(color3,0.5+vertex.z/10000);
					vertex.z*=-0.65;
					vertex.y*=0.7*Math.random();
					vertex.x*=0.7*Math.random();
					var noise1 =noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001);
					vertex.multiplyScalar(1+noise1*0.1);
					vertex.x*=1+noise1*1.1;
					vertex.y*=1+noise1*1.1;
					vertex.z*=1+noise1*1.1;
					vertex.multiplyScalar(0.5+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.2);	
					addNebulaParticle(geometry,vertex,2000>>lev,(lev*0.1+0.3)*0.2,color);					
				}
			}
			for ( i = 0; i < 250*(1<<lev); i ++ ) { //small outer burst 2
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2+1.035;
				vertex.z+=Math.abs(Math.sin(0+1.0/(1.5-vertex.z))*0.3);
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.4,1.0);
				var color2 = new THREE.Color(1.0,0.5,0.0);
				
				vertex.x = Math.sin(phi)*vertex.z*(900);
				vertex.y = Math.cos(phi)*vertex.z*(900);
				var a = Math.cos(vertex.z*0.85+1.15);
				a*=0.37;
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=vertex.z*300*Math.cos(vertex.z)*0.8;
				var color = color1.lerp(color2,-vertex.z/15000);
				vertex.z*=((i%2)*2-1);
				var len = vertex.length(); 
				//vertex.setLength(2555); //scale
				if(i%2){ 
					vertex.multiplyScalar(0.5+noise.simplex3(vertex.x*0.009,vertex.y*0.009,vertex.z*0.015)*0.115);
					color = color1.lerp(color2,1+vertex.z*0.0006);
					addNebulaParticle(geometry,vertex,1000>>lev,(lev*0.1+0.3)*0.2,color1);
				}
					vertex.z -=120; //reposition
			}
			for ( i = 0; i < 150*(1<<lev); i ++ ) { //small inner burst 2
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2+1.035;
				vertex.z+=Math.abs(Math.sin(0+1.0/(1.5-vertex.z))*0.3);
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.4,1.0);
				var color2 = new THREE.Color(1.0,0.7,0.3);
				
				vertex.x = Math.sin(phi)*vertex.z*(900);
				vertex.y = Math.cos(phi)*vertex.z*(900);
				var a = Math.cos(vertex.z*0.85+1.15);
				a*=0.23;
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=vertex.z*200*Math.cos(vertex.z)*0.8;
				var color = color1.lerp(color2,-vertex.z/15000);
				vertex.z*=((i%2)*2-1);
				var len = vertex.length(); 
				//vertex.setLength(2555); //scale
				if(i%2){ 
					vertex.multiplyScalar(0.5+noise.simplex3(vertex.x*0.009,vertex.y*0.009,vertex.z*0.015)*0.115);
					color = color1.lerp(color2,1+vertex.z*0.0006);
					addNebulaParticle(geometry,vertex,1000>>lev,(lev*0.1+0.3)*0.2,color1);
				}
					vertex.z -=170; //reposition
			}
			for ( i = 0; i < 50*(1<<lev); i ++ ) { //small outer burst 2 debris
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2+3.035;
				vertex.z+=Math.abs(Math.sin(0+1.0/(1.5-vertex.z))*0.3);
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.4,1.0);
				var color2 = new THREE.Color(1.0,0.5,0.0);
				
				vertex.x = Math.sin(phi)*vertex.z*(2900);
				vertex.y = Math.cos(phi)*vertex.z*(2900);
				var a = Math.cos(vertex.z*0.85+1.15);
				a*=0.77;
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=vertex.z*300*Math.cos(vertex.z)*0.8;
				var color = color1.lerp(color2,-vertex.z/15000);
				vertex.z*=((i%2)*2-1);
				var len = vertex.length(); 
				vertex.setLength(455); //scale
			
					vertex.multiplyScalar(0.5+noise.simplex3(vertex.x*0.009,vertex.y*0.009,vertex.z*0.015)*1.115);
					color = color1.lerp(color2,1+vertex.z*0.0006);
					addNebulaParticle(geometry,vertex,1000>>lev,(lev*0.1+0.3)*0.2,color1);
					
			}
			for ( i = 0; i < 150*(1<<lev); i ++ ) { //small burst
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) *1.5;
				vertex.z+=0;//Math.abs(Math.sin(0+1.0/(1.5-vertex.z))*0.3);
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.4,1.0);
				var color2 = new THREE.Color(1.0,0.5,0.2);
				
				vertex.x = Math.sin(phi)*vertex.z*(1000);
				vertex.y = Math.cos(phi)*vertex.z*(1000);
				
				var a = Math.cos(vertex.z*1.0);
				a*=a;
				a*=1.5;
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=vertex.z*1500;
				vertex.z -=3000;
				var color = color1;
				vertex.z*=((i%2)*2-1);
				if(i%2){ //small outer burst
					//vertex.multiplyScalar(0.5+noise.simplex3(vertex.x*0.009,vertex.y*0.009,vertex.z*0.015)*0.115);
					//color = color1.lerp(color2,1+vertex.z*0.0006);
					//addNebulaParticle(geometry,vertex,1000>>lev,(lev*0.1+0.3)*0.2,color1);
				}else{ //small inner burst
					vertex.z*=-1.4;
					
					vertex.z=-Math.sqrt(-vertex.z)*50;
					vertex.y*=0.9*Math.random();
					vertex.x*=0.9*Math.random();
					var noise1 =noise.simplex3(vertex.x*0.6,vertex.y*0.6,vertex.z*9.6);
					vertex.multiplyScalar(0.5+noise1*0.1);
					vertex.x*=1+noise1*1.1;
					vertex.y*=1+noise1*1.1;
					
					addNebulaParticle(geometry,vertex,1000>>lev,(lev*0.1+0.3)*0.2,color2);
				}
			}
		}
		
		//custom stars
		var vertex = new THREE.Vector3();
		
		addNebulaParticle(geometry,vertex,1500,1.0,new THREE.Color( 0.5,0.75,1 ));
		addNebulaParticle(geometry,vertex,500,1.0,new THREE.Color( 1,1,1 ));
		
		addStars(geometry);
		
		var nebulaMaterial =createNebulaMaterial(geometry);
				
		var particles = new THREE.PointCloud( geometry, nebulaMaterial);
		particles.sortParticles = true;
		particles.isNebula=true;
		scene.add( particles );

		var clouds = new THREE.Sprite( new THREE.SpriteMaterial( {
					map: THREE.ImageUtils.loadTexture( "rotteneggcloud.png" ),
					blending: THREE.AdditiveBlending
				} ));
		clouds.position.set( 0, 0, 0 );		
		clouds.scale.x =2500;
		clouds.scale.y =2500;
		clouds.isNebula=true;
		scene.add(clouds);
	}
});
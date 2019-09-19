//Nebula Bliss
nebulas.push({
	name:'Butterfly Nebula',
	audio:'sounds/butterfly_dreams_32kb.ogg',
	audio_name:'Butterfly Dreams',
	image_url:'https://upload.wikimedia.org/wikipedia/commons/e/e6/The_Twin_Jet_Nebula.jpg',
	image_small:'images/thumbs/butterfly_nebula_small.png',
	image_desc:'Hubble Space Telescope image of the Minkowsky Nebula',
	observation:[
			{	
				key:'Distance from Earth',
				value:'8.00 kly (2.5kpc)'
			},
			{	
				key:'Size',
				value:' 0.6 ly'
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
	description:"Butterfly Nebula (also known as Minkowsky Nebula and Twin Jet Nebula) is a planetary nebula. The glowing and expanding shells of gas clearly visible in this image represent the final stages of life for an old star of low to intermediate mass. The star has not only ejected its outer layers, but the exposed remnant core is now illuminating these layers resulting in a spectacular light show like the one seen here. However, the Twin Jet Nebula is not just any planetary nebula, it is a bipolar nebula. Ordinary planetary nebulae have one star at their centre, bipolar nebulae have two, in a binary star system. Astronomers have found that the two stars in this pair each have around the same mass as the Sun. See if you can spot the 2nd star.",
	func: function (scene, lod){
	
		var geometry = new THREE.Geometry();
		geometry.colors = [];
		geometry.sizes = [];
		geometry.opacities = [];

		var geometry2 = new THREE.Geometry();
		geometry2.colors = [];
		geometry2.sizes = [];
		geometry2.opacities = [];
		for(var lev=0;lev<lod;lev++){
			
			for ( i = 0; i < 350*(1<<lev); i ++ ) { //outer burst
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2+1.25;
				vertex.z+=Math.abs(Math.sin(0.3/(1.0-vertex.z))*0.3);
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0.0,0.9,0.65).setHSL (0.07,0.8,0.75);
				var color2 = new THREE.Color(0.0,0.9,0.3);
				
				vertex.x = Math.sin(phi)*vertex.z*(700);
				vertex.y = Math.cos(phi)*vertex.z*(700);
				vertex.x*=Math.cos(vertex.z+1);
				vertex.y*=Math.cos(vertex.z+1);
				vertex.z *=vertex.z*650*Math.cos(vertex.z);
				var color = color1.lerp(color2,0.5+vertex.z/10000);
				vertex.z*=((i%2)*2-1);
				if(i%2==0){ //large outer bluge 
					if (vertex.z < 5200){
						//vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.003,vertex.y*0.003,vertex.z*0.003)*0.05);
						//addNebulaParticle(geometry2,vertex,3000>>lev,(lev*0.1+0.3)*0.2,color);
						vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.002,vertex.y*0.002,vertex.z*0.002)*0.05);
						addNebulaParticle(geometry,vertex,3500>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/14000+0.5,vertex.y/6000+0.5));
			
					}

				} else{ 
					if (vertex.z > -5200){
						//vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.003,vertex.y*0.003,vertex.z*0.003)*0.05);
						//addNebulaParticle(geometry2,vertex,3000>>lev,(lev*0.1+0.3)*0.2,color);
						vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.002,vertex.y*0.002,vertex.z*0.002)*0.05);
						addNebulaParticle(geometry,vertex,3500>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/14000+0.5,vertex.y/6000+0.5));
			
					}	
				}
			}
			for ( i = 0; i < 500*(1<<lev); i ++ ) { //inner burst section 1
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2+1.075;
				vertex.z+=Math.abs(Math.sin(0+1.0/(0.5-vertex.z))*0.3);
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.5,0.65);
				var color2 = new THREE.Color(1.0,0.5,0.0);
				
				vertex.x = Math.sin(phi)*vertex.z*(800);
				vertex.y = Math.cos(phi)*vertex.z*(800);
				var a = Math.cos(vertex.z*0.85+1.15);
				a*=0.5;
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=vertex.z*950*Math.cos(vertex.z)*0.8;
				var color = color1.lerp(color2,-vertex.z/15000);
				vertex.z*=((i%2)*2-1);

				if(i%2==0){ 
					if (vertex.z > 300 && vertex.z < 980){
									vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.002,vertex.y*0.002,vertex.z*0.002)*0.05);
				addNebulaParticle(geometry,vertex,4000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/14000+0.5,vertex.y/6000+0.5));
					}

				} else{ 
					if (vertex.z < -300 && vertex.z > -980){
									vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.002,vertex.y*0.002,vertex.z*0.002)*0.05);
				addNebulaParticle(geometry,vertex,4000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/14000+0.5,vertex.y/6000+0.5));
					}
				}

			}
			for ( i = 0; i < 450*(1<<lev); i ++ ) { // inner burst sec 2
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2+1.25;
				vertex.z+=Math.abs(Math.sin(0.3/(1.0-vertex.z))*0.3);
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0.0,0.9,0.65).setHSL (0.07,0.8,0.75);
				var color2 = new THREE.Color(0.0,0.9,0.3);
				
				vertex.x = Math.sin(phi)*vertex.z*(400);
				vertex.y = Math.cos(phi)*vertex.z*(400);
				vertex.x*=Math.cos(vertex.z+1);
				vertex.y*=Math.cos(vertex.z+1);
				vertex.z *=vertex.z*650*Math.cos(vertex.z);
				var color = color1.lerp(color2,0.5+vertex.z/10000);
				vertex.z*=((i%2)*2-1);
				if(i%2==0){ 
					if (vertex.z < 1200){
				vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.002,vertex.y*0.002,vertex.z*0.002)*0.05);				
				addNebulaParticle(geometry,vertex,3000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/14000+0.5,vertex.y/6000+0.5));
				//vertex.z -=980; //reposition
					}

				} else{ 
					if (vertex.z > -1200){
				vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.002,vertex.y*0.002,vertex.z*0.002)*0.05);				
				addNebulaParticle(geometry,vertex,3000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/14000+0.5,vertex.y/6000+0.5));
				//vertex.z +=980; //reposition
					}
				}
			}
			for ( i = 0; i < 500*(1<<lev); i ++ ) { //inner burst section 3
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2+1.075;
				vertex.z+=Math.abs(Math.sin(0+1.0/(0.5-vertex.z))*0.3);
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.5,0.65);
				var color2 = new THREE.Color(1.0,0.5,0.0);
				
				vertex.x = Math.sin(phi)*vertex.z*(1000);
				vertex.y = Math.cos(phi)*vertex.z*(1000);
				var a = Math.cos(vertex.z*0.85+1.15);
				a*=0.55;
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=vertex.z*950*Math.cos(vertex.z)*0.8;
				var color = color1.lerp(color2,-vertex.z/15000);
				vertex.z*=((i%2)*2-1);

				if(i%2==0){ 
					if (vertex.z > 400 && vertex.z < 980){
									vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.002,vertex.y*0.002,vertex.z*0.002)*0.05);
				addNebulaParticle(geometry,vertex,4000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/14000+0.5,vertex.y/6000+0.5));
				vertex.z +=400; //reposition
					}

				} else{ 
					if (vertex.z < -400 && vertex.z > -980){
									vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.002,vertex.y*0.002,vertex.z*0.002)*0.05);
				addNebulaParticle(geometry,vertex,4000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/14000+0.5,vertex.y/6000+0.5));
				vertex.z -=400; //reposition
					}
				}

			}

			for ( i = 0; i < 750*(1<<lev); i ++ ) { //inner burst
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2+1.075;
				vertex.z+=Math.abs(Math.sin(0+1.0/(0.5-vertex.z))*0.3);
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.5,0.65);
				var color2 = new THREE.Color(1.0,0.5,0.0);
				
				vertex.x = Math.sin(phi)*vertex.z*(1000);
				vertex.y = Math.cos(phi)*vertex.z*(1000);
				var a = Math.cos(vertex.z*0.85+1.15);
				a*=0.5;
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=vertex.z*950*Math.cos(vertex.z)*0.8;
				var color = color1.lerp(color2,-vertex.z/15000);
				vertex.z*=((i%2)*2-1);

				if(i%2==0){ 
					if (vertex.z > 1300){
									vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.002,vertex.y*0.002,vertex.z*0.002)*0.05);
				addNebulaParticle(geometry,vertex,4000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/14000+0.5,vertex.y/6000+0.5));
					}

				} else{ 
					if (vertex.z < -1300){
									vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.002,vertex.y*0.002,vertex.z*0.002)*0.05);
				addNebulaParticle(geometry,vertex,4000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/14000+0.5,vertex.y/6000+0.5));
					}
				}

			}
			
			for ( i = 0; i < 250*(1<<lev); i ++ ) { //close small inner burst
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2+0.075;
				vertex.z+=Math.abs(Math.sin(0+1.0/(0.5-vertex.z))*0.3);

				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.5,0.65);
				var color2 = new THREE.Color(1.0,0.5,0.0);
				
				vertex.x = Math.sin(phi)*vertex.z*(1700); 
				vertex.y = Math.cos(phi)*vertex.z*(1700);
				var a = Math.cos(vertex.z*0.85+1.15);
				a*=0.21; //diameter
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=vertex.z*200*Math.cos(vertex.z)*0.8;
				var color = color1.lerp(color2,-vertex.z/15000);
				vertex.z*=-((i%2)*2-1);
				if(i%2==0){ 
					if (vertex.z < 20){
				vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.002,vertex.y*0.002,vertex.z*0.002)*0.05);				
				addNebulaParticle(geometry,vertex,1000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/14000+0.5,vertex.y/6000+0.5));
					}

				} else{ 
					if (vertex.z > -20){
				vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.002,vertex.y*0.002,vertex.z*0.002)*0.05);				
				addNebulaParticle(geometry,vertex,1000>>lev,(lev*0.1+0.3)*0.2,new THREE.Vector2(vertex.z/14000+0.5,vertex.y/6000+0.5));
					}
				}
			}
			for ( i = 0; i < 155*(1<<lev); i ++ ) { //small inner burst
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2;
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.5,0.65);
				var color2 = new THREE.Color(1.0,0.5,0.0);
				
				vertex.x = Math.sin(phi)*vertex.z*(1100);
				vertex.y = Math.cos(phi)*vertex.z*(1100);
				
				var a = 0.5;
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=vertex.z*400;
				vertex.z -=4000;
				var color = color1.lerp(color2,-vertex.z/15000);
				vertex.z*=((i%2)*2-1);
				vertex.multiplyScalar(1+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.07);
				addNebulaParticle(geometry,vertex,4000>>lev,(lev*0.1+0.3)*0.1,new THREE.Vector2(vertex.z/14000+0.5,vertex.y/6000+0.5));
			}
		}
					
		nebula_colormap = THREE.ImageUtils.loadTexture( "minkowski2_colormap.png" );
		var nebulaMappedMaterial =createNebulaMappedMaterial(geometry);
		var particles = new THREE.PointCloud( geometry, nebulaMappedMaterial);
		particles.sortParticles = true;
		particles.isNebula=true;
		scene.add( particles );


		var geometry = new THREE.Geometry();
		geometry.colors = [];
		geometry.sizes = [];
		geometry.opacities = [];
		var nebulaMaterial =createNebulaMaterial(geometry);
		
		//custom stars
		var vertex = new THREE.Vector3();
		addNebulaParticle(geometry,vertex,1500,1.0,new THREE.Color( 1.0,0.75,0.5 ));
		addNebulaParticle(geometry,vertex,500,1.0,new THREE.Color( 1,1,1 ));		
		addStars(geometry);	

		var vertex2 = new THREE.Vector3();
				vertex2.x=5000;
				vertex2.y=1000;
				vertex2.z=-1000;
		addNebulaParticle(geometry,vertex2,1200,1.0,new THREE.Color( 1.0,0.75,0.5 ));
		addNebulaParticle(geometry,vertex2,400,1.0,new THREE.Color( 1,1,1 ));		
		addStars(geometry);	

		var particles = new THREE.PointCloud( geometry, nebulaMaterial);
		particles.sortParticles = true;
		particles.isNebula=true;
		scene.add( particles );

		var starglare = new THREE.Sprite( new THREE.SpriteMaterial( {
					map: THREE.ImageUtils.loadTexture( "starglow.png" ),
					blending: THREE.AdditiveBlending
				} ));
		starglare.position.set( 5000, 1000, -1000 );		
		starglare.scale.x =700;
		starglare.scale.y =700;
		starglare.isNebula=true;
		scene.add(starglare);
	}

 
});


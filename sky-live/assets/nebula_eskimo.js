//Nebula Bliss
nebulas.push({
	name:'Eskimo Nebula',
	audio:'sounds/nebularbliss-32kb.ogg',
	audio_name:'Nebular Bliss',
	image_url:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Ngc2392.jpg/768px-Ngc2392.jpg',
	image_small:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Ngc2392.jpg/768px-Ngc2392.jpg',
	image_desc:'Hubble Space Telescope image of the Eskimo Nebula',
	observation:[
			{	
				key:'Distance from Earth',
				value:'>2870 ly (0.8 kpc)'
			},
			{	
				key:'Size',
				value:' >0.34 ly'
			},
			{	
				key:'Apparent Magnitude',
				value:'10.1'
			},
			{	
				key:'Constellation',
				value:'Gemini'
			},
		],
	description:"Looking like a small face framed by a fur-lined hood, this is the breathtakingly beautiful Eskimo Nebula. You can also see why people call it the Clownface Nebula. This is an intricate structure of shells and streamers of gas which surround a dying Sun-like star. The disc of material is embellished with a ring of comet-shaped objects, their tails streaming away from the central dying star. The planetary nebula began to form about 10 000 years ago, when the star started to expel an intense, high-speed 'wind' of material out into space. The central star will eventually collapse and become a white dwarf.",
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
			var step=0.1/(1<<lev);
			for(i=0;i<1700<<lev;i+=1)
			{
				var vertex = new THREE.Vector3();
				var x=Math.random();
				var y=Math.random();
				
				vertex.x= x*2-1;
				vertex.y= y*2-1;
				if(vertex.x*vertex.x+vertex.y*vertex.y>1){
					i--;
					continue;
				}
				
				var z = Math.random()*2;
			
				vertex.x*=z;
				vertex.y*=z;

				vertex.z = 0.8/(50*z*z+1);
				var explode = vertex.z-1;
				explode*=explode;
				explode=1/(explode+0.1)
				vertex.x*=(1+explode);
				vertex.y*=(1+explode);
				var op = vertex.length();
				if(op>1)
					op=1;
				vertex.multiplyScalar(2000);
				vertex.z*=2*(i%2)-1;
				addNebulaParticle(geometry,vertex,2000>>lev,((lev*0.3+0.3)*0.2+0.2)*op,new THREE.Vector2(vertex.x/4000+0.5,vertex.y/4000+0.5));
			}	
			for ( i = 0; i < 250*(1<<lev); i ++ ) {
			var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2+0.3;
				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.4,1.0);
				var color2 = new THREE.Color(1.0,0.5,0.2).setHSL (0.07,0.8,0.75);
				var color3 = new THREE.Color(0.6,0.5,0.2);
			
				vertex.x = Math.sin(phi)*vertex.z*(1000);
				vertex.y = Math.cos(phi)*vertex.z*(1000);
				
				var a = Math.cos(vertex.z*1.5+1.15);
				if(a>0)
					a=a+0.15;
				else
					a=a-0.15;
				a*=a;
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=-3200*0.8;
				vertex.z +=2600;
				vertex.z*=((i%2)*2-1);
					var len = vertex.length(); 
				
				if(i%2==0){ //large outer bluge 
					if (vertex.z > 200){
					vertex.multiplyScalar(0.5+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.05);
					addNebulaParticle(geometry2,vertex,1000>>lev,(lev*0.1+0.3)*0.2,color2);
					}

				} else{ 
					if (vertex.z < -200){
					vertex.multiplyScalar(0.5+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.05);
					addNebulaParticle(geometry2,vertex,1000>>lev,(lev*0.1+0.3)*0.2,color2);
					}
				}
				
			}	

			for ( i = 0; i < 70*(1<<lev); i ++ ) { //small inner burst
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
				a*=0.27;
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=vertex.z*300*Math.cos(vertex.z)*0.8;
				var color = color2.lerp(color2,-vertex.z/15000);
				vertex.z*=((i%2)*2-1);
				var len = vertex.length(); 
				//vertex.setLength(2555); //scale
				if(i%2){ 
					vertex.multiplyScalar(0.5+noise.simplex3(vertex.x*0.009,vertex.y*0.009,vertex.z*0.015)*0.115);
					//color = color1.lerp(color2,1+vertex.z*0.0006);
					addNebulaParticle(geometry2,vertex,1000>>lev,(lev*0.1+0.3)*0.2,color);
				} else {vertex.multiplyScalar(0.5+noise.simplex3(vertex.x*0.009,vertex.y*0.009,vertex.z*0.015)*0.115);
					//color = color1.lerp(color2,1+vertex.z*0.0006);
					addNebulaParticle(geometry2,vertex,1000>>lev,(lev*0.1+0.3)*0.2,color);}
					
			}	

			for ( i = 0; i < 20*(1<<lev); i ++ ) { //close small inner burst
				var vertex = new THREE.Vector3();
				var phi=Math.random()*Math.PI*2;
				vertex.z = Math.sqrt(Math.random()) * 2+0.075;
				vertex.z+=Math.abs(Math.sin(0+1.0/(0.5-vertex.z))*0.3);

				var rgb = colorTemperatureToRGB(30000+1000/(vertex.z-0.5));
				var color1 = new THREE.Color(0,0.5,0.65);
				var color2 = new THREE.Color(1.0,0.5,0.2).setHSL (0.07,0.8,0.75);
				
				vertex.x = Math.sin(phi)*vertex.z*(3500); 
				vertex.y = Math.cos(phi)*vertex.z*(3500);
				var a = Math.cos(vertex.z*0.85+1.15);
				a*=0.21; //diameter
				vertex.x*=a;
				vertex.y*=a;
				vertex.z *=vertex.z*200*Math.cos(vertex.z)*0.8;
				var color = color1.lerp(color2,-vertex.z/15000);
				vertex.z*=-((i%2)*2-1);
				if(i%2==0){ 
					if (vertex.z < 200){
					vertex.multiplyScalar(0.5+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.05);
					addNebulaParticle(geometry2,vertex,1000>>lev,(lev*0.1+0.3)*0.2,color2);
					}

				} else{ 
					if (vertex.z > -200){
					vertex.multiplyScalar(0.5+noise.simplex3(vertex.x*0.001,vertex.y*0.001,vertex.z*0.001)*0.05);
					addNebulaParticle(geometry2,vertex,1000>>lev,(lev*0.1+0.3)*0.2,color2);
					}
				}
			}
		}

		
		nebula_colormap = THREE.ImageUtils.loadTexture( "eskimo4_colormap2.png" );
		var nebulaMappedMaterial =createNebulaMappedMaterial(geometry);
				
		var particles = new THREE.PointCloud( geometry, nebulaMappedMaterial);
		particles.sortParticles = true;
		particles.isNebula=true;
		scene.add( particles );
		
		var nebulaMaterial =createNebulaMaterial(geometry2);
		var particles2 = new THREE.PointCloud( geometry2, nebulaMaterial);
		particles2.sortParticles = true;
		particles2.isNebula=true;
		scene.add( particles2 );

		var geometry = new THREE.Geometry();
		geometry.colors = [];
		geometry.sizes = [];
		geometry.opacities = [];
		var nebulaMaterial =createNebulaMaterial(geometry);
		
		//custom stars
		var vertex = new THREE.Vector3();
		
		
		addNebulaParticle(geometry,vertex,2500,1.0,new THREE.Color( 1.0,0.75,0.5 ));
		addNebulaParticle(geometry,vertex,500,1.0,new THREE.Color( 1,1,1 ));
		
		addStars(geometry);		
		var particles = new THREE.PointCloud( geometry, nebulaMaterial);
		particles.sortParticles = true;
		particles.isNebula=true;
		scene.add( particles );
	}
});
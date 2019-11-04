#define PI 3.1415926535
//897932384626433832795
#define EX 2.7182818284

float blackBodySpectralDensity(float lambda, float T) {
    
	float h = 6.626E-34;// J·s   [Planck's constant]
	float k = 1.381E-23;// J·K-1   [Boltzmann's constant]
	float c = 3.0E8;// m·s-1   [speed of light]
    //U(λ,T) = 8πhcλ^-5 /  ( e^hc/λkT-1 )
    return 8.0*PI*h*c/(pow(lambda, 5.0)*(exp(h*c/(lambda*k*T))-1.0));
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;
    vec2 iUV = iMouse.xy/iResolution.xy;
	
	//get the colour
	float xCol = uv.x*2.0;//(uv.x - (iTime / 8.0)) * 3.0;
	xCol = mod(xCol, 3.0);
    
    float lambda = (2.0 - uv.x)*400E-9;	//λ \belongto 400~800nm, is the wavelength, in metres
    float T = iUV.x*10000.0+1900.0;	//K  is the temperature in Kelvin (add 273 degrees to Celcius temperatures to get Kelvin)
    float BBSpectralDensity = blackBodySpectralDensity(lambda, T);
    
    float lambda_max = 2.897771955185172E-3/T;	//Wien's displacement law
    float spectralDensity_max = blackBodySpectralDensity(lambda_max, T);
    float densityRatio = BBSpectralDensity/spectralDensity_max;
    
    //texture(iChannel0, coord).rgb;
    
	vec3 horColour = vec3(1.0, 0.0, 0.0);
    if(uv.y > densityRatio) {
        horColour = 2.*normalize(vec3(blackBodySpectralDensity(700.0E-9, T), 
                         blackBodySpectralDensity(546.1E-9, T), 
                         blackBodySpectralDensity(435.8E-9, T)));
    }
    else {
		horColour = vec3(0.25, 0.25, 0.25);
        if (xCol < 1.0) {

            horColour.r += 1.0 - xCol;
            horColour.g += xCol;
        }
        else if (xCol < 2.0) {

            xCol -= 1.0;
            horColour.g += 1.0 - xCol;
            horColour.b += xCol;
        }
        else {

            xCol -= 2.0;
            horColour.b += 1.0 - xCol;
            horColour.r += xCol;
        }
    }
    
	//background lines
	//float backValue = 1.0;
	//float aspect = iResolution.x / iResolution.y;
	//if (mod(uv.y * 100.0, 1.0) > 0.75 || mod(uv.x * 100.0 * aspect, 1.0) > 0.75) {
		
	//	backValue = 1.15;	
	//}
	
	vec3 backLines  = vec3(1.0);//vec3(backValue);
	
    
	//main beam
	uv = (2.0 * uv) - 1.0;
	float beamWidth = abs(3.0 / (10.0)*5.0);// * uv.y));
	vec3 horBeam = vec3(beamWidth);	//(backLines * horBeam) * 
    
	//fragColor = vec4((horColour*densityRatio), 1.0);
    fragColor = vec4(((backLines * horBeam) * horColour*densityRatio), 1.0);
}
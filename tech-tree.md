<style>
.top {
    position:absolute;
    left:0; right:0;
    height: 62px;
}
.left {
    position:absolute;
    left:10; top:142px; bottom: 0;
    width: 340px;
    /* background: red; */
}
.main {
    position: absolute;
    left:340px; top:142px;
    right:0; bottom:0;
    /* background: yellow; */

}
.right {
    position:absolute;
    top:50px; bottom: 0;
    left:560px;
    /* width: 782px; */
    /* background: red; */
}
</style>

<!-- 
/* Begin Contact Form CSS */
.contactform {
position: static;
overflow: hidden;
}

.contactleft {
width: 25%;
text-align: right;
clear: both;
float: left;
display: inline;
padding: 4px;
margin: 5px 0;
}

.contactright {
width: 70%;
text-align: left;
float: right;
display: inline;
padding: 4px;
margin: 5px 0;
}

.contacterror {
border: 1px solid #ff0000;
}
/* End Contact Form CSS */

</style> -->

<script type="text/javascript">

/***********************************************
* Textarea Maxlength script- � Dynamic Drive (www.dynamicdrive.com)
* This notice must stay intact for legal use.
* Visit http://www.dynamicdrive.com/ for full source code
***********************************************/

function ismaxlength(obj){
var mlength=obj.getAttribute? parseInt(obj.getAttribute("maxlength")) : ""
if (obj.getAttribute && obj.value.length>mlength)
obj.value=obj.value.substring(0,mlength)
}

</script>

<!-- <body class="orange hid_6"> -->

<!-- <div id="wrapper"> -->

## Basic constants
* Solar constant: 1.362 kW/m² @1AU
* 1AU = 1.49597871E8 km
* Moon-Earth Distance (LD): 3.84400E5 km


<div class="left">

## Calculator

1. Target asteroid #3
    * character
        * orbit
        * physical property
        * composition
    * Observatory
        * optical
            * images
            * color wheel
            * spectrum
        * radar
    * Probe constellation/Vehicle
        * Density in space
        * communication link
        * mass/propulsion
            * power supply
            * load
                * attitude
                * instrument
            * propulsion
                * specific impulse
                * Total impulse
2. solar furnace #5
    * stationary
    * on orbit
    * calc
        * size
        * effective area
            * full power
        * focal distance
        * focus spot
            * focus spot size
            * power desity
        * mechanic
            * mass
            * construction speed
                * accuracy in need
            * on orbit
                * weight
            * stationary
                * track speed
3. smelting in field #6
    * power desity
    * reflect ratio
    * Molten pool productivity
        * pour out rate
4. zone melting #6
    * size of raw material
    * power desity
    * speed
    * total time
    * productivity
5. Magnetic work shield #4
    * Magnetic tower
    * Magnetic torquer of work station
6. Electromagnetic momentum management system
    * fix position for furnace
    * positioning for robots
    * Electromagnetic launch system for work station
7. Exponential growth
    * productivity per set
    * productivity of solar furnace
    * robots duty #7
    * further construction, cabin etc
    * one shot for whole
    * orbital transfer for C-type
8. Orgnization
    * Time frame #20
    * Initial base package (IBP) and supplement #13
    * Resource in need

</div>

<div id="header" class="main">
<!-- eds solar furnace-->
<!-- Inputs -->
<P><STRONG>Solar Furnace Calculator:<BR>
</STRONG>
<TABLE id="Table1" cellSpacing="1" cellPadding="1" width="300" bgColor="#ffffcc" border="1">
    <TR>
        <TD>Distance</TD>
        <TD><INPUT id="evaluDistance" onkeyup="furnace_calc()" type="text" size="5" value="1" name="evaluDistance"> </TD>
        <TD>AU
        <!-- id = distUnits -->
        <!-- <SELECT id="distanUnit" onchange="distance_unit()" name="distanUnit">
                <OPTION value="1" selected>AU</OPTION>
                <OPTION value="3.84400E5">LD</OPTION>
                <OPTION value="1.49597871E8">km</OPTION>
            </SELECT> -->
        </TD>
        <TD bgColor="#ccffcc">Solar Power Density</TD>
        <TD><INPUT id="solarPowerDensity" onkeyup="furnace_calc()" type="text" size="8" value="1362" name="solarPowerDensity"></TD>
        <TD>W/m²</TD>
    </TR>
    <TR>
        <TD bgColor="#ffccaa">Equivalent size/Actual diameter</TD>
        <TD><INPUT id="twText1" onkeyup="tw_calc()" type="text" size="8" value="50" name="furnaceSize"></TD>
        <TD>m</TD>
        <TD bgColor="#ccffcc">Effective area</TD>
        <TD><INPUT id="effectArea" onkeyup="tw_calc()" type="text" size="8" value="1.362" name="effectArea"></TD>
        <TD>m sq</TD>
    </TR>
    <TR>
        <TD bgColor="#ffccaa">Efficency</TD>
        <TD><INPUT id="furnaceEfficency" onkeyup="tw_calc()" type="text" size="8" value="90" name="furnaceEfficency"></TD>
        <TD>%</TD>
        <TD bgColor="#ccffcc">Full Power</TD>
        <TD><INPUT id="fullPower" onkeyup="tw_calc()" type="text" size="8" value="1.362" name="fullPower"></TD>
        <TD>kW</TD>
    </TR>
    <TR>
        <TD bgColor="#ffccaa">Focus Distance</TD>
        <TD><INPUT id="focusDistance" onkeyup="tw_calc()" type="text" size="8" value="100" name="focusDistance"></TD>
        <TD>m</TD>
        <TD bgColor="#ccffcc">Focus Spot Size</TD>
        <TD><INPUT id="twText3" onkeyup="tw_calc()" type="text" size="8" value="2" name="twText3"></TD>
        <TD>m</TD>
    </TR>
    <TR>
        <TD bgColor="#ffccaa">Focus Quality</TD>
        <TD><INPUT id="twText1" onkeyup="tw_calc()" type="text" size="8" value="80" name="focuQuality"></TD>
        <TD>%</TD>
        <TD bgColor="#ccffff">Nominal Focus Spot Power Density</TD>
        <TD><INPUT id="twText3" onkeyup="tw_calc()" type="text" size="8" value="1000" name="nomFSPD"></TD>
        <TD>kW/m sq</TD>
    </TR>
    <TR>
        <TD bgColor="#666666">Asteroid related</TD>
    </TR>
    <TR>
        <TD bgColor="#ffffcc">MPC designation</TD>
        <TD><INPUT id="twText3" onkeyup="tw_calc()" type="text" size="12" value="(6178) 1986 DA" name="twText3"></TD>
        <TD></TD>
        <TD bgColor="#ccffcc">Surface Gravity</TD>
        <TD><INPUT id="twText1" onkeyup="tw_calc()" type="text" size="8" value="0.25" name="Distance"></TD>
        <TD>g/kg</TD>
    </TR>
    <TR>
        <TD bgColor="#ccffcc">Perihelion</TD>
        <TD><INPUT id="twText1" onkeyup="tw_calc()" type="text" size="8" value="1.1805" name="tgtPerihelion"></TD>
        <TD>AU</TD>
        <TD bgColor="#ccffcc">Aphelion</TD>
        <TD><INPUT id="twText3" onkeyup="tw_calc()" type="text" size="8" value="4.4648" name="tgtAphelion"></TD>
        <TD>AU</TD>
    </TR>
    <TR>
        <TD bgColor="#ccffff">PeriFSPD</TD>
        <TD><INPUT id="twText1" onkeyup="tw_calc()" type="text" size="8" value="1.1805" name="periFSPD"></TD>
        <TD>kW/m sq</TD>
        <TD bgColor="#ccffff">ApheFSPD</TD>
        <TD><INPUT id="twText3" onkeyup="tw_calc()" type="text" size="8" value="4.4648" name="apheFSPD"></TD>
        <TD>kW/m sq</TD>
    </TR>
    <TR>
        <TD bgColor="#ccffcc">Orbital period</TD>
        <TD><INPUT id="twText1" onkeyup="tw_calc()" type="text" size="8" value="4.74" name="orbPeriod"></TD>
        <TD>yr</TD>
        <TD bgColor="#ccffcc">Rotation period</TD>
        <TD><INPUT id="twText3" onkeyup="tw_calc()" type="text" size="8" value="3.50" name="rotPeriod"></TD>
        <TD>h</TD>
    </TR>
    <TR>
        <TD bgColor="#ccffcc">Spectral type</TD>
        <TD><INPUT id="twText1" onkeyup="tw_calc()" type="text" size="8" value="M" name="specType"></TD>
        <TD></TD>
        <TD bgColor="#ccffcc">Dimensions</TD>
        <TD><INPUT id="twText3" onkeyup="tw_calc()" type="text" size="8" value="3.15" name="tgtSize"></TD>
        <TD>km</TD>
    </TR>
    <TR>
        <TD bgColor="#ccffcc">Mass</TD>
        <TD><INPUT id="twText1" onkeyup="tw_calc()" type="text" size="8" value="20" name="Distance"></TD>
        <TD>Ton</TD>
        <TD bgColor="#ccffff">Weight</TD>
        <TD><INPUT id="twText3" onkeyup="tw_calc()" type="text" size="8" value="5" name="twText3"></TD>
        <TD>kg-force</TD>
    </TR>
</TABLE>
</P>
<P><STRONG>Smelting in the field<BR>
</STRONG>
<TABLE id="Table1" cellSpacing="1" cellPadding="1" width="300" bgColor="#ffffcc" border="1">
<TR>
    <TD>Distance</TD>
    <TD><INPUT id="evaluDistance" onkeyup="furnace_calc()" type="text" size="5" value="1" name="evaluDistance"> </TD>
    <TD>AU
    <!-- id = distUnits -->
    <!-- <SELECT id="distanUnit" onchange="distance_unit()" name="distanUnit">
            <OPTION value="1" selected>AU</OPTION>
            <OPTION value="3.84400E5">LD</OPTION>
            <OPTION value="1.49597871E8">km</OPTION>
        </SELECT> -->
    </TD>
    <TD bgColor="#ccffcc">Solar Power Density</TD>
    <TD><INPUT id="solarPowerDensity" onkeyup="furnace_calc()" type="text" size="8" value="1362" name="solarPowerDensity"></TD>
    <TD>W/m²</TD>
</TR>
<TR>
    <TD bgColor="#ffccaa">Equivalent size/Actual diameter</TD>
    <TD><INPUT id="twText1" onkeyup="tw_calc()" type="text" size="8" value="50" name="furnaceSize"></TD>
    <TD>m</TD>
    <TD bgColor="#ccffcc">Effective area</TD>
    <TD><INPUT id="effectArea" onkeyup="tw_calc()" type="text" size="8" value="1.362" name="effectArea"></TD>
    <TD>m sq</TD>
</TR>
</TABLE>

</P>

<script language="javascript">

    var eDist = 1
    function distance_unit() {
        const AU = 1.49597871E8
        const LD = 3.84400E5
        eDist=document.getElementById("evaluDistance").value
        // *document.getElementById("distanUnit").value

    //   var cell = document.createElement("td");
      var cellText = document.createTextNode("cell in row ");
      document.getElementById("distUnits").setChild(cellText);

        furnace_calc()
    }
    function furnace_calc() {
    const nominalSPD = 1362
        
    eDist=document.getElementById("evaluDistance").value
    var SPD = nominalSPD/Math.pow(eDist, 2)
    // var tr=document.getElementById("twText2").value
    // var tunit=document.getElementById("twSelect5").value;
    // if (tunit=="F"){
    //     tr=tr*5/9;
    // }
    // var tk=document.getElementById("twText3").value*document.getElementById("twSelect2").value;//cm
    // var ta=document.getElementById("twText4").value
    // tunit=document.getElementById("twSelect6").value;
    // if (tunit=="F"){
    //     ta=(ta-32)*5/9;
    // }
    // var len=document.getElementById("twText5").value/document.getElementById("twSelect4").value;//cm
    // //calcs
    // var rho=1.7e-6 //ohm-cm
    //output
    document.getElementById("solarPowerDensity").value=SPD.toPrecision(3)
    // document.getElementById("twText7").value=ri.toPrecision(3)
    // document.getElementById("twText8").value=vi.toPrecision(3)
    // document.getElementById("twText9").value=pi.toPrecision(3)
    
    // document.getElementById("twText10").value=we.toPrecision(3)
    // document.getElementById("twText11").value=re.toPrecision(3)
    // document.getElementById("twText12").value=ve.toPrecision(3)
    // document.getElementById("twText13").value=pe.toPrecision(3)
    }
    function A_external(current,rise) {
        var k = 0.048
        var b = 0.44
        var c = 0.725
        return Math.pow((current/(k*Math.pow(rise,b))),1/c)
    }
    function A_internal(current,rise) {
        var k = 0.024
        var b = 0.44
        var c = 0.725
        return Math.pow((current/(k*Math.pow(rise,b))),1/c)
    }
</script>


<div id="divhead">
  
<!-- align="center"> -->

  <h2>Satellite Link Budget Calculator</h2>
  <p>Complete all white boxes and then click any calculate button to obtain results in the green boxes.</p>
  <form action="http://www.satsig.net/linkbugt.htm">
    <table>
      <tbody><tr>
        <td>Uplink frequency GHz</td>
        <td><input type="TEXT" name="frequp" size="10" onfocus="this.form.frequp.value=&#39;&#39;"></td>
      </tr>
      <tr>
        <td>Uplink antenna diameter m</td>
        <td><input type="TEXT" name="esdiaup" size="10" onfocus="this.form.esdiaup.value=&#39;&#39;"></td>
      </tr>
      <tr>
        <td>Uplink antenna aperture efficiency e.g. 0.65</td>
        <td><input type="TEXT" name="eff" size="10" value="0.65" onfocus="this.form.eff.value=&#39;&#39;"></td>
      </tr>
      <tr bgcolor="#99FF99">
        <td>Uplink antenna transmit gain dBi</td>
        <td><input type="TEXT" name="esupgain" size="5"></td>
      </tr>
      <tr>
        <td>Uplink antenna, power at the feed W</td>
        <td><input type="TEXT" name="espowup" size="5" onfocus="this.form.espowup.value=&#39;&#39;"></td>
      </tr>
      <tr bgcolor="#99FF99">
        <td>Uplink EIRP dBW</td>
        <td><input type="TEXT" name="esupeirp" size="5"></td>
      </tr>
      <tr>
        <td><a href="http://www.satsig.net/ssazelm.htm">Range</a> (35778 - 41679) km</td>
        <td><input type="TEXT" name="range" size="10" value="38500.0" onfocus="this.form.range.value=&#39;&#39;"></td>
      </tr>
      <tr bgcolor="#99FF99">
        <td>Uplink path loss dB</td>
        <td><input type="TEXT" name="plup" size="5"></td>
      </tr>
      <tr bgcolor="#99FF99">
        <td><a href="http://www.satsig.net/lbpfd.htm">Uplink pfd at satellite dBW/m^2</a></td>
        <td><input type="TEXT" name="pfdup" size="5"></td>
      </tr>
      <tr>
        <td>Bandwidth Hz</td>
        <td><input type="TEXT" name="bandwidth" size="10" onfocus="this.form.bandwidth.value=&#39;&#39;"></td>
      </tr>
      <tr>
        <td><a href="http://www.satsig.net/lbgt.htm">Satellite uplink G/T dB/K</a></td>
        <td><input type="TEXT" name="gontup" size="10" onfocus="this.form.gontup.value=&#39;&#39;"></td>
      </tr>
      <tr bgcolor="#99FF99">
        <td>Uplink C/N dB</td>
        <td><input type="TEXT" name="cnup" size="5"></td>
      </tr>
    </tbody></table>
    <p><input type="BUTTON" value="Click to calculate results" onclick="computeform(this.form)"> </p>
    <table cellpadding="0" cellspacing="1" style="border-collapse: collapse">
      <tbody><tr>
        <td>Downlink frequency GHz</td>
        <td><input type="TEXT" name="freqdn" size="10" onfocus="this.form.freqdn.value=&#39;&#39;"></td>
      </tr>
      <tr>
        <td>Downlink receive antenna diameter m</td>
        <td><input type="TEXT" name="esdiadn" size="10" onfocus="this.form.esdiadn.value=&#39;&#39;"></td>
      </tr>
      <tr>
        <td>Downlink receive antenna aperture efficiency e.g. 0.65</td>
        <td><input type="TEXT" name="effdn" value="0.65" size="10" onfocus="this.form.effdn.value=&#39;&#39;"></td>
      </tr>
      <tr>
        <td><a href="http://www.satsig.net/noise.htm">Downlink system noise temperature (antenna+LNA) K</a></td>
        <td><input type="TEXT" name="temp" size="10" onfocus="this.form.temp.value=&#39;&#39;"></td>
      </tr>
      <tr bgcolor="#99FF99">
        <td>Downlink receive antenna gain dBi</td>
        <td><input type="TEXT" name="esdngain" size="5"></td>
      </tr>
      <tr bgcolor="#99FF99">
        <td>Downlink receive antenna G/T dB/K</td>
        <td><input type="TEXT" name="gontdn" size="5"></td>
      </tr>
      <tr>
        <td><a href="http://www.satsig.net/lbeirp.htm">Downlink satellite EIRP dBW</a></td>
        <td><input type="TEXT" name="eirpdn" size="10" onfocus="this.form.eirpdn.value=&#39;&#39;"></td>
      </tr>
      <tr bgcolor="#99FF99">
        <td>Downlink path loss dB</td>
        <td><input type="TEXT" name="pldn" size="5"></td>
      </tr>
      <tr bgcolor="#99FF99">
        <td>Downlink C/N dB</td>
        <td><input type="TEXT" name="cndn" size="5"></td>
      </tr>
    </tbody></table>
    <p><input type="BUTTON" value="Click to calculate results" onclick="computeform(this.form)"> </p>
    <table cellpadding="0" cellspacing="1" style="border-collapse: collapse">
      <tbody><tr>
        <td><a href="http://www.satsig.net/interfer.htm">Uplink C/interference dB</a></td>
        <td><input type="TEXT" name="ciup" size="10" value="28.0" onfocus="this.form.ciup.value=&#39;&#39;"></td>
      </tr>
      <tr bgcolor="#99FF99">
        <td>Uplink C/N dB</td>
        <td><input type="TEXT" name="cnup2" size="5"></td>
      </tr>
      <tr>
        <td><a href="http://www.satsig.net/interfer.htm">Satellite C/intermod dB</a></td>
        <td><input type="TEXT" name="cim" size="10" value="21.0" onfocus="this.form.cim.value=&#39;&#39;"></td>
      </tr>
      <tr bgcolor="#99FF99">
        <td>Downlink C/N dB</td>
        <td><input type="TEXT" name="cndn2" size="5"></td>
      </tr>
      <tr>
        <td><a href="http://www.satsig.net/interfer.htm">Downlink C/interference dB</a></td>
        <td><input type="TEXT" name="cidn" size="10" value="28.0" onfocus="this.form.cidn.value=&#39;&#39;"></td>
      </tr>
      <tr bgcolor="#99FF99">
        <td>Total link C/N dB</td>
        <td><input type="TEXT" name="cntot" size="5"></td>
      </tr>
    </tbody></table>
    <p><input type="BUTTON" value="Click to calculate results" onclick="computeform(this.form)"><input type="Reset" value="Click to zero everything except defaults" onclick="ClearForm(this.form)"></p>
  </form>
</div>
<script type="text/javascript">
// <!-- hide this script tag's contents from old browsers
function gain(freq, dia, e) {
//freq in GHz,  dia in m,   e=efficiency e.g. 0.65 is 65%
a=10.0*Math.log(4*3.14159*e*3.14159*dia*dia*freq*freq/(4*.3*.3))/Math.log(10.0);
return a;
}
function eirp(gain, pow) {
//antenna gain in dBi, power in watts
a=gain+10.0*Math.log(pow)/Math.log(10.0);
return a;
}
function pathloss(range, freq) {
// range in km,  freq in GHz
a=92.45+20.0*Math.log(range)/Math.log(10.0)+20.0*Math.log(freq)/Math.log(10.0);
return a;
}
function lnkb(eirp,pathloss,gont,bw) {
a=eirp-pathloss-10.0*Math.log(bw)/Math.log(10.0)+228.6;
a=1.0*gont+a;
return a;
}
function sumdb(a,b,c,d,e) {
a1=1.0/(Math.pow(10.0, a/10.0));
b1=1.0/(Math.pow(10.0, b/10.0));
c1=1.0/(Math.pow(10.0, c/10.0));
d1=1.0/(Math.pow(10.0, d/10.0));
e1=1.0/(Math.pow(10.0, e/10.0));
sdb=-10.0*Math.log(a1+b1+c1+d1+e1)/Math.log(10.0);
return sdb;
}
function computeform(form) {
gainupdb= gain(form.frequp.value, form.esdiaup.value, form.eff.value);
eirpdb  = eirp(gainupdb, form.espowup.value);
plupdb  = pathloss(form.range.value, form.frequp.value);
pfdupdb = eirpdb - plupdb  + gain(form.frequp.value, 1.128379, 1.0);
cnupdb  = lnkb(eirpdb, plupdb, form.gontup.value, form.bandwidth.value);
//
pldndb  = pathloss(form.range.value, form.freqdn.value);
gaindndb= gain(form.freqdn.value, form.esdiadn.value, form.effdn.value);
gontdndb= gaindndb -10*Math.log(form.temp.value)/Math.log(10);
cndndb  = lnkb(form.eirpdn.value, pldndb, gontdndb, form.bandwidth.value);
//
cntotdb = sumdb(form.ciup.value,cnupdb,form.cim.value,cndndb,form.cidn.value);
//
form.esupgain.value=gainupdb;
form.esdngain.value=gaindndb;
form.esupeirp.value=eirpdb;
form.plup.value    =plupdb;
form.pfdup.value   =pfdupdb;
form.cnup.value    =cnupdb;
//
form.pldn.value    =pldndb;
form.gontdn.value  =gontdndb;
form.cndn.value    =cndndb;
//
form.cnup2.value   =cnupdb;
form.cndn2.value   =cndndb;
form.cntot.value   =cntotdb;
//
return;
}

<!-- // -- done hiding from old browsers -->

</script>
<div class = "right">
    <iframe src="http://asterank.com/3d/" width="700px" height="500px" frameborder="0" scrolling="no"> </iframe>
    <img src="https://user-images.githubusercontent.com/1320252/48569629-38cc7380-e93d-11e8-8317-639868a95439.png"  alt="eds-0a" />
    <img src="https://user-images.githubusercontent.com/1320252/48569700-67e2e500-e93d-11e8-8200-74e84e535a61.png"  alt="eds-0a" />
    <img src="https://user-images.githubusercontent.com/1320252/48569754-8a74fe00-e93d-11e8-9ab3-e559e10bac27.png"  alt="eds-0a" />
    <img src="https://user-images.githubusercontent.com/1320252/48569759-8ea11b80-e93d-11e8-8f66-23718c605b86.png"  alt="eds-0a" />
</div>
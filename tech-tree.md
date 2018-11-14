## 科技树

0. M类小行星
    * 小行星自转轴极点保凸性，进动，[自转不稳定](https://www.zhihu.com/question/291673801/answer/477032669)，进动分布仿真？
    * 不考虑利用小行星引力效应
    * 三约束：1. 面对太阳 2. 避开阴影 3. 焦点集中在自转轴极点，可利用缓慢进动/自转减速
1. 能量站
    * 反射聚焦(炼钢太阳灶)
        * 结构，尺度
        * 结构稳定性
        * 自适应光学/反射镜姿态放置（航天器对接/离心悬索结构/弯管/玻璃幕墙/机器人空间桁架/抛物天线展开
    * 镀膜发电（地面运送
2. 采矿与冶炼
    * 铁砂飞溅
3. 成型
    * 热/冷轧
    * 抛光
    * 黑色金属挤出？
    * 拉丝
    * 制粉
4. 在轨施工/架设
    * 自主机器人
        * 小蜜蜂（泛工质？
        * 脚手架（供电？
    * 工作量
    * 在轨绝缘材料
5. 地面支持
    * 地面团队
    * 近地轨道实验环境
6. AI系统
    * 机器人学
    * 工程视觉
    * DRL
    * -

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

<!-- <style>

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

</head>

<!-- <body class="orange hid_6"> -->

<!-- <div id="wrapper"> -->

## Basic constants
* Solar constant: 1.362 kW/m² @1AU
* 1AU = 1.49597871E8 km
* Moon-Earth Distance (LD): 3.84400E5 km

<div id="header">
<!-- eds solar furnace-->
<!-- Inputs -->
<P><STRONG>Solar Furnace Calculator:<BR>
</STRONG>
<TABLE id="Table1" cellSpacing="1" cellPadding="1" width="300" bgColor="#ffffcc" border="1">
    <TR>
        <TD>Distance</TD>
        <TD><INPUT id="evaluDistance" onkeyup="furnace_calc()" type="text" size="5" value="1" name="evaluDistance"> </TD>
        <TD id = distUnits>AU
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
    <TD id = distUnits>AU
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
    var tr=document.getElementById("twText2").value
    var tunit=document.getElementById("twSelect5").value;
    if (tunit=="F"){
        tr=tr*5/9;
    }
    var tk=document.getElementById("twText3").value*document.getElementById("twSelect2").value;//cm
    var ta=document.getElementById("twText4").value
    tunit=document.getElementById("twSelect6").value;
    if (tunit=="F"){
        ta=(ta-32)*5/9;
    }
    var len=document.getElementById("twText5").value/document.getElementById("twSelect4").value;//cm
    //calcs
    var rho=1.7e-6 //ohm-cm
    //output
    document.getElementById("solarPowerDensity").value=SPD.toPrecision(3)
    document.getElementById("twText7").value=ri.toPrecision(3)
    document.getElementById("twText8").value=vi.toPrecision(3)
    document.getElementById("twText9").value=pi.toPrecision(3)
    
    document.getElementById("twText10").value=we.toPrecision(3)
    document.getElementById("twText11").value=re.toPrecision(3)
    document.getElementById("twText12").value=ve.toPrecision(3)
    document.getElementById("twText13").value=pe.toPrecision(3)
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
<!-- Inputs -->
<P><STRONG>Inputs:<BR>
</STRONG>
<TABLE id="Table1" cellSpacing="1" cellPadding="1" width="300" bgColor="#ffffcc" border="1">
    <TR>
        <TD>Current</TD>
        <TD><INPUT id="twText1" onkeyup="tw_calc()" type="text" size="8" value="10" name="twText1"></TD>
        <TD>Amps</TD>
    </TR>
    <TR>
        <TD>Thickness</TD>
        <TD><INPUT id="twText3" onkeyup="tw_calc()" type="text" size="8" value="2" name="twText3"></TD>
        <TD><SELECT id="twSelect2" onchange="tw_calc()" name="twSelect2">
                <OPTION value="0.0035" selected>oz/ft^2</OPTION>
                <OPTION value="2.54e-3">mil</OPTION>
                <OPTION value="0.1">mm</OPTION>
                <OPTION value="1e-4">um</OPTION>
            </SELECT></TD>
    </TR>
</TABLE>
</P>
<!-- Options -->
<P><STRONG>Optional Inputs:<BR>
</STRONG>
<TABLE id="Table2" cellSpacing="1" cellPadding="1" width="300" bgColor="#ffffcc" border="1">
    <TR>
        <TD>Temperature Rise</TD>
        <TD><INPUT id="twText2" onkeyup="tw_calc()" type="text" size="8" value="10" name="twText2"></TD>
        <TD>Deg
            <SELECT id="twSelect5" onchange="tw_calc()" name="twSelect5">
                <OPTION value="C" selected>C</OPTION>
                <OPTION value="F">F</OPTION>
            </SELECT></TD>
    </TR>
    <TR>
        <TD>Ambient Temperature</TD>
        <TD><INPUT id="twText4" onkeyup="tw_calc()" type="text" size="8" value="25" name="twText4"></TD>
        <TD>Deg
            <SELECT id="twSelect6" onchange="tw_calc()" name="twSelect6">
                <OPTION value="C" selected>C</OPTION>
                <OPTION value="F">F</OPTION>
            </SELECT></TD>
    </TR>
    <TR>
        <TD>Trace Length</TD>
        <TD><INPUT id="twText5" onkeyup="tw_calc()" type="text" size="8" value="1" name="twText5"></TD>
        <TD><SELECT id="twSelect4" onchange="tw_calc()" name="twSelect4">
                <OPTION value="0.393701" selected>inch</OPTION>
                <OPTION value="0.032808">feet</OPTION>
                <OPTION value="393.7008">mil</OPTION>
                <OPTION value="10">mm</OPTION>
                <OPTION value="10000">um</OPTION>
                <OPTION value="1">cm</OPTION>
                <OPTION value="0.01">m</OPTION>
            </SELECT></TD>
    </TR>
</TABLE>
</P>
<!-- Results I -->
<P><STRONG>Results for Internal Layers:<BR>
</STRONG>
<TABLE id="Table3" cellSpacing="1" cellPadding="1" width="300" bgColor="#ccffcc" border="1">
    <TR>
        <TD>Required Trace Width</TD>
        <TD><INPUT id="twText6" onkeyup="tw_calc()" type="text" size="8" name="twText6"></TD>
        <TD><SELECT id="twSelect1" onchange="tw_calc()" name="twSelect1">
                <OPTION value="2.54e-3" selected>mil</OPTION>
                <OPTION value="0.1">mm</OPTION>
                <OPTION value="1e-4">um</OPTION>
            </SELECT></TD>
    </TR>
    <TR>
        <TD>Resistance</TD>
        <TD><INPUT id="twText7" onkeyup="tw_calc()" type="text" size="8" name="twText7"></TD>
        <TD>Ohms</TD>
    </TR>
    <TR>
        <TD>Voltage Drop</TD>
        <TD><INPUT id="twText8" onkeyup="tw_calc()" type="text" size="8" name="twText8"></TD>
        <TD>Volts</TD>
    </TR>
    <TR>
        <TD>Power Loss</TD>
        <TD><INPUT id="twText9" onkeyup="tw_calc()" type="text" size="8" name="twText9"></TD>
        <TD>Watts</TD>
    </TR>
</TABLE>
</P>
<!-- Results II -->
<P><STRONG><STRONG>Results for </STRONG>External Layers in Air:<BR>
</STRONG>
<TABLE id="Table4" cellSpacing="1" cellPadding="1" width="300" bgColor="#ccffcc" border="1">
    <TR>
        <TD>Required Trace Width</TD>
        <TD><INPUT id="twText10" onkeyup="tw_calc()" type="text" size="8" name="twText10"></TD>
        <TD><SELECT id="twSelect3" onchange="tw_calc()" name="twSelect3">
                <OPTION value="2.54e-3" selected>mil</OPTION>
                <OPTION value="0.1">mm</OPTION>
                <OPTION value="1e-4">um</OPTION>
            </SELECT></TD>
    </TR>
    <TR>
        <TD>Resistance</TD>
        <TD><INPUT id="twText11" onkeyup="tw_calc()" type="text" size="8" name="twText11"></TD>
        <TD>Ohms</TD>
    </TR>
    <TR>
        <TD>Voltage Drop</TD>
        <TD><INPUT id="twText12" onkeyup="tw_calc()" type="text" size="8" name="twText12"></TD>
        <TD>Volts</TD>
    </TR>
    <TR>
        <TD>Power Loss</TD>
        <TD><INPUT id="twText13" onkeyup="tw_calc()" type="text" size="8" name="twText13"></TD>
        <TD>Watts</TD>
    </TR>
</TABLE>
</P>

<script language="javascript" src="http://circuitcalculator.com/js/pcpcookielib/pcpcookielib.js">
</script>

<script language="javascript">
    //copyright circuitcalculator.com
    //please do not copy without permission
    function tw_calc() {
    var i=document.getElementById("twText1").value
    var tr=document.getElementById("twText2").value
    var tunit=document.getElementById("twSelect5").value;
    if (tunit=="F"){
        tr=tr*5/9;
    }
    var tk=document.getElementById("twText3").value*document.getElementById("twSelect2").value;//cm
    var ta=document.getElementById("twText4").value
    tunit=document.getElementById("twSelect6").value;
    if (tunit=="F"){
        ta=(ta-32)*5/9;
    }
    var len=document.getElementById("twText5").value/document.getElementById("twSelect4").value;//cm
    //calcs
    var rho=1.7e-6 //ohm-cm
    var alpha=3.9e-3 //ohm/ohm/C
    var ai=A_internal(i,tr) //mils^2
    ai=ai*2.54*2.54/1e6 //mil^2 to cm^2
    var wi=ai/tk //cm
    wi=wi/document.getElementById("twSelect1").value //user units
    var tval=1*ta + 1*tr
    var ri=(rho*len/ai)*(1+alpha*(tval-25))
    var vi = ri*i
    var pi = i*i*ri
    var ae = A_external(i,tr)//mils^2
    ae=ae*2.54*2.54/1e6 //mil^2 to cm^2
    var we = ae/tk //cm
    we=we/document.getElementById("twSelect3").value //user units
    var re=(rho*len/ae)*(1+alpha*(tval-25))
    var ve = re*i
    var pe = i*i*re
    //output
    document.getElementById("twText6").value=wi.toPrecision(3)
    document.getElementById("twText7").value=ri.toPrecision(3)
    document.getElementById("twText8").value=vi.toPrecision(3)
    document.getElementById("twText9").value=pi.toPrecision(3)
    
    document.getElementById("twText10").value=we.toPrecision(3)
    document.getElementById("twText11").value=re.toPrecision(3)
    document.getElementById("twText12").value=ve.toPrecision(3)
    document.getElementById("twText13").value=pe.toPrecision(3)
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
    function tw_save(){
        userCookie.put("tw_text1", document.getElementById("twText1").value)
        userCookie.put("tw_text2", document.getElementById("twText2").value)
        userCookie.put("tw_text3", document.getElementById("twText3").value)
        userCookie.put("tw_text4", document.getElementById("twText4").value)
        userCookie.put("tw_text5", document.getElementById("twText5").value)
        userCookie.put("tw_sel1", document.getElementById("twSelect1").value)
        userCookie.put("tw_sel2", document.getElementById("twSelect2").value)
        userCookie.put("tw_sel3", document.getElementById("twSelect3").value)
        userCookie.put("tw_sel4", document.getElementById("twSelect4").value)
        userCookie.put("tw_sel5", document.getElementById("twSelect5").value)
        userCookie.put("tw_sel6", document.getElementById("twSelect6").value)
        userCookie.write()
    }
    
    userCookie  = new cookieObject("tw_form", 365, "/", "tw_text1", "tw_text2", "tw_text3", "tw_text4", "tw_text5", "tw_sel1", "tw_sel2", "tw_sel3", "tw_sel4", "tw_sel5", "tw_sel6")
    if (userCookie.found) {
        document.getElementById("twText1").value=userCookie.get("tw_text1")
        document.getElementById("twText2").value=userCookie.get("tw_text2")
        document.getElementById("twText3").value=userCookie.get("tw_text3")
        document.getElementById("twText4").value=userCookie.get("tw_text4")
        document.getElementById("twText5").value=userCookie.get("tw_text5")
        document.getElementById("twSelect1").value=userCookie.get("tw_sel1")
        document.getElementById("twSelect2").value=userCookie.get("tw_sel2")
        document.getElementById("twSelect3").value=userCookie.get("tw_sel3")
        document.getElementById("twSelect4").value=userCookie.get("tw_sel4")
        document.getElementById("twSelect5").value=userCookie.get("tw_sel5")
        document.getElementById("twSelect6").value=userCookie.get("tw_sel6")
    }
    else {
        window.status=window.status+" cookie not found"
    }
    
    tw_calc()
    window.onunload=function() { tw_save() }
</script> 


<!-- Notes -->

<P><STRONG>Notes:</STRONG></P>
<P>The trace width is calculated as follows:</P>
<P>First, the Area is calculated:
</P>
<P>Area[mils^2] = (Current[Amps]/(k*(Temp_Rise[deg. C])^b))^(1/c)
</P>
<P>Then, the Width is calculated:
</P>
<P>Width[mils] = Area[mils^2]/(Thickness[oz]*1.378[mils/oz])
</P>
<P>For IPC-2221 internal layers: k = 0.024, b = 0.44, c = 0.725
</P>
<P>For IPC-2221 external layers: k = 0.048, b = 0.44, c = 0.725
</P>
<P>where k, b, and c are constants resulting from curve fitting to the IPC-2221 
curves
</P>
<P><strong>For geometry diagrams, click on the pictures below.</strong></P>
<a target=_blank class="imagelink" title="pcb-trace-geometry-2.png" href="http://circuitcalculator.com/wordpress/wp-content/uploads/2007/04/pcb-trace-geometry-2.png"><img id="image61" alt=pcb-trace-geometry-2.png src="http://circuitcalculator.com/wordpress/wp-content/uploads/2007/04/pcb-trace-geometry-2.thumbnail.png" /> </a> &nbsp;&nbsp;&nbsp;
<a target=_blank class="imagelink" title="pcb-trace-geometry-1.png" href="http://circuitcalculator.com/wordpress/wp-content/uploads/2007/04/pcb-trace-geometry-1.png"><img id="image60" alt=pcb-trace-geometry-1.png src="http://circuitcalculator.com/wordpress/wp-content/uploads/2007/04/pcb-trace-geometry-1.thumbnail.png" /> </a>
<P><strong>For frequently asked questions, see the comments.</strong></P>

</body>
</html>

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

<!-- <body class="orange hid_6"> -->

<!-- <div id="wrapper"> -->

## Basic constants
* Solar constant: 1.362 kW/m² @1AU
* 1AU = 1.49597871E8 km
* Moon-Earth Distance (LD): 3.84400E5 km

<div id="header" class="pull-left">
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
</div>

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

<!-- <div class="pull-left">图片url</div> -->
## Tech Tree

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

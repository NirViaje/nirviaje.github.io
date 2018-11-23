## Liquid-propellant engine
![image](https://user-images.githubusercontent.com/1320252/48677733-3cb5fb00-ebb4-11e8-9012-4dcf61fce4cf.png)
![image](https://user-images.githubusercontent.com/1320252/48507512-19730f00-e887-11e8-8df0-ec27919e4a69.png)
![](https://user-images.githubusercontent.com/43948737/48675053-b5a25c00-eb8e-11e8-8b3c-ca98f7eec7b4.jpg)

Full system cold flow test
* Fuel: LOX-hydrocarbon / hypergolic bipropellant
* Output thrust: 5000N
* Weight
* lps
* etc

## Robotic joints
![wen-robotic-joints](https://user-images.githubusercontent.com/1320252/48677950-61f83880-ebb7-11e8-844b-f67aaa38344c.png)

| Item      | EDR-RJM25 | EDR-RJM14 | EDR-RJM17 | EDR-RJM20 | Unit   |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| Torque    | 133       | 7         | 16        | 30        | Nm     |
| Power     | 630       | 90        | 90        | 90        | W      |
| Rev       | 150       | 225       | 180       | 180       | degree/s |
| Weight    | 3.9       | 0.9       | 1.3       | 1.8       | kg     |
| Diameter  | 116       | 56        | 78        | 90        | mm     |    

* Resolution in 17 bits
* all specifications subject to change to change before formally announcement

## Avionics

![image](https://user-images.githubusercontent.com/1320252/48677744-59eac980-ebb4-11e8-99d0-d1ef30716e13.png)

* Channels: 1 TX tuner,  1 RX tuner. 
  * 3 TX ports: Broadband RF,  S-band RF,  70MHz
  * 3 RX ports: Broadband RF,  S-band RF,  70MHz IF

- Frequency range:70MHz-6GHz
- Input noise figure:NF=3dB
- Output power range:-20dbm~+12dbm 
- Transmitter EVM:<5%
--- 
- Downlink:4 ch telemetry, 2 ch ranging
- Uplink: 4 ch telecommand,  2 ch ranging
- Data Interface: ethernet,  disk file
- Modulation:BPSK、QPSK
- Data/Ranging power ratio:range +-10db, step0.1db
- PN chip rate:0-10.23Mcps

---
- Symbol rate: 0-10Mbps
- Line coding: NRZ-L/M/S 
- Frame synchorizer: sync pattern 1-64bit,  frame length 0-1048576 bytes
- Forward error correcting: Compliant to CCSDS Standard. Convolutional code encoding,  viterbi decoding,  reed-soloman codes,  BCH codes,  LDPC codes support.
- Frame formats :Datagram (header+length+CRC), AX.25, CubeSat Space Protocol


## KAST3DP Prototype Manufacture System

![ba5953fd9fd2a8f76782a4ca2d9cd6f](https://user-images.githubusercontent.com/1320252/48678379-75a69d80-ebbd-11e8-8691-72637816a7f0.jpg)
![5610f060b8979a62cc1bfb95f9fe238](https://user-images.githubusercontent.com/1320252/48678382-7c351500-ebbd-11e8-9355-87cef7656dcc.jpg)
![mid-sample](https://user-images.githubusercontent.com/1320252/48678449-8277c100-ebbe-11e8-8b36-e8329472c2cb.jpg)

* Print speed: 180 mm/h
* Print volume: 200 x 150 x 320 mm
* Resolution: 16~100 um
* Material: Rigid, Durable, Elastic, Nano Ceramic, Nano Glass
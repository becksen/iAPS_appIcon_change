var freeaps_determineBasal;(()=>{var e={5546:(e,t,a)=>{var r=a(6880);function o(e,t){t||(t=0);var a=Math.pow(10,t);return Math.round(e*a)/a}function n(e,t){return"mmol/L"===t.out_units?o(.0555*e,1):Math.round(e)}e.exports=function(e,t,a,i,s,l,m,u,d,c,g,h,p,f){var v=i.min_bg,B=0,b="",M="",_="",y="",x="",D=0,w=0,S=0,T=0,C=0,U=0;const G=f.weightedAverage;var O=1,R=i.sens,A=i.carb_ratio;f.useOverride&&(R/=O=f.overridePercentage/100,A/=O);const I=i.weightPercentage,j=f.average_total_data;function F(e,t){var a=e.getTime();return new Date(a+36e5*t)}function P(e){var t=i.bolus_increment;.025!=t&&(t=.05);var a=e/t;return a>=1?o(Math.floor(a)*t,5):0}function q(e){function t(e){return e<10&&(e="0"+e),e}return t(e.getHours())+":"+t(e.getMinutes())+":00"}function W(e,t){var a=new Date("1/1/1999 "+e),r=new Date("1/1/1999 "+t);return(a.getTime()-r.getTime())/36e5}function E(e,t){var a=0,r=t,o=(e-t)/36e5,n=0,i=o,s=0;do{if(o>0){var l=q(r),m=p[0].rate;for(let e=0;e<p.length;e++){var u=p[e].start;if(l==u){if(e+1<p.length){o>=(s=W(p[e+1].start,p[e].start))?n=s:o<s&&(n=o)}else if(e+1==p.length){let t=p[0].start;o>=(s=24-W(p[e].start,t))?n=s:o<s&&(n=o)}a+=P((m=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+P(m*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),r=F(r,n)}else if(l>u)if(e+1<p.length){var d=p[e+1].start;l<d&&(o>=(s=W(d,l))?n=s:o<s&&(n=o),a+=P((m=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+P(m*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),r=F(r,n))}else if(e==p.length-1){o>=(s=W("23:59:59",l))?n=s:o<s&&(n=o),a+=P((m=p[e].rate)*n),o-=n,console.log("Dynamic ratios log: scheduled insulin added: "+P(m*n)+" U. Bas duration: "+n.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),r=F(r,n)}}}}while(o>0&&o<i);return a}if(g.length){let e=g.length-1;var k=new Date(g[e].timestamp),L=new Date(g[0].timestamp);if("TempBasalDuration"==g[0]._type&&(L=new Date),(B=(L-k)/36e5)<23.9&&B>21)C=E(k,(z=24-B,N=k.getTime(),new Date(N-36e5*z))),y="24 hours of data is required for an accurate tdd calculation. Currently only "+B.toPrecision(3)+" hours of pump history data are available. Using your pump scheduled basals to fill in the missing hours. Scheduled basals added: "+C.toPrecision(5)+" U. ";else B<21?(ae=!1,enableDynamicCR=!1):y=""}else console.log("Pumphistory is empty!"),ae=!1,enableDynamicCR=!1;var z,N;for(let e=0;e<g.length;e++)"Bolus"==g[e]._type&&(T+=g[e].amount);for(let e=1;e<g.length;e++)if("TempBasal"==g[e]._type&&g[e].rate>0){D=e,U=g[e].rate;var Z=g[e-1]["duration (min)"]/60,H=Z,$=new Date(g[e-1].timestamp),J=$,K=0;do{if(e--,0==e){J=new Date;break}if("TempBasal"==g[e]._type||"PumpSuspend"==g[e]._type){J=new Date(g[e].timestamp);break}var Q=e-2;if(Q>=0&&"Rewind"==g[Q]._type){let e=g[Q].timestamp;for(;Q-1>=0&&"Prime"==g[Q-=1]._type;)K=(g[Q].timestamp-e)/36e5;K>=Z&&(J=e,K=0)}}while(e>0);var V=(J-$)/36e5;V<H&&(Z=V),S+=P(U*(Z-K)),e=D}for(let e=0;e<g.length;e++)if(0,0==g[e]["duration (min)"]||"PumpResume"==g[e]._type){let t=new Date(g[e].timestamp),a=t,r=e;do{if(r>0&&(--r,"TempBasal"==g[r]._type)){a=new Date(g[r].timestamp);break}}while(r>0);(a-t)/36e5>0&&(C+=E(a,t))}for(let e=g.length-1;e>0;e--)if("TempBasalDuration"==g[e]._type){let t=g[e]["duration (min)"]/60,a=new Date(g[e].timestamp);var X=a;let r=e;do{if(--r,r>=0&&("TempBasal"==g[r]._type||"PumpSuspend"==g[r]._type)){X=new Date(g[r].timestamp);break}}while(r>0);if(0==e&&"TempBasalDuration"==g[0]._type&&(X=new Date,t=g[e]["duration (min)"]/60),(X-a)/36e5-t>0){C+=E(X,F(a,t))}}var Y,ee={TDD:o(w=T+S+C,5),bolus:o(T,5),temp_basal:o(S,5),scheduled_basal:o(C,5)};B>21?(M=". Bolus insulin: "+T.toPrecision(5)+" U",_=". Temporary basal insulin: "+S.toPrecision(5)+" U",b=". Insulin with scheduled basal rate: "+C.toPrecision(5)+" U",x=y+(" TDD past 24h is: "+w.toPrecision(5)+" U")+M+_+b,tddReason=", Total insulin: "+o(w,2)+" U, "+o(T/w*100,0)+"% Bolus "+o((S+C)/w*100,0)+"% Basal"):tddReason=", TDD: Not enough pumpData (< 21h)";const te=e.glucose;var ae=h.useNewFormula;const re=h.enableDynamicCR,oe=Math.min(i.autosens_min,i.autosens_max),ne=Math.max(i.autosens_min,i.autosens_max),ie=h.adjustmentFactor,se=i.min_bg;var le=!1,me="",ue=1,de="";j>0&&(ue=G/j),de=ue>1?"Basal adjustment with a 24 hour  to total average (up to 14 days of data) TDD ratio (limited by Autosens max setting). Basal Ratio: "+(ue=o(ue=Math.min(ue,i.autosens_max),2))+". Upper limit = Autosens max ("+i.autosens_max+")":ue<1?"Basal adjustment with a 24 hour to  to total average (up to 14 days of data) TDD ratio (limited by Autosens min setting). Basal Ratio: "+(ue=o(ue=Math.max(ue,i.autosens_min),2))+". Lower limit = Autosens min ("+i.autosens_min+")":"Basal adjusted with a 24 hour to total average (up to 14 days of data) TDD ratio: "+ue,de=", Basal ratio: "+ue,(i.high_temptarget_raises_sensitivity||i.exercise_mode||f.isEnabled)&&(le=!0),se>=118&&le&&(ae=!1,me="Dynamic ISF temporarily off due to a high temp target/exercising. Current min target: "+se);var ce=", Dynamic ratios log: ",ge=", AF: "+ie,he="BG: "+te+" mg/dl ("+(.0555*te).toPrecision(2)+" mmol/l)",pe="",fe="";const ve=h.curve,Be=h.insulinPeakTime,be=h.useCustomPeakTime;var Me=55,_e=65;switch(ve){case"rapid-acting":_e=65;break;case"ultra-rapid":_e=50}be?(Me=120-Be,console.log("Custom insulinpeakTime set to :"+Be+", insulinFactor: "+Me)):(Me=120-_e,console.log("insulinFactor set to : "+Me)),Y=w,I<1&&G>0&&(w=G,console.log("Using weighted TDD average: "+o(w,2)+" U, instead of past 24 h ("+o(Y,2)+" U), weight: "+I),fe=", Weighted TDD: "+o(w,2)+" U");const ye=h.sigmoid;var xe="";if(ae){var De=R*ie*w*Math.log(te/Me+1)/1800;pe=", Logarithmic formula"}var we="";if(ae&&ye){const e=oe,t=ne-e,a=.0555*(te-i.min_bg);var Se=ue;we=", tdd_factor: "+o(Se,1);const r=ne-1,n=Math.log10(1/r-e/r)/Math.log10(Math.E),s=a*ie*Se+n;De=t/(1+Math.exp(-s))+e,pe=", Sigmoid function"}var Te=A;const Ce=o(A,1);var Ue="",Ge="";if(ae&&w>0){if(Ue=", Dynamic ISF/CR: On/",De>ne?(me=", Dynamic ISF limited by autosens_max setting: "+ne+" ("+o(De,2)+"), ",Ge=", Autosens/Dynamic Limit: "+ne+" ("+o(De,2)+")",De=ne):De<oe&&(me=", Dynamic ISF limjted by autosens_min setting: "+oe+" ("+o(De,2)+"). ",Ge=", Autosens/Dynamic Limit: "+oe+" ("+o(De,2)+")",De=oe),re){Ue+="On";var Oe=De;De>1&&(Oe=(De-1)/2+1);var Re=" CR: "+(Te=o(Te/Oe,2))+" g/U";A=Te}else Re=" CR: "+Te+" g/U",Ue+="Off";const e=R/De;xe=". Using Sigmoid function, the autosens ratio has been adjusted with sigmoid factor to: "+o(s.ratio,2)+". New ISF = "+o(e,2)+" mg/dl ("+o(.0555*e,2)+" (mmol/l). CR adjusted from "+o(Ce,2)+" to "+o(Te,2)+" ("+o(.0555*A,2)+" mmol/l).",me+=ye?xe:", Dynamic autosens.ratio set to "+o(De,2)+" with ISF: "+e.toPrecision(3)+" mg/dl/U ("+(.0555*e).toPrecision(3)+" mmol/l/U)",s.ratio=De,x+=ce+he+ge+pe+me+Ue+Re+fe}else x+=ce+"Dynamic Settings disabled";console.log(x),ae||re?ae&&i.tddAdjBasal?tddReason+=Ue+pe+Ge+ge+de:ae&&!i.tddAdjBasal&&(tddReason+=Ue+pe+Ge+ge):tddReason+="";var Ae={},Ie=new Date;if(c&&(Ie=c),void 0===i||void 0===i.current_basal)return Ae.error="Error: could not get current basal rate",Ae;var je=r(i.current_basal,i)*O,Fe=je;f.useOverride&&(0==f.duration?console.log("Override active, "+100*O+"%; Duration: Enabled indefinitely"):console.log("Override active, "+100*O+"%; Duration: "+f.duration+" min."));var Pe=new Date;c&&(Pe=c);var qe,We=new Date(e.date),Ee=o((Pe-We)/60/1e3,1),ke=e.glucose,Le=e.noise;qe=e.delta>-.5?"+"+o(e.delta,0):o(e.delta,0);var ze=Math.min(e.delta,e.short_avgdelta),Ne=Math.min(e.short_avgdelta,e.long_avgdelta),Ze=Math.max(e.delta,e.short_avgdelta,e.long_avgdelta);(ke<=10||38===ke||Le>=3)&&(Ae.reason="CGM is calibrating, in ??? state, or noise is high");if(ke>60&&0==e.delta&&e.short_avgdelta>-1&&e.short_avgdelta<1&&e.long_avgdelta>-1&&e.long_avgdelta<1&&("fakecgm"==e.device?(console.error("CGM data is unchanged ("+n(ke,i)+"+"+n(e.delta,i)+") for 5m w/ "+n(e.short_avgdelta,i)+" mg/dL ~15m change & "+n(e.long_avgdelta,2)+" mg/dL ~45m change"),console.error("Simulator mode detected ("+e.device+"): continuing anyway")):!0),Ee>12||Ee<-5?Ae.reason="If current system time "+Pe+" is correct, then BG data is too old. The last BG data was read "+Ee+"m ago at "+We:0===e.short_avgdelta&&0===e.long_avgdelta&&(e.last_cal&&e.last_cal<3?Ae.reason="CGM was just calibrated":Ae.reason="CGM data is unchanged ("+n(ke,i)+"+"+n(e.delta,i)+") for 5m w/ "+n(e.short_avgdelta,i)+" mg/dL ~15m change & "+n(e.long_avgdelta,i)+" mg/dL ~45m change"),ke<=10||38===ke||Le>=3||Ee>12||Ee<-5||0===e.short_avgdelta&&0===e.long_avgdelta)return t.rate>=Fe?(Ae.reason+=". Canceling high temp basal of "+t.rate,Ae.deliverAt=Ie,Ae.temp="absolute",Ae.duration=0,Ae.rate=0,Ae):0===t.rate&&t.duration>30?(Ae.reason+=". Shortening "+t.duration+"m long zero temp to 30m. ",Ae.deliverAt=Ie,Ae.temp="absolute",Ae.duration=30,Ae.rate=0,Ae):(Ae.reason+=". Temp "+t.rate+" <= current basal "+Fe+"U/hr; doing nothing. ",Ae);var He,$e,Je,Ke,Qe=i.max_iob;if(void 0!==i.min_bg&&($e=i.min_bg),void 0!==i.max_bg&&(Je=i.max_bg),void 0!==i.enableSMB_high_bg_target&&(Ke=i.enableSMB_high_bg_target),void 0===i.min_bg||void 0===i.max_bg)return Ae.error="Error: could not determine target_bg. ",Ae;He=(i.min_bg+i.max_bg)/2;var Ve=i.exercise_mode||i.high_temptarget_raises_sensitivity||f.isEnabled,Xe=100,Ye=160;if(i.half_basal_exercise_target&&(Ye=i.half_basal_exercise_target),Ve&&i.temptargetSet&&He>Xe||i.low_temptarget_lowers_sensitivity&&i.temptargetSet&&He<Xe){var et=Ye-Xe;sensitivityRatio=et*(et+He-Xe)<=0?i.autosens_max:et/(et+He-Xe),sensitivityRatio=Math.min(sensitivityRatio,i.autosens_max),sensitivityRatio=o(sensitivityRatio,2),process.stderr.write("Sensitivity ratio set to "+sensitivityRatio+" based on temp target of "+He+"; ")}else void 0!==s&&s&&(sensitivityRatio=s.ratio,process.stderr.write("Autosens ratio: "+sensitivityRatio+"; "));if(i.temptargetSet&&He<Xe&&ae&&te>=He&&sensitivityRatio<De&&(s.ratio=De*(Xe/He),s.ratio=Math.min(s.ratio,i.autosens_max),sensitivityRatio=o(s.ratio,2),console.log("Dynamic ratio increased from "+o(De,2)+" to "+o(s.ratio,2)+" due to a low temp target ("+He+").")),sensitivityRatio&&!ae?(Fe=i.current_basal*O*sensitivityRatio,Fe=r(Fe,i)):ae&&i.tddAdjBasal&&(Fe=i.current_basal*ue*O,Fe=r(Fe,i),j>0&&(process.stderr.write("TDD-adjustment of basals activated, using tdd24h_14d_Ratio "+o(ue,2)+", TDD 24h = "+o(Y,2)+"U, Weighted average TDD = "+o(G,2)+"U, (Weight percentage = "+I+"), Total data of TDDs (up to 14 days) average = "+o(j,2)+"U. "),Fe!==je*O?process.stderr.write("Adjusting basal from "+je*O+" U/h to "+Fe+" U/h; "):process.stderr.write("Basal unchanged: "+Fe+" U/h; "))),i.temptargetSet);else if(void 0!==s&&s&&(i.sensitivity_raises_target&&s.ratio<1||i.resistance_lowers_target&&s.ratio>1)){$e=o(($e-60)/s.ratio)+60,Je=o((Je-60)/s.ratio)+60;var tt=o((He-60)/s.ratio)+60;He===(tt=Math.max(80,tt))?process.stderr.write("target_bg unchanged: "+tt+"; "):process.stderr.write("target_bg from "+He+" to "+tt+"; "),He=tt}var at=200,rt=200,ot=200;if(e.noise>=2){var nt=Math.max(1.1,i.noisyCGMTargetMultiplier);Math.min(250,i.maxRaw);at=o(Math.min(200,$e*nt)),rt=o(Math.min(200,He*nt)),ot=o(Math.min(200,Je*nt)),process.stderr.write("Raising target_bg for noisy / raw CGM data, from "+He+" to "+rt+"; "),$e=at,He=rt,Je=ot}var it=$e-.5*($e-40),st=i.threshold_setting;st>it&&st<=120&&st>=65?(console.error("Threshold changed in settings from "+n(it,i)+" to "+n(st,i)+". "),it=st):console.error("Current threshold: "+n(it,i));var lt="",mt=(o(R,1),R);if(void 0!==s&&s&&((mt=o(mt=R/sensitivityRatio,1))!==R?process.stderr.write("ISF from "+n(R,i)+" to "+n(mt,i)):process.stderr.write("ISF unchanged: "+n(mt,i)),lt+="Autosens ratio: "+o(sensitivityRatio,2)+", ISF: "+n(R,i)+"→"+n(mt,i)),console.error("CR:"+A),void 0===a)return Ae.error="Error: iob_data undefined. ",Ae;var ut,dt=a;if(a.length,a.length>1&&(a=dt[0]),void 0===a.activity||void 0===a.iob)return Ae.error="Error: iob_data missing some property. ",Ae;var ct=((ut=void 0!==a.lastTemp?o((new Date(Pe).getTime()-a.lastTemp.date)/6e4):0)+t.duration)%30;if(console.error("currenttemp:"+t.rate+" lastTempAge:"+ut+"m, tempModulus:"+ct+"m"),Ae.temp="absolute",Ae.deliverAt=Ie,u&&t&&a.lastTemp&&t.rate!==a.lastTemp.rate&&ut>10&&t.duration)return Ae.reason="Warning: currenttemp rate "+t.rate+" != lastTemp rate "+a.lastTemp.rate+" from pumphistory; canceling temp",m.setTempBasal(0,0,i,Ae,t);if(t&&a.lastTemp&&t.duration>0){var gt=ut-a.lastTemp.duration;if(gt>5&&ut>10)return Ae.reason="Warning: currenttemp running but lastTemp from pumphistory ended "+gt+"m ago; canceling temp",m.setTempBasal(0,0,i,Ae,t)}var ht=o(-a.activity*mt*5,2),pt=o(6*(ze-ht));pt<0&&(pt=o(6*(Ne-ht)))<0&&(pt=o(6*(e.long_avgdelta-ht)));var ft=ke,vt=(ft=a.iob>0?o(ke-a.iob*mt):o(ke-a.iob*Math.min(mt,R)))+pt;if(void 0===vt||isNaN(vt))return Ae.error="Error: could not calculate eventualBG. Sensitivity: "+mt+" Deviation: "+pt,Ae;var Bt=function(e,t,a){return o(a+(e-t)/24,1)}(He,vt,ht);Ae={temp:"absolute",bg:ke,tick:qe,eventualBG:vt,insulinReq:0,reservoir:d,deliverAt:Ie,sensitivityRatio,TDD:Y,insulin:ee,current_target:He};var bt=[],Mt=[],_t=[],yt=[];bt.push(ke),Mt.push(ke),yt.push(ke),_t.push(ke);var xt=function(e,t,a,r,o,i){return t?!e.allowSMB_with_high_temptarget&&e.temptargetSet&&o>100?(console.error("SMB disabled due to high temptarget of "+o),!1):!0===a.bwFound&&!1===e.A52_risk_enable?(console.error("SMB disabled due to Bolus Wizard activity in the last 6 hours."),!1):!0===e.enableSMB_always?(a.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled due to enableSMB_always"),!0):!0===e.enableSMB_with_COB&&a.mealCOB?(a.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for COB of "+a.mealCOB),!0):!0===e.enableSMB_after_carbs&&a.carbs?(a.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for 6h after carb entry"),!0):!0===e.enableSMB_with_temptarget&&e.temptargetSet&&o<100?(a.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for temptarget of "+n(o,e)),!0):!0===e.enableSMB_high_bg&&null!==i&&r>=i?(console.error("Checking BG to see if High for SMB enablement."),console.error("Current BG",r," | High BG ",i),a.bwFound?console.error("Warning: High BG SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("High BG detected. Enabling SMB."),!0):(console.error("SMB disabled (no enableSMB preferences active or no condition satisfied)"),!1):(console.error("SMB disabled (!microBolusAllowed)"),!1)}(i,u,l,ke,He,Ke),Dt=i.enableUAM,wt=0,St=0;wt=o(ze-ht,1);var Tt=o(ze-ht,1);csf=mt/A,console.error("profile.sens:"+n(R,i)+", sens:"+n(mt,i)+", CSF:"+o(csf,1));var Ct=o(30*csf*5/60,1);wt>Ct&&(console.error("Limiting carb impact from "+wt+" to "+Ct+"mg/dL/5m (30g/h)"),wt=Ct);var Ut=3;sensitivityRatio&&(Ut/=sensitivityRatio);var Gt=Ut;if(l.carbs){Ut=Math.max(Ut,l.mealCOB/20);var Ot=o((new Date(Pe).getTime()-l.lastCarbTime)/6e4),Rt=(l.carbs-l.mealCOB)/l.carbs;Gt=o(Gt=Ut+1.5*Ot/60,1),console.error("Last carbs "+Ot+" minutes ago; remainingCATime:"+Gt+"hours; "+o(100*Rt,1)+"% carbs absorbed")}var At=Math.max(0,wt/5*60*Gt/2)/csf,It=90,jt=1;i.remainingCarbsCap&&(It=Math.min(90,i.remainingCarbsCap)),i.remainingCarbsFraction&&(jt=Math.min(1,i.remainingCarbsFraction));var Ft=1-jt,Pt=Math.max(0,l.mealCOB-At-l.carbs*Ft),qt=(Pt=Math.min(It,Pt))*csf*5/60/(Gt/2),Wt=o(l.slopeFromMaxDeviation,2),Et=o(l.slopeFromMinDeviation,2),kt=Math.min(Wt,-Et/3);St=0===wt?0:Math.min(60*Gt/5/2,Math.max(0,l.mealCOB*csf/wt)),console.error("Carb Impact:"+wt+"mg/dL per 5m; CI Duration:"+o(5*St/60*2,1)+"hours; remaining CI ("+Gt/2+"h peak):"+o(qt,1)+"mg/dL per 5m");var Lt,zt,Nt,Zt,Ht,$t=999,Jt=999,Kt=999,Qt=ke,Vt=999,Xt=999,Yt=999,ea=999,ta=vt,aa=ke,ra=ke,oa=0,na=[],ia=[];try{dt.forEach((function(e){var t=o(-e.activity*mt*5,2),a=o(-e.iobWithZeroTemp.activity*mt*5,2),r=ft,n=wt*(1-Math.min(1,Mt.length/12));if(!0===(ae&&!ye))ta=Mt[Mt.length-1]+o(-e.activity*(1800/(w*ie*Math.log(Math.max(Mt[Mt.length-1],39)/Me+1)))*5,2)+n,r=yt[yt.length-1]+o(-e.iobWithZeroTemp.activity*(1800/(w*ie*Math.log(Math.max(yt[yt.length-1],39)/Me+1)))*5,2),console.log("Dynamic ISF (Logarithmic Formula) )adjusted predictions for IOB and ZT: IOBpredBG: "+o(ta,2)+" , ZTpredBG: "+o(r,2));else ta=Mt[Mt.length-1]+t+n,r=yt[yt.length-1]+a;var i=Math.max(0,Math.max(0,wt)*(1-bt.length/Math.max(2*St,1))),s=Math.min(bt.length,12*Gt-bt.length),l=Math.max(0,s/(Gt/2*12)*qt);i+l,na.push(o(l,0)),ia.push(o(i,0)),COBpredBG=bt[bt.length-1]+t+Math.min(0,n)+i+l;var m=Math.max(0,Tt+_t.length*kt),u=Math.max(0,Tt*(1-_t.length/Math.max(36,1))),d=Math.min(m,u);if(d>0&&(oa=o(5*(_t.length+1)/60,1)),!0===(ae&&!ye))UAMpredBG=_t[_t.length-1]+o(-e.activity*(1800/(w*ie*Math.log(Math.max(_t[_t.length-1],39)/Me+1)))*5,2)+Math.min(0,n)+d,console.log("Dynamic ISF (Logarithmic Formula) adjusted prediction for UAM: UAMpredBG: "+o(UAMpredBG,2));else UAMpredBG=_t[_t.length-1]+t+Math.min(0,n)+d;Mt.length<48&&Mt.push(ta),bt.length<48&&bt.push(COBpredBG),_t.length<48&&_t.push(UAMpredBG),yt.length<48&&yt.push(r),COBpredBG<Vt&&(Vt=o(COBpredBG)),UAMpredBG<Xt&&(Xt=o(UAMpredBG)),ta<Yt&&(Yt=o(ta)),r<ea&&(ea=o(r));Mt.length>18&&ta<$t&&($t=o(ta)),ta>aa&&(aa=ta),(St||qt>0)&&bt.length>18&&COBpredBG<Jt&&(Jt=o(COBpredBG)),(St||qt>0)&&COBpredBG>aa&&(ra=COBpredBG),Dt&&_t.length>12&&UAMpredBG<Kt&&(Kt=o(UAMpredBG)),Dt&&UAMpredBG>aa&&UAMpredBG}))}catch(e){console.error("Problem with iobArray.  Optional feature Advanced Meal Assist disabled")}l.mealCOB&&(console.error("predCIs (mg/dL/5m):"+ia.join(" ")),console.error("remainingCIs:      "+na.join(" "))),Ae.predBGs={},Mt.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))}));for(var sa=Mt.length-1;sa>12&&Mt[sa-1]===Mt[sa];sa--)Mt.pop();for(Ae.predBGs.IOB=Mt,Nt=o(Mt[Mt.length-1]),yt.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))})),sa=yt.length-1;sa>6&&!(yt[sa-1]>=yt[sa]||yt[sa]<=He);sa--)yt.pop();if(Ae.predBGs.ZT=yt,o(yt[yt.length-1]),l.mealCOB>0&&(wt>0||qt>0)){for(bt.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))})),sa=bt.length-1;sa>12&&bt[sa-1]===bt[sa];sa--)bt.pop();Ae.predBGs.COB=bt,Zt=o(bt[bt.length-1]),vt=Math.max(vt,o(bt[bt.length-1]))}if(wt>0||qt>0){if(Dt){for(_t.forEach((function(e,t,a){a[t]=o(Math.min(401,Math.max(39,e)))})),sa=_t.length-1;sa>12&&_t[sa-1]===_t[sa];sa--)_t.pop();Ae.predBGs.UAM=_t,Ht=o(_t[_t.length-1]),_t[_t.length-1]&&(vt=Math.max(vt,o(_t[_t.length-1])))}Ae.eventualBG=vt}console.error("UAM Impact:"+Tt+"mg/dL per 5m; UAM Duration:"+oa+"hours"),$t=Math.max(39,$t),Jt=Math.max(39,Jt),Kt=Math.max(39,Kt),Lt=o($t);var la=l.mealCOB/l.carbs;zt=o(Kt<999&&Jt<999?(1-la)*UAMpredBG+la*COBpredBG:Jt<999?(ta+COBpredBG)/2:Kt<999?(ta+UAMpredBG)/2:ta),ea>zt&&(zt=ea),Qt=o(Qt=St||qt>0?Dt?la*Vt+(1-la)*Xt:Vt:Dt?Xt:Yt);var ma=Kt;if(ea<it)ma=(Kt+ea)/2;else if(ea<He){var ua=(ea-it)/(He-it);ma=(Kt+(Kt*ua+ea*(1-ua)))/2}else ea>Kt&&(ma=(Kt+ea)/2);if(ma=o(ma),l.carbs)if(!Dt&&Jt<999)Lt=o(Math.max($t,Jt));else if(Jt<999){var da=la*Jt+(1-la)*ma;Lt=o(Math.max($t,Jt,da))}else Lt=Dt?ma:Qt;else Dt&&(Lt=o(Math.max($t,ma)));Lt=Math.min(Lt,zt),process.stderr.write("minPredBG: "+Lt+" minIOBPredBG: "+$t+" minZTGuardBG: "+ea),Jt<999&&process.stderr.write(" minCOBPredBG: "+Jt),Kt<999&&process.stderr.write(" minUAMPredBG: "+Kt),console.error(" avgPredBG:"+zt+" COB/Carbs:"+l.mealCOB+"/"+l.carbs),ra>ke&&(Lt=Math.min(Lt,ra)),Ae.COB=l.mealCOB,Ae.IOB=a.iob,Ae.BGI=n(ht,i),Ae.deviation=n(pt,i),Ae.ISF=n(mt,i),Ae.CR=o(A,1),Ae.target_bg=n(He,i),Ae.TDD=o(Y,2),Ae.current_target=o(He,0);var ca=Ae.CR;Ce!=Ae.CR&&(ca=Ce+"→"+Ae.CR);var ga=Ae.target_bg;He!=v&&(ga=n(v,i)+"→"+Ae.target_bg),Ae.reason=lt+", COB: "+Ae.COB+", Dev: "+Ae.deviation+", BGI: "+Ae.BGI+", CR: "+ca+", Target: "+ga+", minPredBG "+n(Lt,i)+", minGuardBG "+n(Qt,i)+", IOBpredBG "+n(Nt,i),Zt>0&&(Ae.reason+=", COBpredBG "+n(Zt,i)),Ht>0&&(Ae.reason+=", UAMpredBG "+n(Ht,i)),Ae.reason+=tddReason+we,Ae.reason+="; ";var ha=ft;ha<40&&(ha=Math.min(Qt,ha));var pa,fa=it-ha,va=240,Ba=240;if(l.mealCOB>0&&(wt>0||qt>0)){for(sa=0;sa<bt.length;sa++)if(bt[sa]<$e){va=5*sa;break}for(sa=0;sa<bt.length;sa++)if(bt[sa]<it){Ba=5*sa;break}}else{for(sa=0;sa<Mt.length;sa++)if(Mt[sa]<$e){va=5*sa;break}for(sa=0;sa<Mt.length;sa++)if(Mt[sa]<it){Ba=5*sa;break}}xt&&Qt<it&&(console.error("minGuardBG "+n(Qt,i)+" projected below "+n(it,i)+" - disabling SMB"),xt=!1),void 0===i.maxDelta_bg_threshold&&(pa=.2),void 0!==i.maxDelta_bg_threshold&&(pa=Math.min(i.maxDelta_bg_threshold,.4)),Ze>pa*ke&&(console.error("maxDelta "+n(Ze,i)+" > "+100*pa+"% of BG "+n(ke,i)+" - disabling SMB"),Ae.reason+="maxDelta "+n(Ze,i)+" > "+100*pa+"% of BG "+n(ke,i)+" - SMB disabled!, ",xt=!1),console.error("BG projected to remain above "+n($e,i)+" for "+va+"minutes"),(Ba<240||va<60)&&console.error("BG projected to remain above "+n(it,i)+" for "+Ba+"minutes");var ba=Ba,Ma=i.current_basal*O*mt*ba/60,_a=Math.max(0,l.mealCOB-.25*l.carbs),ya=(fa-Ma)/csf-_a;Ma=o(Ma),ya=o(ya),console.error("naive_eventualBG:",ft,"bgUndershoot:",fa,"zeroTempDuration:",ba,"zeroTempEffect:",Ma,"carbsReq:",ya),"Could not parse clock data"==l.reason?console.error("carbsReq unknown: Could not parse clock data"):ya>=i.carbsReqThreshold&&Ba<=45&&(Ae.carbsReq=ya,Ae.reason+=ya+" add'l carbs req w/in "+Ba+"m; ");var xa=0;if(ke<it&&a.iob<-i.current_basal*O*20/60&&ze>0&&ze>Bt)Ae.reason+="IOB "+a.iob+" < "+o(-i.current_basal*O*20/60,2),Ae.reason+=" and minDelta "+n(ze,i)+" > expectedDelta "+n(Bt,i)+"; ";else if(ke<it||Qt<it)return Ae.reason+="minGuardBG "+n(Qt,i)+"<"+n(it,i),xa=o(60*((fa=He-Qt)/mt)/i.current_basal*O),xa=30*o(xa/30),xa=Math.min(120,Math.max(30,xa)),m.setTempBasal(0,xa,i,Ae,t);if(i.skip_neutral_temps&&Ae.deliverAt.getMinutes()>=55)return Ae.reason+="; Canceling temp at "+Ae.deliverAt.getMinutes()+"m past the hour. ",m.setTempBasal(0,0,i,Ae,t);var Da=0,wa=Fe;if(vt<$e){if(Ae.reason+="Eventual BG "+n(vt,i)+" < "+n($e,i),ze>Bt&&ze>0&&!ya)return ft<40?(Ae.reason+=", naive_eventualBG < 40. ",m.setTempBasal(0,30,i,Ae,t)):(e.delta>ze?Ae.reason+=", but Delta "+n(qe,i)+" > expectedDelta "+n(Bt,i):Ae.reason+=", but Min. Delta "+ze.toFixed(2)+" > Exp. Delta "+n(Bt,i),t.duration>15&&r(Fe,i)===r(t.rate,i)?(Ae.reason+=", temp "+t.rate+" ~ req "+Fe+"U/hr. ",Ae):(Ae.reason+="; setting current basal of "+Fe+" as temp. ",m.setTempBasal(Fe,30,i,Ae,t)));Da=o(Da=2*Math.min(0,(vt-He)/mt),2);var Sa=Math.min(0,(ft-He)/mt);if(Sa=o(Sa,2),ze<0&&ze>Bt)Da=o(Da*(ze/Bt),2);if(wa=r(wa=Fe+2*Da,i),t.duration*(t.rate-Fe)/60<Math.min(Da,Sa)-.3*Fe)return Ae.reason+=", "+t.duration+"m@"+t.rate.toFixed(2)+" is a lot less than needed. ",m.setTempBasal(wa,30,i,Ae,t);if(void 0!==t.rate&&t.duration>5&&wa>=.8*t.rate)return Ae.reason+=", temp "+t.rate+" ~< req "+wa+"U/hr. ",Ae;if(wa<=0){if((xa=o(60*((fa=He-ft)/mt)/i.current_basal*O))<0?xa=0:(xa=30*o(xa/30),xa=Math.min(120,Math.max(0,xa))),xa>0)return Ae.reason+=", setting "+xa+"m zero temp. ",m.setTempBasal(wa,xa,i,Ae,t)}else Ae.reason+=", setting "+wa+"U/hr. ";return m.setTempBasal(wa,30,i,Ae,t)}if(ze<Bt&&(!u||!xt))return e.delta<ze?Ae.reason+="Eventual BG "+n(vt,i)+" > "+n($e,i)+" but Delta "+n(qe,i)+" < Exp. Delta "+n(Bt,i):Ae.reason+="Eventual BG "+n(vt,i)+" > "+n($e,i)+" but Min. Delta "+ze.toFixed(2)+" < Exp. Delta "+n(Bt,i),t.duration>15&&r(Fe,i)===r(t.rate,i)?(Ae.reason+=", temp "+t.rate+" ~ req "+Fe+"U/hr. ",Ae):(Ae.reason+="; setting current basal of "+Fe+" as temp. ",m.setTempBasal(Fe,30,i,Ae,t));if(Math.min(vt,Lt)<Je&&(!u||!xt))return Ae.reason+=n(vt,i)+"-"+n(Lt,i)+" in range: no temp required",t.duration>15&&r(Fe,i)===r(t.rate,i)?(Ae.reason+=", temp "+t.rate+" ~ req "+Fe+"U/hr. ",Ae):(Ae.reason+="; setting current basal of "+Fe+" as temp. ",m.setTempBasal(Fe,30,i,Ae,t));if(vt>=Je&&(Ae.reason+="Eventual BG "+n(vt,i)+" >= "+n(Je,i)+", "),a.iob>Qe)return Ae.reason+="IOB "+o(a.iob,2)+" > max_iob "+Qe,t.duration>15&&r(Fe,i)===r(t.rate,i)?(Ae.reason+=", temp "+t.rate+" ~ req "+Fe+"U/hr. ",Ae):(Ae.reason+="; setting current basal of "+Fe+" as temp. ",m.setTempBasal(Fe,30,i,Ae,t));(Da=o((Math.min(Lt,vt)-He)/mt,2))>Qe-a.iob?(console.error("SMB limited by maxIOB: "+Qe-a.iob+" (. insulinReq: "+Da+" U)"),Ae.reason+="max_iob "+Qe+", ",Da=Qe-a.iob):console.error("SMB not limited by maxIOB ( insulinReq: "+Da+" U)."),wa=r(wa=Fe+2*Da,i),Da=o(Da,3),Ae.insulinReq=Da;var Ta=o((new Date(Pe).getTime()-a.lastBolusTime)/6e4,1);if(u&&xt&&ke>it){var Ca=o(l.mealCOB/A,3),Ua=0;void 0===i.maxSMBBasalMinutes?(Ua=o(i.current_basal*O*30/60,1),console.error("profile.maxSMBBasalMinutes undefined: defaulting to 30m"),Da>Ua&&console.error("SMB limited by maxBolus: "+Ua+" ( "+Da+" U)")):a.iob>Ca&&a.iob>0?(console.error("IOB"+a.iob+"> COB"+l.mealCOB+"; mealInsulinReq ="+Ca),i.maxUAMSMBBasalMinutes?(console.error("profile.maxUAMSMBBasalMinutes: "+i.maxUAMSMBBasalMinutes+", profile.current_basal: "+i.current_basal*O),Ua=o(i.current_basal*O*i.maxUAMSMBBasalMinutes/60,1)):(console.error("profile.maxUAMSMBBasalMinutes undefined: defaulting to 30m"),Ua=o(i.current_basal*O*30/60,1)),Da>Ua?console.error("SMB limited by maxUAMSMBBasalMinutes [ "+i.maxUAMSMBBasalMinutes+"m ]: "+Ua+"U ( "+Da+"U )"):console.error("SMB is not limited by maxUAMSMBBasalMinutes. ( insulinReq: "+Da+"U )")):(console.error("profile.maxSMBBasalMinutes: "+i.maxSMBBasalMinutes+", profile.current_basal: "+i.current_basal*O),Da>(Ua=o(i.current_basal*i.maxSMBBasalMinutes/60,1))?console.error("SMB limited by maxSMBBasalMinutes: "+i.maxSMBBasalMinutes+"m ]: "+Ua+"U ( insulinReq: "+Da+"U )"):console.error("SMB is not limited by maxSMBBasalMinutes. ( insulinReq: "+Da+"U )"));var Ga=i.bolus_increment,Oa=1/Ga,Ra=i.smb_delivery_ratio;Ra>.5&&console.error("SMB Delivery Ratio increased from default 0.5 to "+o(Ra,2));var Aa=Math.min(Da*Ra,Ua);Aa=Math.floor(Aa*Oa)/Oa,xa=o(60*((He-(ft+$t)/2)/mt)/i.current_basal*O),Da>0&&Aa<Ga&&(xa=0);var Ia=0;xa<=0?xa=0:xa>=30?(xa=30*o(xa/30),xa=Math.min(60,Math.max(0,xa))):(Ia=o(Fe*xa/30,2),xa=30),Ae.reason+=" insulinReq "+Da,Aa>=Ua&&(Ae.reason+="; maxBolus "+Ua),xa>0&&(Ae.reason+="; setting "+xa+"m low temp of "+Ia+"U/h"),Ae.reason+=". ";var ja=3;i.SMBInterval&&(ja=Math.min(10,Math.max(1,i.SMBInterval)));var Fa=o(ja-Ta,0),Pa=o(60*(ja-Ta),0)%60;if(console.error("naive_eventualBG "+ft+","+xa+"m "+Ia+"U/h temp needed; last bolus "+Ta+"m ago; maxBolus: "+Ua),Ta>ja?Aa>0&&(Ae.units=Aa,Ae.reason+="Microbolusing "+Aa+"U. "):Ae.reason+="Waiting "+Fa+"m "+Pa+"s to microbolus again. ",xa>0)return Ae.rate=Ia,Ae.duration=xa,Ae}var qa=m.getMaxSafeBasal(i);return wa>qa&&(Ae.reason+="adj. req. rate: "+wa+" to maxSafeBasal: "+o(qa,2)+", ",wa=r(qa,i)),t.duration*(t.rate-Fe)/60>=2*Da?(Ae.reason+=t.duration+"m@"+t.rate.toFixed(2)+" > 2 * insulinReq. Setting temp basal of "+wa+"U/hr. ",m.setTempBasal(wa,30,i,Ae,t)):void 0===t.duration||0===t.duration?(Ae.reason+="no temp, setting "+wa+"U/hr. ",m.setTempBasal(wa,30,i,Ae,t)):t.duration>5&&r(wa,i)<=r(t.rate,i)?(Ae.reason+="temp "+t.rate+" >~ req "+wa+"U/hr. ",Ae):(Ae.reason+="temp "+t.rate+"<"+wa+"U/hr. ",m.setTempBasal(wa,30,i,Ae,t))}},6880:(e,t,a)=>{var r=a(6654);e.exports=function(e,t){var a=20;void 0!==t&&"string"==typeof t.model&&(r(t.model,"54")||r(t.model,"23"))&&(a=40);return e<1?Math.round(e*a)/a:e<10?Math.round(20*e)/20:Math.round(10*e)/10}},2705:(e,t,a)=>{var r=a(5639).Symbol;e.exports=r},9932:e=>{e.exports=function(e,t){for(var a=-1,r=null==e?0:e.length,o=Array(r);++a<r;)o[a]=t(e[a],a,e);return o}},9750:e=>{e.exports=function(e,t,a){return e==e&&(void 0!==a&&(e=e<=a?e:a),void 0!==t&&(e=e>=t?e:t)),e}},4239:(e,t,a)=>{var r=a(2705),o=a(9607),n=a(2333),i=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?o(e):n(e)}},531:(e,t,a)=>{var r=a(2705),o=a(9932),n=a(1469),i=a(3448),s=r?r.prototype:void 0,l=s?s.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(n(t))return o(t,e)+"";if(i(t))return l?l.call(t):"";var a=t+"";return"0"==a&&1/t==-Infinity?"-0":a}},7561:(e,t,a)=>{var r=a(7990),o=/^\s+/;e.exports=function(e){return e?e.slice(0,r(e)+1).replace(o,""):e}},1957:(e,t,a)=>{var r="object"==typeof a.g&&a.g&&a.g.Object===Object&&a.g;e.exports=r},9607:(e,t,a)=>{var r=a(2705),o=Object.prototype,n=o.hasOwnProperty,i=o.toString,s=r?r.toStringTag:void 0;e.exports=function(e){var t=n.call(e,s),a=e[s];try{e[s]=void 0;var r=!0}catch(e){}var o=i.call(e);return r&&(t?e[s]=a:delete e[s]),o}},2333:e=>{var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:(e,t,a)=>{var r=a(1957),o="object"==typeof self&&self&&self.Object===Object&&self,n=r||o||Function("return this")();e.exports=n},7990:e=>{var t=/\s/;e.exports=function(e){for(var a=e.length;a--&&t.test(e.charAt(a)););return a}},6654:(e,t,a)=>{var r=a(9750),o=a(531),n=a(554),i=a(9833);e.exports=function(e,t,a){e=i(e),t=o(t);var s=e.length,l=a=void 0===a?s:r(n(a),0,s);return(a-=t.length)>=0&&e.slice(a,l)==t}},1469:e=>{var t=Array.isArray;e.exports=t},3218:e=>{e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},7005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},3448:(e,t,a)=>{var r=a(4239),o=a(7005);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==r(e)}},8601:(e,t,a)=>{var r=a(4841),o=1/0;e.exports=function(e){return e?(e=r(e))===o||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},554:(e,t,a)=>{var r=a(8601);e.exports=function(e){var t=r(e),a=t%1;return t==t?a?t-a:t:0}},4841:(e,t,a)=>{var r=a(7561),o=a(3218),n=a(3448),i=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,l=/^0o[0-7]+$/i,m=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(n(e))return NaN;if(o(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=o(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=r(e);var a=s.test(e);return a||l.test(e)?m(e.slice(2),a?2:8):i.test(e)?NaN:+e}},9833:(e,t,a)=>{var r=a(531);e.exports=function(e){return null==e?"":r(e)}}},t={};function a(r){var o=t[r];if(void 0!==o)return o.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,a),n.exports}a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();var r=a(5546);freeaps_determineBasal=r})();
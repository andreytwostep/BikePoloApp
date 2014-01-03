Ext.define('Ext.ux.Timer',{
	xtype:'timer',
	extend:'Ext.Container',
	statics:{
		timeIntervals:{}
	},
	config:{
		name: 'timerView',
		fullSeconds: 1800,
		counts: 0,
		countsTwo: 0,
		time: 600,
		markerTime: 600,
		timeRunning: false,
		stepValue: 1,
		isTimeNCountSeprateCmp: false,
		invalidCountTapTitle: 'Start timer',
		invalidCountTapMsg: 'Start the timer first',
		timeUpSoundUrl: 'resources/sounds/timerSound.mp3',
		timeSoundUrl: '',// every second sound
		bottomHtml: '',
		topHtml: '',
		timerOnly: false,
		timeColor: '#0893D4',
		appId: '321',
		dragStepModular: 2,
		alertMsg:'Time Up'
	},
	getElementConfig:function(){
		return {
			reference:'element',
			className:'x-container',
			children: [{
                reference: 'innerElement',
                className: 'x-inner timerRoot',
				children:[{
					reference:'timerBox',
					cls:'timer',
					children:[{
						reference:'timerCircleBox',
						cls:'timer-circle',
						children:[{
							reference:'timerPie1',
							cls:'timer-pie'
						},{
							reference:'timerPie2',
							cls:'timer-pie timer-fill'
						}]
					},{
						reference:'timerTimeTextBox',
						cls:'time-text',
						children:[{
							tag:'span',
							reference:'minText',
							cls:'big',
							html:'00'
						},{
							tag:'span',
							reference:'secText',
							cls:'medium',
							html:':00'
						}]
					},{
						reference:'timerCountTextBox',
						cls:'timer-count-text',
						children:[{
							reference:'countText',
							cls:'big',
							name: 1,
							html:'00'
						}]
					},{
						reference:'timerCountTextBoxTwo',
						cls:'timer-count-text-two',
						children:[{
							reference:'countTextTwo',
							cls:'big',
							name: 2,
							html:'00'
						}]
					},{
						reference:'marker',
						cls:'marker',
						children:[{
							reference:'markerImage',
							cls:'markerImage'
						}]
					},{
						reference:'decrease',
						cls:'decrease',
						name: 1
					},{
						reference:'decreaseTwo',
						cls:'decreaseTwo',
						name: 2
					}

					]
				}]
			}]
		}
	},
	constructor:function(config){
        var me 		= this;
		config		= config?config:{};
		config		= Ext.applyIf(config, me.config);

		if(!config.items){
			config.items = [];
		}
		config.items.push({
			xtype:'hiddenfield',
			name:config.name+'-time',
			cls:'time',
			ref:'time'
		});
		config.items.push({
			xtype:'hiddenfield',
			name:config.name+'-count',
			cls:'count',
			ref:'count'
		});
		config.items.push({
			xtype:'hiddenfield',
			name:config.name+'-countTwo',
			cls:'count',
			ref:'countTwo'
		});

		var timeUpSoundUrl = config.timeUpSoundUrl;
		if(timeUpSoundUrl!=''){
			var timeUpSoundPlayerId = 'timeUpSound_'+config.name;
			var oldPlayer = Ext.getCmp(timeUpSoundPlayerId);
			if(oldPlayer){
				me.timeUpSound = oldPlayer;
			}else{
				me.timeUpSound = Ext.create('Ext.Audio', {
					url  	: timeUpSoundUrl,
					id		: timeUpSoundPlayerId,
					loop 	: false,
					enableControls: false,
					renderTo:document.body
				});
			}
		}
		var bgSoundUrl = config.timeSoundUrl;
		if(bgSoundUrl!=''){
			var bgSoundPlayerId = 'timerBgSound_'+config.name;
			var oldPlayer2 = Ext.getCmp(bgSoundPlayerId);
			if(oldPlayer2){
				me.bgSound = oldPlayer2;
			}else{
				me.bgSound = Ext.create('Ext.Audio', {
					url  	: bgSoundUrl,
					id		: bgSoundPlayerId,
					loop 	: true,
					enableControls: false,
					renderTo:document.body
				});
			}
		}
		arguments[0] = config;
        me.callParent(arguments);
		me.innerElement.removeCls('x-html');
		me.on('deactivate', me.onDeactivate, me);
		me.marker.on('drag', me.onDrag, me);
		me.marker.on('dragend', me.onDragEnd, me);

		me.countText.on('touchstart', me.onCountTextTouchStart, me);
		me.countText.on('touchend', me.onCountTextTouchEnd, me);
		me.countText.on('tap', me.onCountTextTap, me);
		me.countTextTwo.on('touchstart', me.onCountTextTouchStart, me);
		me.countTextTwo.on('touchend', me.onCountTextTouchEnd, me);
		me.countTextTwo.on('tap', me.onCountTextTap, me);

		me.decrease.on('tap', me.onCountDecreaseTap, me);
		me.decreaseTwo.on('tap', me.onCountDecreaseTap, me);

		me.timerTimeTextBox.on('tap', me.onTimerTimeTextBoxTap, me);
		me.marker.on('tap', me.onTimerTimeTextBoxTap, me);
		me.timerCircleBox.on('tap', me.onTimerTimeTextBoxTap, me);
		if(config.timerOnly){
			me.timerBox.addCls('timerOnly');
			me.timerCountTextBox.hide();
		}
		if(config.timeColor){
			me.timerPie1.setStyle({'background-color':config.timeColor/*, 'border-color':config.timeColor*/});
			me.timerPie2.setStyle({'background-color':config.timeColor/*, 'border-color':config.timeColor*/});
		}
    },
	beforeInitialize:function(){
		var me	= this;
		me.hiddenFieldTime 	= me.child('hiddenfield[ref="time"]');
		me.hiddenFieldCount = me.child('hiddenfield[ref="count"]');
		me.hiddenFieldCountTwo = me.child('hiddenfield[ref="countTwo"]');
		me.callParent(arguments);
	},
	beforeInitConfig:function(){
		this.callParent(arguments);
	},
	onDeactivate:function(){
		this.setTimeRunning(false);
	},
	onCountTextTouchStart:function(e){
		var me	= this;
		me.fireTapEvent = true;
		me.countTextTouchEndEventId = setTimeout(function(){
			clearTimeout(me.countTextTouchEndEventId);
			me.countTextTouchEndEventId=false;
			me.set_Counts(0, true);
			me.fireTapEvent = false;
		}, 2000);
	},
	onCountTextTouchEnd:function(e){
		var me=this;
		if(me.countTextTouchEndEventId){
			clearTimeout(me.countTextTouchEndEventId);
			me.countTextTouchEndEventId=false;
			me.fireTapEvent = true;
		}else{
			me.fireTapEvent = false;
		}
	},
	onTimerTimeTextBoxTap:function(e){
		e.stopEvent();
		var time = this.getTime();
		if(time<1){
			return;
		}
		var timeRunning = this.getTimeRunning();
		if(!timeRunning){
			this.setTimeRunning(true);
			this.startTiming();
		}else{
			this.setTimeRunning(false);
			this.stopTiming();
		}
	},

	// for both counters
	onCountTextTap:function(e, el){
		if(this.fireTapEvent){
			var counter = el.getAttribute('name');
			var counts = (counter == 1) ? this.getCounts()+1 : this.getCountsTwo()+1;
			if(counts>10){
				counts = 0;
			}
			(counter == 1) ? this.set_Counts(counts, counter) : this.set_Counts(counts, counter);
		}
	},

	// for both counters
	onCountDecreaseTap:function(e, el){
		if(this.fireTapEvent){
			var me = this;
			var counter = el.getAttribute('name');
			var counts = (counter == 1) ? this.getCounts()-1 : this.getCountsTwo()-1;
			if((this.getCounts() == 0 && counter == 1) || (this.getCountsTwo() == 0 && counter == 2)){
				counts = 0;
			}
			Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", function(e) {
				if(e == 'yes') {
					(counter == 1) ? me.set_Counts(counts, counter) : me.set_Counts(counts, counter);
				}
			});
		}
	},

	onDragEnd:function(e){
		e.stopEvent( )
	},
	onDrag:function(e){
		e.stopEvent( )
		this.stopTimeUpSound();
		this.setTimeRunning(false);
		this.stopTiming();
		var xy			= this.getXY(), updateLastDeg=true;
		// fix for android
//		var deg			= this.rad2deg(Math.atan2(e.getPageY() - xy.y, e.getPageX() - xy.x))+90;
		var deg			= this.rad2deg(Math.atan2(e.pageY - xy.y, e.pageX - xy.x))+90;

		deg	= deg>0?deg:360+deg;
		if(this.lastDeg){
			if(this.lastDeg>270 && this.lastDeg<=360 && deg>=0 && deg<=180){
				deg = 360;
				updateLastDeg = false;
			}else if(deg>=180 && deg<=360 && this.lastDeg>=0 && this.lastDeg<=90){
				deg = 0;
				updateLastDeg = false;
			}
		}
		if(updateLastDeg){
			this.lastDeg	= deg;
		}
		var dragStepModular = this.getDragStepModular();
		if(dragStepModular>0){
			deg	= Math.round(deg);
			if(deg%dragStepModular==0){
				this.setTimerForDeg(deg);
			}
		}else{
			this.setTimerForDeg(deg);
		}
	},
	setTimerForDeg:function(deg){
		var time		= Math.round(deg*this.getFullSeconds()/360);
		this.setTime(time);
		this.setMarkerTime(time);
	},
	stopTiming:function(clearAll, fireTimeUp){
		var name	= this.getName();
		if(this.self.timeIntervals[name]){
			clearInterval(this.self.timeIntervals[name]);
			delete this.self.timeIntervals[name];
		}
		if(clearAll && this.self.timeIntervals[name+'2']){
			clearTimeout(this.self.timeIntervals[name+'2']);
			delete this.self.timeIntervals[name+'2'];
		}
		if(fireTimeUp){
			this.onTimeUp();
		}
	},
	startTiming:function(){
		var me = this, stepValue = me.getStepValue();
		me.stopTiming(true);
		this.self.timeIntervals[this.getName()]	= setInterval(function(){
			var time	= me.applyTime(me.getTime());
			time		= time-stepValue;
			if(time<=0){
				time=0;
				me.stopTiming(true, true);
			}
			me.setTime(time);
		}, 1000);
	},
	set_Counts:function(v, counter, dontCheckTimeRunning){
		if(!dontCheckTimeRunning && !this.getTimeRunning() && !this.getIsTimeNCountSeprateCmp()){
			Ext.Msg.alert(this.getInvalidCountTapTitle(),this.getInvalidCountTapMsg());
			return;
		}
		counter == 1 ? this.setCounts(v) : this.setCountsTwo(v);
	},

	applyCounts:function(v){
		return v;
	},
	applyTime:function(v){
		if(v < 0){ v = 0; }

		if(v < 1){
			this.setTimeRunning(false);
		}
		return v;
	},
	applyMarkerTime:function(v){
		return v;
	},
	applyTimeRunning:function(v){
		return v;
	},
	updateCounts:function(counts){
		this.hiddenFieldCount.setValue(counts);
		if(!this.countText){
			return;
		}
		counts = Ext.String.leftPad(counts, 2, '0');
		this.countText.setHtml(counts);
	},

	/* second counter */
	updateCountsTwo:function(counts){
		this.hiddenFieldCountTwo.setValue(counts);
		if(!this.countTextTwo){
			return;
		}
		counts = Ext.String.leftPad(counts, 2, '0');
		this.countTextTwo.setHtml(counts);
	},
	/* ------------- */

	updateTime:function(time, oldValue){
		this.Minutes	= Math.floor(time/60);
		this.Seconds	= (time-(this.Minutes*60));
		this.updateTimeText();
		this.updateTimeArcPostion(this.time2deg(time));
		if(oldValue===undefined){
			var t = this.getTime(), mt = this.getMarkerTime();
			this.lastLapValue = (this.lastLapValue?this.lastLapValue:0)+(mt-t);
			this.hiddenFieldTime.setValue(this.lastLapValue);
		}
		if(this.getTimeRunning()){
			this.lastLapValue	= (this.lastLapValue?this.lastLapValue:0)+1;
			this.hiddenFieldTime.setValue(this.lastLapValue);
		}
	},
	updateMarkerTime:function(time){
		this.updateMarkerPostion(this.time2deg(time));
	},
	updateTimeRunning:function(running, oldValue){
		if(running && this.getTime()>0){
			this.startTiming();
			this.startBgSound();
		}else{
			this.stopTiming(true);
			this.stopBgSound();;
		}
	},

	getMinutes:function(){
		if(!this.Minutes){
			this.Minutes = 0;
		}
		return Ext.String.leftPad(this.Minutes, 2, '0');
	},
	getSeconds:function(){
		if(!this.Seconds){
			this.Seconds = 0;
		}
		return Ext.String.leftPad(this.Seconds, 2, '0');
	},
	updateTimeText:function(){
		if(!this.minText){
			return;
		}
		this.minText.setHtml(this.getMinutes());
		this.secText.setHtml(':'+this.getSeconds());
	},
	updateTimeArcPostion:function(deg){
		if(!this.timerCircleBox){
			return;
		}
		deg = this.adjustDeg(deg);
		if(deg>180){
			this.timerCircleBox.addCls('timer-pie180');
		}else{
			this.timerCircleBox.removeCls('timer-pie180');
		}
		this.timerPie1.setStyle('-webkit-transform', 'rotate('+deg+'deg)');
	},
	updateMarkerPostion:function(deg){
		deg = this.adjustDeg(deg);
		this.marker.setStyle('-webkit-transform', 'rotate('+deg+'deg)');
	},
	getXY:function(){
		var timerOuterBox = this.timerCircleBox.getBox();
		return {x:timerOuterBox.x+(timerOuterBox.width/2), y:timerOuterBox.y+(timerOuterBox.height/2)};
	},
	rad2deg:function(radian){
		return radian * 180 / Math.PI % 360;
	},
	adjustDeg:function(deg){
		if(deg>360){
			deg	= deg-360;
		}
		return deg;
	},
	time2deg:function(time){
		return (360*time/this.getFullSeconds());
	},
	setLocalStoreValue:function(name, value){
		var appId = this.getAppId();
		localStorage[appId+'timer_'+this.getName()+'_'+name] = value;
		return value;
	},
	getLocalStoreValue:function(name){
		var appId = this.getAppId();
		var v = localStorage[appId+'timer_'+this.getName()+'_'+name];
		if(v===undefined){
			return 0;
		}
		return v;
	},

	stopTimeUpSound:function(){
		var me = this;
		if(me.timeUpSound && me.timeUpSound.isPlaying()){
			me.timeUpSound.stop();
		}
	},
	startTimeUpSound:function(silent){
		var me = this;
		me.stopBgSound();
		if(me.timeUpSound){
			if(silent){
				this.timeUpSound.setVolume(0);
			}else{
				this.timeUpSound.setVolume(1);
			}
			me.timeUpSound.play();
		}
	},
	stopBgSound:function(){
		var me = this;
		if(me.bgSound && me.bgSound.isPlaying()){
			me.bgSound.stop();
		}
	},
	startBgSound:function(){
		var me = this;
		me.stopTimeUpSound();
		if(me.bgSound){
			me.bgSound.play();
		}
	},
	onTimeUp:function(){
		var me = this;
		me.startTimeUpSound();
		me.fireEvent('timeup');
	},
	destroy:function(){
		this.stopTiming();
		this.callParent();
	},
	applyBottomHtml:function(html){
		if(html.length<1){
			return;
		}
		this.add({
			xtype:'component',
			docked:'bottom',
			cls:'bottomText',
			html:html
		});
	},
	applyTopHtml:function(html){
		if(html.length<1){
			return;
		}
		this.add({
			xtype:'component',
			docked:'top',
			cls:'topText',
			html:html
		});
	}
});

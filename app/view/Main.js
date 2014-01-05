Ext.define('BikePolo.view.Main', {
	extend: 'Ext.tab.Panel',
	xtype: 'main',
	requires: [
		'Ext.TitleBar',
		'Ext.Audio',
		'Ext.field.Hidden',
		'Ext.dataview.List',
		'Ext.plugin.PullRefresh'
	],
	config: {
		activeItem: 1,
		ui: 'dark',
		tabBar: {
			docked: 'bottom',
			layout: {
				pack: 'center'
			}
		},

		items: [
			{
				title: 'Timer',
				iconCls: 'time',

				styleHtmlContent: true,
//				scrollable: true,
				id: 'timerCard',
				items: [
					{
						xtype: 'timer',
						name: 'timer3',
						timeUpSoundUrl: 'resources/sounds/timerSound.mp3',
						fullSeconds: 1800,
						markerTime: 600,
						time: 600,
						isTimeNCountSeprateCmp: false,
						timeColor: '#0893D4'
					}
				]
			},
			{
				title: 'Match',
				iconCls: 'team1',
				layout: 'fit',
				items: [
					{
						xtype: 'match'
					}
//					{
//						docked: 'top',
//						xtype: 'toolbar',
//						title: 'Match',
//						items: [
//							{
//								xtype: 'button',
//								iconCls: 'add',
//								iconMask: true,
//								handler: function(button, e, eOpts) {
//									if(!Ext.getCmp('matchplayerslist')){
//										var playerslist = Ext.widget('matchplayerslist');
//										playerslist.showBy(button);
//									}else{
//										Ext.getCmp('matchplayerslist').destroy();
//										//Ext.getCmp('listPlayers').getStore().clearFilter();
//									}
//
//
//								}
//							},
//							{ xtype: 'spacer' },
//							{
//								xtype: 'button',
//								iconCls: 'add',
//								iconMask: true,
//								handler: function(button, e, eOpts) {
//									if(!Ext.getCmp('matchplayerslisttwo')){
//										var playerslist = Ext.widget('matchplayerslisttwo');
//										playerslist.showBy(button);
//									}else{
//										Ext.getCmp('matchplayerslisttwo').destroy();
//										//Ext.getCmp('listPlayers').getStore().clearFilter();
//									}
//								}
//							}
//						]
//					},
//					{
//						xtype: 'panel',
//						layout: 'hbox',
//						margin: '.5em',
//						height: '100%',
//						items: [
//							{
//								xtype: 'panel',
//								flex: .5,
//								layout: 'fit',
//								items:[
//									{
//										xtype: 'list',
//										id: 'playNowList',
//										store: 'PlayNowStore',
//										margin: '0 .5em 0 0',
//										itemTpl: [
//											'<div style="float: left; margin-bottom: 0.5em" >',
//											'<div class="">{value.name}</div>',
////											'<div class="">{value.createDate}</div>',
//											'</div>'
//										],
//										variableHeights: true
//									}
//								]
//							},
//							{
//								xtype: 'panel',
//								flex: .5,
//								layout: 'fit',
//								items:[
//									{
//										xtype: 'list',
//										id: 'playNowListTwo',
//										store: 'PlayNowStoreTwo',
//										margin: '0 .5em 0 0',
//										itemTpl: [
//											'<div style="float: left; margin-bottom: 0.5em" >',
//											'<div class="">{value.name}</div>',
////											'<div class="">{value.createDate}</div>',
//											'</div>'
//										],
//										variableHeights: true
//									}
//								]
//							}
//
//						]
//					}
				]
			},
			{
				title: 'Players',
				iconCls: 'user',
				layout: 'fit',
				items: [
					{
						xtype: 'players'
					}
				]
			}
		]
	}
});

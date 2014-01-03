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
		activeItem: 2,
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
				title: 'Teams',
				iconCls: 'team1',
				items: [
					{
						docked: 'top',
						xtype: 'toolbar',
						title: 'Teams',
						items: [
							{
								xtype: 'button',
								iconCls: 'add',
								iconMask: true,
								handler: function() {
									var data = BikePolo.app.getController('Data');
									var helper = BikePolo.app.getController('Helper');
									var now = helper.getCurrentDate();

								}
							},
							{ xtype: 'spacer' },
							{
								xtype: 'button',
								iconCls: 'add',
								iconMask: true,
								handler: function(btn) {
								}
							}
						]
					},
					{
						xtype: 'panel',
						layout: 'hbox',
						margin: '.5em',
						height: '100%',
						items: [
							{
								xtype: 'panel',
								flex: .5,
								html: '<h3>First</h3>'
							},
							{
								xtype: 'panel',
								flex: .5,
								html: '<h3>Second</h3>'
							}

						]
					}
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

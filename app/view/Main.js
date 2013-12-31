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
		tabBarPosition: 'bottom',
		activeItem: 2,

		items: [
			{
				title: 'Timer',
				iconCls: 'home',

				styleHtmlContent: true,
				scrollable: true,

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
				iconCls: 'action',
				items: [
					{
						docked: 'top',
						xtype: 'titlebar',
						title: 'Teams'
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
				iconCls: 'favorites',
				layout: 'fit',
				items: [
					{
						xtype: 'playerslist'
					}
				]
			}
		]
	}
});

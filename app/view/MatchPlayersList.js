Ext.define("BikePolo.view.MatchPlayersList", {
	extend: 'Ext.Panel',
	alias: 'widget.matchplayerslist',
	id: 'matchplayerslist',

	requires: [],

	config: {
		layout: 'vbox',
//		hideOnMaskTap: true,
//		modal: true,
		height: '90%',
		width: '90%',
		items: [
			{
				xtype: 'searchfield',
				action: 'searchPlayer',
				placeHolder: 'Search...'
			},
			{
				xtype: 'list',
				flex: .9,
				store: 'LocalSettingsStore',
				action: 'listPlayersForNewMatch',
				mode: 'MULTI',
				grouped: true,
				itemTpl: [
					'<div style="float: left; margin-bottom: 0.5em" >',
					'<div class="">{value.name}</div>',
					'<div class="">{value.createDate}</div>',
					'</div>'
				],
				variableHeights: true
			}
		]
	}
});
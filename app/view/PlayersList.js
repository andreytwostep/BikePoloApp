Ext.define('BikePolo.view.PlayersList', {
	extend: 'Ext.dataview.List',
//	extend: 'Ext.dataview.DataView',
	requires: ['Ext.Button'],
	xtype: 'playerslist',

	config: {
		store: 'LocalSettingsStore',
		id: 'listPlayers',
		sorters: 'key',

		itemTpl: [
			'<div style="float: left; margin-bottom: 0.5em" >',
				'<div class="">{value.name}</div>',
				'<div class="">{value.createDate}</div>',
			'</div>',
			'<div style="float: right;" >',
				'<div class="x-button x-button-action editPlayerBtn">',
					'<span class="x-button-label editPlayer" name="{key}">Edit</span>',
				'</div>',
				'<div class="x-button x-button-decline removePlayerBtn" style="display: none">',
					'<span class="x-button-label removePlayer" name="{key}">Delete</span>',
				'</div>',
			'</div>'
		],
		plugins: [
			{
				xclass: 'Ext.plugin.PullRefresh',
				pullRefreshText: 'Pull down for more records!'
			}
		],
		variableHeights: true,

		items: [
			{
				docked: 'top',
				xtype: 'titlebar',
				title: 'Players',
				items: [
					{
						xtype: 'button',
						text: 'Add new player',
						handler: function() {
							var data = BikePolo.app.getController('Data');
							var helper = BikePolo.app.getController('Helper');
							var now = helper.getCurrentDate();

							Ext.Msg.prompt('New Player', '', function(answer, name) {
									if(answer === 'ok' && name.length > 0){
										data.setData(name+now, {'name': name, 'createDate': now, 'modifyDate':''});
										Ext.getStore('LocalSettingsStore').load();
									}
								},null, false, null,
								{ autoCapitalize : true, placeHolder : 'Name...' }
							);


						}
					},
					{
						xtype: 'button',
						text: 'Edit',
						align: 'right',
//								ui: 'decline',
						id: 'editPlayerBtn',
						value: 0,
						handler: function(btn) {
							var el = Ext.select('.editPlayerBtn');
							if(!btn.value) {
								btn.value = 1;
								el.setStyle('display', 'block');
							}
							else {
								btn.value = 0;
								el.setStyle('display', 'none');
							}

						}
					}
				]
			},

		]
//		useComponents: true,
//		defaultType: 'playeritem'
	}
});

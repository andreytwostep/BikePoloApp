Ext.define('BikePolo.view.Players', {
//	extend: 'Ext.dataview.List',
	extend: 'Ext.Panel',
	requires: ['Ext.Button', 'Ext.field.Search'],
	xtype: 'players',

	config: {
		layout: 'vbox',

		items: [
			{
				docked: 'top',
				xtype: 'toolbar',
				title: 'Players',
				items: [
					{
						xtype: 'button',
//						text: 'Add new player',
						iconCls: 'user_add',
						iconMask: true,
						handler: function() {
							var data = BikePolo.app.getController('Data');
							var helper = BikePolo.app.getController('Helper');
							var now = helper.getCurrentDate();

							Ext.Msg.prompt('New Player', '', function(answer, name) {
									if(answer === 'ok' && name.length > 0){
										data.setData(name+now, {'name': name, 'createDate': now, 'modifyDate':''});
										Ext.getStore('LocalSettingsStore').load();
									}
								}, null, false, null,
								{ autoCapitalize : true, placeHolder : 'Name...' }
							);


						}
					},
					{ xtype: 'spacer' },
					{
						xtype: 'button',
//						text: 'Edit',
						iconCls: 'compose1',
						iconMask: true,
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
			{
				xtype: 'searchfield',
				id: 'searchPlayer',
				placeHolder: 'Search...'
			},
			{
				xtype: 'list',
				flex: .9,
				id: 'listPlayers',
				store: 'LocalSettingsStore',
				grouped: true,
				itemTpl: [
					'<div style="float: left; margin-bottom: 0.5em" >',
					'<div class="">{value.name}</div>',
					'<div class="">{value.createDate}</div>',
					'</div>',
					'<div style="float: right;" >',
					'<div class="x-button x-button-action editPlayerBtn" style="display: none">',
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
				variableHeights: true
			}
		]
	}
});

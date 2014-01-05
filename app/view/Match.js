Ext.define('BikePolo.view.Match', {
	extend: 'Ext.Panel',
	requires: ['Ext.Button', 'Ext.field.Search'],
	xtype: 'match',

	config: {
		layout: 'vbox',

		items: [
			{
				docked: 'top',
				xtype: 'toolbar',
				title: 'Match',
				items: [
					{
						xtype: 'button',
						iconCls: 'add',
						iconMask: true,
						handler: function(button, e, eOpts) {
							if(!Ext.getCmp('matchplayerslist')){
								var playerslist = Ext.widget('matchplayerslist');
								playerslist.showBy(button);
							} else {
								Ext.getCmp('matchplayerslist').destroy();
								//Ext.getCmp('listPlayers').getStore().clearFilter();
							}


						}
					},
					{ xtype: 'spacer' },
					{
						xtype: 'button',
						iconCls: 'add',
						iconMask: true,
						handler: function(button, e, eOpts) {
							if(!Ext.getCmp('matchplayerslisttwo')){
								var playerslist = Ext.widget('matchplayerslisttwo');
								playerslist.showBy(button);
							}else{
								Ext.getCmp('matchplayerslisttwo').destroy();
								//Ext.getCmp('listPlayers').getStore().clearFilter();
							}
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
						layout: 'fit',
						items:[
							{
								xtype: 'list',
								id: 'playNowList',
								store: 'PlayNowStore',
								margin: '0 .5em 0 0',
								itemTpl: [
									'<div style="float: left; margin-bottom: 0.5em" >',
										'<div class="">{value.name}</div>',
										'<div class="">Total result: {value.score.length}</div>',
									'</div>',
									'<div style="float: right;" >',
										'<div class="plusMinus subScore x-button-decline x-button x-iconalign-center x-layout-box-item x-stretched">',
											'<span class="x-button-icon minus2 x-icon-mask" ></span>',
											'<span class="x-button-label" style="display: none;"></span>',
										'</div>',
										'<div class="plusMinus addScore x-button-confirm x-button x-iconalign-center x-layout-box-item x-stretched">',
											'<span class="x-button-icon add1 x-icon-mask"></span>',
											'<span class="x-button-label" style="display: none;"></span>',
										'</div>',
									'</div>'
								],
								variableHeights: true
							}
						]
					},
					{
						xtype: 'panel',
						flex: .5,
						layout: 'fit',
						items:[
							{
								xtype: 'list',
								id: 'playNowListTwo',
								store: 'PlayNowStoreTwo',
								margin: '0 .5em 0 0',
								itemTpl: [
									'<div style="float: left; margin-bottom: 0.5em" >',
									'<div class="">{value.name}</div>',
//											'<div class="">{value.createDate}</div>',
									'</div>'
								],
								variableHeights: true
							}
						]
					}

				]
			}
		]
	}



});

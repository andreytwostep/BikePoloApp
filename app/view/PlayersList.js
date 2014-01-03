Ext.define("BikePolo.view.PlayersList", {
	extend: 'Ext.Container',
	alias: 'widget.menulist',

	requires: [

	],

	config: {
		layout: 'fit',
		height: 200,
		width: 200,
		items: [
			{
				xtype: 'list',
				itemTpl: [
					'<div>{MenuItem}</div>'
				],
				store: 'menuListStore'
			}
		]
	}
});
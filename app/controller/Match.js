Ext.define('BikePolo.controller.Match', {
	extend: 'Ext.app.Controller',
	id: 'matchCtrl',

	config: {
		control: {
			'[action=listPlayersForNewMatch]': {
				selectionchange: 'selectPlayersForMatch',
			},
			'[action=listPlayersForNewMatchTwo]': {
				selectionchange: 'selectPlayersForMatch'
			},
			'#playNowList' : {
				itemtap: 'playersForMatchItemTap',
				itemswipe: 'playersForMatchItemSwipe'
			},
			'#playNowListTwo' : {
				itemswipe: 'playersForMatchItemSwipe'
			}
		}
	},

	init: function () {
		this.callParent();
	},

	selectPlayersForMatch: function (list, record) {
		Ext.Array.each(record, function (item) {
			var mainstore = Ext.getCmp('listPlayers').getStore();
			switch (list.action) {
				case 'listPlayersForNewMatch':
					var store = Ext.getCmp('playNowList').getStore();
					if(store.getCount() < 3) {
						store.add(item.data);
//						mainstore.filter([
//							{filterFn: function(one) { return one.get("key") != item.data.key; }}
//						])
					}
					else if(store.getCount() === 3){
						Ext.getCmp('matchplayerslist').destroy();
						//mainstore.clearFilter();
					}
					break;
				case 'listPlayersForNewMatchTwo':
					var store = Ext.getCmp('playNowListTwo').getStore();
					if(store.getCount() < 3) {
						store.add(item.data);
//						mainstore.filter([
//							{filterFn: function(one) { return one.get("key") != item.data.key; }}
//						])
					}
					else if(store.getCount() === 3){
						Ext.getCmp('matchplayerslisttwo').destroy();
						//mainstore.clearFilter();
					}
					break;
			}
		});
	},

	playersForMatchItemTap: function (list, index, target, record, e, options) {
		var data = BikePolo.app.getController('Data');
		var helper = BikePolo.app.getController('Helper');
		var now = helper.getCurrentDate();

		if(e.target.className.indexOf('subScore') !== -1) {
			Ext.Msg.confirm('Undo', '',
				function(answer) {
					if(answer === 'yes'){
						var score = record.data.value.score;
						if(score) {
							score.pop();
							data.setData(record.data.key, {'name': record.data.value.name, 'createDate': record.data.value.createDate, 'modifyDate': now, 'score': score });
						}
					}
				}
			);
		}
		else if(e.target.className.indexOf('addScore') !== -1) {
			var score = record.data.value.score || [];
			score.push(now);
			data.setData(record.data.key, {'name': record.data.value.name, 'createDate': record.data.value.createDate, 'modifyDate': now, 'score': score });
			Ext.getStore('LocalSettingsStore').load();
		}
	},


	playersForMatchItemSwipe: function(el, index, target, record, e, eOpts) {
		var store = Ext.getCmp(el.id).getStore();
		store.remove(record);
//		Ext.getStore('LocalSettingsStore').clearFilter();

	}

});


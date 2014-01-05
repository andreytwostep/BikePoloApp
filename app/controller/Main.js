Ext.define('BikePolo.controller.Main', {
	extend: 'Ext.app.Controller',
	id: 'mainCtrl',

	config: {
		control: {
			'#listPlayers': {
				itemtap: 'listPlayersItemTap',
				itemswipe: 'listPlayersItemSwipe'
			},
			'[action=searchPlayer]': {
				keyup: 'onPlayerSearchKeyUp',
				clearicontap: 'onPlayerSearchClearIconTap'
			}
		},

		routes: {
//			'smth': 'showSmth',
		}
	},

	init: function () {
		this.callParent();
	},

	listPlayersItemTap: function (list, index, target, record, e, options) {
		var el = e.target;
		var data = BikePolo.app.getController('Data');
		var helper = BikePolo.app.getController('Helper');
		var now = helper.getCurrentDate();

		// tap on edit button
		if(el.className.indexOf('editPlayer') !== -1) {
			Ext.Msg.prompt('Edit Player', '',
				function(answer, name) {
					if(answer === 'ok' && name.length > 0){
						var key = el.getAttribute('name');
						var score = record.data.value.score || [];
						data.setData(key, {'name': name, 'createDate': record.data.value.createDate, 'modifyDate': now, 'score': score });
					}
				},
				null, false, null,
				{ autoCapitalize : true, placeHolder : record.data.value.name }
			);
		}
		// tap on delete button
		else if(el.className.indexOf('removePlayer') !== -1) {
			var key = el.getAttribute('name');
			data.setData(key);
			Ext.getStore('LocalSettingsStore').load();
		}
	},

	listPlayersItemSwipe: function(el, index, target, record, e, eOpts) {
		var rm = e.target.querySelector('.removePlayerBtn');
		if(rm) {
			rm.style.display = (rm.style.display == 'none') ? 'block' : 'none';
		}

	},

	onPlayerSearchKeyUp: function(field) {
		var value = field.getValue(),
			store = Ext.getCmp('listPlayers').getStore();

		store.clearFilter();

		if (value) {
			var searches = value.split(' '),
				regexps = [],
				i;

			for (i = 0; i < searches.length; i++) {
				if (!searches[i]) continue;

				regexps.push(new RegExp(searches[i], 'i'));
			}

			store.filter(function(record) {
				var matched = [];

				for (i = 0; i < regexps.length; i++) {
					var search = regexps[i],
						didMatch = record.get('value').name.match(search);

					matched.push(didMatch);
				}

				if (regexps.length > 1 && matched.indexOf(false) != -1) {
					return false;
				} else {
					return matched[0];
				}
			});
		}
	},

	onPlayerSearchClearIconTap: function() {
		Ext.getCmp('listPlayers').getStore().clearFilter();
	}

});


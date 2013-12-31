Ext.define('BikePolo.controller.Main', {
	extend: 'Ext.app.Controller',
	id: 'mainCtrl',

	config: {
		control: {
			'#listPlayers': {
				itemtap: 'listPlayersItemTap',
				itemswipe: 'listPlayersItemSwipe'
			}
		},

		routes: {
//			'tutoriallearn': 'showTutorialLearn',
//			'tutorialteach': 'showTutorialTeach'
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
						data.setData(key, {'name': name, 'createDate': now, 'modifyDate': now });
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

	}


});


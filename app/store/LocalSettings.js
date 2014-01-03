Ext.define('BikePolo.store.LocalSettings',{
	extend:'Ext.data.Store',
	requires:['Ext.data.proxy.LocalStorage'],
	config:{
		model:'BikePolo.model.LocalSettings',
		storeId:'LocalSettingsStore',

		sorters: 'key',
		grouper: {
			groupFn: function(record) {
				return record.get('value').name[0];
			}
		},

		proxy: {
			type: 'localstorage',
			id  : 'LocalSettingsStoreProxy'
		},
		autoLoad:true
	}
});

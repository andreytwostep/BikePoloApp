Ext.define('BikePolo.store.PlayNow',{
	extend:'Ext.data.Store',
	requires:['Ext.data.proxy.LocalStorage'],
	config:{
		model:'BikePolo.model.LocalSettings',
		storeId:'PlayNowStore',

		proxy: {
			type: 'localstorage',
			id  : 'PlayNowStoreProxy'
		},
		autoLoad:true
	}
});

Ext.define('BikePolo.store.PlayNowTwo',{
	extend:'Ext.data.Store',
	requires:['Ext.data.proxy.LocalStorage'],
	config:{
		model:'BikePolo.model.LocalSettings',
		storeId:'PlayNowStoreTwo',

		proxy: {
			type: 'localstorage',
			id  : 'PlayNowStoreProxy'
		},
		autoLoad:true
	}
});

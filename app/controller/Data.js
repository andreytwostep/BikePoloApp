var undefined;
Ext.define('BikePolo.controller.Data',
	{
		extend: 'Ext.app.Controller',
		config:{
			store:'LocalSettingsStore',
			stores:['LocalSettings']
		},
		applyStore:function(storeId)
		{
			var _store = Ext.StoreManager.lookup(storeId);
			if(!_store)
			{
				_store = Ext.create('BikePolo.store.LocalSettings');
			}
			return _store;
		},
		setData : function (c_name,value)
		{
			var model,i = this.getStore().findExact('key',c_name);
			if(value!==undefined)
			{
				if(i!==-1)
				{
					//update
					model = this.getStore().getAt(i);
					model.set('value',value);
					this.getStore().sync();

				}else{
					//add
					this.getStore().add({key:c_name,value:value});
					this.getStore().sync();

				}
			}else{
				//if exists and new value is undefined remove it
				if(i!==-1)
					this.removeData(c_name);
			}
		},
		getData : function(c_name)
		{
			var i = this.getStore().findExact('key',c_name);
			if(i!==-1)
			{
				return this.getStore().getAt(i).get('value');
			}
			return undefined;
		},

		removeData : function(c_name)
		{
			var i = this.getStore().findExact('key',c_name);
			if(i!==-1)
			{
				this.getStore().removeAt(i);
				this.getStore().sync();
			}
		}
	});
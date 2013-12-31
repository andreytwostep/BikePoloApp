Ext.define('BikePolo.view.PlayerItem', {
	extend: 'Ext.dataview.component.DataItem',
	xtype : 'playeritem',

	config: {
		/**
		 * setup the dataMap. each property is a method in 'this' class, and then
		 * inside that config, it will call the method you pass with the value you
		 * want, form the record
		 */
		dataMap: {
			getName: {
				setHtml: 'key'
			},

//			getKey: {
//				setHtml: 'key'
//			},

		},

		/**
		 * @cfg {Boolean/Object/Ext.Component} name
		 * The component used to show an image. It is an Ext.Component, so we
		 * just want to add a cls so we can style it, and add some flex so it
		 * looks good.
		 */
		name: {
			cls: 'x-name',
			flex: 1
		},

		/**
		 * We give it a hbox layout so the items are horizontally displayed, and then
		 * give it an align of center so they are vertically centered.
		 */
		layout: {
			type: 'hbox',
			align: 'center'
		},

		name: {
			cls: 'x-name',
			flex: 1
		}
	},

//	/**
//	 * Called when you set the {@link #image} configuration.
//	 *
//	 * Uses Ext.factory to return a proper instance using the configuration passed, the
//	 * default component, and the existing instance (if it exists).
//	 *
//	 * This should *never* be called manually. It will be called when you call {@link #setImage}.
//	 */
//	applyImage: function(config) {
//		return Ext.factory(config, Ext.Img, this.getImage());
//	},
//
//	/**
//	 * Called when you set the {@link #image} configuration, and is passed both the new value
//	 * (from applyImage) and the old value.
//	 *
//	 * This should *never* be called manually. It will be called when you call {@link #setImage}.
//	 * @private
//	 */
//	updateImage: function(newImage, oldImage) {
//		if (newImage) {
//			this.add(newImage);
//		}
//
//		if (oldImage) {
//			this.remove(oldImage);
//		}
//	},
//
//	/**
//	 * Called when you set the {@link #name} configuration.
//	 *
//	 * Uses Ext.factory to return a proper instance using the configuration passed, the
//	 * default component, and the existing instance (if it exists).
//	 *
//	 * This should *never* be called manually. It will be called when you call {@link #setName}.
//	 * @private
//	 */
	applyName: function(config) {
		return Ext.factory(config, Ext.Component, this.getName());
	},

	/**
	 * Called when you set the {@link #name} configuration, and is passed both the new value
	 * (from applyName) and the old value.
	 *
	 * This should *never* be called manually. It will be called when you call {@link #setName}.
	 * @private
	 */
	updateName: function(newName, oldName) {
		if (newName) {
			this.add(newName);
		}

		if (oldName) {
			this.remove(oldName);
		}
	}
});

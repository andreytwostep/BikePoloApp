Ext.define('BikePolo.controller.Helper', {
		extend: 'Ext.app.Controller',
		config:{

		},

		getCurrentDate: function() {
			var d = new Date();
			var date = d.getDate();
			var month = d.getMonth() + 1; //Months are zero based
			var year = d.getFullYear();
			var hour = d.getHours();
			var min = d.getMinutes();
			var sec = d.getSeconds();

			var now = date + "-" + month + "-" + year + ' '+ hour + ':' + min + ':' + sec;

			return now;
		}
	}
);
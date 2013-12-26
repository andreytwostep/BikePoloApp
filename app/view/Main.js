Ext.define('321.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
	    'Ext.Audio',
	    'Ext.field.Hidden'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items:[{
                   xtype:'timer',
                   name:'timer3',
                   timeUpSoundUrl:'../sounds/timerSound.mp3',
                   fullSeconds:1200,
                   markerTime:900,
                   time:600,
                   enableState:true,
                   clearState:false,
                   isTimeNCountSeprateCmp:false,
                   timeColor:'#f00',
                   topHtml:'Timer with state enabled, custom values'
                }]
            },
            // {
            //     xtype: 'container',
            //     layout:{
            //        type:'vbox',
            //        align:'center',
            //        pack:'center'
            //     },
            //     items:[{
            //        xtype:'timer',
            //        name:'timer3',
            //        timeUpSoundUrl:'../ext.ux.timer/timerSound.mp3',
            //        fullSeconds:3600,
            //        markerTime:900,
            //        time:600,
            //        enableState:true,
            //        clearState:false,
            //        isTimeNCountSeprateCmp:false,
            //        timeColor:'#f00',
            //        topHtml:'Timer with state enabled, custom values'
            //     }]
            // },
            {
                title: 'Get Started',
                iconCls: 'action',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Getting Started'
                    },
                    {
                        xtype: 'video',
                        url: 'http://av.vimeo.com/64284/137/87347327.mp4?token=1330978144_f9b698fea38cd408d52a2393240c896c',
                        posterUrl: 'http://b.vimeocdn.com/ts/261/062/261062119_640.jpg'
                    }
                ]
            }
        ]
    }
});

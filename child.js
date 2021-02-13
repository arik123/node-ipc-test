const ipc=require('node-ipc');

/***************************************\
 * 
 * You should start both hello and gui
 * then you will see them communicating.
 * 
 * *************************************/

ipc.config.id = 'hello';
ipc.config.retry= 15000;

ipc.connectTo(
    'gui',
    function(){
        ipc.of.gui.on(
            'connect',
            function(){
                ipc.log('## connected to gui ##', ipc.config.delay);
                
            }
        );
        ipc.of.gui.on(
            'disconnect',
            function(){
                ipc.log('disconnected from gui');
            }
        );
        ipc.of.gui.on(
            'WHOIS',
            function(){
                ipc.of.gui.emit(
                    'IAM',
                    "bot1"
                )
            }
        );
        ipc.of.gui.on(
            'getPricelist',
            function(){
                ipc.of.gui.emit(
                    'pricelist',
                    {a: 1, b:2}
                )
            }
        );
        ipc.of.gui.on(
            'kill.connection',
            function(){
                ipc.log('gui requested kill.connection');
                ipc.disconnect('gui');
            }
        );
    }
);

const ipc=require('node-ipc');

/***************************************\
 * 
 * You should start both hello and world
 * then you will see them communicating.
 * 
 * *************************************/

ipc.config.id = 'goodbye';
ipc.config.retry= 15000;

ipc.connectTo(
    'world',
    function(){
        ipc.of.world.on(
            'connect',
            function(){
                ipc.log('## connected to world ##', ipc.config.delay);
            }
        );
        ipc.of.world.on(
            'disconnect',
            function(){
                ipc.log('disconnected from world');
            }
        );
        ipc.of.world.on(
            'WHOIS',
            function(){
                ipc.of.world.emit(
                    'IAM',
                    "bot2"
                )
            }
        );
        ipc.of.world.on(
            'kill.connection',
            function(data){
                ipc.log('world requested kill.connection');
                ipc.disconnect('world');
            }
        );
        ipc.of.world.on(
            'getPricelist',
            function(){
                ipc.of.world.emit(
                    'pricelist',
                    {a: 3, b:4}
                )
            }
        );
    }
);

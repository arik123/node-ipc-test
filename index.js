const ipc=require('node-ipc');

/***************************************\
 *
 * You should start both hello and world
 * then you will see them communicating.
 *
 * *************************************/

ipc.config.id = 'world';
ipc.config.retry= 1500;

var messages={
    goodbye:false,
    hello:false
};
let botSockets = {};

ipc.serve(
    function(){
		setInterval(()=>{
		    console.log("broadcasting")
            ipc.server.broadcast(
                'WHOIS',
                {}
            );
		}, 1000);
        setInterval(()=>{
            Object.keys(botSockets).forEach((a)=>{
                if(botSockets[a].destroyed){
                    botSockets[a] = undefined;
                    return;
                }
                ipc.server.emit(
                    botSockets[a],
                    'getPricelist'
                );

            });
        }, 1000);

        ipc.server.on(
            'IAM',
            (data, socket)=>{
                if(!botSockets[data]){
                    botSockets[data] = socket;
                }
            }
        );
        ipc.server.on(
            'pricelist',
            (data, socket)=>{
                console.log(JSON.stringify(data));
                console.log(data.a)
            }
        );
    }
);




ipc.server.start();

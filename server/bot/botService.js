const builder = require('botbuilder');

//TODO: move all settings to config
let botService = () => {
    let self = this;
    self.address =  {
        conversation:
        { isGroup: true,
            id: '19:867e1e59ab9b4fc79bed40dbc69394d3@thread.skype'
        },
        bot:
        {
            id: '28:f03030fe-01cf-4567-854a-bd43dd87b17f',
            name: 'wishbar_bot'
        },
        serviceUrl: 'https://smba.trafficmanager.net/apis/',
        useAuth: true
    };
    self.connector = new builder.ChatConnector({
        appId: 'f03030fe-01cf-4567-854a-bd43dd87b17f',
        appPassword: 'QpLvzkYsYBXG3YmmM9Y1FqH'
    });
    self.bot = new builder.UniversalBot(self.connector);
    self.bot.dialog('/', (session) => {
        session.send('Гарсон, за работу! (swear)');
    });
    return {
        getConnector: () => { return self.connector },
        sendMessage: (text, errorCallback) => {
            const message = new builder.Message()
                .address(self.address)
                .text(text);
            self.bot.send(message, (err) => {
                if (errorCallback)
                    errorCallback(err)
            })
        }
    };
}

module.exports = botService();

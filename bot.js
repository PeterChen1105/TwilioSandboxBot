// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const {
  ActivityHandler,
  MessageFactory,
  ActivityTypes,
} = require("botbuilder");

class EchoBot extends ActivityHandler {
  constructor() {
    super();
    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    this.onMessage(async (context, next) => {
      const msg = context.activity.text;
      if (msg === "1") {
        const replyText = "Test Text Message";
        await context.sendActivity(MessageFactory.text(replyText, replyText));
      } else if (msg === "2") {
        const reply = { type: ActivityTypes.Message };
        reply.attachments = [
          {
            contentType: "image/jpg",
            contentUrl:
              "https://media.wired.com/photos/5b6df22751297c21002b4536/16:9/w_2400,h_1350,c_limit/HackerBot.jpg",
          },
        ];
        await context.sendActivity(reply);
      }

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      const welcomeText = "Hello and welcome!";
      for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
        if (membersAdded[cnt].id !== context.activity.recipient.id) {
          await context.sendActivity(
            MessageFactory.text(welcomeText, welcomeText)
          );
        }
      }
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }
}

module.exports.EchoBot = EchoBot;

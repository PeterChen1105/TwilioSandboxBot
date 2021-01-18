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
            contentType: "image/jpeg",
            contentUrl:
              "https://www.flaticon.com/svg/vstatic/svg/1766/1766528.svg?token=exp=1610928854~hmac=a370888ab39a1f2a2479e3e28c086f2a",
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

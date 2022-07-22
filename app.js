const { App, subtype } = require("@slack/bolt");
const dotenv = require("dotenv");
dotenv.config();
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackToken = process.env.SLACK_TOKEN;
const port = 3000;

const {
  createRecord,
  deleteRecord,
  updateRecord,
  testData,
  mapfields,
} = require("./airtable");
const { makeInitialOptions, extractValues } = require("./helper");

const {
  firstview,
  secondView,
  appHome,
  submitview,
} = require("./views/modalViews");
const tableId = "Table 1";
let mappedfields = null;
let projectTitle = null;
(async () => {
  mappedfields = await mapfields(tableId);
  console.log(mappedfields);
  projectTitle = Object.keys(mappedfields);
})();

//console.log(slackSigningSecret);
//console.log(slackToken);
const app = new App({
  token: slackToken,
  signingSecret: slackSigningSecret,
});

app.event("app_home_opened", async ({ event, client }) => {
  // console.log(event);
  const view = appHome();
  await client.views.publish({
    user_id: event.user,
    view,
  });
});
app.action("Test", async ({ ack, body, client, logger }) => {
  await ack();
  //console.log(body);
  try {
    const option = [];
    //console.log(projectTitle);
    for (let i = 0; i < projectTitle.length; i++) {
      let testobj = {
        text: {
          type: "plain_text",
          text: `${projectTitle[i]}`,
          emoji: true,
        },
        value: `value-${i}`,
      };
      option.push(testobj);
    }

    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: firstview(option),
    });
  } catch (error) {
    logger.error(error);
  }
});
let id = null;
app.action("static_select-action", async ({ ack, body, client, logger }) => {
  // console.log("hi");
  await ack();

  let test = body.actions[0].selected_option.text.text;
  let primaryfieldID = mappedfields[test];
  id = primaryfieldID;
  //console.log(test);
  console.log(primaryfieldID);
  let testdataValues = await testData(tableId, primaryfieldID);
  console.log("Dataaaaaa", testdataValues);
  const res = makeInitialOptions(testdataValues);
  console.log("res", res);
  const view = secondView(res);
  //console.log(view);
  try {
    const result = await client.views.update({
      view_id: body.view.id,
      hash: body.view.hash,
      view: view,
    });
    //logger.info(result);
  } catch (error) {
    logger.error(error);
  }
});

app.view("submit", async ({ ack, body, view, client, logger }) => {
  await ack();

  console.log("view.state.values", view.state.values);
  const updateval = extractValues(view.state.values);
  console.log(updateval);
  const airtableupdate = await updateRecord(tableId, id, updateval);
  console.log(airtableupdate);
  const sview = submitview();
  try {
    const result = await client.views.update({
      view_id: body.view.id,
      hash: body.view.hash,
      view: sview,
    });
  } catch (error) {
    logger.error(error);
  }
});

(async () => {
  await app.start(port);
  console.log("Bolt app is running");
})();

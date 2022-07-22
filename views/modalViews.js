const { HomeTab, Blocks, Elements } = require("slack-block-builder");

const firstview = (option) => {
  const view = {
    type: "modal",
    callback_id: "view_b",
    title: {
      type: "plain_text",
      text: "Your Review",
      emoji: true,
    },
    close: {
      type: "plain_text",
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "divider",
        block_id: "singleblock",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Pick an item from the dropdown list",
        },
        accessory: {
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "Select the Student",
            emoji: true,
          },
          options: option,
          action_id: "static_select-action",
        },
      },
    ],
  };
  return view;
};

const secondView = (res) => {
  const view = {
    type: "modal",
    callback_id: "submit",
    title: {
      type: "plain_text",
      text: "Your Review",
      emoji: true,
    },
    submit: {
      type: "plain_text",
      text: "Submit",
    },
    close: {
      type: "plain_text",
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "input",
        element: {
          type: "plain_text_input",
          action_id: "plain_text_input-action",
          initial_value: res[0],
        },
        label: {
          type: "plain_text",
          text: "Project Name",
          emoji: true,
        },
      },
      {
        type: "section",
        block_id: "Status",
        text: {
          type: "mrkdwn",
          text: "RYG Status",
        },
        accessory: {
          action_id: "Status",
          type: "static_select",
          initial_option: res[1],
          options: [
            {
              text: {
                type: "plain_text",
                text: "Red",
              },
              value: "value-0",
            },
            {
              text: {
                type: "plain_text",
                text: "Yellow",
              },
              value: "value-1",
            },
            {
              text: {
                type: "plain_text",
                text: "Green",
              },
              value: "value-2",
            },
          ],
        },
      },
      {
        type: "input",
        element: {
          type: "plain_text_input",
          multiline: true,
          action_id: "plain_text_input-action",
          initial_value: res[2],
        },
        label: {
          type: "plain_text",
          text: "Weekly Updates",
          emoji: true,
        },
      },

      {
        type: "section",
        block_id: "StatusSelect",
        text: {
          type: "mrkdwn",
          text: "Status Select",
        },
        accessory: {
          action_id: "StatusSelect",
          type: "static_select",
          initial_option: res[3],
          options: [
            {
              text: {
                type: "plain_text",
                text: "On Hold",
                emoji: true,
              },
              value: "value-0",
            },
            {
              text: {
                type: "plain_text",
                text: "Planning",
                emoji: true,
              },
              value: "value-1",
            },
            {
              text: {
                type: "plain_text",
                text: "Completed",
                emoji: true,
              },
              value: "value-2",
            },
            {
              text: {
                type: "plain_text",
                text: "Canceled",
                emoji: true,
              },
              value: "value-3",
            },
          ],
        },
      },
      {
        type: "section",
        text: {
          type: "plain_text",
          text: "Mark the CheckBoxes",
        },
        accessory: {
          type: "checkboxes",
          action_id: "this_is_an_action_id",
          initial_options: res[4],
          options: [
            {
              value: "A1",
              text: {
                type: "plain_text",
                text: "Resource",
              },
            },
            {
              value: "A2",
              text: {
                type: "plain_text",
                text: "Milestone",
              },
            },
          ],
        },
      },
    ],
  };

  return view;
};
const appHome = () => {
  return HomeTab()
    .blocks(
      Blocks.Header({ text: "Welcome to the App" }),
      Blocks.Section({
        text: "This is an example Slack app \n\n",
      }),
      Blocks.Divider(),
      Blocks.Actions().elements(
        Elements.Button({
          type: "plain_text",
          text: ":new: Update record",
          emoji: true,
        })
          .actionId("Test")
          .primary()
      ),
      Blocks.Section({
        text: "\n",
      })
    )
    .buildToObject();
};
const submitview = () => {
  const view = {
    type: "modal",
    title: {
      type: "plain_text",
      text: "Success",
      emoji: true,
    },
    close: {
      type: "plain_text",
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "section",
        text: {
          type: "plain_text",
          text: "Submission Successful",
          emoji: true,
        },
      },
      {
        type: "image",
        title: {
          type: "plain_text",
          text: "Your update was successful",
          emoji: true,
        },
        image_url:
          "https://media0.giphy.com/media/37nRXpCEP9H1f1WVrb/giphy.gif?cid=ecf05e47lyig90dyfbmfwsqd86h8tdkauy7t2o2m3sb3lc05&rid=giphy.gif&ct=g",
        alt_text: "marg",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>",
        },
      },
    ],
  };
  return view;
};
module.exports = {
  firstview,
  secondView,
  appHome,
  submitview,
};

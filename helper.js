// const e = require("express");

// const Data = {
//   "RYG Status": "Yellow",
//   Milestone: false,
//   "Project Name": "Test 1",
//   "Weekly Updates": "sgsdgsgg",
//   Resource: true,
//   "Status Select": "On Hold",
// };

const makeInitialOptions = (Data) => {
  let color = Data["RYG Status"];
  let status = Data["Status Select"];
  let initialProjectName = Data["Project Name"];
  let initialRYGStatus = null;
  if (color == "Red") {
    initialRYGStatus = {
      text: {
        type: "plain_text",
        text: "Red",
      },
      value: "value-0",
    };
  } else if (color == "Yellow") {
    initialRYGStatus = {
      text: {
        type: "plain_text",
        text: "Yellow",
      },
      value: "value-1",
    };
  } else {
    initialRYGStatus = {
      text: {
        type: "plain_text",
        text: "Green",
      },
      value: "value-2",
    };
  }

  let WeeklyUpdates = Data["Weekly Updates"];
  if (WeeklyUpdates != null) {
    initialWeeklyUpdates = WeeklyUpdates;
  } else {
    initialWeeklyUpdates = "";
  }
  let initialStatusSelect = null;
  if (status == "On Hold") {
    initialStatusSelect = {
      text: {
        type: "plain_text",
        text: "On Hold",
        emoji: true,
      },
      value: "value-0",
    };
  } else if (status == "Planning") {
    initialStatusSelect = {
      text: {
        type: "plain_text",
        text: "Planning",
        emoji: true,
      },
      value: "value-1",
    };
  } else if (status == "Completed") {
    initialStatusSelect = {
      text: {
        type: "plain_text",
        text: "Completed",
        emoji: true,
      },
      value: "value-2",
    };
  } else {
    initialStatusSelect = {
      text: {
        type: "plain_text",
        text: "Canceled",
        emoji: true,
      },
      value: "value-3",
    };
  }
  let initialResource = null;
  if (Data["Resource"] == true) {
    initialResource = {
      value: "A1",
      text: {
        type: "plain_text",
        text: "Resource",
      },
    };
  }
  let initialMilestone = null;
  if (Data["Milestone"] == true) {
    initialMilestone = {
      value: "A2",
      text: {
        type: "plain_text",
        text: "Milestone",
      },
    };
  }
  let initialoptionCheckbox = [];
  const initialValueArr = [];
  initialValueArr.push(initialProjectName);
  initialValueArr.push(initialRYGStatus);
  initialValueArr.push(initialWeeklyUpdates);
  initialValueArr.push(initialStatusSelect);
  if (initialResource != null) initialoptionCheckbox.push(initialResource);

  if (initialMilestone != null) initialoptionCheckbox.push(initialMilestone);
  initialValueArr.push(initialoptionCheckbox);
  console.log(initialValueArr);
  return initialValueArr;
};

const extractValues = (submitObj) => {
  console.log(submitObj);
  const keys = Object.keys(submitObj);
  console.log(keys);

  let projectname = submitObj[keys[0]]["plain_text_input-action"]["value"];
  let rygstatus =
    submitObj[keys[1]]["Status"]["selected_option"]["text"]["text"];
  let weeklyupdates = submitObj[keys[2]]["plain_text_input-action"]["value"];
  let statusselect =
    submitObj[keys[3]]["StatusSelect"]["selected_option"]["text"]["text"];
  let checkbox = submitObj[keys[4]]["this_is_an_action_id"]["selected_options"];
  let resource = true;
  let milestone = true;
  if (checkbox.length == 1) {
    if (checkbox[0]["text"]["text"] == "Resource") {
      milestone = false;
    } else {
      resource = false;
    }
  } else {
  }
  // console.log(projectname);
  // console.log(rygstatus);
  // console.log(weeklyupdates);
  // console.log(statusselect);
  // console.log(resource);
  // console.log(milestone);

  const updatedata = {
    "Project Name": projectname,
    "RYG Status": rygstatus,
    "Weekly Updates": weeklyupdates,
    "Status Select": statusselect,
    Resource: resource,
    Milestone: milestone,
  };

  return updatedata;
};
module.exports = {
  makeInitialOptions,
  extractValues,
};

let Airtable = require("airtable");
let base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE
);

const ids = [];
const names = [];
var keyval = {};
const mapfields = async (tableId) => {
  const records = await base(tableId).select().all();

  records.forEach(function (record) {
    let name = record.get("Project Name");
    let id = record.getId();
    ids.push(id);
    names.push(name);
  });
  for (let i = 0; i < names.length; i++) {
    keyval[names[i]] = ids[i];
  }
  return keyval;
};

const createRecord = (tableId, Data) => {
  console.log("hi");
  console.log(Data);

  // const newfield={
  //     "Project Name": Data.testname,
  //     "RYG Status": Data.rygStatus,
  //     "Weekly Updates": Data.weeklyUpdates,
  //     "Status Select": Data.statusSlect,
  //     "Resource": Data.resource,
  //     "Milestone": Data.milestone,
  // }
  // console.log(newfield);
  base(tableId).create(
    [
      {
        fields: Data,
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        //console.log(record);
        console.log(record.getId());
      });
    }
  );
};

const updateRecord = (tableId, primaryfieldID, Data) => {
  base(tableId).update(
    [
      {
        id: primaryfieldID,
        fields: Data,
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.get("Project Name"));
      });
    }
  );
};

const deleteRecord = (tableId, primaryfieldID) => {
  base(tableId).destroy([primaryfieldID], function (err, deletedRecords) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Deleted", deletedRecords.length, "records");
  });
};

const testData = async (tableId, primaryfieldID) => {
  const records = await base(tableId).find(primaryfieldID);
  console.log("records", records.fields);
  return records.fields;
};

module.exports = {
  createRecord,
  deleteRecord,
  updateRecord,
  testData,
  mapfields,
};

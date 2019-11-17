"use strict";

importScripts("dexie-2.0.4.min.js");
var Wdb;
var db_map = {};

onmessage = function onmessage(e) {
  var function_map = {
    initDB: initDB,
    upsertList: upsertList,
    upsertSingle: upsertSingle,
    getAll: getAll,
    getByIds: getByIds,
    getById: getById,
    deleteAll: deleteAll,
    deleteById: deleteById,
    deleteDB: deleteDB,
    deleteAllDB: deleteAllDB
  };

  function_map[e.data.function](e.data.dbName, e.data.store, e.data.data).then(function (result) {
    postMessage({ uid: e.data.uid, data: result.data, error: result.error });
  });
};

function initDB(dbName, storename, data) {
  return new Promise(function (resolve, reject) {
    Wdb = new Dexie(dbName);
    Wdb.version(1).stores(getStores(data));
    Wdb.open();
    db_map[dbName] = Wdb;
    resolve({ data: null, error: false });
  }).catch(handleError);
}


function upsertList(dbName, store, data) {
  var myDb = getDBInstance(dbName);

  return myDb.open().then(function () {
    var storename = void 0;
    var clean = false;
    if (store instanceof Object) {
      storename = store.name;
      clean = store.clean ? store.clean : false;
    } else {
      storename = store;
    }
    if (clean) {
      myDb[storename].clear().then(function (result) {
        myDb[storename].bulkPut(data);
      });
    } else {
      myDb[storename].bulkPut(data);
    }
  }).then(function () {
    return { data: "array upserted successfully!", error: false };
  }).catch(handleError);
}


function upsertSingle(dbName, storename, data) {
  var myDb = getDBInstance(dbName);
  return myDb.open().then(function () {
    myDb[storename].put(data);
  }).then(function () {
    return { data: "object upserted successfully!", error: false };
  }).catch(handleError);
}


function getAll(dbName, storename, data) {
    var myDb = getDBInstance(dbName);
    return myDb.open().then(function () {
      return myDb[storename].toArray();
    }).then(function (arr) {
      return { data: arr, error: false };
    }).catch(handleError);
}


function getByIds(dbName, storename, data) {
  var myDb = getDBInstance(dbName);
  return myDb.open().then(function () {
    return myDb[storename].where("id").anyOf(data).toArray();
  }).catch(handleError).then(function (arr) {
    return { data: arr, error: false };
  });
}


function getById(dbName, storename, data) {
  var myDb = getDBInstance(dbName);
  return myDb.open().then(function () {
    return myDb[storename].get(data);
  }).catch(handleError).then(function (res) {
    return { data: res, error: false };
  });
}


function deleteAll(dbName, storename, data) {
  var myDb = getDBInstance(dbName);
  return myDb.open().then(function () {
    myDb[storename].clear();
  }).then(function () {
    return { data: "data deleted successfully!", error: false };
  }).catch(handleError);
}


function deleteById(dbName, storename, data) {
    var myDb = getDBInstance(dbName);
    return myDb.open().then(function () {
      myDb[storename].delete(data);
    }).catch(handleError).then(function (res) {
      return { data: "single object deleted successfully!", error: false };
    });
}


function deleteDB(dbName, storename) {
  var myDb = getDBInstance(dbName);
  return myDb.open().then(function () {
    myDb.delete();
  }).then(function () {
    return { data: "data deleted successfully!", error: false };
  }).catch(handleError);
}


function deleteAllDB() {
  for (var dbName in db_map) {
    deleteDB(dbName);
    delete db_map[dbName];
  }
}

function getDBInstance(dbName) {
   return db_map[dbName];
}

function getStores(stores) {
    var schema = {};
    if (stores.length > 0) {
      stores.forEach(function (store) {
        schema[store.db_name] = store.indexed_fields;
      });
    }
    return schema;
  }

function handleError() {
  return { data: null, error: true };
}

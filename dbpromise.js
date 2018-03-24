var DBP = {}

DBP.$exec = function ($function, table, builder) {
  return new Promise(function (resolve, reject) {
    var sql = DB()
    builder ? sql[$function](table).make(builder) : sql[$function](table)
    sql.exec((err, response) => !err ? resolve(response) : reject(Error(err)), '0')
  })
}

global.DB_FINDONE = global.DB_SELECTONE = DBP.findOne = DBP.selectOne = function (table, builder) {
  var $function = 'select'

  return new Promise(function (resolve, reject) {
    var sql = DB()
    builder ? sql[$function](table).first().make(builder) : sql[$function](table).first()
    sql.exec((err, response) => !err ? resolve(response) : reject(Error(err)), '0')

  })
}

global.DB_FINDFIRST = global.DB_SELECTFIRT = DBP.findFirst = DBP.selectFirst = function (table, sortBy, builder) {
  var $function = 'select'

  return new Promise(function (resolve, reject) {
    var sql = DB()
    builder ? sql[$function](table).sort(sortBy, false).first().make(builder) : sql[$function](table).sort(sortBy, false).first()
    sql.exec((err, response) => !err ? resolve(response) : reject(Error(err)), '0')

  })
}

global.DB_FINDLAST = global.DB_SELECTLAST = DBP.findLast = DBP.selectLast = function (table, sortBy, builder) {
  var $function = 'select'

  return new Promise(function (resolve, reject) {
    var sql = DB()
    builder ? sql[$function](table).sort(sortBy, true).first().make(builder) : sql[$function](table).sort(sortBy, true).first()
    sql.exec((err, response) => !err ? resolve(response) : reject(Error(err)), '0')

  })
}

global.DB_INSERT = DBP.insert = function (table, doc, builder) {
  if (typeof doc === 'function') {
    builder = doc
    return DBP.$exec('insert', table, builder)
  }

  return new Promise(function (resolve, reject) {
    var sql = DB()
    builder ? sql.insert(table).set(doc).make(builder) : sql.insert(table).set(doc)
    sql.exec((err, response) => !err ? resolve(response) : reject(Error(err)), '0')
  })
}

global.DB_INSERT_ARRAY = DBP.insertArray = (table, docArray) => {
  return new Promise(function (resolve, reject) {
    var sql = DB()
    sql.push(table, function (collection, callback) {
      collection.insert(docArray, callback)
    })
    sql.exec((err, response) => !err ? resolve(response) : reject(Error(err)), '0')
  })
}

global.DB_SELECT    = DBP.select  = (table, builder) => DBP.$exec('select', table, builder)
global.DB_LISTTING  = DBP.listing = (table, builder) => DBP.$exec('listing', table, builder)
global.DB_DELETE    = DBP.delete  = (table, builder) => DBP.$exec('delete', table, builder)
global.DB_QUERY     = DBP.query   = (query, builder) => DBP.$exec('query', query, builder)
global.DB_COUNT     = DBP.count   = (table, builder) => DBP.$exec('count', table, builder)
global.DB_EXIST     = DBP.exists  = (table, builder) => DBP.$exec('exists', table, builder)

global.DB_PROMISE = DBP
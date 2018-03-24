exports.install = function () {
  F.route('/', view_index)
  // or
  // F.route('/');
}

function view_index () {
  let self = this
  DB_FINDONE('tbl_demo')
    .then(res => self.json(res))
    .catch(err => self.json({error: err}))
}

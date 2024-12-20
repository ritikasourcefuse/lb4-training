'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('product', {
    id: { type: 'string', primaryKey: true },
    title: { type: 'string', notNull: true },
    price: { type: 'int', notNull: true },
    stock: { type: 'int' },
  })
  .then(() => {
    return db.createTable('order', {
      id: { type: 'string', primaryKey: true },
      quantity: { type: 'int', notNull: true },
      productId: { type: 'string', notNull: true },
    })
  })
  .then(() => {
    // Add foreign key constraint for `productId` in `order` table
    return db.addForeignKey('order', 'product', 'fk_order_product', 
      { 'productId': 'id' }, 
      { onDelete: 'CASCADE' }
    );
  })
  .then(() => {
    return Promise.all([
      db.insert("product", ["id", "title", "price", "stock"], [
        "1", "Headphones", 150, 50,
      ]),
      db.insert("product", ["id", "title", "price", "stock"], [
        "2", "Laptop", 1200, 10,
      ]),
      db.insert("product", ["id", "title", "price", "stock"], [
        "3", "Smartphone", 800, 20,
      ]),
    ]);
  })
  .then(() => {
    return Promise.all([
      db.insert("order", ["id", "quantity", "productId"], [
        "1", 2, "1",
      ]),
      db.insert("order", ["id", "quantity", "productId"], [
        "2", 1, "2",
      ]),
    ]);
  });
};

exports.down = function(db) {
  return db.dropTable('order')
    .then(() => db.dropTable('product'));
};

exports._meta = {
  "version": 1
};

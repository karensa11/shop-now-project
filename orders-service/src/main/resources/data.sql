insert into ORDER_DETAILS(id, user_id, status, creation_date)
values(10001, 10001, 'open', sysdate());
insert into ORDER_DETAILS(id, user_id, status, creation_date)
values(10002, 10002, 'open', sysdate());
insert into ORDER_ITEM(id, order_id, catalog_id, quantity)
values(10003, 10001, 1, 3);
insert into ORDER_ITEM(id, order_id, catalog_id, quantity)
values(10004, 10001, 2, 2);
insert into ORDER_ITEM(id, order_id, catalog_id, quantity)
values(10005, 10002, 1, 3);
insert into ORDER_ITEM(id, order_id, catalog_id, quantity)
values(10006, 10002, 2, 2);

insert into ORDER_DETAILS(id, USER_ID, STATUS, CREATION_DATE, UPDATE_DATE)
values(10001, 10001, 'OPEN', sysdate(), sysdate());
insert into ORDER_ITEM(id, order_id, catalog_id, quantity, CREATION_DATE, UPDATE_DATE)
values(10003, 10001, 1, 3, sysdate(), sysdate());
insert into ORDER_ITEM(id, order_id, catalog_id, quantity, CREATION_DATE, UPDATE_DATE)
values(10004, 10001, 2, 2, sysdate(), sysdate());
insert into ORDER_ITEM(id, order_id, catalog_id, quantity, CREATION_DATE, UPDATE_DATE)
values(10005, 10002, 1, 3, sysdate(), sysdate());
insert into ORDER_ITEM(id, order_id, catalog_id, quantity, CREATION_DATE, UPDATE_DATE)
values(10006, 10002, 2, 2, sysdate(), sysdate());

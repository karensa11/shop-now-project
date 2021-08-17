insert into CATEGORY(id, name, description, image_url)
values(1L, 'phones', 'newest phones in the market', 'https://fdn.gsmarena.com/imgroot/news/19/12/top-phones-of-2019/-727/gsmarena_001.jpg');
insert into CATEGORY(id, name, description, image_url)
values(2L, 'accessories', 'find all the accessories you need here', 'https://techengage.com/wp-content/uploads/2019/07/promotional-accessories.jpg');

insert into CATALOG_ITEM(id, category_id, name, description, price, image_url)
values(1L, 1L, 'iphone 11', 'best iphone', 100, 'https://www.phoneplay.co.il/images/itempics/1637_11072021122600.jpg');
insert into CATALOG_ITEM(id, category_id, name, description, price, image_url)
values(2L, 1L, 'iphone 12', 'best iphone', 100, 'https://ksp.co.il/shop/items/512/124953.jpg');
insert into CATALOG_ITEM(id, category_id, name, description, price, image_url)
values(3L, 1L, 'samsung s10', 'cool phone with 3 cameras', 200, 'https://img.zap.co.il/3/4/2/4/49354243c.gif');

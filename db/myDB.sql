-- Create section

CREATE TABLE users (
    user_id SERIAL NOT NULL,
    user_name VARCHAR(225) UNIQUE NOT NULL CONSTRAINT users_pk PRIMARY KEY,
    password VARCHAR(255) NOT NULL, 
    gender VARCHAR(1)
);

CREATE TABLE items (
    item_id SERIAL NOT NULL CONSTRAINT items_pk PRIMARY KEY,
    item VARCHAR(45) NOT NULL, 
    item_type VARCHAR(45) NOT NULL,
    remark VARCHAR(45),
    cost_id INT NOT NULL CONSTRAINT item_fk REFERENCES cost(cost_id),
    date_id INT NOT NULL CONSTRAINT item_fk2 REFERENCES date(date_id),
    user_name VARCHAR(225) NOT NULL CONSTRAINT items_fk3 REFERENCES users(user_name)
);

CREATE TABLE cost (
    cost_id SERIAL NOT NULL CONSTRAINT cost_pk PRIMARY KEY,
    cost DECIMAL NOT NULL,
    cost_type VARCHAR(45) NOT NULL
);

CREATE TABLE date (
    date_id SERIAL NOT NULL UNIQUE CONSTRAINT date_pk PRIMARY KEY,
    date date NOT NULL
);

CREATE TABLE total (
    id SERIAL NOT NULL CONSTRAINT total_pk PRIMARY KEY,
    total DECIMAL NOT NULL
);

-- Insert/Select section
INSERT INTO users (user_name, password, gender)
    VALUES  ('admin', 'admin', 'M'),
            ('tester', 'tester', 'M');

INSERT INTO date (date)
    VALUES  ('05-29-2019'),
            ('06-01-2019'),
            ('06-01-2019'),
            ('06-03-2019');

INSERT INTO cost (cost, cost_type)
    VALUES  (20.99, 'Expense'),
            (11.02, 'Expense'),
            (504.32, 'Income'),
            (30.51, 'Expense');

INSERT INTO items (item, item_type, remark, cost_id, date_id, user_name) 
    VALUES  ('Walmark', 'Food', 'shoes', 1, 1, 'admin'),
            ('BBQ', 'Food', '', 2, 2, 'tester'),
            ('Admin salary', 'Salaries and wages', 'May', 3, 3, 'admin'),
            ('Walmart', 'Food', 'ice cream', 4, 4, 'admin');

INSERT INTO items (item_id, item, item_type, cost, cost_type, remark, date, user_name) 
    VALUES (DEFAULT, 'Rent', 'Utility Expenses', 573, 'Income', '??', current_timestamp, 'adrian');


INSERT INTO totals (id, total, user_id, item_id)
VALUES (DEFAULT, 10, (SELECT user_id FROM users WHERE user_name='tester'), (SELECT item_id FROM items WHERE item_type='food'));

-- ------- --
-- select items, cost, date
SELECT i.user_name, i.item_id, i.item, i.item_type, i.remark, (SELECT c.cost FROM cost c WHERE c.cost_id = i.cost_id) AS cost, (SELECT c.cost_type FROM cost c WHERE c.cost_id = i.cost_id) AS cost_type, (SELECT d.date FROM date d WHERE d.date_id = i.date_id) AS date FROM items i WHERE i.user_name = 'admin' ORDER BY date;

SELECT i.user_name, I.item_id, i.item, i.item_type, i.remark, c.cost, c.cost_type, d.date FROM items i, INNER JOIN cost c ON i.cost_id = c.cost_id INNER JOIN date d ON i.date_id = d.date_id WHERE i.user_name = 'admin';

-- ------- --
SELECT u.user_name, i.item_id, i.item, i.item_type, c.cost, c.cost_type, i.remark, d.date FROM users u, items i, cost c, date d WHERE u.user_name='admin' ORDER BY d.date;
    
-- UNION JOIN
SELECT user_name FROM users WHERE user_name='admin'
UNION ALL
SELECT item_id, item, item_type, remark FROM items WHERE user_name='admin'
UNION ALL
SELECT cost, cost_type FROM cost WHERE user_name='admin'
UNION ALL
SELECT date FROM date WHERE user_name='admin';


-- Command my DB
CREATE USER adrianyim WITH PASSWORD 'adrianyim';
GRANT SELECT, INSERT, UPDATE, DELETE ON users TO adrianyim;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO adrianyim;

CREATE USER adrian WITH password 'adrianyim';
GRANT SELECT, INSERT, UPDATE ON users TO adrian;
GRANT USAGE, SELECT ON users_id_seq TO adrian;

SELECT * FROM summary s LEFT JOIN users u ON u.user_id = s.user_id LEFT JOIN items i ON i.item_id = s.item_id;

DROP TABLE users, items;

UPDATE items 
SET item = 'Update item1', item_type='Changed item type', cost=9090, cost_type='Income', remark='Testing the updates'
WHERE item_id = 16;

ALTER TABLE users
    ALTER COLUMN password NOT NULL;

DELETE FROM users WHERE user_id IN (34-46);

DELETE FROM users WHERE user_name="adrian";

-- Set timezone/date style to mountain standard time
SET TIMEZONE='MST';
SET DATESTYLE TO SQL,US;
SET DATESTYLE TO "SQL, US";
SELECT NOW();
SHOW datestyle;
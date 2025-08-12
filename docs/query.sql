DROP TABLE IF EXISTS platform, status, invoices, transactions, client CASCADE


DROP TABLE IF EXISTS platform;
CREATE TABLE platform(
		id_platform SERIAL PRIMARY KEY,
		name_platform VARCHAR(255) NOT NULL,
		create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS statuses;
CREATE TABLE statuses(
		id_statu SERIAL PRIMARY KEY,
		name_statu VARCHAR(255) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
		
		
DROP TABLE IF EXISTS invoices;
CREATE TABLE invoices(
		invoice_number VARCHAR(250) PRIMARY KEY,
		invoice_period DATE NOT NULL,
		invoice_amount DECIMAL(6, 2) NOT NULL,
		amount_paid DECIMAL(6, 2) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS client;
CREATE TABLE client(
		id_client SERIAL PRIMARY KEY,
		full_name VARCHAR(255) NOT NULL,
		indetification VARCHAR(20) UNIQUE NOT NULL,
		direction VARCHAR(255) NOT NULL,
		phone VARCHAR(30) NOT NULL,
		email VARCHAR(255) UNIQUE NOT NULL,
		id_platform INTEGER,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		
		FOREIGN KEY (id_platform) REFERENCES platform(id_platform) ON DELETE SET NULL ON UPDATE CASCADE
		);
		
		
		
DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions(
		id_transation VARCHAR(250) PRIMARY KEY,
		date_time TIMESTAMP NOT NULL,
		id_client INTEGER,
		invoice_number VARCHAR(250) NOT NULL,
		transaction_type VARCHAR(150) NOT NULL,
		transaction_amount DECIMAL(6, 2) NOT NULL,
		id_statu INTEGER,
		FOREIGN KEY (id_client) REFERENCES client(id_client) ON DELETE SET NULL ON UPDATE CASCADE,
		FOREIGN KEY (invoice_number) REFERENCES invoices(invoice_number) ON DELETE SET NULL ON UPDATE CASCADE,
		FOREIGN KEY (id_statu) REFERENCES statuses(id_statu) ON DELETE SET NULL ON UPDATE CASCADE
		);
		
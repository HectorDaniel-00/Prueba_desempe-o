# Financial Information Management System - ExpertSoft

## 📌 Description

This project was developed for a client in the Colombian electric sector, who faced challenges managing financial information from platforms such as Nequi and Daviplata. The original data was scattered and disorganized across multiple Excel (.xlsx) files.

The system enables:
- Data normalization and structuring into a SQL database.
- Bulk data loading from CSV files.
- CRUD operations via a REST API.
- Key insights through advanced query endpoints.


## 🛠️ Technologies Used
- **Backend**: Node.js, Express, Cors, cvs-parser, pg-format
- **Database**: Postgres
- **Tools**: Draw.io, Excel to CSV conversion


## libraries that you have to download
- **node**
- **cors**
- **express**
- **csv-parser**
- **pg**
- **pg-format**


## 🧩 Project Structure
- `controllers` - API with CRUD and advanced queries.
- `config` - `.sql` script to initialize the database.
- `data` - CSV files prepared for data insertion.
- `docs` - Relational model (image).
- `routes` 
- `seed`
- `app.js`

## 🛢️ How to Run the Project

1. Clone the repository.
2. Create the database using the SQL script in `/docs/database.sql`.
3. Raise the database in `/config/db.js`.
4. Execute the command `node config/db.js`
4. Prepare the `.csv` files in the `/data` folder.
5. Run the bulk load script manually.
6. Start server: `node app.js`.

## 🔍 Advanced Queries

Available endpoints in Postman:

1. **Total paid by each client**
2. **Pending invoices with client and transaction info**
3. **Transactions filtered by platform (Nequi or Daviplata)**

## 👤 Developer

- **Name**: Hector Vargas
- **Clan**: Manglar


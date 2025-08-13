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


## 📂 Database Normalization
The original Excel file was analyzed and manually normalized following the **First Three Normal Forms (1NF, 2NF, 3NF)**:
1. **1NF** – Removed repeating groups and ensured atomic values.
2. **2NF** – Eliminated partial dependencies by creating separate tables for entities such as **Customers**, **Invoices**, **Transactions**, **Transaction Types**, **Transaction Status**, and **Platforms**.
3. **3NF** – Removed transitive dependencies, keeping only attributes directly related to the primary key in each table.

The final **relational model** ensures data integrity, avoids redundancy, and supports efficient queries


## 💾 Database Creation (DDL)
The database is created with the script `database.sql` located in the `/docs` folder.  
Run the following command to create the database:

```bash
psql -u postgres -d pd_hector_vargas_manglar -f database.sql
```


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


---

## 📌 How to Run the Project
1. Clone the repository:
```bash
git clone https://github.com/HectorDaniel-00/Prueba_desempe-o
```
2. Install dependencies:
```bash 
npm install
npm i cors express csv-parser pg pg-format 
```
3. Import the database:
```bash
psql -u postgres -d pd_hector_vargas_manglar -f database.sql
```
4. Start the server:
```bash
npm app.js
```
6. Test endpoints using Postman with the provided collection.

---


## 🖥 CRUD API
The **CRUD** was implemented for the `transiction` entity. 

### Endpoints
| Method | Endpoint                                 | Description               |
|--------|------------------------------------------|---------------------------|
| GET    |  `/api/v1/transaction/get`               | Get all transactions      |
| GET    |  `/api/v1/transaction:id`                | Get a tramsactions by ID  |
| POST   |  `/api/v1/transaction/create`            | Create a new transaction  |
| PUT    |  `/api/v1/transaction/update/:id`        | Update transaction info   |
| DELETE |  `/api/v1/transaction/delete/:id`        | Delete a transaction      |


## 📂 Project Structure
```
├── app.js
├── config
│   └── db.js
├── controllers
│   └── consulta.controller.js
├── data
│   ├── client.csv
│   ├── invoices.csv
│   ├── platform.csv
│   ├── statuses.csv
│   └── transactions.csv
├── docs
│   ├── database.sql
│   └── modelo-relacional.drawio (1) copy.png
├── package.json
├── package-lock.json
├── README.md
├── routes
│   └── route.js
└── seed
    ├── seed_clients.js
    ├── seed_invoices.js
    ├── seed_platform.js
    ├── seed_status.js
    └── seed_transactions.js
```
---


## 👤 Developer

- **Name**: Hector Vargas
- **Clan**: Manglar

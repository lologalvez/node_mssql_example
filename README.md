# NodeJS & SQL Server example
This is a working example of how to connect NodeJS with a SQL Server instance running on a Docker container.

It uses:
* [Docker-compose](https://docs.docker.com/compose/) to pull & run an instance of SQL Server Express.
* [ExpressJS](https://expressjs.com/) to run a the web server.
* [mssql](https://www.npmjs.com/package/mssql) module to connect and query the dockerized instance of SQL Server from the ExpressJS app.

## How to run it
**Step 1**: Download and run the Docker container of SQL Server Express in detached mode. Remember to modify the dummy password from *docker-compose.yml* when required.
```bash
docker-compose up -d
```

**Step 2**: Launch running docker container bash
```bash
docker exec -it sql-server-db bash
```

**Step 3**: Launch sqlcmd tool to create databases and tables as per requirements
```bash
opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "DummyPassword123#"
```
```sql
CREATE DATABASE dummydb
GO
USE dummydb
GO
CREATE TABLE dummy_table (id INT, name NVARCHAR(50), status INT)
GO
INSERT INTO dummy_table VALUES (1, 'John', 0)
```


**Step 4**: Add custom query to *index.js*
```javascript
sql.connect(config)
    .then(conn => conn.query(`SELECT * FROM dummy_table;`))
```


**Step 5**: Run the ExpressJS web server
```bash
node .
```




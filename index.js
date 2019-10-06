const express = require('express')
const app = express()

app.get('/', (req, res) => {

    sql = require('mssql')

    // Connection config object
    const config = {
        user: 'SA',
        password: 'DummyPassword123#',
        server: '172.17.0.2'
    }

    // Connection
    sql.connect(config)
        .then(conn => conn.query(`SELECT * FROM users;`))
        .then(cursor => res.json(cursor.recordset))
        .then(() => sql.close())
        .catch(err => {
            console.log(err)
            conn.close()
        })
})

const server = app.listen(5000, () => console.log('Server is running on port 5000...'))

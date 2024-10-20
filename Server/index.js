import express from 'express';
import cors from 'cors';
import pg from "pg";
import { format } from 'date-fns';


const app = express()
const port = 3000;


const host = "aws-0-eu-central-1.pooler.supabase.com";
const databaseName = "postgres";
const user = "postgres.rlzivsmkflkmwzqxuttc";
const portgres = 6543;
const { Pool } = pg;

var data = [
    {
        id: 1,
        reference: "123",
        company: "XYZ Corphhbhbhbh",
        driver: "John Doehhbhbhbh",
        registration: "AB123CDjbbjbjbj",
        date: "2024-10-19"
    },
];

app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: host,
    database: databaseName,
    user: user,
    password: "#RNRAPP2024",
    port: portgres  // Default PostgreSQL port
})

function transformData(insert) {
    const newData = insert.rows.map((item) => {

        const formattedDate = format(item.breakdown_date, 'yyyy-MM-dd');

        return {
            id: item.id,
            reference: item.breakdown_reference,
            company: item.company_name,
            driver: item.driver_name,
            registration: item.registration_number,
            date: formattedDate


        };
    });



    return newData
}


//data init 
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Breakdowns');
        console.log(result.rows);




        // Transform 
        const newData = transformData(result)

        //Send data
        res.json(newData);
        console.log('Data sent');
    } catch (err) {
        console.error('Error fetching data from the database:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


app.post('/post', async (req, res) => {
    const { reference, company, driver, registration, date } = req.body;  

    console.log('Received data:', req.body);

    try {
        // Insert new data into the database
        const query = `
            INSERT INTO Breakdowns (breakdown_reference, company_name, driver_name, registration_number, breakdown_date)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;
        const values = [reference, company, driver, registration, date];

        const result = await pool.query(query, values);  

        const resultDone = await pool.query('SELECT * FROM Breakdowns');
        //Return all new rows
        const newData = transformData(resultDone)
        console.log("this is new : ", newData);

        res.status(201).json({
            message: 'Data inserted successfully',
            insertedData: result.rows[0],
            currentData: newData
            // Return the inserted row
        });
    } catch (err) {
        console.error('Error inserting data into the database:', err);
        res.status(500).json({ error: 'Failed to insert data' });
    }
});



app.patch('/update/:id', async (req, res) => {
    // Get the id and updated data from the request
    const id = parseInt(req.params.id, 10);
    const itemUpdates = req.body;

    try {
        // Check if the item exists in the database
        const checkQuery = 'SELECT * FROM Breakdowns WHERE id = $1';
        const checkResult = await pool.query(checkQuery, [id]);

        if (checkResult.rows.length === 0) {
            // If the item is not found, send a 404 response
            return res.status(404).json({ message: 'Item not found' });
        }

        // Update the item in the database with the provided data
        const updateQuery = `
            UPDATE Breakdowns
            SET breakdown_reference = COALESCE($1, breakdown_reference),
                company_name = COALESCE($2, company_name),
                driver_name = COALESCE($3, driver_name),
                registration_number = COALESCE($4, registration_number),
                breakdown_date = COALESCE($5, breakdown_date)
            WHERE id = $6
            RETURNING *;
        `;

        const { reference, company, driver, registration, date } = itemUpdates;
        const updateValues = [reference, company, driver, registration, date, id];

        const updateResult = await pool.query(updateQuery, updateValues);

        // Fetch the updated list of data from the database
        const resultDone = await pool.query('SELECT * FROM Breakdowns');
        const newData = transformData(resultDone);

        // Return the updated data to the client
        res.status(200).json({
            message: 'Data updated successfully',
            updatedData: updateResult.rows[0],
            currentData: newData
        });

    } catch (err) {
        console.error('Error updating data in the database:', err);
        res.status(500).json({ error: 'Failed to update data' });
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
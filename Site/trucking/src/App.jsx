


import background from './assets/truck.jpg'
import Card from './components/card'
import CardData from './components/card_data'
import Head from './components/header'
import { useState } from 'react'
import { Modal } from "antd";
import Update from './components/update'
import { format } from 'date-fns';
import { useEffect } from 'react'
import axios from 'axios';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';



function App() {

  const [startDate, setStartDate] = useState(new Date());
  const [reference, setReference] = useState('');
  const [company, setCompany] = useState('');
  const [driver, setDriver] = useState('');
  const [registration, setRegistration] = useState('');

  const [modalReference, setModalReference] = useState('');
  const [modalCompany, setModalCompany] = useState('');
  const [modalDriver, setModalDriver] = useState('');
  const [modalRegistration, setModalRegistration] = useState('');
  const [formattedDate, setFormattedDate] = useState('');


  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);

  const [selectedId, setSelectedId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {

    const fetchData = async () => {
      try {

        setIsLoading(true)

        const response = await axios.get('http://localhost:3000/');

        console.log(response.data);

        setData(response.data.reverse());
        setIsLoading(false)

      } catch (error) {
        setIsLoading(false)
        console.error('Error fetching data: ', error);
      } finally {
        setIsLoading(false)
        console.log("data loaded")
      }
    };

    //fetch data on init
    fetchData();
  }, []);



  const post = async (reference, company, driver, registration, date) => {


    try {
      setIsLoading(true)
      const formattedDate = format(date, 'yyyy-MM-dd');

      // data to send
      const data = {
        reference: reference,
        company: company,
        driver: driver,
        registration: registration,
        date: formattedDate
      }


      // post to server
      const response = await axios.post('http://localhost:3000/post', data);

      // response from server
      console.log('Response from server:', response.data);

      //update data
      setData([...response.data.currentData].reverse());

      setReference('');
      setCompany('');
      setDriver('');
      setRegistration('');
      setStartDate(new Date());
      setIsLoading(false)
    } catch (error) {


      setMessage("Something went wrong");
      setShowAlert(true);
      setIsLoading(false)

      console.error('Error during POST request:', error);
    }
  };



  const update = async (id, updates) => {
    try {
     
      const response = await axios.patch(`http://localhost:3000/update/${id}`, updates);
      console.log('Response from server:', response.data);

      setData([...response.data.currentData].reverse());

      setModalReference('');
      setModalCompany('');
      setModalDriver('');
      setModalRegistration('');
      setFormattedDate('');
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('Error during PATCH request:', error);
      alert("something went wrong while updating");
    }
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const updates = {
      reference: modalReference,
      company: modalCompany,
      driver: modalDriver,
      registration: modalRegistration,
      date: formattedDate
    };


    await update(selectedId, updates);
    setOpen(false);
    setIsLoading(false)


  };

  const handleOpenModal = (id) => {
    const selectedData = data.find((item) => item.id === id);
    if (selectedData) {
      setSelectedId(id);
      setModalReference(selectedData.reference);
      setModalCompany(selectedData.company);
      setModalDriver(selectedData.driver);
      setModalRegistration(selectedData.registration);
      setFormattedDate(selectedData.date); // Set initial date if needed
      setOpen(true);
    }
  };


  const completeFields = () => {
    // Check if the fields are not empty
    if (
      reference.trim() === '' ||
      company.trim() === '' ||
      driver.trim() === '' ||
      registration.trim() === ''
    ) {
      return false;
    } else {
      return true;
    }

  };



  const handlePost = async (e) => {
    e.preventDefault();

    const ref = checkReference(reference)

    if (ref) {

      setMessage('Please Choose another reference, this reference has already been used')
      setShowAlert(true);

    } else {

      const isFilled = completeFields()

      if (isFilled) {
        await post(reference, company, driver, registration, startDate);
      } else {
        setMessage("Please fill in all fields")
        setShowAlert(true);
      }

    }


  }

  const checkReference = (ref) => {

    const exists = data.some(item => item.reference === ref);

    if (exists) {
      console.log(`Reference ${ref} already exists.`);
      return true; // Reference exists
    } else {
      console.log(`Reference ${ref} is available.`);
      return false; // Reference does not exist
    }
  };



  const bck = {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'

  }

  const layer = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%'

  }

  const outerLayer = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',

    height: "90vh"
  }



  return (

    <div style={bck}>
      <Head></Head>


      <div style={outerLayer}>
        {showAlert && (
          <Alert severity="warning" onClose={() => setShowAlert(false)} style={{ position: 'absolute', top: 20, left: 20 }}>
            <AlertTitle>Warning</AlertTitle>
            {message}
          </Alert>
        )}

        


        <div style={layer}>

          <Card
            startDate={startDate}
            setStartDate={setStartDate}

            reference={reference}
            setReference={setReference}

            company={company}
            setCompany={setCompany}

            driver={driver}
            setDriver={setDriver}

            registration={registration}
            setRegistration={setRegistration}

            // date={date}
            // setDate={setDate}

            onPressed={handlePost}

          />
          
          <CardData
            data={data}
            onClick={handleOpenModal}
            isLoading = {isLoading}
          />

          <Modal
            centered
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
            width={1000}
          >
            <Update
              startDate={formattedDate}
              setStartDate={setFormattedDate}
              reference={modalReference}
              setReference={setModalReference}
              company={modalCompany}
              setCompany={setModalCompany}
              driver={modalDriver}
              setDriver={setModalDriver}
              registration={modalRegistration}
              setRegistration={setModalRegistration}
              isLoading = {isLoading}

              onPressed={handleUpdate}
            />
          </Modal>

        </div>
      </div>
    </div>


  )
}

export default App

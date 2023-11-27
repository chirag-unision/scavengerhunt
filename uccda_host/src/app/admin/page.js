"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { read, utils } from 'xlsx';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Home() {
  const [data, setData]= useState([]);
  const [currslots, setCurrSlots]= useState([]);
  const [slots, setSlots]= useState("");
  const [status, setStatus]= useState(false);
  const [resetpass, setResetPass] = useState("");

 

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = utils.sheet_to_json(worksheet);
            setData(json);
            console.log(json);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
  }

  const setSlotData= (e)=> {
    setSlots(e.target.value)
  }

  const sendData= ()=> {
    if(data && slots) {
      console.log('clicked',slots);
      
      axios.post('http://uccdacellymca.site/addCampaign', {
        teamsData: data,
        // slots: JSON.parse(slots)
      })
      .then(function (response) {
        console.log(response);
        if(response?.data?.status ==200){
          setStatus(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    }
  }

  const resetCampaign = () =>{
    if(resetpass){
        
      console.log('clicked',slots);
      
      axios.post('https://739b-2401-4900-1c67-5391-8d5d-3318-3d9a-b691.ngrok-free.app/resetcampaign', {
        id: 1,
        password : resetpass
      })
      .then(function (response) {
        console.log(response);
        if(response?.data?.status == 200){
          setStatus(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    }
  }

  const getStatus = () =>{
    axios.post('https://739b-2401-4900-1c67-5391-8d5d-3318-3d9a-b691.ngrok-free.app/getcampaignstatus', {
      id: 1
    })
      .then(function (response) {
        console.log(response.data);
        if(response.data.status==100)
        setStatus(true)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const setPass= (e)=> {
    setResetPass(e.target.value)
  }

  useEffect(()=> {
    getStatus();

    axios.get('http://uccdacellymca.site/getAllSlots')
    .then(function (response) {
      // handle success
      console.log(response);
      setCurrSlots(response.data.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }, [])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-5 lg:p-20 pt-24 ${inter.className}`}
    >
      <div className="fixed top-0 -left-20 flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]"></div>
      <div className="fixed -top-10 right-0 flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]"></div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p onClick={()=>{sessionStorage.removeItem('admin_id')}} className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Logout
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/manan_logo.png"
              alt="Vercel Logo"
              className=""
              width={50}
              height={50}
              priority
            />
            Manan - A Techno Surge
          </a>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full justify-between">
        <div className='flex-1 m-2'>
          <div className='w-full m-1 border-2 p-4 border-sky-700 rounded-md bg-sky-700 bg-opacity-10'>
            {!status && <div>
              <h2>Campaign Status: Off</h2>
              <form>
                <label htmlFor="upload">Upload File</label>
                <input
                    type="file"
                    name="upload"
                    id="upload"
                    onChange={readUploadFile}
                />
                {data?.length !== 0 && <h3>File Read Successfully!</h3>}
                {/* <textarea
                    type="text"
                    name="slot"
                    id="slot"
                    placeholder="Json Data"
                    onInput={setSlotData}
                    className="flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30"
                />
                <p>{'[{"startTime": "12 June : 2pm", "endTime": "12 June : 4pm", "available": "20"}]'}</p> */}
              </form>
              <button 
                onClick={sendData}
                className="flex m-4 w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-2 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30">
                Submit
              </button>
            </div>}
            {status && <div >
              <h2>Campaign Status: <b>On</b></h2>
                <input
                    className='m-auto backdrop-blur-2xl bg-transparent border-[1px] md:w-1/3  w-full rounded-md p-1 block text-center'
                    placeholder='Reset Password'
                    type="text"
                    name="password"
                    id="pass"
                    onChange={setPass}
                />
              <button 
                onClick={resetCampaign}
                className="flex m-4 w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-2 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30">
                Delete Campaign
              </button>
            </div>}
          </div>
          {currslots?.map((item,i)=>{
            return(
          <div key={i} className='w-full flex justify-between items-center m-1 border-2 p-4 border-sky-700 rounded-md bg-sky-700 bg-opacity-10'>
              <div className="px-5 py-4">
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Slot No.{i+1}
                  <span className="inline-block">
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  {item.startTime} -- {item.endTime}
                </p>
              </div>
              <span className="inline-block text-5xl mr-2">
                {item.available}
              </span>
          </div>

          )})}
          <div className='hidden w-full flex justify-between items-center m-1 border-2 p-4 border-sky-700 rounded-md bg-sky-700 bg-opacity-10'>
            <div className="px-5 py-4">
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Slot No.{' '}
                <span className="inline-block">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                12:00 P.M.
              </p>
            </div>
            <span className="inline-block text-5xl mr-2">
              {'20'}
            </span>
          </div>
        </div>
        <div className='flex-1 m-3 w-full border-2 p-4 border-sky-700 rounded-md bg-sky-700 bg-opacity-10'>
        {status && <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, backgroundColor: '#dfdfdf' }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>}
        </div>
      </div>

    </main>
  )
}

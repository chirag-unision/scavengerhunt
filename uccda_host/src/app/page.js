"use client";

import Image from 'next/image'
import { Inter } from 'next/font/google'
import * as React from 'react';
import { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios'
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home() {
  const router= useRouter();
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  const setUserEmail= (e)=> {
    setEmail(e.target.value)
  }

  const setUserPassword= (e)=> {
    setPassword(e.target.value)
  }

  const sendData= ()=> {
    axios.post('https://739b-2401-4900-1c67-5391-8d5d-3318-3d9a-b691.ngrok-free.app/adminlogin', {
      email: email,
      password: password
    })
    .then(function (response) {
      console.log(response);
      setOpen(true);
      sessionStorage.setItem('admin_id', response.data.adminid);
      router.replace('/admin/');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    if(sessionStorage.getItem('admin_id'))
    router.replace('/admin/');
  }, [])
  

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-10 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started
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
            Mystery Maze
          </a>
        </div>
      </div>

      <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]"></div>
      <input 
        type='text'
        onChange={setUserEmail}
        placeholder='Enter Your Registered Email'
        className="flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-80 rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30" />
      <input 
        type='password'
        onChange={setUserPassword}
        placeholder='Enter Your Password'
        className="flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4  backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-80 rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30" />

      <button 
        onClick={sendData}
        className="flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-2 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-80 rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30">
        Submit
      </button>
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://www.instagram.com/manantechnosurge/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Instagram{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Connect with us through our instagram handle.
          </p>
        </a>

        <a
          href="https://chat.whatsapp.com/EokulR7QYwr9KG5vK72DOh"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Community{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Connect with us through our technical Community on WhatsApp.
          </p>
        </a>

        <a
          href="https://mananatechnosurge.web.app/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Web{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Explore Manan through the website.
          </p>
        </a>
      </div>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            This is a success message!
          </Alert>
        </Snackbar>
      </Stack>
    </main>
  )
}

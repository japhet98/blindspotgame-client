import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import HeaderNavigation from './Navigation'
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header >
    <HeaderNavigation/>
    </header>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    draggable
    pauseOnHover
    />
    {children}
   
  </div>
)

export default Layout

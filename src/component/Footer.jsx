import {BiLogoFacebookCircle,BiLogoInstagram,BiLogoLinkedin,BiLogoTwitter} from 'react-icons/bi'

 export function Footer() {
   const date=new Date();
   const CurrentYear=date.getFullYear()
    return (
      <>
       <footer className='relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20'>
       <section className='text-lg text-red-50'>
       Copyright {CurrentYear} | All rights reserved
       </section>
       <section className='flex items-center justify-center gap-5 text-2xl'>
          <a className='hover:text-yellow-500 hover:transition-all ease-in-out duration-300  '><BiLogoFacebookCircle/></a>
          <a className='hover:text-yellow-500 hover:transition-all ease-in-out duration-300  '><BiLogoInstagram/></a>
          <a className='hover:text-yellow-500 hover:transition-all ease-in-out duration-300 '><BiLogoLinkedin/></a>
          <a className='hover:text-yellow-500 hover:transition-all ease-in-out duration-300 '><BiLogoTwitter/></a>
       </section>
          
       </footer>
      </>
    )
  
}

import React from 'react';
import { Link } from 'react-router-dom';

const Heading:React.FC<{heading:string, text:string, label:string, route:string}> = ({heading,text, label, route}) =>{
    return <div className='text-center'>
         <p className='text-3xl font-bold '>{heading}</p>
         <div className='flex justify-center gap-1'>
         <p>{text}</p>
         <Link className={'underline'} to={route}>{label}</Link>
         </div>
    </div>
}

export default Heading;
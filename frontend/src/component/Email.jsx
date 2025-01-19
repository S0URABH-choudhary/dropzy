import React, { useState } from 'react'

function Email(props) {
    const [senderEmail, setsenderEmail]= useState('')
    const [receiverEmail, setreceiverEmail] = useState('')


    const handlesubmit = async (e) =>{
        e.preventDefault();
        const downloadLink = props.downloadLink;
        try{
          const response = await fetch("https://dropzy.onrender.com/api/files/send-email",{
            method:"POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify({ senderEmail , receiverEmail, downloadLink}),
          });
          const data = await response.json();
          if (response.ok){
            alert("Link has been Emailed")
            setreceiverEmail("");
            setsenderEmail("");
          }else{
            console.error("Error:",data.error)
          }
        }catch(error){
          console.error("Error:",error)
        }
        

    };

  return (
    <div className='email-container relative border-[2px] border-dashed border-blue-500 rounded mt-4 px-[10px] py-[5px]'>
    <div className="tittle  ">Send via email</div>
    <form onSubmit={(e)=>handlesubmit(e)} className='flex justify-between items-end '>
       <div className='flex flex-col w-full gap-3 mt-2'>
       <input value={senderEmail} onChange={(e)=>{
            setsenderEmail(e.target.value)
        }} type="email" className='placeholder:text-sm border-b-[2px] w-full text-stone-700 border-blue-400 outline-transparent' placeholder='Enter your email...' required/>
        <input value={receiverEmail} onChange={(e)=>{
            setreceiverEmail(e.target.value)
        }} type="email" className='placeholder:text-sm border-b-[2px] w-full text-stone-700 border-blue-400 outline-transparent' placeholder='Enter their email...' required/>
       </div>
        <button type='submit' className='text-white bg-blue-500 px-[15px] py-[5px] w-max rounded ml-6'>Send</button>
    </form>
    </div>
  )
}

export default Email;
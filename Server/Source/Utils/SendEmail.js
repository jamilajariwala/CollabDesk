import {Resend} from 'resend'


const sendMail=async(to,subject,html)=>{
    const resend = new Resend(process.env.RESEND_API)
   try{
     await resend.emails.send({
        from:'onboarding@resend.dev',
        to,
        subject,
        html
    })
    return true
   }catch(error){
    console.log("mail error",error)
    return false
   }
}

export default sendMail
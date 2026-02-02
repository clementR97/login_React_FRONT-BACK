import nodemailer from 'nodemailer'

const sendEmail = async({to,subject,text})=>{
    const testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port:587,
        auth:{
            user: testAccount.user,
            pass: testAccount.pass
        },
    })
    const info = await transporter.sendMail({
        from:`Mon app ${testAccount.user}`,
        to,
        subject,
        text,
    })
    console.log('✅ Email envoyé, voir le mail ici :')
    console.log(nodemailer.getTestMessageUrl(info))
}
export default sendEmail
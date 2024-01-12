import sgMail from '@sendgrid/mail'
import 'dotenv/config'
import { readFileSync } from 'fs'
import Handlebars from 'handlebars'
import path from 'path'

interface IPayload {
    username: string,
    link: string
}

const sendEmail = async (to: string, payload: IPayload, subject: string, template: string) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)
    try {
        const templateSource = readFileSync(path.join(__dirname, template), 'utf8')
        const compiledTemplate = Handlebars.compile(templateSource)
        const emailContent = compiledTemplate(payload)

        const msg = {
            to: to,
            from: process.env.SENDER_VERIFIED as string,
            subject: subject,
            text: subject,
            html: emailContent
        }

        await sgMail.send(msg)
        console.log('Email sent');

    } catch (error) {
        console.log(error)
    }
}



export default sendEmail
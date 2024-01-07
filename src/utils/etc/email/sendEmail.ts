import nodemailer from "nodemailer";

export async function sendEmail(email: string, subject: string, text: string) {

    const transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 587,
        auth: {
            user: "postmaster@sandboxc2c30a7e8a6d4c81b6946d560ef5f38f.mailgun.org",
            pass: "5d27ea1c0bd5055cc7597b526c97d48a-ba042922-00ba9898"
        }
    });

    const mailOptions = {
        from: "postmaster@sandboxc2c30a7e8a6d4c81b6946d560ef5f38f.mailgun.org",
        to: email,
        subject: subject,
        text: text,
        html: text
    };

    // wait for email to be sent
    await transporter.sendMail(mailOptions);
}




import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return new Response("Missing fields", { status: 400 });
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // use Gmail SMTP or your email provider
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER, // your email
                pass: process.env.EMAIL_PASS, // your email password or app password
            },
        });

        // Send email
        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_USER, // your email where you receive messages
            subject: `New Contact Form Message from ${name}`,
            text: message,
            html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
    }
}

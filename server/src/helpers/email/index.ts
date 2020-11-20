import nodemailer from "nodemailer";

interface EmailDataT {
	html: string;
	subject: string;
}

export default async function sendEmail(to: string | undefined, { html, subject }: EmailDataT) {
	// const testAccount = await nodemailer.createTestAccount();
	// console.log(testAccount);

	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false,
		auth: {
			user: "rh22s2sabrauw4iv@ethereal.email",
			pass: "eMyyUDSj2xMg3TMTZR",
		},
	});
	const info = await transporter.sendMail({
		from: "twitter inshallah",
		to,
		subject,
		html,
	});

	console.log("Message sent: %s", info.messageId);

	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

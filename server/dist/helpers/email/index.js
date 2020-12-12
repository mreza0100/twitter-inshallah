"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
async function sendEmail(to, { html, subject }) {
    const transporter = nodemailer_1.default.createTransport({
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
    console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
}
exports.default = sendEmail;
//# sourceMappingURL=index.js.map
// generate email text using html file as a template
// theese html files have tags like {tag1} {tag2} etc. Allow a dict to be passed in to replace the tags

import fs from "fs";
import path from "path";

export const activationEmailTemplate = "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "    <title>Belfri - Account activation</title>\n" +
    "</head>\n" +
    "<body>\n" +
    "<h1>Welcome to Belfri!</h1>\n" +
    "<p>Dear User,</p>\n" +
    "<p>Thank you for registering. Please click the link below to activate your account:</p>\n" +
    "<a href=\"{activation_url}\">Activate your account</a>\n" +
    "<p>If you did not request this, please ignore this email.</p>\n" +
    "<p>Best,</p>\n" +
    "<p>Belfri Team</p>\n" +
    "</body>\n" +
    "</html>";

export const lessonAcceptEmailTemplate = "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "    <title>Belfri - someone requested a lesson!</title>\n" +
    "</head>\n" +
    "<body>\n" +
    "<p>Dear {teacher},</p>\n" +
    "<p> {user} has requested a lesson with you!</p>\n" +
    "<p>Here are the details:</p>\n" +
    "<table>\n" +
    "    <tr>\n" +
    "        <td>Offer</td>\n" +
    "        <td>{offer}</td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>Date</td>\n" +
    "        <td>{date}</td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>Duration</td>\n" +
    "        <td>{duration}</td>\n" +
    "    </tr>\n" +
    "\n" +
    "\n" +
    "</table>\n" +
    "<!-- accept and decline buttons -->\n" +
    "<a href=\"{acceptLink}\">Accept</a>\n" +
    "<a href=\"{declineLink}\">Decline</a>\n" +
    "</body>\n" +
    "</html>";

export const lessonResponseEmailTemplate = "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "    <title>Belfri - lesson request response</title>\n" +
    "</head>\n" +
    "<body>\n" +
    "<p>Dear {user},</p>\n" +
    "<p>Your lesson ({offer} on {date}) with {teacher} has been {response}.</p>\n" +
    "{footer}\n" +
    "</body>\n" +
    "</html>";

export async function generateEmailText(template: string, tags: { [key: string]: string }): Promise<string> {
    let emailText = template;
    for (const tag in tags) {
        emailText = emailText.replace(`{${tag}}`, tags[tag]);
    }

    return emailText;

}
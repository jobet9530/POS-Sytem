const crypto = require("crypto");

const secretKey = "ChittyChittyBangBang";
const algorithm = "aes-256-ctr";

function encryptData(data) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);

  let encrypData = cipher.update(data, "utf-8", "hex");
  encrypData += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypData}`;
}

function decryptData(encrypData) {
  const [ivHex, encryptedText] = encryptedData.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    iv,
  );

  let decryptedData = decipher.update(encryptedText, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");

  return decryptedData;
}

module.exports = { encryptData, decryptData };

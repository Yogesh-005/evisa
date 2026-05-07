const SibApiV3Sdk = require("sib-api-v3-sdk");
const config = require("../config/env");

/**
 * Send an OTP email via Brevo (Sendinblue).
 *
 * The API key and sender identity are pulled from `config/env.js`, which in
 * turn reads from `.env`. Update the values in `.env` to change them across
 * the entire backend.
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED="0";
exports.sendEmailOtp = async (email, otp) => {
  try {
    const client = SibApiV3Sdk.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = config.email.brevoApiKey;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    await apiInstance.sendTransacEmail({
      sender: {
        email: config.email.from,
        name: config.email.fromName,
      },
      to: [{ email }],
      subject: "OTP for E-Visa",
      textContent: `Your OTP is: ${otp}`,
    });

    console.log(`OTP email sent to ${email}`);
  } catch (err) {
    console.error("sendEmailOtp error:", err.response?.body || err.message);
    throw new Error("Failed to send OTP email");
  }
};

let OTPlessSignin: any = null

/**
 * Initializes the OTPless SDK and sets up a callback function.
 *
 * @param {function} callback - The callback function to be executed after successful authentication.
 * @return {void} No return value.
 */
export const initOTPless = (callback: Function): void => {
	const script: HTMLScriptElement = document.createElement('script')
	// Loading the script if it's not already loaded
	if (!document.getElementById('otpless-sdk')) {
		script.id = 'otpless-sdk'
		script.type = 'text/javascript'
		script.src="https://otpless.com/v3/headless.js"
		// script.src = 'https://otpless.com/v2/headless.js'
		// Get your app id from https://otpless.com/dashboard/customer/dev-settings
		script.setAttribute('data-appid', 'Your_app_id')
		// TODO: Add your app id					^here
		document.head.appendChild(script)
	}

	// Initializing the OTPless SDK when the script loads with the callback function
	script.onload = () => {
		OTPlessSignin = new window.OTPless(callback)
	}
}

/**
 * Authenticates the user using any authentication method available.
 * Email / Phone, OTP / Magic Link / Social Authentications
 * @param {Object} params - The parameters for primary authentication.
 * for social authentication use 'channel': 'OAUTH' and 'channelType' (eg. 'GOOGLE', 'WHATSAPP', 'GITHUB', etc)
 * for otp/magic link via email use 'channel': 'EMAIL' and 'email'
 * for otp/magic link via phone use 'channel': 'PHONE', 'phone' and 'countryCode'(optional)
 * @TODO activate your chosen authentication method from otpless Dashboard(https://otpless.com/dashboard/customer/channels) before executing this function
 * */
export const Authenticate = ({ channel = 'PHONE', channelType, phone, countryCode = '+91' }: AuthParams): Promise<any> => {
	if (channel != 'PHONE') {
		return Promise.reject({
			success: false,
			statusCode: 400,
			errorMessage: `Invalid channel ${channel}`,
		})
	}
	
	if (channel === 'PHONE' && !phone) {
		return Promise.reject({
			success: false,
			statusCode: 400,
			errorMessage: 'Phone is required',
		})
	}
	
	return (
		OTPlessSignin &&
		OTPlessSignin.initiate({
			channel,
			channelType,
			phone,
			countryCode,
		})
	)
}

/**
 * Verifies the OTP (One-Time Password) for the given authentication channel.
 *
 * @param {Object} params - The parameters for verifying the OTP.
 * @return {Promise} A promise that resolves with the result of the verification.
 */
export const verifyOTP = ({ channel = 'PHONE', otp, countryCode = '+91', phone }: VerifyOTPParams): Promise<any> => {
	if (channel != 'PHONE') {
		return Promise.reject({
			success: false,
			statusCode: 400,
			errorMessage: `Invalid channel ${channel}`,
		})
	}
	
	if (channel === 'PHONE' && !phone) {
		return Promise.reject({
			success: false,
			statusCode: 400,
			errorMessage: 'Phone is required',
		})
	}
	return (
		OTPlessSignin &&
		OTPlessSignin.verify({
			channel,
			phone,
			otp,
			countryCode,
		})
	)
}

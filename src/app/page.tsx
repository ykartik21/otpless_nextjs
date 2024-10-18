'use client'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import { Authenticate, initOTPless, verifyOTP } from '../utils/initOtpless'

export default function Home() {
	const [phone, setPhone] = useState('')
	const [otp, setOtp] = useState('')

	useEffect(() => initOTPless(callback), [])
	/** callback - otpless callback function
	 * @description
	 * This function is called after authentication is done, by otpless-sdk.
	 * Use this function to further process the otplessUser object, navigate to next page or perform any other action based on your requirement.
	 * @param {Object} otplessUser
	 * @returns {void}
	 */
	const callback = (otplessUser: Object): void => {
		// Replace the following code with your own logic
		console.log(otplessUser)
		alert(JSON.stringify(otplessUser))
	}
	/** switchActiveSection - otpless callback function
	 * @description
	 * This function is called when the user changes the section from mobile to email.
	 * @param {event} e
	 * @returns {void}
	 * */
	

	return (
		<div className={styles.page}>
			<main
				className={styles.main + ' ' + styles.homePage}
				id='home-page'>
					<div id='mobile-section'>
						<input
							id='mobile-input'
							placeholder='Enter mobile number'
							onChange={e => setPhone(e.target.value)}
						/>
						<button
							onClick={() =>
								Authenticate({ channel: 'PHONE', phone }).then(res => {
									if (res.success) {
										console.info('Check your phone for OTP/Magic Link')
										document.getElementById('otp-section')!.style.display = 'block'
										;(document.getElementById('mobile-input') as HTMLInputElement).disabled = true
									}
								})
							}>
							Proceed
						</button>
					</div>
				
				<div
					id='otp-section'
					style={{ display: 'none' }}>
					<input
						id='otp-input'
						placeholder='Enter OTP'
						value={otp}
						onChange={e => setOtp(e.target.value)}
						minLength={6}
						maxLength={6}
					/>
					<button
						onClick={() =>
							verifyOTP({ channel: "PHONE", otp, phone}).then(res => {
								console.log(res)
								if (res.success) {
									;(document.getElementById('otp-input') as HTMLInputElement).disabled = true
									setOtp('Verified')
								}
							})
						}>
						Verify OTP
					</button>
				</div>
				
			</main>
		</div>
	)
}
[![OTPless](https://d1j61bbz9a40n6.cloudfront.net/website/home/v4/logo/white_logo.svg)](https://otpless.com/)

# Next-JS Demo: Otpless Headless SDK

## Steps to add OTPless Headless SDK to your NextJS Website

1. **Create an App in [OTPless dashboard](https://otpless.com/dashboard/customer/dev-settings) and copy the `APP ID`**
2. **Add the function to append OTPless Script to document head**

    > Add the contents of [initOtpless.js](./src/utils/initOtpless.ts) file in `src/utils/initOtpless.js` file in your project and *paste* the `APP ID` [here](./src/utils/initOtpless.ts#L17).

    **initOtpless.js file exports the following functions**

    >> ***[initOTPless](./src/utils/initOtpless.ts#L9)***, to initialize the OTPless SDK,

    >> ***[Authenticate](./src/utils/initOtpless.ts#L37)***, to authenticate the user.

    >> ***[verifyOTP](./src/utils/initOtpless.ts#L89)***, to verify the OTP.



3. **Load the script in Login/Signup component and add callback function**

    > Add following code in Login/Signup component.
    >> retrive data using **otplessUser** object

    ```tsx
    useEffect(() => initOTPless(callback), [])

    const callback = (otplessUser: Object): void => {
		// Replace the following code with your own logic
		console.log(otplessUser)
		alert(JSON.stringify(otplessUser))
	}
    ```

    [view source](./src/app/page.tsx#L12)

4. **Create your UI**

    > Design UI to collect user input and trigger authentication method of your choice.

    ```jsx
    const [phone, setPhone] = useState(null)
	const [otp, setOtp] = useState(null)
    return <>
        <div id="mobile-section">
            <input id='mobile-input' placeholder='Enter mobile number' onChange={(e) => setPhone(e.target.value)} />
            <button onClick={() => Authenticate({ channel: 'PHONE', phone })}>Request OTP</button>
        </div>

        <div id="otp-section">
            <input id='otp-input' placeholder='Enter OTP' onChange={(e) => setOtp(e.target.value)} minLength={6} maxLength={6} />
            <button onClick={() => verifyOTP({ channel: activeSection, otp, phone })}>Verify OTP</button>
        </div>

        <button onClick={() => Authenticate({channel: 'OAUTH', channelType:'WHATSAPP' })}>Authenticate with WhatsApp</button>
        <button onClick={() => Authenticate({channel: 'OAUTH', channelType:'GOOGLE'})}>Authenticate with Gmail</button>
    </>
    ```
    [view source](./src/app/page.tsx#L37)  (NOTE: This integration has a different ui)

### This demo implementation adds extra modularity, scalability and reusability to the OTPless Headless sdk

### Usage

> **Prerequisites**: [NodeJS](https://nodejs.org/en)

- Install Packages

    ```bash
    npm install
    ```

- Run the demo

    ```bash
    npm run dev
    ```

- Open [localhost:3000](http://localhost:3000) in your browser
- Switch branches to check out available options to integrate *OTPless* in your project

### ***Note: Enable your choosen Authentication Method from [OTPless dashboard](https://otpless.com/dashboard/customer/channels) before using it.***

## *Thank You*

## [Visit OTPless](https://otpless.com/platforms/react)

interface Window {
	OTPless: any
}

type OauthChannel = 'GOOGLE' | 'WHATSAPP' | 'GITHUB' | 'TWITTER' | 'FACEBOOK' | 'LINKEDIN' | 'APPLE' | 'TRUE_CALLER' | 'DISCORD'

interface AuthParams {
	channel: 'PHONE' | 'EMAIL' | 'OAUTH'
	channelType?: OauthChannel
	phone?: string
	countryCode?: string
	email?: string
}

type AuthParams =
	| {
			channel: 'OAUTH'
			channelType: OauthChannel
			phone?: never
			countryCode?: never
			email?: never
	  }
	| {
			channel: 'PHONE'
			channelType?: never
			phone: string
			countryCode?: string
			email?: never
	  }
	| {
			channel: 'EMAIL'
			channelType?: never
			phone?: never
			countryCode?: never
			email: string
	  }

interface verifyOTPParams {
	channel: string
	otp: string
	countryCode?: string
	phone?: string
	email?: string
}

type VerifyOTPParams = verifyOTPParams

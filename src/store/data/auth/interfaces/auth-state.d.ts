import { BaseState } from "../../../common/interfaces/base";

export interface UserInfo {
	userId: string;
	ownerOrganizationId: string;
	accessJwt: {
		token: string;
		expiration: Date;
	},
	refreshJwt: {
		token: string;
		expiration: Date;
	},
	mfaRequired: boolean,
	mfaExpirationInMinutes: number | null,
	passwordResetRequired: boolean,
	phone: string | null
}

export interface Profile {
	id: string;
	username: string;
	ownerOrganizationId: string;
	firstName?: string;
	lastName?: string;
}

export interface AuthState extends BaseState {
	profile:  Profile | null;
	userInfo: UserInfo | null;
	authenticated: boolean;
	initRoute: string;
}

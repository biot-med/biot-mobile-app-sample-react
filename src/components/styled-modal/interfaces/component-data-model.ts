import { PropsWithChildren } from "react";
import { ModalProps } from "react-native-modal";

interface StyledModalProps extends PropsWithChildren{
	isVisible: boolean;
	children: React.ReactNode;
	[x: string]: any;
}

export interface PredefinedModalProps {
	isVisible: boolean;
	title: string;
	body: string;
	modalType: ModalType;
	actionButtonTitle: string;
	actionButtonPressed: Function;
}

export interface InfoPopupData {
	show: boolean;
	title: string;
	body: string;
	modalType: ModalType;
}

export type ModalType = 'info' | 'error';

export type ModalComponentPropsWithChildren = {
	children?: React.ReactNode
}

export type ModalHeaderProps = {
	title: string, 
	type: ModalType
}

export default StyledModalProps;
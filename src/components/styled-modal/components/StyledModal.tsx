import ReactNativeModal from "react-native-modal";
import { Text, View } from "react-native";

import StyledModalProps, { ModalComponentPropsWithChildren, ModalHeaderProps } from "../interfaces/component-data-model";
import styles from "./styles";

import InfoIcon from '../../../assets/images/info.svg';
import ErrorIcon from '../../../assets/images/error.svg';


/**
 * A styled modal component based on `ReactNativeModal`. It displays content inside a modal dialog.
 *
 * @param {StyledModalProps} props - The component's props.
 * @returns {JSX.Element} - A styled modal component.
 *
 * @example
 * // Example usage:
 * <StyledModal isVisible={true}>
 *   {/* Modal content goes here *}
 * </StyledModal>
 */
export const StyledModal: React.FC<StyledModalProps> = ({ isVisible = false, children, ...props }) => {
	return (
		<ReactNativeModal
			isVisible={isVisible}
			{...props}
			animationInTiming={300}
			animationOutTiming={300}
			backdropTransitionInTiming={200}
			backdropTransitionOutTiming={200}>
			{children}
		</ReactNativeModal>
	);
};

/**
 * A container component used to wrap content within a modal. It provides styles to center the
 * modal's content.
 *
 * @param {ModalComponentPropsWithChildren} props - The component's props.
 * @returns {JSX.Element} - A styled modal container component.
 *
 * @example
 * // Example usage:
 * <StyledModalContainer>
 *   {/* Modal content goes here *}
 * </StyledModalContainer>
 */
export const StyledModalContainer = ({ children }: ModalComponentPropsWithChildren) => (
	<View style={styles.container}>{children}</View>
);

/**
 * A header component for the modal, used to display a title and an icon. The `type`
 * prop determines the icon displayed (info or error).
 *
 * @param {ModalHeaderProps} props - The component's props.
 * @returns {JSX.Element} - A styled modal header component.
 *
 * @example
 * // Example usage:
 * <StyledModalHeader title="Modal Title" type="info" />
 */
export const StyledModalHeader = ({ title, type }: ModalHeaderProps) => (
	<View style={styles.header}>
		<View style={styles.icon}>
			{type === 'error' ?
				<ErrorIcon /> : 
				<InfoIcon height={18}/>}
		</View>
		<Text style={styles.text}>{title}</Text>
	</View>
);

/**
 * A component for the modal's main content body. It provides styles to format the content inside
 * the modal.
 *
 * @param {ModalComponentPropsWithChildren} props - The component's props.
 * @returns {JSX.Element} - A styled modal body component.
 *
 * @example
 * // Example usage:
 * <StyledModalBody>
 *   {/* Modal content goes here *}
 * </StyledModalBody>
 */
export const StyledModalBody = ({ children }: ModalComponentPropsWithChildren) => (
	<View style={styles.body}>{children}</View>
);

/**
 * A component for the modal's footer section. It provides styles for organizing and displaying
 * actions or additional content at the bottom of the modal.
 *
 * @param {ModalComponentPropsWithChildren} props - The component's props.
 * @returns {JSX.Element} - A styled modal footer component.
 *
 * @example
 * // Example usage:
 * <StyledModalFooter>
 *   {/* Modal footer content goes here *}
 * </StyledModalFooter>
 */
export const StyledModalFooter = ({ children }: ModalComponentPropsWithChildren) => (
	<View style={styles.footer}>{children}</View>
);

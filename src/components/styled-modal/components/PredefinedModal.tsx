import { Button, Text } from "react-native";
import { StyledModal, StyledModalBody, StyledModalContainer, StyledModalFooter, StyledModalHeader } from "./StyledModal";
import { PredefinedModalProps } from "../interfaces/component-data-model";
import Theme from "../../../theme/theme";

/**
 * A pre-defined modal component that combines components to display a modal with a title, body text,
 * and an action button.
 *
 * @param {PredefinedModalProps} props - The component's props.
 * @param {boolean} props.isVisible - Controls the visibility of the modal.
 * @param {string} props.title - The title displayed in the modal header.
 * @param {string} props.body - The body text displayed in the modal.
 * @param {string} props.modalType - The type of modal, which determines the icon in the header (e.g., 'info' or 'error').
 * @param {string} props.actionButtonTitle - The title of the action button.
 * @param {function} props.actionButtonPressed - A function to be executed when the action button is pressed.
 * @returns {JSX.Element} - A pre-defined modal component with the specified content and behavior.
 *
 * @example
 * // Example usage:
 * <PredefinedModal
 *   isVisible={true}
 *   title="Modal Title"
 *   body="This is the modal body text."
 *   modalType="info"
 *   actionButtonTitle="OK"
 *   actionButtonPressed={() => {
 *     // Handle action button press
 *   }}
 * />
 */
export const PredefinedModal:React.FC<PredefinedModalProps> = ({isVisible, title, body, modalType, actionButtonTitle, actionButtonPressed }) => {

	const onPressHandle = () => {
		actionButtonPressed()
	}

	return (
		<StyledModal isVisible={isVisible} >
			<StyledModalContainer>
				<StyledModalHeader title={title} type={modalType}/>
				<StyledModalBody>
					<Text>{body}</Text>
				</StyledModalBody>
				<StyledModalFooter>
					<Button color={Theme.colors.primary} title={actionButtonTitle} onPress={onPressHandle} />
				</StyledModalFooter>
			</StyledModalContainer>
		</StyledModal>
	);
}
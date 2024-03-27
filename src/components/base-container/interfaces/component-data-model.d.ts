import { MutableRefObject, PropsWithChildren } from "react";
import { ScrollViewProps } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";

/**
 * Props for the BaseContainer component.
 *
 * @extends {PropsWithChildren} - React PropsWithChildren interface.
 * @extends {SafeAreaViewProps} - React Native SafeAreaViewProps interface.
 */
interface BaseContainerProps extends PropsWithChildren, SafeAreaViewProps {
}

/**
 * Props for the KeyboardAvoidScrollView component.
 *
 * @interface KeyboardAvoidScrollViewProps
 * @extends {PropsWithChildren} - React PropsWithChildren interface.
 * @extends {ScrollViewProps} - React Native ScrollViewProps interface.
 */
export interface KeyboardAvoidScrollViewProps extends PropsWithChildren, ScrollViewProps {
	/**
	 * A ref to the currently focused input field. The component will scroll to this field when the
	 * software keyboard appears.
	 *
	 * @type {MutableRefObject}
	 */
	focusedFieldRef: MutableRefObject;
  
	/**
	 * The top inset value to apply to the ScrollView. This value controls the initial spacing at
	 * the top of the ScrollView.
	 *
	 * @type {string | number}
	 * @default 0
	 */
	topInset?: string | number;
  }

export default BaseContainerProps;
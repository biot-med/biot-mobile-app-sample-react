import { useEffect, useRef, useState } from "react";
import { Dimensions, EmitterSubscription, Keyboard, KeyboardEvent, KeyboardEventListener, Platform, ScrollView, View } from "react-native";
import { KeyboardAvoidScrollViewProps } from "../interfaces/component-data-model"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { percentToDP } from "../../../utils/utils";

const windowHeight = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;

/**
 * A custom React Native ScrollView component that automatically adjusts its height and scrolls to
 * the focused input field when the software keyboard appears or the layout changes.
 *
 * @param {Object} props - The component's props.
 * @param {ReactNode} props.children - The content to be displayed within the ScrollView.
 * @param {React.RefObject} props.focusedFieldRef - A ref to the currently focused input field.
 * @param {number} [props.topInset=0] - The top inset value to apply to the ScrollView.
 * @param {...ScrollViewProps} props.scrollViewProps - Additional props to pass to the underlying ScrollView.
 * @returns {JSX.Element} - A customized ScrollView component.
 *
 * @example
 * // Example usage:
 * <KeyboardAvoidScrollView focusedFieldRef={focusedFieldRef} topInset={20} style={{ backgroundColor: 'white' }}>
 *   {/* Content goes here *}
 * </KeyboardAvoidScrollView>
 */
const KeyboardAvoidScrollView: React.FC<KeyboardAvoidScrollViewProps> = ({ children, focusedFieldRef, topInset = 0, ...scrollViewProps }) => {
	const [scrollEnabled, setScrollEnabled] = useState(false);
	const [contentHeight, setContentHeigh] = useState(0);
	const insets = useSafeAreaInsets();
	const scrollRef = useRef<ScrollView | null>();
	const viewRef = useRef<View | null>();


	useEffect(() => {
		const subscriptions: EmitterSubscription[] = [];
		subscriptions.push(Keyboard.addListener('keyboardDidShow', keyboardDidShowHandler));
		if (Platform.OS === 'ios') {
			subscriptions.push(Keyboard.addListener('keyboardWillHide', keyboardWillHideHandler));
		}
		else {
			subscriptions.push(Keyboard.addListener('keyboardDidHide', keyboardWillShowHandler));
		}
		return () => {
			subscriptions.forEach((subscription) => subscription.remove())
		}
	}, [contentHeight]);

	const keyboardWillShowHandler: KeyboardEventListener = (e: KeyboardEvent) => {
		scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
		viewRef.current?.measure((x, y, w, h, px, py) => {
			if (contentHeight >= Math.floor(windowHeight)) {
				setScrollEnabled(true)
			}
			else {
				setScrollEnabled(false);
			}
		})
	}

	const keyboardWillHideHandler: KeyboardEventListener = (e: KeyboardEvent) => {
		viewRef.current?.measure((x, y, w, h, px, py) => {
			setContentHeigh(h);
			if (Math.floor(py + h) >= Math.floor(windowHeight)) {
				setScrollEnabled(true)
			}
			else {
				setScrollEnabled(false);
			}
		})
	}

	const keyboardDidShowHandler: KeyboardEventListener = (e: KeyboardEvent) => {
		if (Platform.OS === 'ios') {
			viewRef.current?.measure((x, y, w, h, px, py) => {
				setContentHeigh(h + e.endCoordinates.height);
			});
		}
		if (!focusedFieldRef.current) {
			return;
		}
		setScrollEnabled(true);
		focusedFieldRef.current.measure((topViewX: number, topViewY: number, topViewW: number, topViewH: number, topViewPx: number, topViewPy: number) => {
			focusedFieldRef.current.measureLayout(viewRef.current!, (x: number, y: number, w: number, h: number, px: number, py: number) => {
				if (topViewPy + h > windowHeight - e.endCoordinates.height) {
					setTimeout(() => {
						scrollRef.current?.scrollTo({ x: 0, y: y, animated: true });
					}, 100);
				}
			})
		});
	}

	return (<ScrollView
		{...scrollViewProps}
		keyboardShouldPersistTaps="handled"
		ref={(r) => scrollRef.current = r}
		contentContainerStyle={{ height: contentHeight }}
		scrollEnabled={scrollEnabled}>
		<View
			ref={(r) => viewRef.current = r}
			style={{ height: Platform.OS === 'ios' ? windowHeight - insets.top - percentToDP(topInset, windowHeight) : 'auto', minHeight: 600 }}
			onLayout={(event) => {
				setContentHeigh(event.nativeEvent.layout.height - insets.bottom);
				setTimeout(() => {
					if (viewRef.current) {
						viewRef.current.measure((x, y, w, h, px, py) => {
							if (Math.floor(py + h - insets.top - percentToDP(topInset, windowHeight)) > Math.floor(screenHeight)) {
								setScrollEnabled(true);
							}
							else {
								setScrollEnabled(false);
							}
						})
					}
				}, 100);
			}}>
			{children}
		</View>
	</ScrollView>)
}

export default KeyboardAvoidScrollView;
import style from '../public/css/global.module';

import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const IconButton = ({ onPress, icon, title, backgroundColor, imageColor, additionalStyleClass, editable, selectTextOnFocus }: any) => (
    <View style={style.appButtonContainer}>
        <Icon.Button
            name={icon}
            backgroundColor={backgroundColor}
            onPress={onPress}
            color={imageColor}
            style={style.appButton}
        // editable={editable}
        // selectTextOnFocus={selectTextOnFocus}
        >
            <Text style={[style.appButtonText, additionalStyleClass]}>{title}</Text>
        </Icon.Button>
    </View>
);
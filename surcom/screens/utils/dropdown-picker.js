import style from './dropdown-picker.module.css';

import React, { useState } from 'react';
import { View } from 'react-native';

import { IconButton } from './button';
import DropDownPicker from 'react-native-dropdown-picker';

export default function DropdownPicker({ items, choosedValue }) {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

    return (
        <View style={style.dropdown}>

            <View style={style.ellipsis}>
            <IconButton
                icon="ellipsis-v"
                backgroundColor="black"
                color="red"
                onPress={() => setDropdownIsOpen(true)}
            />
            </View>

            
            {
                dropdownIsOpen ?
                    <DropDownPicker
                        placeholder="Select option"
                        open={dropdownIsOpen}
                        items={items}
                        setOpen={setDropdownIsOpen}
                        setValue={(value) => choosedValue(value())}
                    />
                    : null
            }

        </View>

    );
}

// https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/advanced/list-modes
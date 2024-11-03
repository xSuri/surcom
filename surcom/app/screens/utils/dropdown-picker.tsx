import style from '../public/css/dropdown-picker.module';

import React, { useState } from 'react';
import { View } from 'react-native';

import { IconButton } from './button';
import DropDownPicker from 'react-native-dropdown-picker';

export default function DropdownPicker({ items, choosedValue }: any) {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    const [value, setValue] = useState(items[0].value);

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
                        setValue={(value) => console.log(value)}
                        value={value}
                        multiple={false}
                        // setValue={(value) => choosedValue(value())}
                    />
                    : null
            }

        </View>

    );
}

// https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/advanced/list-modes
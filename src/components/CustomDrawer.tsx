import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

import { Dimensions } from 'react-native'

export const width = Dimensions.get('window').width
export const height = Dimensions.get('window').height

export const widthR = width >= 768 ? width * 0.5 : width
export const fontSizeR = width >= 768 ? width * 0.7 : width
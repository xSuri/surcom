import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 80,
    backgroundColor: 'black',
  },

  appButton: {
    padding: 12,
  },

  appButtonText: {
    fontSize: 17,
    color: 'white',
  },

  appButtonContainer: {
    padding: 10,
  },

  textBlack: {
    color: 'black',
  },

  textWhite: {
    color: 'white',
  },

  headerText: {
    fontSize: 24,
    color: 'white',
    marginBottom: '6%',
  },

  logo: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginTop: 10,
    textAlign: 'left',
  },

  signIn: {
    color: 'white',
  },

  input: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '40%',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 10,
    marginBottom: '5%',
  },

  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  body: {
    backgroundColor: 'black',
    height: '100%',
  },

  addingRoomButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 70,
  },

  rooms: {
    top: '8%',
    position: 'relative',
  },

  additionalRooms: {
    flexDirection: 'row',
  },

  dropdown: {
    position: 'absolute',
    right: 0,
  },
});

export default style;
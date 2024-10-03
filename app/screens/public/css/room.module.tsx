import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  main: {
    // boxSizing: 'border-box',
    backgroundColor: 'black',
    height: '100%',
  },

  body: {
    backgroundColor: 'black',
    // backgroundSize: 'cover',
    // backgroundPosition: 'center center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 0,
    marginBottom: 50,
  },

  scroll: {
    width: '100%',
  },

  chatContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 25,
    overflow: 'hidden',
    padding: 15,
    position: 'relative',
    width: '100%',
    maxWidth: '100%',
  },

  chat: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // listStyleType: 'none',
    padding: 0,
    margin: 0,
  },

  message: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 35,
    position: 'relative',
    marginBottom: '1.3%',
    maxWidth: '65%',
    minWidth: '28%',
  },

  messageStyle: {
    color: 'black',
  },

  left: {
    alignSelf: 'flex-start',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 25,
    paddingBottom: 15,
  },

  right: {
    alignSelf: 'flex-end',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 25,
    paddingBottom: 15,
  },

  middle: {
    alignSelf: 'center',
    padding: 20,
    paddingLeft: 35,
    paddingRight: 25,
    paddingBottom: 25,
  },

  name: {
    paddingBottom: 3,
    color: 'rgb(103, 100, 100)',
    width: '100%',
  },

  adminColor: {
    color: 'red',
  },

  text_input: {
    fontSize: 16,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: '80%',
    backgroundColor: '#232323',
    color: 'white',
    borderRadius: 20,
  },

  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  content: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },

  icons: {
    width: '10%',
    marginLeft: '2%',
    justifyContent: 'center',
  },
});

export default style;

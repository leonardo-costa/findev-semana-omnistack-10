import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  avatar: {
    width: 54,
    height: 54,
    borderWidth: 4,
    borderRadius: 4,
    borderColor: '#FFF',
  },

  callout: {
    width: 260,
  },

  devName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  devBio: {
    color: '#666',
    marginTop: 5,
  },

  devTechs: {
    marginTop: 5,
  },

  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 20,
    flexDirection: 'row',
  },

  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 4, height: 5 },
  },

  loadButton: {
    width: 50,
    height: 50,
    marginLeft: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8E4DFF',

  },

});

export default styles;

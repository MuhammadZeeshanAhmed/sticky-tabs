import { StyleSheet } from "react-native";


const style = StyleSheet.create({
    flexStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        paddingTop: 20,
        flexDirection: 'row',
        position: 'absolute',
        // top: 20,
        justifyContent:'space-between',
        width:'90%',
        alignSelf:'center'
    },
    mealText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey',
        height: 100,
    },
    flatlistContainer: {
        backgroundColor: '#fff',
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        paddingTop: 0,
        zIndex: 99999,
        top: 30,
        bottom: 0
    },
    iconContainer: {
        backgroundColor: '#ffff',
    },
    box: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#ffff',
        width: 50,
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        justifyContent: 'center',
        left: 0,
        right: 0,
        bottom:20
    },
    headerText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
})

export {
    style
}
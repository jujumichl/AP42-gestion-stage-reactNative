import { View, Text } from "react-native";

export default function HeaderSubTitle({ routeName, user }) {
    return (
        <View>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}>
                {routeName}
            </Text>
            <Text style={{ fontSize: 12, color: '#fff' }}>
                {user.email}
            </Text>
        </View>
    );
}
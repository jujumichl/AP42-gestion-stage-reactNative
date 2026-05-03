import { View, Text, StyleSheet } from "react-native";

export default function TableCompetence({ competence }) {
    return (
        <View style={styles.row}>
            <Text style={styles.cell}>{competence?.bloc?.code}.{competence?.numeroDansBloc}</Text>
            <Text style={styles.cell}>{competence?.libelle}</Text>
            <Text style={styles.cell}>{competence?.bloc?.specialite?.sigle ?? competence?.bloc?.specialite?.intitule }</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
    },
})
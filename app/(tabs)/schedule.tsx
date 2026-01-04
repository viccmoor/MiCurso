import { Text, View } from 'react-native';

const MODULES = [
    { id: 1, label: 'Mod 1', range: '8:20 - 9:30' },
    { id: 2, label: 'Mod 2', range: '9:40 - 10:50' },
    { id: 3, label: 'Mod 3', range: '11:00 - 12:10' },
    { id: 4, label: 'Mod 4', range: '12:20 - 13:30' },
    { id: 5, label: 'Mod 5', range: '13:30 - 14:50' },
    { id: 6, label: 'Mod 6', range: '14:50 - 16:00' },
    { id: 7, label: 'Mod 7', range: '16:10 - 17:20' },
    { id: 8, label: 'Mod 8', range: '17:30 - 18:40' },
    { id: 9, label: 'Mod 9', range: '18:50 - 20:00' },
    { id: 10, label: 'Mod 10', range: '20:10 - 21:20' },
];

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export default function Schedule() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Esta es la página del calendario.</Text>
    </View>
  );
}

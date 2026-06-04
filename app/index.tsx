import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#EEF3F9'
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      
      <TouchableOpacity 
        style={{ marginTop: 20, backgroundColor: '#183C6B', padding: 15, borderRadius: 8 }}
        onPress={() => router.push('/profile/personal-info')}
      >
        <Text style={{ color: 'white' }}>Test Profile Setup Flow</Text>
      </TouchableOpacity>
    </View>
  );
}

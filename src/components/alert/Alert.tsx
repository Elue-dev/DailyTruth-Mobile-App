import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { useAlert } from "../../context/alert/AlertContext";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";

export default function Alert() {
  const { type, message, showAlert } = useAlert();
  const { width } = Dimensions.get("window");

  let backgroundStyle;
  let iconType;

  switch (type) {
    case "success":
      backgroundStyle = "bg-green-600";
      iconType = <AntDesign name="checkcircleo" size={22} color="white" />;
      break;
    case "error":
      backgroundStyle = "bg-red-500";
      iconType = <MaterialIcons name="error-outline" size={22} color="white" />;
      break;
    case "warning":
      backgroundStyle = "bg-yellow-500";
      iconType = <AntDesign name="warning" size={22} color="white" />;
      break;
    case "info":
      backgroundStyle = "bg-blue-500";
      iconType = <Feather name="info" size={22} color="white" />;
      break;
    default:
      return null;
  }

  return (
    <View style={{ paddingHorizontal: 16 }}>
      {showAlert ? (
        <View
          className={backgroundStyle}
          style={[
            {
              position: "absolute",
              bottom: 100,
              left: 16,
              right: 16,
              borderRadius: 8,
            },
          ]}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 12 }}
          >
            {iconType}
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: 8,
              }}
            >
              {message}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

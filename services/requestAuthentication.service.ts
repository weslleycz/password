import * as LocalAuthentication from "expo-local-authentication";

export async function requestAuthentication() {
  try {
    const isAvailable = await LocalAuthentication.hasHardwareAsync();
    if (!isAvailable) {
      console.log("Device does not support biometric authentication.");
      return false;
    }

    const hasBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!hasBiometrics) {
      console.log("No biometrics are enrolled.");
      return false;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Confirme sua identidad",
      cancelLabel: "Cancel",
      disableDeviceFallback: false,
    });

    if (result.success) {
      console.log("Authentication successful!");
      return true;
    } else {
      console.log("Authentication failed or was canceled.");
      return false;
    }
  } catch (error) {
    console.error("Error requesting authentication:", error);
  }
}

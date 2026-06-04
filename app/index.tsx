import { Redirect } from "expo-router";

export default function Index() {
  // Automatically redirects the user to the onboarding flow
  return <Redirect href="/onboarding" />;
}

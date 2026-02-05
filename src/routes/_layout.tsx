import { Outlet } from "react-router-dom";
import { Layout } from "../components/Layout";
import { BreweryModal } from "../components/BreweryModal";

export function RootLayout() {
  return (
    <Layout>
      <Outlet />
      <BreweryModal />
    </Layout>
  );
}

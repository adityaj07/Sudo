import AppNavbar from "./_components/AppNavbar";
import Drafts from "./home/_components/Drafts";
import HomeProfile from "./home/_components/HomeProfile";

export default function AppLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <AppNavbar />
      <div className="container max-w-7xl mx-auto h-full pt-6">
        <div className="relative grid min-h-dvh grid-cols-1 overflow-hidden lg:grid-cols-[65%_35%] ">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}

import { PropsWithChildren } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen">
      <aside className="w-[300px] flex-shrink-0">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-[90px] flex-shrink-0">
          <Header />
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DefaultLayout;

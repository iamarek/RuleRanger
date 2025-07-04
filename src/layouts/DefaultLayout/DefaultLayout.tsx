import { PropsWithChildren } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

type DefaultLayoutProps = PropsWithChildren & {
  header?: React.ReactNode;
};

const DefaultLayout = ({ children, header }: DefaultLayoutProps) => {
  return (
    <div className="flex h-screen">
      <aside className="w-[300px] flex-shrink-0">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-[90px] flex-shrink-0">
          <Header content={header} />
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="pb-10">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;

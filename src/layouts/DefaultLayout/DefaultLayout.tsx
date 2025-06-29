import { PropsWithChildren } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="grid min-h-screen grid-cols-[310px_1fr] grid-rows-[90px_1fr] gap-0"
      style={{ gridTemplateAreas: '"sidebar header" "sidebar main"' }}
    >
      <aside
        className="row-span-2 col-start-1 row-start-1 col-end-2"
        style={{ gridArea: "sidebar" }}
      >
        <Sidebar />
      </aside>
      <header
        className="col-start-2 row-start-1 col-end-3"
        style={{ gridArea: "header" }}
      >
        <Header />
      </header>
      <main
        className="col-start-2 row-start-2 col-end-3"
        style={{ gridArea: "main" }}
      >
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;

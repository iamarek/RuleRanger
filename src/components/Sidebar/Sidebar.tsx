import { FC, useState, KeyboardEvent } from "react";
import Logotype from "./Logotype";
import Link from "../Link/Link";
import TablerIcon from "../TablerIcon/TablerIcon";
import { useLocation } from "react-router-dom";
import {
  IconFolder,
  IconPlus,
  IconChevronDown,
  IconChevronRight,
  IconTemplate,
  IconHome,
  IconWorldStar,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

const projects = [
  { name: "9admin", to: "/projects/9admin" },
  { name: "9app", to: "/projects/9app" },
  { name: "Portfolio_2023", to: "/projects/Portfolio_2023" },
];

const templates = [
  { name: "Template 1", to: "/templates/template1" },
  { name: "Template 2", to: "/templates/template2" },
];

type ToggleSection = "projects" | "templates";

// Types for navigation
interface NavLinkItem {
  type: "link";
  name: string;
  to: string;
  icon?: JSX.Element;
}

interface NavSectionItem {
  type: "section";
  name: string;
  icon: JSX.Element;
  sectionKey: ToggleSection;
  children: NavLinkItem[];
}

type NavItem = NavLinkItem | NavSectionItem;

const navigation: NavItem[] = [
  {
    type: "link",
    name: "Home",
    to: "/",
    icon: <TablerIcon icon={<IconHome />} size="small" />,
  },
  {
    type: "link",
    name: "Global rules",
    to: "/global-rules",
    icon: <TablerIcon icon={<IconWorldStar />} size="small" />,
  },
  {
    type: "section",
    name: "Projects",
    icon: <TablerIcon icon={<IconFolder />} size="small" />,
    sectionKey: "projects",
    children: projects.map((project) => ({
      type: "link",
      name: project.name,
      to: project.to,
    })),
  },
  {
    type: "section",
    name: "Templates",
    icon: <TablerIcon icon={<IconTemplate />} size="small" />,
    sectionKey: "templates",
    children: templates.map((template) => ({
      type: "link",
      name: template.name,
      to: template.to,
    })),
  },
];

// --- SUB-COMPONENTS ---

type SidebarLinkProps = {
  to: string;
  icon?: JSX.Element;
  name: string;
  isActive: boolean;
};

const SidebarLink: FC<SidebarLinkProps> = ({ to, icon, name, isActive }) => (
  <Link
    to={to}
    icon={icon}
    className={
      isActive ? "bg-gray-100 text-black" : "text-gray-text hover:bg-gray-50"
    }
    tabIndex={0}
    aria-label={name}
  >
    {name}
  </Link>
);

type SidebarSectionProps = {
  name: string;
  icon: JSX.Element;
  sectionKey: ToggleSection;
  open: boolean;
  handleToggle: (section: ToggleSection) => void;
  handleKeyDown: (
    e: KeyboardEvent<HTMLDivElement>,
    section: ToggleSection
  ) => void;
  childrenLinks: NavLinkItem[];
  isChildActive: (to: string) => boolean;
};

const SidebarSection: FC<SidebarSectionProps> = ({
  name,
  icon,
  sectionKey,
  open,
  handleToggle,
  handleKeyDown,
  childrenLinks,
  isChildActive,
}) => (
  <>
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
        open ? "bg-gray-100 text-black" : "text-gray-text hover:bg-gray-50"
      }`}
      tabIndex={0}
      aria-label={name}
      aria-expanded={open}
      onClick={() => handleToggle(sectionKey)}
      onKeyDown={(e) => handleKeyDown(e, sectionKey)}
      role="button"
    >
      {icon}
      {name}
      <span>
        {open ? (
          <TablerIcon icon={<IconChevronDown />} size="tiny" />
        ) : (
          <TablerIcon icon={<IconChevronRight />} size="tiny" />
        )}
      </span>
    </div>
    {open && (
      <div className="ml-9 flex flex-col gap-1 mt-1">
        {childrenLinks.map((child) => (
          <Link
            to={child.to}
            key={child.name}
            className={`px-3 py-1 rounded-lg w-full transition-colors ${
              isChildActive(child.to)
                ? "bg-gray-200 text-black"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            tabIndex={0}
            aria-label={child.name}
          >
            {child.name}
          </Link>
        ))}
      </div>
    )}
  </>
);

// --- MAIN COMPONENT ---

const Sidebar: FC = () => {
  const location = useLocation();

  // Helper functions to check if any child is active
  const isProjectActive = projects.some(
    (project) => location.pathname === project.to
  );
  const isTemplateActive = templates.some(
    (template) => location.pathname === template.to
  );

  const [open, setOpen] = useState<{ [key in ToggleSection]: boolean }>({
    projects: isProjectActive,
    templates: isTemplateActive,
  });

  const handleToggle = (section: ToggleSection) => {
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLDivElement>,
    section: ToggleSection
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      handleToggle(section);
    }
  };

  const isActive = (to: string) => location.pathname === to;

  return (
    <div className="h-full flex flex-col py-8 px-4 border-r border-gray-200 bg-white">
      <div className="px-2">
        <Link to="/">
          <Logotype />
        </Link>
        <div className="mb-10" />
        <nav
          tabIndex={0}
          aria-label="Sidebar navigation"
          className="flex flex-col gap-2"
        >
          {navigation.map((item) => {
            if (item.type === "link") {
              return (
                <SidebarLink
                  key={item.name}
                  to={item.to}
                  icon={item.icon}
                  name={item.name}
                  isActive={isActive(item.to)}
                />
              );
            }
            if (item.type === "section") {
              return (
                <SidebarSection
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  sectionKey={item.sectionKey}
                  open={open[item.sectionKey]}
                  handleToggle={handleToggle}
                  handleKeyDown={handleKeyDown}
                  childrenLinks={item.children}
                  isChildActive={isActive}
                />
              );
            }
            return null;
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

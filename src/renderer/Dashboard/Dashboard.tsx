import { FC, useEffect } from "react";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import Banner from "../../components/Banner/Banner";
import { useUserPreferences } from "../useUserPreferences";
import { useDashboardRules } from "../useDashboardRules";
import Loading from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import Heading from "../../components/Heading/Heading";
import Text from "../../components/Text/Text";
import { Link } from "react-router-dom";
import {
  IconFolderPlus,
  IconPencil,
  IconPencilCode,
} from "@tabler/icons-react";
import TablerIcon from "../../components/TablerIcon/TablerIcon";
import Button from "../../components/Button/Button";

const Dashboard: FC = () => {
  const { preferences } = useUserPreferences();
  const { data, loading, error, scanRules } = useDashboardRules();

  useEffect(() => {
    if (preferences.selectedProjects.length > 0) {
      scanRules();
    }
  }, [preferences.selectedProjects, scanRules]);

  const formatDate = (date: Date): string => {
    const now = new Date();
    const inputDate = new Date(date);
    const diffInMs = now.getTime() - inputDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "Updated today";
    } else if (diffInDays === 1) {
      return "Updated yesterday";
    } else if (diffInDays <= 30) {
      return `Updated ${diffInDays} days ago`;
    } else if (diffInDays <= 365) {
      const months = Math.floor(diffInDays / 30);
      return `Updated ${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return `Updated ${years} ${years === 1 ? "year" : "years"} ago`;
    }
  };

  return (
    <DefaultLayout
      header={
        <div>
          <Button
            variant="secondary"
            size="regular"
            iconLeft={<IconFolderPlus />}
          >
            Add new project
          </Button>
        </div>
      }
    >
      <div className="flex flex-col h-full max-h-full">
        <Banner
          title="Jump back in"
          description="Project with recently updated rules"
          offset={false}
        >
          <Link
            to={`/projects/${data?.mostRecentlyUpdatedProject?.project.id}`}
            className="flex max-w-[400px]"
          >
            <Card className="w-full !pb-5 hover:translate-y-[-2px] transition-all duration-200">
              {loading ? (
                <></>
              ) : error ? (
                <Text className="text-red-600">{error}</Text>
              ) : data?.mostRecentlyUpdatedProject ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    {data.mostRecentlyUpdatedProject.project.favicon && (
                      <img
                        src={data.mostRecentlyUpdatedProject.project.favicon}
                        alt={`${
                          data.mostRecentlyUpdatedProject.project.projectName ||
                          data.mostRecentlyUpdatedProject.project.folderName
                        } favicon`}
                        className="w-4 h-4 flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                    <Heading variant="h3">
                      {data.mostRecentlyUpdatedProject.project.projectName ||
                        data.mostRecentlyUpdatedProject.project.folderName}
                    </Heading>
                  </div>

                  <Text size="tiny" className="text-gray-light">
                    {formatDate(data.mostRecentlyUpdatedProject.lastRuleUpdate)}
                  </Text>
                </div>
              ) : (
                <Text className="text-gray-600">
                  No rules found in projects
                </Text>
              )}
            </Card>
          </Link>
        </Banner>
        <div className="pl-10 pr-14 space-y-6 flex-1 flex flex-col mt-12">
          {/* Recent Activity Section */}
          {preferences.selectedProjects.length > 0 && (
            <div className="max-w-[820px]">
              {/* Latest Rules */}
              <div>
                <div className="flex flex-col mb-6 gap-1">
                  <div className="flex items-center gap-3">
                    <TablerIcon icon={<IconPencilCode />} size="big" />
                    <Heading variant="h2">Recent rules</Heading>
                  </div>
                  <Text size="small">
                    Recently updated rules from various projects
                  </Text>
                </div>
                {loading ? (
                  <Loading />
                ) : error ? (
                  <Text className="text-red-600">{error}</Text>
                ) : data?.latestRules && data.latestRules.length > 0 ? (
                  <div className="grid grid-cols-2 gap-6">
                    {data.latestRules.map((rule, index) => (
                      <Link
                        to={`/projects/${rule.project.id}/${rule.filePath}`}
                        key={`${rule.project.folderPath}-${rule.name}-${index}`}
                        className="border group border-gray-200 rounded-lg p-4 flex flex-col hover:border-gray-400 hover:bg-gray-50/50 transition-all duration-200"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="flex items-center gap-1">
                                {rule.project.favicon && (
                                  <img
                                    src={rule.project.favicon}
                                    alt={`${
                                      rule.project.projectName ||
                                      rule.project.folderName
                                    } favicon`}
                                    className="w-3 h-3 flex-shrink-0"
                                    onError={(e) => {
                                      e.currentTarget.style.display = "none";
                                    }}
                                  />
                                )}
                                <Text size="tiny" color="text-gray-normal">
                                  {rule.project.projectName ||
                                    rule.project.folderName}
                                </Text>
                              </div>
                              <Text className="font-medium text-gray-900">
                                {rule.name}
                              </Text>
                            </div>
                            <div>
                              <div className="border border-gray-200 group-hover:border-gray-400 rounded-lg p-1 transition-all duration-200">
                                <TablerIcon icon={<IconPencil />} size="big" />
                              </div>
                            </div>
                          </div>
                          {rule.description && (
                            <Text
                              size="small"
                              color="text-gray-normal"
                              className="mt-3"
                            >
                              {rule.description}
                            </Text>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Text className="text-gray-600">No rules found</Text>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;

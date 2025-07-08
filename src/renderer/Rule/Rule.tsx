import { IconFolderPlus } from "@tabler/icons-react";
import Button from "../../components/Button/Button";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import { FC } from "react";

const Rule: FC = () => {
  return (
    <DefaultLayout
      headerBorder
      header={
        <div>
          <Button
            variant="secondary"
            size="regular"
            iconLeft={<IconFolderPlus />}
          >
            Add new rule
          </Button>
        </div>
      }
    >
      test
    </DefaultLayout>
  );
};

export default Rule;

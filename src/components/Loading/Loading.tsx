import { FC } from "react";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";

const Loading: FC = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col h-full max-h-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </DefaultLayout>
  );
};

export default Loading;

import Banner from "../components/Banner/Banner";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";

const Home = () => {
  return (
    <DefaultLayout>
      <Banner
        title="Welcome to RuleRanger"
        description="Start your journey with adding your projects"
      >
        <div>Welcome to the home page</div>
      </Banner>
      <div className="pl-10 pr-14">
        <div className="bg-red-500">Test</div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
